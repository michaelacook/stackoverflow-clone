<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;

class AnswerController extends Controller
{
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
}
