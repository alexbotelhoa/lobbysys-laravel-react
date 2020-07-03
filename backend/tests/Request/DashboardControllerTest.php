<?php

namespace Tests\Request;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Http\Controllers\DashboardController;

class DashboardControllerTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Dashboard
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(DashboardController::class, new DashboardController());
    }

    /**
     * Testando a function Index do Controller Dashboard
     *
     * @test
     */
    public function shoulBeTrueWhenFunctionIndexReturnView()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertViewIs('welcome');
    }
}
