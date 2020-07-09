<?php

namespace App\Http\Controllers;

//namespace App\Http\Controllers\API\Auth;


use App\Models\User;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'email|max:30|required',
            'password' => 'string|required',
        ]);

        if ($validator->fails()) return response([ 'errors' => $validator->errors() ], 422);

        if (Auth::attempt(['email' => request('email'), 'password' => request('password')]))
        {
            $user = Auth::user();

            $response['name'] = $user->name;
            $response['token'] =  $user->createToken('MyApp')->accessToken;

            return response($response, 200);
        } else {
            return response([ 'error' => 'Unauthorised' ], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();

        $response = [ 'message' => 'You have been successfully logged out!' ];

        return response($response, 200);
    }
}
