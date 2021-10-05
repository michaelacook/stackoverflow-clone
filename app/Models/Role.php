<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsToMany(User::class)
            ->using(RoleUser::class);
    }

    protected $fillable = ['title', 'created_at', 'updated_at'];
}
