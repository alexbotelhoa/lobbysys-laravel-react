<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $visitors = Visitor::orderBy('name')->get();

        return response($visitors, 200);
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
            'name' => 'required|string|max:50',
            'cpf' => 'required|string|max:14',
            'birth' => 'string|date',
            'email' => 'string|email|max:30|unique:visitors',
        ]);

        if ($validator->fails()) return response([ 'error' => $validator->errors() ], 401);

        $countVisitor = Visitor::where('cpf', $request->cpf)->count();

        if ($countVisitor > 0) return response([ "message" => "Visitor already registered"], 226);

        try {
            $visitor = Visitor::create($request->all());

            return response($visitor, 201);
        } catch (\Exception $e) {
            return response([ "message" => "Visitor Bad Request"], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $visitor = Visitor::where('id', $id)->delete($id);

        if (!$visitor) return response([ "message" => "Visitor Not Found!" ], 404);

        return response('', 204);
    }
}
