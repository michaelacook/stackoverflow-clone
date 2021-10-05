<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            'body' => 'Thanks for your answer!',
            'user_id' => 1,
            'answer_id' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
