<?php

namespace Tests\Feature;

use App\Models\Queue;
use Tests\TestCase;
use App\Models\Visitor;
use App\Models\Room;
use App\Models\Arrival;

class ArrivalTest extends TestCase
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
        $response = $this->getJson(route('arrivals.index'));

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
        $arrival = [
            'visitor_id' => '',
            'room_id' => '',
            'checkIn' => ''
        ];

        $response = $this->post(route('arrivals.store'), $arrival);

        $response
            ->assertStatus(422)
            ->assertJson([
                "error" => [
                    "visitor_id" => ["The visitor id field is required."],
                    "room_id" => ["The room id field is required."],
                    "checkIn" => ["The check in field is required."]
                ]
            ]);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * mas o VISITANTE já estar na SALA
     * e retorna o STATUS '226'
     *
     * @test
     */
    public function shouldBeValidWhenVisitorAlreadExist()
    {
        $arrival = factory(Arrival::class)->create();

        $response = $this->post(route('arrivals.store'), $arrival->toArray());

        $response
            ->assertStatus(226)
            ->assertJson([ 'message' => 'Visitor already registered in the room' ]);
    }




    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * e retorna o STATUS '201'
     *
     * @test
     */
/*
    public function shouldBeValidWhenTheRouteStoreHasSuccess()
    {
        $arrival = factory(Arrival::class)->create();

//        $arrival = [
//            'visitor_id' => '1',
//            'room_id' => '1',
//            'checkIn' => '2000-01-01 10:01:01',
//        ];

//        var_dump(\GuzzleHttp\json_encode($arrival->toArray()));

        $response = $this->post(route('arrivals.store'), $arrival->toArray());

        $response
            ->assertStatus(201)
            ->assertJson([ 'message' => 'Visitor already registered in the room' ]);
    }
*/




    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * e retorna o STATUS '400'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteStoreHasBadRequest()
    {
        $arrival = [
            'visitor_id' => 'abc',
            'room_id' => 'abc',
            'checkIn' => 'abc',
        ];

        $response = $this->post(route('arrivals.store'), $arrival);

        $response
            ->assertStatus(400)
            ->assertJson([ 'message' => 'Arrival Bad Request' ]);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota DELETE (Destroy) forem APROVADAS
     * e retorna o STATUS '204'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteDeleteHasSuccess()
    {
        $arrival = factory(Arrival::class)->create();

        $response = $this->delete(route('arrivals.destroy', $arrival->id));

        $response->assertStatus(204);
    }
}
