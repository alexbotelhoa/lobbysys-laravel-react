<?php

namespace Tests\Request;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Http\Controllers\ArrivalController;

class ArrivalControllerTest extends TestCase
{








    /**
     * Páginas atuais que precisam de autenticação para serem acessadas
     */
    private $paginaLogin = '/login';













    /**
     * Testando instanciamento do Controller Arrival
     *
     * @test
     */
    public function shoulBeTrueWhenInstanciateClass()
    {
        $this->assertInstanceOf(ArrivalController::class, new ArrivalController());
    }

    /**
     * Testando a function Index do Controller Arrival
     *
     * @test
     */
    public function testAutenticacaoRequeridaAoAcessar()
    {
        $response = $this->get(route('arrivals.index'));

        $response->assertStatus(302);
        $response->assertRedirect('/');
//        $response->assertSee("Backend LobbySys");

//        $response->assertViewIs('arrivals.index');
//        $response->assertViewHas('arrivals');
    }
}
