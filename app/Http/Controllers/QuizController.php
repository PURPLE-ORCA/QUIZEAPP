<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::with('topic')->get();
        return inertia('Admin/Quizzes/Index', compact('quizzes'));
    }

    public function indexForWelcome()
    {
        $quizzes = Quiz::with('topic')->get();
        return inertia('Welcome', compact('quizzes')); // Pass quizzes to the Welcome view.
    }

    public function create()
    {
        $topics = Topic::all(); 
        return inertia('Admin/Quizzes/Create', compact('topics'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard,masochist_mode',
        ]);

        Quiz::create($request->all());

        return redirect()->route('quizzes.index')->with('success', 'Quiz created! Now add questions to make it fun.');
    }

    public function show(Quiz $quiz)
    {
        $quiz->load('questions', 'topic'); 
        return inertia('Admin/Quizzes/Show', compact('quiz'));
    }

    public function userShow(Quiz $quiz)
    {
        // Fetch questions in random order
        $questions = $quiz->questions()->inRandomOrder()->get();
    
        return inertia('Quiz/Show', [
            'quiz' => $quiz,
            'questions' => $questions,
        ]);
    }

    public function edit(Quiz $quiz)
    {
        $topics = Topic::all(); 
        return inertia('Admin/Quizzes/Edit', compact('quiz', 'topics'));
    }

    public function update(Request $request, Quiz $quiz)
    {
        $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard,masochist_mode',
        ]);

        $quiz->update($request->all());

        return redirect()->route('quizzes.index')->with('success', 'Quiz updated! Still as hard as ever.');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete(); 
        return redirect()->route('quizzes.index')->with('success', 'Quiz deleted! Hope no one was taking it.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'quizzes' => 'required|array',
            'quizzes.*' => 'exists:quizzes,id',
        ]);
    
        $quizIds = $request->input('quizzes');
        Quiz::whereIn('id', $quizIds)->delete();
    
        return redirect()->back()->with('success', 'Selected quizzes deleted successfully.');
    }
    

    public function submit(Request $request, Quiz $quiz)
    {
        // Log all incoming answers for debugging
    
        // Collect all possible option values
        $allOptions = $quiz->questions->flatMap(function ($question) {
            return [$question->option1, $question->option2, $question->option3];
        })->unique()->values()->toArray();
    
        try {
            $request->validate([
                'answers' => 'required|array',
                'answers.*' => 'string|in:' . implode(',', $allOptions),
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log validation errors
            return back()->withErrors($e->errors())->withInput();
        }
    
        // Process the quiz submission
        $questions = $quiz->questions()->get();
        $results = [];
    
        foreach ($questions as $question) {
            $userAnswer = $request->input('answers')[$question->id] ?? null;
            $correctAnswer = $question->correct_option === 'option1'
                ? $question->option1
                : ($question->correct_option === 'option2'
                    ? $question->option2
                    : $question->option3);
    
            $results[] = [
                'question_id' => $question->id,
                'question_text' => $question->question_text,
                'user_answer' => $userAnswer ?? 'Not answered',
                'correct_answer' => $correctAnswer,
                'is_correct' => $userAnswer === $correctAnswer,
            ];
        }
    
        // Calculate the score
        $score = collect($results)->where('is_correct', true)->count();
        $totalQuestions = count($questions);
    
        // Redirect to results page with success message and results
        return redirect()->route('quiz.results', $quiz)->with([
            'success' => "You scored {$score} out of {$totalQuestions}.",
            'results' => $results,
        ]);
    }
    
    public function results(Quiz $quiz)
    {
        // Retrieve flash data
        $successMessage = session('success');
        $results = session('results');
    
        // Pass data to the inertia view
        return Inertia::render('Quiz/Results', [
            'quiz' => $quiz,
            'success' => $successMessage,
            'results' => $results,
        ]);
    }
}