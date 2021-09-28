<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\QuestionController;
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

Route::get('/questions/new', [QuestionController::class, 'create']);
Route::post('/questions/upvote', [QuestionController::class, 'upVote']);
Route::post('/questions/downvote', [QuestionController::class, 'downVote']);
Route::post('/questions', [QuestionController::class, 'post']);
Route::get('/questions', [QuestionController::class, 'all']);
Route::get('/questions/{question:slug}', [QuestionController::class, 'index']);


require __DIR__.'/auth.php';
