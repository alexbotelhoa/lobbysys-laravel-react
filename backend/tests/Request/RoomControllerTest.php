<?php

namespace Tests\Request;

use Tests\TestCase;
use App\Http\Controllers\RoomController;

class RoomControllerTest extends TestCase
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
