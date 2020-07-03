<?php

namespace Tests\Request;

use Tests\TestCase;
use App\Http\Controllers\VisitorController;

class VisitorControllerTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Visitor
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(VisitorController::class, new VisitorController());
    }

    /**
     * Testando a function Index do Controller Visitor
     *
     * @test
     */
//    public function shoulBeTrueWhenFunctionIndexReturnView()
//    {
//        $visitor = New VisitorController();
//
//        $result = $visitor->index();
//
//        $this->assertNotEmpty($result);
//    }
}
