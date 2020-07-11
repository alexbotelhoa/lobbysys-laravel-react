<?php

namespace Tests\Feature;

use App\Models\Visitor;
use Tests\TestCase;

class VisitorTest extends TestCase
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
        $response = $this->getJson(route('visitors.index'));

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
        $visitor = [
            'name' => "",
            'cpf' => "",
        ];

        $response = $this->post(route('visitors.store'), $visitor);

        $response
            ->assertStatus(422)
            ->assertJson([
                "error" => [
                    "name" => [
                        "The name field is required."
                    ],
                    "cpf" => [
                        "The cpf field is required."
                    ]
                ]
            ]);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * é o REGISTRO já se ENCONTRA cadastrado
     * e retornar o STATUS '226'
     *
     * @test
     */
    public function shouldBeValidWhenTheRegisterAlreadyExists()
    {
        $visitor = factory(Visitor::class)->create();

        $data = [
            'name' => "Fulano de Tal",
            'cpf' => $visitor->cpf,
        ];

        $response = $this->post(route('visitors.store'), $data);

        $response
            ->assertStatus(226);
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
        $visitor = [
            'name' => "Fulano de Tal",
            'cpf' => "999.999.999-99",
            'birth' => "2000-01-01",
            'email' => "teste@lobbysys.com",
        ];

        $response = $this->post(route('visitors.store'), $visitor);

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
        $visitor = [
            "id" => 1,
        ];

        $response = $this->delete(route('visitors.destroy', $visitor));

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
        $visitor = factory(Visitor::class)->create();

        $response = $this->delete(route('visitors.destroy', $visitor->id));

        $response->assertStatus(204);
    }
}
