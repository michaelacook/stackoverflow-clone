<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)
            ->using(QuestionTag::class);
    }

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'views',
        'votes',
        'slug',
        'created_at',
        'updated_at'
    ];
}
