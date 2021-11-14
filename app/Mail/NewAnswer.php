<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;

class NewAnswer extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        User $user, 
        Answer $answer,
        Question $question
    )
    {
        $this->user = $user;
        $this->answer = $answer;
        $this->question = $question;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from("no-reply@cloneoverflow.com", "Clone Overflow")
            ->subject("You have a new answer to your question!")
            ->markdown('new-answer', [
                'user' => $this->user,
                'answer' => $this->answer,
                'question' => $this->question
            ]);
    }
}
