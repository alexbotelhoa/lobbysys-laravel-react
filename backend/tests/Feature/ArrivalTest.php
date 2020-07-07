<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Visitor;
use App\Models\Room;
use App\Models\Arrival;

class ArrivalTest extends TestCase
{
    /**
     * Deve ser VÁLIDO quando
     * a ROTA GET (Index)
     * for CARREGADA com status 200
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
     * as VALIDAÇÕES da rota POST (Store)
     * forem NEGADAS com status 422
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteStoreHasDenied()
    {
        $arrival = [
            'visitor_id' => '',
            'room_id' => '',
            'checkIn' => ''
        ];

        $response = $this->postJson(route('arrivals.store'), $arrival);

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
     * as VALIDAÇÕES da rota POST (Store)
     * forem APROVADAS
     * mas o VISITANTE já estar na SALA
     * e retorna o status 201
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteStoreHasSuccess()
    {
//        $visitor = factory(Visitor::class)->create();
//
//        $room = factory(Room::class)->create();
//
//        $arrival = [
//            'visitor_id' => $visitor->id,
//            'room_id' => $room->id,
//            'checkIn' => $this->faker->date(),
//        ];



//        $arrival = factory(Arrival::class, function($fake) {
//            return [
//                'visitor_id' => factory(Visitor::class),
//                'room_id' => factory(Room::class),
//                'checkIn' => $this->faker->date(),
//            ];
//        });

//        $response = $this->actingAs($arrival)->post(route('arrivals.store')

        $arrival = factory(Arrival::class)->create();

        $response = $this->postJson(route('arrivals.store'), $arrival);

        $response
            ->assertStatus(201);

//            ->assertJsonStructure([
//                'visitor_id',
//                'room_id',
//                'checkIn',
//                'updated_at',
//                'created_at',
//                'id',
//        ]);
    }


    /**
     * Deve ser válido quando a rota POST (Store) for carregada
     *
     * @test
     */
//    public function shouldBeValidWhenHasValidationSuccess()
//    {
//        $arrival = [
//            'visitor_id' => '123',
//            'room_id' => '123',
//            'checkIn' => '2000-01-01',
//        ];
//
//        $this->post(route('arrivals.store'), $arrival)
//            ->assertStatus(201)
//            ->assertJsonStructure([
//                "id",
//                "visitor_id",
//                "room_id",
//                "checkIn",
//                "updated_at",
//                "created_at",
//        ]);
//    }



//    /**
//     * Deve ser válido quando a rota POST (Store) for carregada
//     *
//     * @test
//     */
//    public function shouldBeValidWhenTheRouteStoreHasCharge()
//    {
//        $arrival = [
//            'visitor_id' => '123',
//            'room_id' => '123',
//            'checkIn' => '',
//        ];
//
//        $this->post(route('arrivals.store'), $data)
//            ->assertStatus(201)
//            ->assertJson($data);
//    }
}
