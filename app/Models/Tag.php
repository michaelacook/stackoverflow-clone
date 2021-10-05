<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'created_at',
        'updated_at'
    ];

    /**
     * Retrieve question records through QuestionTag junction table
     * 
     * @return app\Models\Question instances
     */
    public function questions()
    {
        return $this->belongsToMany(Question::class)
            ->using(QuestionTag::class);
    }
}
