<?php

namespace Tests\Feature;

use App\Exceptions\Handler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Contracts\Container\Container;
use Illuminate\Session\TokenMismatchException;
use Tests\TestCase;

class HandlerTest extends TestCase
{
    /**
     * Testando instanciamento do Controller Room
     *
     * @test
     */
    public function reportTokenMismatch()
    {
        $request = $this->createMock(Request::class);
        $instance = new Handler($this->createMock(Container::class));
        $class    = new \ReflectionClass(Handler::class);

        $method   = $class->getMethod('report');
        $method->setAccessible(true);
        $expectedInstance = Response::class;

        $this->assertInstanceOf($expectedInstance, $method->invokeArgs($instance, [$this->createMock(TokenMismatchException::class)]));
    }

    /**
     * Testando instanciamento do Controller Room
     *
     * @test
     */
    public function renderTokenMismatch()
    {
        $request = $this->createMock(Request::class);
        $instance = new Handler($this->createMock(Container::class));
        $class    = new \ReflectionClass(Handler::class);

        $method   = $class->getMethod('render');
        $method->setAccessible(true);
        $expectedInstance = Response::class;

        $this->assertInstanceOf($expectedInstance, $method->invokeArgs($instance, [$request, $this->createMock(TokenMismatchException::class)]));
    }
}
