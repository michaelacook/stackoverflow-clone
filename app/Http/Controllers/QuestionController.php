<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Question;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

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

        $question->views++;
        $question->save();

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
     * Handle request to save a new question
     */
    public function post(Request $request)
    {
        $question = new Question;

        $question->title = $request->input('title');
        $question->slug = Str::slug($request->input('title'));
        $question->body = $request->input("body");
        $question->user_id = Auth::id();
        $question->save();

        $tags = $request->input('tags');

        foreach ($tags as $tag)
        {
            if (array_key_exists('id', $tag))
            {
                $question->tags()->attach($tag['id']);
            }
            else
            {
                $tag = Tag::create([
                    'name' => $tag['name']
                ]);

                $question->tags()->attach($tag->id);
            }
        }

        $url = "/questions" . "/" . $question->slug;

        return redirect($url);
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

    /**
     * Handle request to up-vote a question
     */
    public function upVote(Request $request)
    {
        $id = $request->input('id');
        $question = Question::find($id);
        $question->votes++;
        $question->save();

        $url = "/questions" . "/" . $question->slug;

        return redirect($url);
    }

    /**
     * Handle request to down-vote a question
     */
    public function downVote(Request $request)
    {
        $id = $request->input('id');
        $question = Question::find($id);
        $question->votes--;
        $question->save();

        $url = "/questions" . "/" . $question->slug;

        return redirect($url);
    }
}
