<?php

use Illuminate\Database\Seeder;

class ConciergeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Concierge::class, 50)->create();
    }
}