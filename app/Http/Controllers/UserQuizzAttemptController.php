<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\UserQuizzAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserQuizzAttemptController extends Controller
{
    // Start a quiz attempt (POST /quizzes/{quiz}/attempt)
    public function start(Quiz $quiz)
    {
        $attempt = UserQuizzAttempt::create([
            'user_id' => Auth::id(),
            'quiz_id' => $quiz->id,
            'score' => 0, // Start with zero. Optimism is overrated.
        ]);

        return redirect()->route('quiz.show', $quiz)->with('attempt_id', $attempt->id);
    }

    // Submit quiz answers and calculate score (POST /quizzes/{quiz}/submit)
    public function submit(Request $request, Quiz $quiz)
    {
        $attempt = UserQuizzAttempt::findOrFail($request->attempt_id);

        $score = 0;
        foreach ($request->answers as $questionId => $answer) {
            $question = $quiz->questions()->find($questionId);
            if ($question && $question->correct_option == $answer) {
                $score++;
            }
        }

        $attempt->update([
            'score' => $score,
            'completed_at' => now(),
        ]);

        return redirect()->route('quiz.result', $attempt)->with('success', 'Quiz completed! Let’s see how badly you failed.');
    }

    // Show quiz results (GET /quiz-attempts/{attempt})
    public function result(UserQuizzAttempt $attempt)
    {
        return inertia('Quiz/Result', compact('attempt'));
    }
}