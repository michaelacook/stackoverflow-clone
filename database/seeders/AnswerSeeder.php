<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('answers')->insert([
            'body' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium fringilla lectus a aliquet. Morbi convallis nisi vel nunc commodo sollicitudin. Donec augue nulla, mattis sed sollicitudin at, fringilla vitae sapien. Pellentesque nec lorem est. Phasellus varius, tellus vitae euismod egestas, arcu felis lacinia odio, a tristique nunc odio sed enim. Maecenas lacinia molestie enim, a laoreet ligula porttitor interdum. Aenean hendrerit nisl urna. Maecenas pellentesque mattis augue, et mollis diam. Nam varius odio et sapien bibendum volutpat. Nullam vel metus nisl. Duis nec mattis quam, eu accumsan diam. Proin bibendum molestie velit, sit amet gravida neque vulputate ut.',
            'user_id' => 2,
            'question_id' => 1,
            'created_at' => date('Y/m/d'),
            'updated_at' => date('Y/m/d')
        ]);
    }
}
