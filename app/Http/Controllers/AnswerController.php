<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    /**
     * Handle request to store a new answer
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        $question = $request->input('question');
        $answer = $request->input('answer');

        Answer::create([
            'body' => $answer['body'],
            'user_id' => $userId,
            'question_id' => $question['id']
        ]);

        $url = '/questions' . '/' . $question['slug'];

        return redirect($url);
    }

    /**
     * Handle request to upvote an answer
     */
    public function upVote(Request $request)
    {
        $answer = Answer::find($request->input('answer')['id']);
        $answer->votes++;
        $answer->save();

        $url = '/questions' . '/' . $request->input('slug');

        return redirect($url);
    }

    /**
     * Handle request to downvote an answer
     */
    public function downVote(Request $request)
    {
        $answer = Answer::find($request->input('answer')['id']);
        $answer->votes--;
        $answer->save();

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
