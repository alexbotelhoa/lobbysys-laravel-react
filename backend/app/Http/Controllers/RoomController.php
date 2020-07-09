<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rooms = Room::orderBy('nrRoom')->get();

        return response($rooms, 200);
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
            'nrRoom' => 'max:4|required',
        ]);

        if ($validator->fails()) return response([ 'error' => $validator->errors() ], 422);

        $countRoom = Room::where('nrRoom', $request->nrRoom)->count();

        if ($countRoom > 0) return response([ "message" => "Room already registered" ], 226);

        $room = Room::create($request->all());

        return response($room, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $room = Room::where('id', $id)->delete($id);

        if (!$room) return response([ "message" => "Room Not Found!" ], 404);

        return response('', 204);
    }
}
