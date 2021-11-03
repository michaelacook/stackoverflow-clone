<?php

/**
 * TagUser represents user watched tags
 * 
 * When a user watches a tag it will be added to the pivot table
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TagUser extends Pivot
{
    use HasFactory;

    protected $fillable = ['tag_id', 'user_id', 'ignored'];
}
