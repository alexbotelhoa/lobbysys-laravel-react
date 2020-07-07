<?php

namespace Tests\Feature;

use Tests\TestCase;
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
        $response = $this->getJson('/api/arrivals');
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
            'visitor_id' => "",
            'room_id' => "",
            'checkIn' => ""
        ];

        $this->json('POST', 'api/arrivals', $arrival)
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
     * e o VISITANTE já estar VISITANDO
     *
     * @test
     */
//    public function shouldBeValidWhenTheRouteStoreHasApproved()
//    {
//        $arrival = [
//            'visitor_id' => 10,
//            'room_id' => 10,
//            'checkIn' => "2000-01-01",
//        ];
//
//        $this->json('POST', 'api/arrivals', $arrival)
//            ->assertStatus(422)
//            ->assertJson([
//                "errors" => [
//                    "visitor_id" => ["The visitor id field is required."],
//                    "room_id" => ["The room id field is required."],
//                    "checkIn" => ["The check id field is required."],
//                ]
//            ]);
//    }


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
