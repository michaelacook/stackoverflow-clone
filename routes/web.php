<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TagController;
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

Route::get('/', [HomeController::class, 'index']);
Route::get('/account', [AccountController::class, 'index']);

Route::post('/answers/comments', [AnswerController::class, 'postComment']);
Route::post('/answers', [AnswerController::class, 'store']);
Route::post('/answers/upvote', [AnswerController::class, 'upVote']);
Route::post('/answers/downvote', [AnswerController::class, 'downVote']);

Route::get('/tags/edit/{tag}', [TagController::class, 'editTag']);
Route::post('/tags/edit', [TagController::class, 'addGuidance']);

Route::get('/questions/new', [QuestionController::class, 'create']);
Route::post('/questions/comments', [QuestionController::class, 'postComment']);
Route::post('/questions/upvote', [QuestionController::class, 'upVote']);
Route::post('/questions/downvote', [QuestionController::class, 'downVote']);
Route::post('/questions', [QuestionController::class, 'post']);
Route::get('/questions', [QuestionController::class, 'all']);
Route::get('/questions/by-tag/{tag}', [QuestionController::class, 'getQuestionsByTag']);
Route::get('/questions/{question:slug}', [QuestionController::class, 'index']);

Route::get('/tags', [TagController::class, 'index']);



require __DIR__.'/auth.php';
