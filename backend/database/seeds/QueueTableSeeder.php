<?php

use Illuminate\Database\Seeder;

class QueueTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Queue::class, 20)->create();
    }
}