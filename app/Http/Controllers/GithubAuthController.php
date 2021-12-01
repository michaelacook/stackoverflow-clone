<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GithubAuthController extends Controller
{
    /**
     * Redirect user to Github to confirm identity
     */
    public function redirect()
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * Authenticate a user using their Github credentials 
     * 
     * If the user does not already exist, create a new user
     */
    public function authenticate()
    {
        $user = Socialite::driver('github')->user();

        $user = User::firstOrCreate([
                'email' => $user->email
            ], 
            [
                'name' => $user->name, 
                'password' => Hash::make(Str::random(12)),
                'profileUrl' => $user->avatar
            ]
        );

        $user->markEmailAsVerified();
        $user->save();

        Auth::login($user, true);

        return redirect('/');
    }
}
