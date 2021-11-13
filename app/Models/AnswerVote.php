<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswerVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'answer_id',
        'user_id',
        'direction'
    ];

    public function answer()
    {
        return $this->belongsTo(Answer::class);
    }
}
