<?php

namespace Tests\Request;

use Tests\TestCase;
use App\Http\Controllers\QueueController;

class QueueControllerTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Queue
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(QueueController::class, new QueueController());
    }

    /**
     * Testando a function Index do Controller Queue
     *
     * @test
     */
//    public function shoulBeTrueWhenFunctionIndexReturnView()
//    {
//        $queue = New QueueController();
//
//        $result = $queue->index();
//
//        $this->assertNotEmpty($result);
//    }
}
