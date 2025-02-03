<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class QuestionController extends Controller
{
    // Show all questions for a quiz (GET /quizzes/{quiz}/questions)
    public function index(Quiz $quiz)
    {
        $questions = $quiz->questions; // Only questions for this quiz.
        return inertia('Admin/Questions/Index', compact('quiz', 'questions'));
    }

    // Show form to create a new question (GET /quizzes/{quiz}/questions/create)
    public function create(Quiz $quiz)
    {
        return inertia('Admin/Questions/Create', compact('quiz'));
    }

    // Store a new question in the database (POST /quizzes/{quiz}/questions)
    public function store(Request $request, Quiz $quiz)
    {               
        $request->validate([
            'question_text' => 'required|string|max:500',
            'option1' => 'required|string|max:255',
            'option2' => 'required|string|max:255',
            'option3' => 'required|string|max:255',
            'correct_option' => 'required|in:option1,option2,option3',
        ]);

        $quiz->questions()->create($request->all());

        return redirect()->route('quizzes.show', $quiz)->with('success', 'Question added! Now do 499 more.');
    }

    // Show a specific question (GET /questions/{question})
    public function show(Question $question)
    {
        return inertia('Admin/Questions/Show', compact('question'));
    }

    // Show form to edit a question (GET /questions/{question}/edit)
    public function edit(Question $question)
    {
        return inertia('Admin/Questions/Edit', compact('question'));
    }

    // Update a question in the database (PUT/PATCH /questions/{question})
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'question_text' => 'required|string|max:500',
            'option1' => 'required|string|max:255',
            'option2' => 'required|string|max:255',
            'option3' => 'required|string|max:255',
            'correct_option' => 'required',
        ]);

        $question->update($request->all());

        return redirect()->route('quizzes.show', $question->quiz)->with('success', 'Question updated! Still confusing.');
    }

    // Delete a question from the database (DELETE /questions/{question})
    public function destroy(Question $question)
    {
        $quiz = $question->quiz; // Remember the quiz before deleting.
        $question->delete();

        return redirect()->route('quizzes.show', $quiz)->with('success', 'Question deleted! One less headache.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'questions' => 'required|array',
            'questions.*' => 'exists:questions,id', // Ensure all IDs exist in the questions table
        ]);

        $questionIds = $request->input('questions'); // Get the array of question IDs
        Question::whereIn('id', $questionIds)->delete(); // Delete the questions

        return redirect()->back()->with('success', 'Selected questions deleted successfully.');
    }
}