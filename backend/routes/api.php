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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/*
 * Rotas do Sistema Visitor V1
 */

// Criação de Visitantes
Route::resource('visitors', 'VisitorController');

// Criação de Salas ou Apartamentos
Route::resource('rooms', 'RoomController');

// Criação da Fila de Espera
Route::get('/queues', 'QueueController@index');
Route::post('/queues', 'QueueController@store');
Route::delete('/queues/{id}', 'QueueController@destroy');

// Criação dos Registros de Entrada de Visitantes
Route::get('/arrivals', 'ArrivalController@index');
Route::post('/arrivals', 'ArrivalController@store');
Route::get('/arrivals/{id}', 'ArrivalController@show');
Route::delete('/arrivals/{id}', 'ArrivalController@destroy');

// Criação do Histórico dos Registros de Portaria
Route::get('/concierges', 'ConciergeController@index');
Route::post('/concierges', 'ConciergeController@store');
Route::get('/concierges/{id}', 'ConciergeController@show');
