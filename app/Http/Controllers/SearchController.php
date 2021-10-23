<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Question;

class SearchController extends Controller
{
    /**
     * Handle control for search queries
     */
    public function index(Request $request)
    {
        $query = $request->query('q');

        $questions = Question::with(['answers', 'tags', 'user'])
            ->where('title', 'like', '%' . $query . '%')
            ->orderBy('created_at', 'desc')
            ->get();

        $count = $questions->count();

        return Inertia::render('SearchResults', [
            'page' => 'questions',
            'questions' => $questions,
            'count' => $count,
            'query' => $query,
        ]);
    }
}
