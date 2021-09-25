<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i < 5; $i++)
        {
            DB::table('question_tag')->insert([
                'question_id' => 1, 
                'tag_id' => $i
            ]);
        }
    }
}
