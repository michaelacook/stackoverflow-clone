<?php

namespace App\Http\Controllers;

use App\Mail\NewAnswer;
use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\AnswerVote;
use App\Models\Comment;
use App\Models\Question;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AnswerController extends Controller
{
    /**
     * Handle request to store a new answer
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        $question = Question::find($request->input('question')['id']);
        $questionAuthor = User::find($question->user_id);
        $answer = $request->input('answer');

        $newAnswer = new Answer; 
        $newAnswer->body = $answer['body'];
        $newAnswer->user_id = $userId;
        $newAnswer->question_id = $question->id;
        $newAnswer->save();

        Mail::to($questionAuthor)->send(new NewAnswer(
            $questionAuthor, 
            $newAnswer,
            $question
        ));

        $url = url("/questions/{$question->slug}");

        return redirect($url)->withFragment($newAnswer->id);
        // $r = redirect($url)->withFragment($newAnswer->id); 
        // dd($r->getTargetUrl());
    }

    /**
     * Handle request to upvote an answer
     */
    public function upVote(Request $request)
    {
        $answerId = $request->input('answer')['id'];
        $answer = Answer::find($answerId);

        if ($answer->user_id !== Auth::id())
        {
            $upVote = AnswerVote::where('user_id', Auth::id())
                ->where('direction', 1)
                ->where('answer_id', $answer->id);

            if ($upVote->doesntExist())
            {
                $vote = new AnswerVote;
                $vote->direction = 1;
                $vote->answer_id = $answer->id;
                $vote->user_id = Auth::id();
                $vote->save();

                $downVote = AnswerVote::where('user_id', Auth::id())
                    ->where('direction', 0)
                    ->where('answer_id', $answer->id);

                if ($downVote->exists())
                {
                    $downVote->delete();
                }

                $answer->votes++;
                $answer->save();
            }
        }
        
        $url = '/questions' . '/' . $request->input('slug');

        return redirect($url);
    }

    /**
     * Handle request to downvote an answer
     */
    public function downVote(Request $request)
    {
        $answerId = $request->input('answer')['id'];
        $answer = Answer::find($answerId);

        if ($answer->user_id !== Auth::id())
        {
            $downVote = AnswerVote::where('user_id', Auth::id())
            ->where('direction', 0)
            ->where('answer_id', $answer->id);

            if ($downVote->doesntExist())
            {
                $vote = new AnswerVote;
                $vote->direction = 0;
                $vote->answer_id = $answer->id;
                $vote->user_id = Auth::id();
                $vote->save();

                $upVote = AnswerVote::where('user_id', Auth::id())
                    ->where('direction', 1)
                    ->where('answer_id', $answer->id);

                if ($upVote->exists())
                {
                    $upVote->delete();
                }

                $answer->votes--;
                $answer->save();
            }
        }

        $url = '/questions' . '/' . $request->input('slug');

        return redirect($url);
    }

    /**
     * handle request to add a comment to an answer
     */
    public function postComment(Request $request)
    {
        $values = $request->all();

        Comment::create([
            'body' => $values['comment'],
            'user_id' => Auth::id(),
            'answer_id' => $values['answer']['id'] 
        ]);

        $url = '/questions' . '/' . $request['question']['slug'];

        return redirect($url);
    }
}
