<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        // Fetch questions and randomize their order
        $questions = $quiz->questions()->inRandomOrder()->get();

        // Shuffle options for each question
        $questions->each(function ($question) {
            $options = [
                'option1' => $question->option1,
                'option2' => $question->option2,
                'option3' => $question->option3,
            ];

            // Extract option keys and values
            $optionKeys = array_keys($options);
            $optionValues = array_values($options);

            // Shuffle the option values
            shuffle($optionValues);

            // Rebuild shuffled options with original keys
            $shuffledOptions = array_combine($optionKeys, $optionValues);

            // Find the new key for the correct option
            $correctOptionKey = array_search($question->correct_option, $optionKeys);

            // Assign shuffled options and the new correct option key to the question
            $question->shuffled_options = $shuffledOptions;
            $question->shuffled_correct_option = array_keys($shuffledOptions)[array_search($question->correct_option_value, $optionValues)];
        });

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
        $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'string|in:option1,option2,option3',
        ]);

        $questions = $quiz->questions()->get();
        $results = [];

        foreach ($questions as $question) {
            $userAnswer = $request->input('answers')[$question->id] ?? null;
            $correctOption = $question->correct_option;

            $options = [
                'option1' => $question->option1,
                'option2' => $question->option2,
                'option3' => $question->option3,
            ];

            $results[] = [
                'question_id' => $question->id,
                'question_text' => $question->question_text,
                'user_answer' => $options[$userAnswer] ?? 'Not answered',
                'correct_answer' => $options[$correctOption],
                'is_correct' => $userAnswer === $correctOption,
            ];
        }

        $score = collect($results)->where('is_correct', true)->count();
        $totalQuestions = count($questions);

        return redirect()->route('quiz.results', $quiz)->with([
            'success' => "You scored {$score} out of {$totalQuestions}.",
            'results' => $results,
        ]);
    }
    public function results(Quiz $quiz)
    {
        return inertia('Quiz/Results', compact('quiz'));
    }
}