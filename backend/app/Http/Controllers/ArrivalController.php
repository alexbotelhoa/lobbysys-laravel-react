<?php

namespace App\Http\Controllers;

use App\Models\Arrival;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ArrivalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $arrivals = DB::table('arrivals')
            ->join('visitors', 'arrivals.visitor_id', '=', 'visitors.id')
            ->join('rooms', 'arrivals.room_id', '=', 'rooms.id')
            ->select('arrivals.*', 'visitors.name', 'visitors.cpf', 'rooms.nrRoom')
            ->orderBy('rooms.nrRoom')
            ->get();

        return response($arrivals, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'visitor_id' => 'numeric|required',
            'room_id' => 'numeric|required',
            'checkIn' => 'date|required',
        ]);

        if ($validator->fails()) return response([ 'error' => $validator->errors() ], 422);


        /**
         * Verifica o Visitante está sendo registrado novamente
         * de forma equivocada na mesma SALA e no mesmo DIA
         */
        $visitorAndRoomExist = Arrival::where([
            ['visitor_id', '=', $request->visitor_id],
            ['room_id', '=', $request->room_id],
            ['checkIn', 'LIKE', '%' . substr($request->checkIn, 0, 10) . '%']
        ])->count();

        if ($visitorAndRoomExist > 0) return response([ "message" => "Visitor already registered in the room"], 226);


        /**
         * Verifica se a quantidade de visitante vai ultrapassar 3 visitantes ao mesmo tempo
         * com isso o visitante será registrado na Fila de Espera dessa Sala
         */
        $countArrival = Arrival::where('room_id', $request->room_id)->count();

        if ($countArrival > 2) return response([ "message" => "Limit of visitors in the room exceeded"], 203);


        /**
         * Se tudo estiver OK o Visitante será liberado e registrado a sua entrada na Sala
         */
        $arrival = Arrival::create($request->all());

        return response($arrival, 201);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $arrival = Arrival::find($id);

        if (!$arrival) return response([ "message" => "Arrival Not Found!" ], 404);


        /**
         * Verifica se há Visitante na Fila de Espera para essa Sala
         */
        $personQueue = DB::table('queues')
            ->join('visitors', 'queues.visitor_id', '=', 'visitors.id')
            ->join('rooms', 'queues.room_id', '=', 'rooms.id')
            ->select('queues.*', 'visitors.name', 'visitors.cpf', 'rooms.nrRoom')
            ->where('room_id', $arrival->room_id)
            ->orderBy('created_at')
            ->limit(1)
            ->get();

        try {
            DB::beginTransaction();


            /**
             * Regsitra a Saída do Visitante
             */
            DB::table('concierges')->insert([
                'visitor_id' => $arrival->visitor_id,
                'room_id' => $arrival->room_id,
                'checkIn' => $arrival->checkIn,
                'checkOut' => now()
            ]);


            /**
             * Regsitra o Visitante no Histórico de Visita
             */
            DB::table('arrivals')->where('id', $id)->delete($id);

            if (count($personQueue) > 0) {
                DB::table('arrivals')->insert([
                    'visitor_id' => $personQueue[0]->visitor_id,
                    'room_id' => $personQueue[0]->room_id,
                    'checkIn' => now()
                ]);


                /**
                 * Resgata o Visitante da Fila de Espera
                 */
                DB::table('queues')->where('id', $personQueue[0]->id)->delete($personQueue[0]->id);
            }
        
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        };

        if (count($personQueue) > 0) return response($personQueue, 201);

        return response('', 204);

    }
}
