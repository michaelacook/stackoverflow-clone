<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Question;
use App\Models\Tag;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * View a question
     */
    public function index(Question $question)
    {
        $user = null;

        if (Auth::check())
        {
            $user = Auth::user();
        }

        return Inertia::render('Question', [
            'user' => $user,
            'page' => 'questions',
            'question' => $question,
            'tags' => $question->tags()->get()
        ]);
    }

    /**
     * Render the new question page
     */
    public function create()
    {
        $user = null;

        if (Auth::check())
        {
            $user = Auth::user();
        }

        return Inertia::render('NewQuestion', [
            'user' => $user,
            'page' => 'questions',
            'tagSuggestions' => Tag::all()
        ]);
    }

    /**
     * Render page showing all questions
     */
    public function all()
    {
        $user = null;

        if (Auth::check())
        {
            $user = Auth::user();
        }

        $questions = Question::all();

        return Inertia::render('Questions', [
            'user' => $user,
            'page' => 'questions',
            'questions' => $questions
        ]);
    }
}
