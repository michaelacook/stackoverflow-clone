<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['user', 'moderator', 'administrator'];

        foreach ($roles as $role)
        {
            DB::table('roles')->insert([
                'title' => $role,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
