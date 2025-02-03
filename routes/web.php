<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\TopicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::resource('admin/topics', TopicController::class);
});
Route::middleware(['auth'])->group(function () {
    Route::resource('admin/quizzes', quizController::class);
});
Route::middleware(['auth'])->group(function () {
    Route::resource('admin/questions', QuestionController::class);
});
Route::get('/admin/quizzes/{quiz}/questions/create', [QuestionController::class, 'create'])->name('questions.create');
Route::post('/admin/quizzes/{quiz}/questions', [QuestionController::class, 'store'])->name('questions.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// routes/web.php  
Route::middleware(['auth'])->group(function () {  
    Route::resource('topics', TopicController::class);  
    Route::resource('quizzes', QuizController::class);  
    Route::resource('questions', QuestionController::class);  
});  

Route::get('/', [QuizController::class, 'indexForWelcome'])->name('quizzes.welcome');
Route::get('/quizzes/{quiz}', [QuizController::class, 'userShow'])->name('quiz.show');
Route::post('/quizzes/{quiz}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');

// Route::get('/quizzes/{quiz}', [QuizController::class, 'userShow'])->name('quiz.show');
// Route::post('/quizzes/{quiz}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');

Route::get('/quizzes/{quiz}/results', [QuizController::class, 'results'])->name('quiz.results');

Route::post('/admin/quizzes/bulk-delete', [QuizController::class, 'bulkDelete'])->name('quizzes.bulk-delete');
Route::post('/admin/questions/bulk-delete', [QuestionController::class, 'bulkDelete'])->name('questions.bulk-delete');

require __DIR__.'/auth.php';
