<?php

namespace Tests\Request;

use PHPUnit\Framework\TestCase;
use App\Http\Controllers\AuthController;

class AuthTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $login = new AuthController();

        $login->login([
            "email" => "alexbotelho1@hotmail.com",
            "password" => "12345678",
        ]);

        $this->assertCount(1, $login);
//        $stack = [];
//        $this->assertEquals(0, count($stack));
    }
}
