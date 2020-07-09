<?php

namespace Tests\Feature;

use App\Models\Queue;
use App\Models\Visitor;
use App\Models\Room;
use Tests\TestCase;

class QueueTest extends TestCase
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
        $response = $this->getJson(route('queues.index'));

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
        $queue = [
            'visitor_id' => "",
            'room_id' => ""
        ];

        $response = $this->post(route('queues.store'), $queue);

        $response
            ->assertStatus(422)
            ->assertJson([
                "error" => [
                    "visitor_id" => [
                        "The visitor id field is required."
                    ],
                    "room_id" => [
                        "The room id field is required."
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
        $visitor = factory(Visitor::class)->create();

        $room = factory(Room::class)->create();

        $queue = [
            "visitor_id" => $visitor->id,
            "room_id" => $room->id,
        ];

        $response = $this->post(route('queues.store'), $queue);

        $response->assertStatus(201);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * mas a CRIAÇÃO do registro é NEGADA
     * e retornar o STATUS '400'
     *
     * @test
     */
    public function shouldBeValidWhenTheRegisterCreationHasDenied()
    {
        $queue = [
            "visitor_id" => 1,
            "room_id" => 1,
        ];

        $response = $this->post(route('queues.store'), $queue);

        $response->assertStatus(400);
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
        $queue = [
            "id" => 1,
        ];

        $response = $this->delete(route('queues.destroy', $queue));

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
        $queue = factory(Queue::class)->create();

        $response = $this->delete(route('queues.destroy', $queue->id));

        $response->assertStatus(204);
    }
}
