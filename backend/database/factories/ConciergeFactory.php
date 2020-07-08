<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Concierge;
use App\Models\Visitor;
use App\Models\Room;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Concierge::class, function (Faker $faker) {
    return [
        'visitor_id' => factory(Visitor::class),
        'room_id' => factory(Room::class),
        'checkIn' => now(),
        'checkOut' => now(),
    ];
});
