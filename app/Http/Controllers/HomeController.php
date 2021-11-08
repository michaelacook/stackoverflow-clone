<?php

namespace App\Http\Controllers;

use App\Mail\ExampleMail;
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
            $user = Auth::user();
        }

        return Inertia::render('Home', [
            'user' =>  $user,
            'page' => "home"
        ]);
    }
}
