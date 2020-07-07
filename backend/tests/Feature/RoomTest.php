<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\RoomController;

class RoomTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Room
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(RoomController::class, new RoomController());
    }

    /**
     * Testando a function Index do Controller Room
     *
     * @test
     */
//    public function shoulBeTrueWhenFunctionIndexReturnView()
//    {
//        $room = New RoomController();
//
//        $result = $room->index();
//
//        $this->assertNotEmpty($result);
//    }
}
