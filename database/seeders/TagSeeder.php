<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            'javascript',
            'typescript',
            'node',
            'express',
            'ejs',
            'nestjs',
            'sequelize',
            'typeorm',
            'postgresql',
            'mysql',
            'php',
            'laravel',
            'blade',
            'eloquent',
            'linux',
            'inertiajs',
            'react',
            'vue',
            'angular'
        ];

        foreach ($tags as $tag)
        {
            DB::table('tags')->insert([
                'name' => $tag,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
