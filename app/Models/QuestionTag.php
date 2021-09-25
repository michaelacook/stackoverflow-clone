<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class QuestionTag extends Pivot
{
    use HasFactory;

    protected $fillable = ['question_id', 'tag_id'];
}
