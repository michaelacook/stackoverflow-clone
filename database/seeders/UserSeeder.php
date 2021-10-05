<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Michael Cook',
            'email' => 'mcook0775@gmail.com',
            'isAdmin' => 1,
            'isModerator' => 1,
            'password' => Hash::make(env('USER_PASSWORD')),
            'created_at' => date('Y/m/d'),
            'updated_at' => date('Y/m/d')
        ]);

        DB::table('users')->insert([
            'name' => 'Jane Doe',
            'email' => 'jane@doe.ca',
            'password' => Hash::make('whocares123'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
