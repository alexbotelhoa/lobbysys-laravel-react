<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Arrival;
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

$factory->define(Arrival::class, function (Faker $faker) {
    return [
        'visitor_id' => $faker->numberBetween($min = 1000, $max = 9999),
        'room_id' => $faker->numberBetween($min = 1000, $max = 9999),
        'checkIn' => $faker->date(),
    ];
});
