<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            TagSeeder::class,
            UserSeeder::class,
            QuestionSeeder::class,
            QuestionTagSeeder::class,
            AnswerSeeder::class, 
            CommentSeeder::class
        ]);
    }
}
