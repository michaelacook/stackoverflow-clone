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
        for ($i = 1; $i < 102; $i++)
        {
            $randInt = random_int(2, 5);

            for ($j = 1; $j < $randInt; $j++)
            {
                DB::table('question_tag')->insert([
                    'question_id' => $i, 
                    'tag_id' => random_int(1, 28)
                ]);
            }
        }
    }
}
