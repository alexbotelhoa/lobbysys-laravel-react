<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\AuthController;

class AuthTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Auth
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(AuthController::class, new AuthController());
    }

    /**
     * Testando a function Index do Controller Auth
     *
     * @test
     */
//    public function shoulBeTrueWhenFunctionIndexReturnView()
//    {
//        $auth = New AuthController();
//
//        $result = $auth->index();
//
//        $this->assertNotEmpty($result);
//    }
}
