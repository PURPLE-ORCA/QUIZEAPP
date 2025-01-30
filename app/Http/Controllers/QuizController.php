<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    // Show all quizzes (GET /quizzes)
    public function index()
    {
        $quizzes = Quiz::with('topic')->get(); // Include topics for context.
        return inertia('Admin/Quizzes/Index', compact('quizzes'));
    }

    public function indexForWelcome()
    {
        $quizzes = Quiz::with('topic')->get(); // Fetch quizzes with their topics.
        return inertia('Welcome', compact('quizzes')); // Pass quizzes to the Welcome view.
    }

    // Show form to create a new quiz (GET /quizzes/create)
    public function create()
    {
        $topics = Topic::all(); // Need topics to attach quizzes to.
        return inertia('Admin/Quizzes/Create', compact('topics'));
    }

    // Store a new quiz in the database (POST /quizzes)
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

    // Show a specific quiz (GET /quizzes/{quiz})
    public function show(Quiz $quiz)
    {
        $quiz->load('questions', 'topic'); 
        return inertia('Admin/Quizzes/Show', compact('quiz'));
    }

    public function userShow (Quiz $quiz)
    {
        $quiz->load('questions', 'topic');
        return inertia('Quiz/Show', compact('quiz'));
    }

    // Show form to edit a quiz (GET /quizzes/{quiz}/edit)
    public function edit(Quiz $quiz)
    {
        $topics = Topic::all(); // Need topics for the dropdown.
        return inertia('Admin/Quizzes/Edit', compact('quiz', 'topics'));
    }

    // Update a quiz in the database (PUT/PATCH /quizzes/{quiz})
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

    // Delete a quiz from the database (DELETE /quizzes/{quiz})
    public function destroy(Quiz $quiz)
    {
        $quiz->delete(); // Poof! Gone forever.
        return redirect()->route('quizzes.index')->with('success', 'Quiz deleted! Hope no one was taking it.');
    }
    public function submit(Request $request, Quiz $quiz)
    {
        // Validate the request
        $request->validate([
            'answers' => 'required|array', // Ensure answers are provided as an array
        ]);
    
        $answers = $request->input('answers'); // Get user answers
        $score = 0;
        $results = []; // To store detailed results for feedback
    
        foreach ($quiz->questions as $question) {
            $userAnswer = $answers[$question->id] ?? null; // Get the user's answer for this question
            $isCorrect = $userAnswer === $question->correct_option;
    
            if ($isCorrect) {
                $score++; // Increment score for correct answers
            }
    
            // Store detailed results for feedback
            $results[] = [
                'question_id' => $question->id,
                'question_text' => $question->question_text,
                'user_answer' => $userAnswer,
                'correct_answer' => $question->correct_option,
                'is_correct' => $isCorrect,
            ];
        }
    
        // Calculate the percentage score
        $totalQuestions = $quiz->questions->count();
        $percentageScore = ($score / $totalQuestions) * 100;
    
        // Save the user's attempt in the database
        $quiz->attempts()->create([
            'user_id' => auth::id(),
            'score' => $score,
            'total_questions' => $totalQuestions,
            'percentage_score' => $percentageScore,
            'details' => json_encode($results), // Store detailed results as JSON
        ]);
    
        // Redirect back to the results page with flash data
        return redirect()->route('quiz.results', $quiz)->with([
            'success' => "Quiz submitted successfully! Your score: {$score}/{$totalQuestions} ({$percentageScore}%)",
            'results' => $results, // Pass detailed results for feedback
        ]);
    }

    public function results(Quiz $quiz)
    {
        return inertia('Quiz/Results', compact('quiz'));
    }
}