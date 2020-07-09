<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        $auth = [
            'email' => "",
            'password' => "",
        ];

        $response = $this->post(route('auth.login'), $auth);

        $response
            ->assertStatus(422)
            ->assertJson([
                "errors" => [
                    "email" => [
                        "The email field is required."
                    ],
                    "password" => [
                        "The password field is required."
                    ]
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
        $user = factory(User::class)->create([
            'email' => 'teste@lobbysys.com',
            'password' => bcrypt('12345678')
        ]);

        $auth = [
            'email' => 'teste@lobbysys.com',
            'password' => '12345678'
        ];

        Auth::attempt(['email' => $auth['email'], 'password' => $auth['password']]);

        $data = Auth::user();

        $header['name'] = $data->name;
        $header['token'] =  $data->createToken('MyApp')->accessToken;

        $response = $this->withHeaders($header)->post(route('auth.logout'));

        $response->assertStatus(200);
    }









}
