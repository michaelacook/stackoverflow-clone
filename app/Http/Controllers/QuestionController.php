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
use App\Models\QuestionVote;
use Illuminate\Database\Eloquent\Builder;

class QuestionController extends Controller
{
    /**
     * View a question
     */
    public function index(Question $question)
    {
        $currentUrl = url()->current();
        $previousUrl = url()->previous();

        if ($currentUrl !== $previousUrl)
        {
            $question->views++;
            $question->save();
        }

        $answers = Answer::with(['comments.user', 'user.answers'])
            ->where('question_id', $question->id)
            ->get();

        $questionComments = Comment::with('user')
            ->where('question_id', $question->id)
            ->get();

        return Inertia::render('Question', [
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
        $questionsByTag = Question::with([
            'answers', 
            'tags', 
            'user.answers'
        ])
            ->whereRelation('tags', 'name', $tag)
            ->paginate(15);

        return Inertia::render('QuestionsByTag', [
            'page' => 'questions',
            'tag' => Tag::where('name', $tag)->get(),
            'questions' => $questionsByTag,
        ]);
    }

    /**
     * Get a user's watched questions
     * 
     * If no authenticated user or no watched quetsions, just newest
     * 
     * The query to get tags is not ideal and is just a work-around
     */
    public function getQuestionsByWatched(Request $request)
    {
        $tags = null;
        $questions = collect();
        $allQuestions = Question::with(['answers', 'tags', 'user.answers'])
            ->orderByDesc('created_at')
            ->limit(100)
            ->get();

        if (Auth::check())
        {
            $tags = User::find(Auth::user()->id)
                ->tags()
                ->pluck('name');

            if (count($tags) > 0)
            {
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

                $questions = $questions
                    ->flatten()
                    ->unique('id')
                    ->all();
            }
            else 
            {
                $questions = $allQuestions;
            }
        }
        else 
        {
            $questions = $allQuestions;
        }

        return Inertia::render('Home', [
            'page' => 'home',
            'watched' => $tags,
            'questionsByTag' => $questions
        ]);
    }

    /**
     * Render the new question page
     */
    public function create()
    {
        return Inertia::render('NewQuestion', [
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
        $questions = Question::with(['answers', 'tags', 'user.answers'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Questions', [
            'page' => 'questions',
            'questions' => $questions
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
        $upVote = QuestionVote::where('user_id', Auth::id())
            ->where('direction', 1)
            ->where('question_id', $question->id);

        if ($upVote->doesntExist()) 
        {
            $vote = new QuestionVote;
            $vote->direction = 1;
            $vote->user_id = Auth::id();
            $vote->question_id = $question->id;
            $vote->save();

            $downVote = QuestionVote::where('user_id', Auth::id())
                ->where('direction', 0)
                ->where('question_id', $question->id);
            
            if ($downVote->exists())
            {
                $downVote->delete();
            }

            $question->votes++;
            $question->save();
        }

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
        $downVote = QuestionVote::where('user_id', Auth::id())
            ->where('direction', 0)
            ->where('question_id', $question->id);

        if ($downVote->doesntExist()) 
        {
            $vote = new QuestionVote;
            $vote->direction = 0;
            $vote->user_id = Auth::id();
            $vote->question_id = $question->id;
            $vote->save();

            $upVote = QuestionVote::where('user_id', Auth::id())
                ->where('direction', 1)
                ->where('question_id', $question->id);
            
            if ($upVote->exists())
            {
                $upVote->delete();
            }

            $question->votes--;
            $question->save();
        }
        

        $url = "/questions" . "/" . $question->slug;

        return redirect($url);
    }
}
