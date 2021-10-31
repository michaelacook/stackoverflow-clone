<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * render the users page
     */
    public function index()
    {
        return Inertia::render('Users', [
            'page' => 'users',
            'users' => User::paginate(36)
        ]);
    }
}
