<?php

namespace Tests\Feature;

use App\Models\Room;
use Tests\TestCase;

class RoomTest extends TestCase
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
        $response = $this->getJson(route('rooms.index'));

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
        $room = [
            'nrRoom' => "",
        ];

        $response = $this->post(route('rooms.store'), $room);

        $response
            ->assertStatus(422)
            ->assertJson([
                "error" => [
                    "nrRoom" => [
                        "The nr room field is required."
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
        $room = factory(Room::class)->create();

        $data = [
            "nrRoom" => $room->nrRoom,
        ];

        $response = $this->post(route('rooms.store'), $data);

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
        $room = [
            "nrRoom" => "1",
        ];

        $response = $this->post(route('rooms.store'), $room);

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
        $room = [
            "id" => 1,
        ];

        $response = $this->delete(route('rooms.destroy', $room));

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
        $room = factory(Room::class)->create();

        $response = $this->delete(route('rooms.destroy', $room->id));

        $response->assertStatus(204);
    }
}
