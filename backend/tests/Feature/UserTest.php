<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * Deve ser VÁLIDO quando
     * a ROTA GET (Index) for CARREGADA
     * e retornar o STATUS '200'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteIndexHasCharge()
    {
        $response = $this->getJson(route('users.index'));

        $response->assertStatus(200);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem NEGADAS
     * e retornar o STATUS '422'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteStoreHasDeniedValidator()
    {
        $users = [
            'name' => "",
            'email' => "",
            'password' => "",
            'c_password' => "",
        ];

        $response = $this->post(route('users.store'), $users);

        $response
            ->assertStatus(422)
            ->assertJson([
                "error" => [
                    "name" => [
                        "The name field is required."
                    ],
                    "email" => [
                        "The email field is required."
                    ],
                    "password" => [
                        "The password field is required."
                    ],
                    "c_password" => [
                        "The c password field is required."
                    ]
                ]
            ]);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * é o REGISTRO foi criado com SUCESSO
     * e retornar o STATUS '201'
     *
     * @test
     */
    public function shouldBeValidWhenTheRegisterHasCreatedWithSuccess()
    {
        $user = [
            'name' => "Fulano de Tal",
            'email' => "teste@lobbysys.com",
            'password' => "12345678",
            'c_password' => "12345678",
        ];

        $response = $this->post(route('users.store'), $user);

        $response
            ->assertStatus(201);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota DELETE (Destroy) forem APROVADAS
     * mas o registro NÃO é encontrado
     * e retorna o STATUS '404'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteDeleteHasDenied()
    {
        $user = [
            "id" => 1,
        ];

        $response = $this->delete(route('users.destroy', $user));

        $response->assertStatus(404);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota DELETE (Destroy) forem APROVADAS
     * é o REGISTRO foi deletado com SUCESSO
     * e retorna o STATUS '204'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteDeleteHasSuccess()
    {
        $user = factory(User::class)->create();

        $response = $this->delete(route('users.destroy', $user->id));

        $response->assertStatus(204);
    }
}
