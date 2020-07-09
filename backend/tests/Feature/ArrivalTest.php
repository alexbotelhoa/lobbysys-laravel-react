<?php

namespace Tests\Feature;

use App\Models\Arrival;
use App\Models\Queue;
use App\Models\Room;
use App\Models\Visitor;
use Tests\TestCase;

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
            'visitor_id' => "",
            'room_id' => "",
            'checkIn' => "",
        ];

        $response = $this->post(route('arrivals.store'), $arrival);

        $response
            ->assertStatus(422)
            ->assertJson([
                "error" => [
                    "visitor_id" => [
                        "The visitor id field is required."
                    ],
                    "room_id" => [
                        "The room id field is required."
                    ],
                    "checkIn" => [
                        "The check in field is required."
                    ]
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

        $data = [
            "visitor_id" => intval($arrival->visitor_id),
            "room_id" => intval($arrival->room_id),
            "checkIn" => $arrival->checkIn,
        ];

        $response = $this->post(route('arrivals.store'), $data);

        $response->assertStatus(226);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * mas o VISITANTE já estar na SALA
     * e retorna o STATUS '226'
     *
     * @test
     */
    public function shouldBeValidWhenLimitOfVisitorsInTheRoomExceeded()
    {
        $visitor = factory(Visitor::class, 4)->create();

        $room = factory(Room::class)->create();

        $arrival = factory(Arrival::class)->create([
            "visitor_id" => 1,
            "room_id" => $room->id,
            "checkIn" => "2000-01-01 00:00:00",
        ]);

        $arrival = factory(Arrival::class)->create([
            "visitor_id" => 2,
            "room_id" => $room->id,
            "checkIn" => "2000-01-01 00:00:00",
        ]);

        $arrival = factory(Arrival::class)->create([
            "visitor_id" => 3,
            "room_id" => $room->id,
            "checkIn" => "2000-01-01 00:00:00",
        ]);

        $data = [
            "visitor_id" => 4,
            "room_id" => $room->id,
            "checkIn" => "2000-01-01 00:00:00",
        ];

        $response = $this->post(route('arrivals.store'), $data);

        $response->assertStatus(203);
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

        $arrival = [
            "visitor_id" => $visitor->id,
            "room_id" => $room->id,
            "checkIn" => "2000-01-01 00:00:00",
        ];

        $response = $this->post(route('arrivals.store'), $arrival);

        $response->assertStatus(201);
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
        $arrival = [
            "id" => 1,
        ];

        $response = $this->delete(route('arrivals.destroy', $arrival));

        $response->assertStatus(404);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota DELETE (Destroy) forem APROVADAS
     * mas o registro NÃO é encontrado
     * e retorna o STATUS '404'
     *
     * @test
     */
    public function shouldBeValidWhenTheVisitorDoesCheckOut()
    {
        $visitor = factory(Visitor::class)->create();

        $room = factory(Room::class)->create();

        $queue = factory(Queue::class)->create([
            'visitor_id' => 1,
            'room_id' => $room->id,
        ]);

        $arrival = factory(Arrival::class)->create([
            'visitor_id' => 1,
            'room_id' => $room->id,
        ]);

        $data = [
            "id" => $arrival->id,
        ];

        $response = $this->delete(route('arrivals.destroy', $data));

        $response->assertStatus(201);
    }









    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * e retorna o STATUS '201'
     *
     * @test
     */
//    public function shouldBeValidWhenTheRouteStoreHasSuccess()
//    {
//        $arrival = factory(Arrival::class)->create();
//
//        $arrival = [
//            'visitor_id' => '1',
//            'room_id' => '1',
//            'checkIn' => '2000-01-01 10:01:01',
//        ];
//
//        var_dump(\GuzzleHttp\json_encode($arrival->toArray()));
//
//        $response = $this->post(route('arrivals.store'), $arrival->toArray());
//
//        $response
//            ->assertStatus(201)
//            ->assertJson([ 'message' => 'Visitor already registered in the room' ]);
//    }











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
