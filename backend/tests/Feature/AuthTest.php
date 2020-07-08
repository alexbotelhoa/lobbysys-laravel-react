<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use App\Http\Controllers\AuthController;

class AuthTest extends TestCase
{
    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Login) forem NEGADAS
     * e retornar o STATUS '422'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteLoginHasDeniedValidator()
    {
        $arrival = [
            'email' => '',
            'password' => ''
        ];

        $response = $this->post(route('auth.login'), $arrival);

        $response
            ->assertStatus(422)
            ->assertJson([
                "errors" => [
                    "The email field is required.",
                    "The password field is required."
                ]
            ]);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Login) forem APROVADAS
     * com AUTORIZAÇÃO de login
     * e com STATUS de retorno '200'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteLoginHasAuthorised()
    {
        $user = factory(User::class)->create([
            'email' => 'teste@lobbysys.com',
            'password' => bcrypt('123')
        ]);

        $auth = [
            'email' => 'teste@lobbysys.com',
            'password' => '123'
        ];

        $response = $this->post(route('auth.login'), $auth);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'name',
                'token'
            ]);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Login) forem APROVADAS
     * mas NÃO foi AUTORIZADO o login
     * e com STATUS de retorno '401'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteLoginHasUnauthorised()
    {
        $auth = [
            'email' => 'teste@lobbysys.com',
            'password' => '123'
        ];

        $response = $this->post(route('auth.login'), $auth);

        $response->assertStatus(401);
    }

    /**
     * Deve ser VÁLIDO quando
     * e houver SUCESSO na tentiva de LOGOUT
     * e com STATUS de retorno '200'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteLogoutHasAuthorised()
    {
//        $user = factory(User::class)->create([
//            'email' => 'teste@lobbysys.com',
//            'password' => bcrypt('123')
//        ]);
//
//        $auth = [
//            'email' => 'teste@lobbysys.com',
//            'password' => '123'
//        ];
//
//        $response = $this->post(route('auth.login'), $auth);


//        var_dump($response->content());
//
//
//        var_dump($response->original['token']);
//
//        $convert = $response->original['token'][0];
//
//        var_dump($convert);



//        $headers = ['Authorization' => "Bearer $response->original['token']"];
//
//        var_dump($headers);

        $response = $this->withHeaders([
            'Authorization' => "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MGZkMTY0Ny1jODZiLTRjYjItYmM0Mi1mNzE1NDBmMzhiMzYiLCJqdGkiOiIzOWZkMDZhOWY3NDU0ODRkOTkzZTFiZmNlN2Y2Y2UwZTc5OWU0OGU5ZmNlZmYzYjc2YzU1ODc5NTFiODk2ZDgzODE2NmQwMjE1M2U4YWI1MSIsImlhdCI6MTU5NDE3MTEzOCwibmJmIjoxNTk0MTcxMTM4LCJleHAiOjE2MjU3MDcxMzgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.vzNbaOUwmKA1szBixWMUt7nRbZbD6tHdMZU7d3u49gCcBKe_bmvl0oVkXc8OgPmhe0kt7Lmthe52xgXCj9HlYIN4TgGDjBX0d3UewFNgwe4mfyLVSAgNBK9I15WR94ds3qEHidRsFZDR2l7e_mgWzVqn9RccT8FmNZGYKDRuGV352ThH0ZwdKPg--qNiua7Tjk312ZwMEEcTUQQ7GHsgKO5ensJyKkZfFjx_Kbv0F-jPqoFuv8DTfgvHwJfSmdHaefbqBNW9UoChrrgOdUiO6ApaWPkpLHFEqO9zk-vakHaRFOnhE4mMIULTCU6d5-OWBD5QR5tqw8YRfv_VV3p8_WLH8WduRFsHa_MBzCds9eE-UOi-vt0AYnCd5zvK3sLNCU3S7Zl7QRZFR-X2wLe3x9niSDR2UUWOkMRnpeh_v7vmDxYfc6MFszoVfm_wKKyY4leseFIjmDEVfujvAYx0dyiGh_kRgUWHbBZcdOFhA5s_u1h0HoCcDY19zT0ZXWm7Ka_hWWyid8PNfBnlo5yGa87DssSzL2pnKwFTZd5s86e9i6PfgIgjTlgbucsAXviYRKUwRkkuGJgzU9dF4UDFOPxAIpuwO8kMV21JkRdqARQvw24jx_JgmV8jGBzyAgSWtYPQJROD1rtQhoW5LhnbCdt6BM32h1Yvcqg5v73VnaM"
        ])->post(route('auth.logout'));

        $response
            ->assertStatus(200);







//        $user = factory(User::class)->create([
//            'email' => 'teste@lobbysys.com'
//        ]);
//
//        $token = $user->generateToken();
//        $headers = ['Authorization' => "Bearer $token"];
//
//        $response = $this->post(route('auth.logout'), [], $headers);
//
////        var_dump($response);
//
//        $response
//            ->assertStatus(200);

//        $user = User::find($user->id);
//
//        $this->assertEquals(null, $user->api_token);
    }



}
