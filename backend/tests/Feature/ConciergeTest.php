<?php

namespace Tests\Feature;

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
    public function shouldBeValidWhenTheRouteLoginHasDeniedValidator()
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
                    ]
                ]
            ]);
    }















}
