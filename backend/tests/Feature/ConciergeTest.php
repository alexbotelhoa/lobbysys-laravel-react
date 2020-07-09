<?php

namespace Tests\Feature;

use App\Models\Concierge;
use App\Models\Room;
use App\Models\Visitor;
use Tests\TestCase;
use App\Http\Controllers\ConciergeController;

class ConciergeTest extends TestCase
{
    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem NEGADAS
     * e retornar o STATUS '422'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteConciergeStoreHasDeniedValidator()
    {
        $concierge = [
            "visitor_id" => "",
            "room_id" => "",
            "checkIn" => "",
            "checkOut" => "",
        ];

        $response = $this->post(route('concierges.store'), $concierge);

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
                    ],
                    "checkOut" => [
                        "The check out field is required."
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

        $concierge = [
            "visitor_id" => $visitor->id,
            "room_id" => $room->id,
            "checkIn" => "2000-01-01 00:00:00",
            "checkOut" => "2000-01-01 00:00:00",
        ];

        $response = $this->post(route('concierges.store'), $concierge);

        $response
            ->assertStatus(201);
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
        $concierge = [
            "visitor_id" => 1,
            "room_id" => 1,
            "checkIn" => "2000-01-01 00:00:00",
            "checkOut" => "2000-01-01 00:00:00",
        ];

        $response = $this->post(route('concierges.store'), $concierge);

        $response
            ->assertStatus(400);
    }

    /**
     * Deve ser VÁLIDO quando
     * as VALIDAÇÕES da rota POST (Store) forem APROVADAS
     * e retornar o STATUS '200'
     *
     * @test
     */
    public function shouldBeValidWhenTheRouteFilterHasSuccessValidator()
    {
        $concierge = factory(Concierge::class)->create();

        $filter = [
            "visitor" => 1,
            "room" => 1,
        ];

        $response = $this->get(route('concierges.filter', $filter));

        $response
            ->assertStatus(200);
    }
}
