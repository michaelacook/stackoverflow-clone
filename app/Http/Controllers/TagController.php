<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Tag;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Render the main tags page
     */
    public function index()
    {
        $tags = Tag::with('questions')->paginate(20);

        return Inertia::render('Tags', [
            'tags' => $tags,
            'page' => 'tags'
        ]);
    }

    /**
     * render the page to add tag guidance
     */
    public function editTag($tag) {
        $tag = Tag::where('name', $tag)->get();

        return Inertia::render('EditTag', [
            'page' => 'tags',
            'tag' => $tag
        ]);
    }

    /**
     * Add a tag to a user's watched tags
     */
    public function watchTag(Request $request)
    {
        $tag = $request->input('tag');

        $user = User::find(Auth::user()->id);

        $user->tags()->attach($tag['id']);

        return redirect($request->input('redirect'));
    }

    /**
     * Remove a tag to a user's watched tags
     */
    public function unwatchTag(Request $request)
    {
        $tag = $request->input('tag');

        $user = User::find(Auth::user()->id);

        $user->tags()->detach($tag['id']);

        return redirect($request->input('redirect'));
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
