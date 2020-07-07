<?php

use Illuminate\Database\Seeder;

class ArrivalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Arrival::class, 30)->create();
    }
}