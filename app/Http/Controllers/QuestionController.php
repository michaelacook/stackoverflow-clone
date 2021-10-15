<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use App\Models\User;
use App\Models\Tag;
use App\Models\Question;
use App\Models\Comment;
use App\Models\Answer;

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

        $answers = Answer::with(['comments.user', 'user.answers'])
            ->where('question_id', $question->id)
            ->get();

        $questionComments = Comment::with('user')
            ->where('question_id', $question->id)
            ->get();

        return Inertia::render('Question', [
            'user' => $user,
            'page' => 'questions',
            'question' => $question,
            'tags' => $question->tags()->get(),
            'answers' => $answers,
            'comments' => $questionComments
        ]);
    }

    /**
     * retrieve questions by tag name
     */
    public function getQuestionsByTag(Request $request, $tag)
    {
        $user = null; 

        if (Auth::check())
        {
            $user = Auth::user();
        }

        $questionsByTag = Tag::with(['questions.answers', 'questions.tags', 'questions.user.answers'])
            ->where('name', $tag)
            ->get();

        return Inertia::render('QuestionsByTag', [
            'user' => $user, 
            'page' => 'questions',
            'tag' => $questionsByTag
        ]);
    }

    /**
     * Get a user's watched questions
     * 
     * If no authenticated user or no watched quetsions, just newest
     * 
     * The query to get tags is not ideal and is just a work-around 
     * 
     * It needs fixing
     * 
     * https://stackoverflow.com/questions/69578939/how-to-write-an-eloquent-query-in-laravel-8-for-an-unknown-number-of-orwhere-con/69578992?noredirect=1
     */
    public function getQuestionsByWatched(Request $request)
    {
        $user = null;
        $tags = null;

        if (Auth::check())
        {
            $user = User::find(Auth::user()->id);
            $tags = $user->tags()->pluck('name');
        }

        $questions = collect();

        foreach($tags as $name)
        {
            $result = Tag::with([
                'questions.answers', 
                'questions.user.answers',
                'questions.tags'
            ])
            ->where('name', $name)
            ->get();

            $questions->push($result[0]->questions);
        }

        // try this instead:
        // $questionsByWatchedTag = Tag::with([
        //     'questions.answers', 
        //     'questions.user.answers',
        //     'questions.tags'
        // ])
        // ->whereIn('name', $tags)
        // ->get();

        return Inertia::render('Home', [
            'user' => $user,
            'page' => 'home',
            'watched' => $tags,
            'questionsByTag' => $questions
                ->flatten()
                ->unique('id')
                ->all()
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
                    'name' => preg_replace( '/[\W]/', '', $tag['name'])
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

        $questions = Question::with(['answers', 'tags', 'user.answers'])
            ->orderBy('created_at', 'desc')
            ->get();
        $count = $questions->count();

        return Inertia::render('Questions', [
            'user' => $user,
            'page' => 'questions',
            'questions' => $questions,
            'count' => $count
        ]);
    }

    /**
     * Handle request to add a comment to a question
     */
    public function postComment(Request $request)
    {
        $userId = $request->input('user')['id'];
        $commentBody = $request->input('comment');
        $question = $request->input('question');

        Comment::create([
            'body' => $commentBody,
            'user_id' => $userId, 
            'question_id' => $question['id']
        ]);

        $url = '/questions' . '/' . $question['slug'];

        return redirect($url);
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
