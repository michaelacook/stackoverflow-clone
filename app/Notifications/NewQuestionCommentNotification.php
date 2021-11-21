<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use App\Models\Question;
use App\Models\Comment;

class NewQuestionCommentNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Question $question, Comment $comment)
    {
        $this->question = $question;
        $this->comment = $comment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'type' => 'comment',
            'title' => $this->question->title,
            'preview' => substr($this->comment->body, 0, 50),
            'url' => '/questions' . '/' . $this->question->slug . '#' . $this->comment->id
        ];
    }
}
