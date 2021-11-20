<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [QuestionController::class, 'getQuestionsByWatched']);
Route::get('/account', [AccountController::class, 'index']);

Route::post('/answers/comments', [AnswerController::class, 'postComment'])->middleware('auth');
Route::post('/answers', [AnswerController::class, 'store'])->middleware('auth');
Route::post('/answers/upvote', [AnswerController::class, 'upVote'])->middleware('auth');
Route::post('/answers/downvote', [AnswerController::class, 'downVote'])->middleware('auth');

Route::get('/tags/edit/{tag}', [TagController::class, 'editTag']);
Route::post('/tags/edit', [TagController::class, 'addGuidance'])->middleware('auth');
Route::post('/tags/watch', [TagController::class, 'watchTag'])->middleware('auth');
Route::post('/tags/unwatch', [TagController::class, 'unwatchTag'])->middleware('auth');
Route::post('/tags/ignore', [TagController::class, 'ignoreTag'])->middleware('auth');

Route::get('/questions/new', [QuestionController::class, 'create'])->middleware('auth');
Route::post('/questions/comments', [QuestionController::class, 'postComment'])->middleware('auth');
Route::post('/questions/upvote', [QuestionController::class, 'upVote'])->middleware('auth');
Route::post('/questions/downvote', [QuestionController::class, 'downVote'])->middleware('auth');
Route::post('/questions', [QuestionController::class, 'post'])->middleware('auth');
Route::get('/questions', [QuestionController::class, 'all']);
Route::get('/questions/by-tag/{tag}', [QuestionController::class, 'getQuestionsByTag']);
Route::get('/questions/{question:slug}', [QuestionController::class, 'index']);

Route::get('/notifications/mark-as-read', [NotificationController::class, 'markAsRead']);

Route::get('/users', [UserController::class, 'index']);

Route::get('/tags', [TagController::class, 'index']);

Route::get('/search', [SearchController::class, 'index']);


require __DIR__.'/auth.php';
