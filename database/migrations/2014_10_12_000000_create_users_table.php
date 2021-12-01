<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('profileUrl')->default('/default-profile.png');
            $table->boolean('isAdmin')->default(0);
            $table->boolean('isModerator')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('githubToken')->nullable();
            $table->string('facebookToken')->nullable();
            $table->string('googleToken')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
