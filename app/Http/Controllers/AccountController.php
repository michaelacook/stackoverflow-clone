<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Render the account details page
     */
    public function index()
    {
        return Inertia::render('Account', [
            'page' => 'users'
        ]);
    }
}
