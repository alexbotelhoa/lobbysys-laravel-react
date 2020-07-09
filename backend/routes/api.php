<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
 * Rotas do Sistema de Controle de Portaria - LobbySys v1.0
 */

// Routas de Controle de Autenticação
Route::post('/login', 'AuthController@login')->name('auth.login');

Route::group(['middleware' => 'auth:api'], function () {
    // Routas de Controle de Autenticação
    Route::post('/logout', 'AuthController@logout')->name('auth.logout');

    // Routas de Controle de Usuários
    Route::get('/users', 'UserController@index');
    Route::post('/users', 'UserController@store');
    Route::delete('/users/{id}', 'UserController@destroy');

    // Routas de Controle de Visitantes
    Route::get('/visitors', 'VisitorController@index');
    Route::post('/visitors', 'VisitorController@store');
    Route::delete('/visitors/{id}', 'VisitorController@destroy');

    // Routas de Controle de Salas ou Apartamentos
    Route::get('/rooms', 'RoomController@index');
    Route::post('/rooms', 'RoomController@store');
    Route::delete('/rooms/{id}', 'RoomController@destroy');

    // Routas de Controle da Fila de Espera
    Route::get('/queues', 'QueueController@index');
    Route::post('/queues', 'QueueController@store');
    Route::delete('/queues/{id}', 'QueueController@destroy');

    // Routas de Controle do Registro de Visitantes
    Route::get('/arrivals', 'ArrivalController@index')->name('arrivals.index');
    Route::post('/arrivals', 'ArrivalController@store')->name('arrivals.store');
    Route::delete('/arrivals/{id}', 'ArrivalController@destroy')->name('arrivals.destroy');

    // Routas de Controle do Histórico dos Registros de Portaria
    Route::post('/concierges', 'ConciergeController@store')->name('concierges.store');
    Route::get('/concierges', 'ConciergeController@filter')->name('concierges.filter');
});
