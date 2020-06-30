<?php

namespace App\Http\Controllers;

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
            'email' => 'required|string|email|max:30',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) return response([ 'errors' => $validator->errors()->all() ], 422);

        if (Auth::attempt(['email' => request('email'), 'password' => request('password')]))
        {
            try {
                $user = Auth::user();
            } catch (\Exception $e) {
                return response([ "message" => "User Bad Request" ], 400);
            }

            $response['name'] = $user->name;
            $response['token'] =  $user->createToken('MyApp')-> accessToken;

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
