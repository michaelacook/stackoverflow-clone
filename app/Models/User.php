<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class)
            ->using(RoleUser::class);
    }

    /**
     * Get all of a user's tags
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class)
            ->using(TagUser::class);
    }

    /**
     * Get only watched tags
     */
    public function watched()
    {
        return $this->belongsToMany(Tag::class)
            ->wherePivot('ignored', null);
    }

    /**
     * Get only ignored tags
     */
    public function ignored()
    {
        return $this->belongsToMany(Tag::class)
            ->wherePivot('ignored', true);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profileUrl',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
