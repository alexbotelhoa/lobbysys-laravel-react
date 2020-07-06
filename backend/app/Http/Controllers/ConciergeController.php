<?php

namespace App\Http\Controllers;

use App\Models\Concierge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ConciergeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'visitor_id' => 'numeric',
            'room_id' => 'numeric',
            'checkIn' => 'string|date',
        ]);

        if ($validator->fails()) return response([ 'error' => $validator->errors() ], 401);

        try {
            $concierge = Concierge::create($request->all());

            return response($concierge, 201);
        } catch (\Exception $e) {
            return response(["message" => "Concierge Bad Request"], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filter(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'visitor_id' => 'string',
            'room_id' => 'string',
        ]);

        if ($validator->fails()) return response([ 'error' => $validator->errors() ], 401);

        try {
            $concierge = DB::table('concierges')
                ->join('visitors', 'concierges.visitor_id', '=', 'visitors.id')
                ->join('rooms', 'concierges.room_id', '=', 'rooms.id')
                ->where('concierges.visitor_id', 'LIKE', $request->visitor)
                ->where('concierges.room_id', 'LIKE', $request->room)
                ->where('concierges.checkIn', 'LIKE', '%' . $request->checkIn . '%')
                ->select('concierges.*', 'visitors.name', 'visitors.cpf', 'rooms.nrRoom')
                ->orderBy('concierges.checkIn')
                ->get();
        } catch (\Exception $e) {
            return response(["message" => "Concierge Bad Request"], 400);
        }

        if (!$concierge) return response([ "message" => "Concierge Not Found!" ], 404);

        return response($concierge, 200);        
    }
}
