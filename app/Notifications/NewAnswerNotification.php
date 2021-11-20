<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Question;
use App\Models\Answer;

class NewAnswerNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Question $question, Answer $answer)
    {
        $this->question = $question;
        $this->answer = $answer;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('You have a new answer to your question')
                    ->action(
                        'View Answer', url('http://localhost:8000/questions/' . $this->question->slug . '#' . $this->answer->id)
                    )
                    ->line($this->question->title)
                    ->line(substr($this->answer->body, 0, 50));
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
            'headline' => 'You have a new answer to your question',
            'question_title' => $this->question->title,
            'answer_preview' => substr($this->answer->body, 0, 50),
            'answer_author' => $this->answer->user()->name
        ];
    }
}
