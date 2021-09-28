<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Render the account details page
     */
    public function index()
    {
        $user = null;

        if (Auth::check())
        {
            $user = $user = User::with([
                'questions', 
                'answers.questions', 
                'comments'
            ])
            ->find(Auth::id());
        }

        return Inertia::render('Account', [
            'user' => $user,
            'page' => 'users'
        ]);
    }
}
