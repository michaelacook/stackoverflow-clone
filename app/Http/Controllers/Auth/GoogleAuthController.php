<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect user to google to confirm identity
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Authenticate a user using their google credentials 
     * 
     * If the user does not already exist, create a new user
     */
    public function authenticate()
    {
        $user = Socialite::driver('google')->user();

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
