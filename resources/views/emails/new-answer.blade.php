@component('mail::message')
# You have a new answer!

Hey {{ $user->name }}, you received a new answer to your question!

### {{ $question->title }}

@component('mail::panel')
{{ substr($answer->body, 0, 150) }}...
@endcomponent

@component('mail::button', ['url' => 'http://localhost:8000/questions/' . $question->slug . '#' . $answer->id])
View Answer
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
