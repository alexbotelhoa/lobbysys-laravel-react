<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\UserController;

class UserTest extends TestCase
{
    /**
     * Testando instanciamento do Controller User
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(UserController::class, new UserController());
    }

    /**
     * Testando a function Index do Controller User
     *
     * @test
     */
//    public function shoulBeTrueWhenFunctionIndexReturnView()
//    {
//        $user = New UserController();
//
//        $result = $user->index();
//
//        $this->assertNotEmpty($result);
//    }
}
