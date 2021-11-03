<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\User;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        $user = null;
        $tags = null;
        $watched = null; 
        $ignored = null;

        if (Auth::check())
        {
            $user = User::with([
                'questions', 
                'answers.question',
                'comments'
            ])
            ->find(Auth::id());

            $tags = $request->user()->tags()->get(); 

            $watched = $tags->filter(function ($value, $key) {
                return $value->ignored === false || is_null($value->ignored); 
            });

            $ignored = $tags->filter(function ($value, $key) {
                return $value->ignored === true; 
            });
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? $user : null,
                'watchedTags' => $watched,
                'ignoredTags' => $ignored
            ],
        ]);
    }
}
