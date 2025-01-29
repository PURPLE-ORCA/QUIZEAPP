<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    // Show all quizzes (GET /quizzes)
    public function index()
    {
        $quizzes = Quiz::with('topic')->get(); // Include topics for context.
        return inertia('Admin/Quizzes/Index', compact('quizzes'));
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
        $quiz->load('questions'); // Load questions for the quiz.
        return inertia('Admin/Quizzes/Show', compact('quiz'));
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
}