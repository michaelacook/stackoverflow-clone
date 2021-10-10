<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Tag;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Render the main tags page
     */
    public function index()
    {
        $user = null;

        if (Auth::check())
        {
            $user = Auth::user();
        }

        $tags = Tag::with('questions')->get();

        return Inertia::render('Tags', [
            'tags' => $tags,
            'user' => $user, 
            'page' => 'tags'
        ]);
    }
}
