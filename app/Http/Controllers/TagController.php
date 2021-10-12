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

    /**
     * render the page to add tag guidance
     */
    public function editTag($tag) {
        $user = null;

        $tag = Tag::where('name', $tag)->get();

        if (Auth::check())
        {
            $user = Auth::user();
        }

        return Inertia::render('EditTag', [
            'user' => $user,
            'page' => 'tags',
            'tag' => $tag
        ]);
    }

    /**
     * Save user contributed tag guidance
     */
    public function addGuidance(Request $request)
    {
        $data = $request->all();

        $guidance = $data['guidance'];

        $tag = Tag::find($data['tag'][0]['id']);
        $tag->guidance = $guidance; 

        $tag->save();

        $url = '/questions' . '/by-tag' . '/' . $tag->name;

        return redirect($url);
    }
}
