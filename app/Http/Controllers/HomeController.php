<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Render the home page
     */
    public function index()
    {
        $user = null;

        if (Auth::check()) 
        {
            $user = User::with(['questions', 'answers', 'comments'])
                ->find(Auth::id());
        }

        return Inertia::render('Home', [
            'user' =>  $user
        ]);
    }
}
