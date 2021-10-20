<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Question;

class SearchController extends Controller
{
    /**
     * Handle control for search queries
     */
    public function index(Request $request)
    {
        $user = null;
        $watched = null;

        if (Auth::check())
        {
            $user = Auth::user();
            $watched = User::find(Auth::id())->tags()->pluck('name');
        }

        $query = $request->query('q');

        $questions = Question::with(['answers', 'tags', 'user'])
            ->where('title', 'like', '%' . $query . '%')
            ->orderBy('created_at', 'desc')
            ->get();

        $count = $questions->count();

        return Inertia::render('SearchResults', [
            'user' => $user, 
            'page' => 'questions',
            'questions' => $questions,
            'count' => $count,
            'query' => $query,
            'watched' => $watched
        ]);
    }
}