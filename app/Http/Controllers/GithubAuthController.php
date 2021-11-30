<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GithubAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function authenticate()
    {
        $user = Socialite::driver('github')->user();

        $user = User::firstOrCreate([
                'email' => $user->email
            ], 
            [
                'name' => $user->name, 
                'password' => Hash::make(Str::random(12)),
                'profileUrl' => $user->avatar,
                'email_verified_at' => now()
            ]
        );

        Auth::login($user, true);

        return redirect('/');
    }
}
