<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\UserQuizzAttempt;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\{Topic, Quiz, Question, UserQuizAttempt};
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Purple Orca',
            'email' => 'purpleorca@quiz.com',
        ]);
        User::factory()->create([
            'name' => 'Webly Media',
            'email' => 'webily@quiz.com',
        ]);

        // Prevent the "why is this taking 5 hours?" meltdown
        DB::transaction(function () {
            // Step 1: Create topics (because PHP needs validation)
            $topics = ['PHP', 'JavaScript', 'C', 'PostgreSQL', 'Laravel', 'React', 'Algorithms', 'CSS', 'HTML', 'Git'];
            
            foreach ($topics as $topicName) {
                Topic::create([
                    'name' => $topicName,
                    'slug' => Str::slug($topicName),
                ]);
            }

            // Step 2: Create quizzes (the fun part)
            Topic::all()->each(function ($topic) {
                $difficulties = ['easy', 'medium', 'hard'];
                
                // Create 3 quizzes per topic (easy/medium/hard)
                foreach ($difficulties as $difficulty) {
                    $quiz = Quiz::create([
                        'topic_id' => $topic->id,
                        'title' => "{$topic->name} {$difficulty} Quiz",
                        'description' => "Prove you're a {$difficulty} {$topic->name} wizard. Or don't.",
                        'difficulty' => $difficulty,
                    ]);

                    // Step 3: Add 20 questions per quiz (muahaha)
                    for ($i = 1; $i <= 20; $i++) {
                        Question::create([
                            'quiz_id' => $quiz->id,
                            'question_text' => "What is the answer to life, {$topic->name}, and everything? (Q{$i})",
                            'option1' => '42',
                            'option2' => 'NaN',
                            'option3' => 'Syntax error',
                            'correct_option' => ['option1', 'option2', 'option3'][rand(0, 2)],
                        ]);
                    }
                }
            });

            // Step 4: Fake user attempts (because someone has to fail)
            $users = User::factory(5)->create(); // Assuming you have a User factory
            $quizzes = Quiz::all();

            foreach ($users as $user) {
                foreach ($quizzes->random(10) as $quiz) { // Each user attempts 10 random quizzes
                    UserQuizzAttempt::create([
                        'user_id' => $user->id,
                        'quiz_id' => $quiz->id,
                        'score' => rand(5, 20), // Random score between 5/20 and 20/20 (overachievers)
                    ]);
                }
            }
        });
    }
}
