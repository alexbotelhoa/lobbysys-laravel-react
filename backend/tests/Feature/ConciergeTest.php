<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\ConciergeController;

class ConciergeTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Concierge
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(ConciergeController::class, new ConciergeController());
    }

    /**
     * Testando a function Index do Controller Concierge
     *
     * @test
     */
//    public function shoulBeTrueWhenFunctionIndexReturnView()
//    {
//        $concierge = New ConciergeController();
//
//        $result = $concierge->index();
//
//        $this->assertNotEmpty($result);
//    }
}
