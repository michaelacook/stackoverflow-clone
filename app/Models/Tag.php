<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'guidance',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the user associated with a watched tag
     */
    public function user()
    {
        return $this->belongsToMany(User::class)
            ->using(RoleUser::class);
    }

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
