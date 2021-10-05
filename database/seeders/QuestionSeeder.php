<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questions')->insert([
            'user_id' => 1,
            'title' => "A test question title?",
            'body' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis scelerisque lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam ut justo at nunc feugiat suscipit. Aliquam erat justo, ornare eget lorem in, convallis faucibus sapien. Curabitur et sapien sed velit vehicula vehicula non sit amet ex. Sed finibus in turpis vitae tempus. In non metus odio. In ut massa at est auctor euismod. Etiam at ex a lorem consequat pharetra et in nunc. Donec id risus vehicula, ultrices sem ac, vestibulum ligula. Nulla et augue egestas risus elementum vehicula eu sed lacus. Aliquam enim purus, varius ac cursus vel, sodales vitae dolor. Nam euismod sem eget mauris sagittis, vel efficitur ante facilisis.

Donec auctor a nisi ac tincidunt. Morbi augue libero, condimentum quis ante a, ullamcorper aliquam orci. Morbi in tincidunt ex. Ut sodales sagittis lectus id auctor. Ut in nisi fringilla quam molestie congue. Sed fringilla lectus ac eros rutrum molestie. Ut suscipit porttitor velit, et sodales felis scelerisque vel. Nam ultricies, massa nec vulputate maximus, urna lorem dapibus justo, ut luctus lectus lorem in nisi.

Donec varius et lectus ut placerat. Aliquam convallis lacus eu fringilla congue. Vivamus sed pharetra turpis, nec imperdiet libero. Aenean ultrices laoreet neque, vitae condimentum lorem maximus eu. Donec elementum augue ac turpis luctus elementum. Duis tempor est eleifend turpis interdum, at scelerisque lectus ultricies. Praesent commodo orci suscipit sapien consectetur facilisis. Cras non velit imperdiet, convallis ante eget, convallis tortor. Curabitur ante justo, maximus sed mattis eu, luctus id erat. Nam nec nibh eu leo hendrerit molestie laoreet id est. Quisque ac egestas ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            'slug' => Str::slug("A test question title?"),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
