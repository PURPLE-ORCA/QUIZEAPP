<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\UserQuizzAttempt;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\{Topic, Quiz, Question, UserQuizAttempt};
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Purple Orca',
            'email' => 'purpleorca@quiz.com',
        ]);

        User::factory()->create([
            'name' => 'Webly Media',
            'email' => 'webily@quiz.com',
        ]);

        DB::transaction(function () {
            $topics = ['PHP', 'JavaScript', 'C', 'PostgreSQL', 'Laravel', 'React', 'Algorithms', 'CSS', 'HTML', 'Git'];

            foreach ($topics as $topicName) {
                Topic::create([
                    'name' => $topicName,
                    'slug' => Str::slug($topicName),
                ]);
            }

            Topic::all()->each(function ($topic) {
                $difficulties = ['easy', 'medium', 'hard'];

                foreach ($difficulties as $difficulty) {
                    $quiz = Quiz::create([
                        'topic_id' => $topic->id,
                        'title' => "{$topic->name} {$difficulty} Quiz",
                        'description' => "Prove you're a {$difficulty} {$topic->name} wizard. Or don't.",
                        'difficulty' => $difficulty,
                    ]);

                    $questions = $this->getQuestionsForTopic($topic->name, $difficulty);

                    foreach ($questions as $q) {
                        Question::create([
                            'quiz_id' => $quiz->id,
                            'question_text' => $q['question'],
                            'option1' => $q['options'][0],
                            'option2' => $q['options'][1],
                            'option3' => $q['options'][2],
                            'correct_option' => $q['correct_option'],
                        ]);
                    }
                }
            });

            $users = User::factory(5)->create();
            $quizzes = Quiz::all();

            foreach ($users as $user) {
                foreach ($quizzes->random(10) as $quiz) {
                    UserQuizzAttempt::create([
                        'user_id' => $user->id,
                        'quiz_id' => $quiz->id,
                        'score' => rand(5, 20),
                    ]);
                }
            }
        });
    }

    private function getQuestionsForTopic($topic, $difficulty)
    {
        $questions = [
            'PHP' => [
                'easy' => [
                    [
                        'question' => 'What does PHP stand for?',
                        'options' => ['Hypertext Preprocessor', 'Personal Home Page', 'Private Hosting Protocol'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which symbol is used to declare a variable in PHP?',
                        'options' => ['$', '#', '@'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is a PHP superglobal?',
                        'options' => ['$_POST', '$GLOBALS', '$SUPER'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'How do you start a session in PHP?',
                        'options' => ['session_start()', 'start_session()', 'begin_session()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is used to output text in PHP?',
                        'options' => ['echo', 'print', 'both'],
                        'correct_option' => 'option3'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'Which function is used to include one PHP file into another?',
                        'options' => ['include()', 'import()', 'require_once()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the default file extension for PHP files?',
                        'options' => ['.php', '.html', '.js'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is used to connect to a MySQL database in PHP?',
                        'options' => ['mysqli_connect()', 'pdo_connect()', 'mysql_link()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What will the function empty() return for a variable containing "0"?',
                        'options' => ['true', 'false', 'error'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which function is used to sanitize strings for SQL queries?',
                        'options' => ['mysqli_real_escape_string()', 'htmlspecialchars()', 'strip_tags()'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'Which of the following is NOT a valid PHP error type?',
                        'options' => ['E_NOTICE', 'E_WARNING', 'E_CRASH'],
                        'correct_option' => 'option3'
                    ],
                    [
                        'question' => 'How can you retrieve data from a MySQL database using PDO?',
                        'options' => ['$stmt->fetch()', '$pdo->query()', '$pdo->execute()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following magic methods is called when an object is cloned?',
                        'options' => ['__clone()', '__copy()', '__duplicate()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the scope resolution operator in PHP?',
                        'options' => ['::', '->', '**'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which function is used to register a function to be executed after script execution ends?',
                        'options' => ['register_shutdown_function()', 'shutdown_register()', 'end_script_callback()'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
            'JavaScript' => [
                'easy' => [
                    [
                        'question' => 'Which company developed JavaScript?',
                        'options' => ['Netscape', 'Microsoft', 'Google'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'How do you declare a variable in JavaScript?',
                        'options' => ['var', 'let', 'both'],
                        'correct_option' => 'option3'
                    ],
                    [
                        'question' => 'Which of the following is a JavaScript data type?',
                        'options' => ['String', 'Number', 'Both'],
                        'correct_option' => 'option3'
                    ],
                    [
                        'question' => 'What symbol is used for comments in JavaScript?',
                        'options' => ['//', '#', '<!-- -->'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which method is used to write to the browser console?',
                        'options' => ['console.log()', 'print()', 'write()'],
                        'correct_option' => 'option1'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'Which of the following is used to parse JSON in JavaScript?',
                        'options' => ['JSON.parse()', 'JSON.decode()', 'JSON.stringify()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which keyword is used to define a constant in JavaScript?',
                        'options' => ['const', 'let', 'var'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the output of typeof null in JavaScript?',
                        'options' => ['object', 'null', 'undefined'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which function is used to delay code execution in JavaScript?',
                        'options' => ['setTimeout()', 'delay()', 'pause()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the correct syntax for a JavaScript arrow function?',
                        'options' => ['() => {}', 'function() {}', '{} => ()'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'Which method is used to merge arrays in JavaScript?',
                        'options' => ['concat()', 'merge()', 'append()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the output of 0 == "0" in JavaScript?',
                        'options' => ['true', 'false', 'undefined'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which JavaScript method is used to filter an array?',
                        'options' => ['filter()', 'select()', 'reduce()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is NOT a JavaScript framework?',
                        'options' => ['React', 'Angular', 'Laravel'],
                        'correct_option' => 'option3'
                    ],
                    [
                        'question' => 'How do you create a Promise in JavaScript?',
                        'options' => ['new Promise()', 'Promise.create()', 'Promise.new()'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
            'C' => [
                'easy' => [
                    [
                        'question' => 'What is the correct file extension for C programs?',
                        'options' => ['.c', '.cpp', '.cs'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which symbol is used to end a statement in C?',
                        'options' => [';', '.', ':'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which data type is used to store integer values in C?',
                        'options' => ['int', 'float', 'char'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the correct syntax to print in C?',
                        'options' => ['printf()', 'print()', 'cout<<'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which function is the entry point of a C program?',
                        'options' => ['main()', 'start()', 'init()'],
                        'correct_option' => 'option1'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'Which keyword is used to define a constant in C?',
                        'options' => ['const', 'define', 'static'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is a loop structure in C?',
                        'options' => ['for', 'repeat', 'foreach'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which operator is used for logical AND in C?',
                        'options' => ['&&', '&', 'and'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the correct syntax to declare a pointer in C?',
                        'options' => ['int *ptr;', 'int ptr*;', '*int ptr;'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which library function is used to allocate memory dynamically?',
                        'options' => ['malloc()', 'calloc()', 'alloc()'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'What is the output of sizeof(char) in C?',
                        'options' => ['1', '2', '4'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is a valid storage class in C?',
                        'options' => ['auto', 'public', 'global'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What does the "extern" keyword signify in C?',
                        'options' => ['Variable declared elsewhere', 'Variable is constant', 'Variable is static'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is a preprocessor directive in C?',
                        'options' => ['#include', 'import', 'using namespace'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the correct way to free allocated memory in C?',
                        'options' => ['free()', 'delete()', 'dealloc()'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
            'PostgreSQL' => [
                'easy' => [
                    [
                        'question' => 'What type of database is PostgreSQL?',
                        'options' => ['Relational', 'NoSQL', 'Graph'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which SQL command is used to retrieve data?',
                        'options' => ['SELECT', 'GET', 'FETCH'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which keyword is used to sort query results?',
                        'options' => ['ORDER BY', 'SORT BY', 'GROUP BY'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the default port for PostgreSQL?',
                        'options' => ['5432', '3306', '1521'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which command is used to create a new database?',
                        'options' => ['CREATE DATABASE', 'NEW DATABASE', 'INIT DATABASE'],
                        'correct_option' => 'option1'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'Which data type is used to store variable-length text in PostgreSQL?',
                        'options' => ['VARCHAR', 'TEXT', 'CHAR'],
                        'correct_option' => 'option2'
                    ],
                    [
                        'question' => 'Which SQL clause is used to filter results?',
                        'options' => ['WHERE', 'IF', 'FILTER'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'How do you add a new column to an existing table?',
                        'options' => ['ALTER TABLE', 'MODIFY TABLE', 'CHANGE TABLE'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which function returns the current date and time?',
                        'options' => ['NOW()', 'CURRENT_DATE()', 'GETDATE()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which PostgreSQL command is used to grant privileges?',
                        'options' => ['GRANT', 'ALLOW', 'PERMIT'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'What is the term for a database object that stores precompiled SQL statements?',
                        'options' => ['View', 'Stored Procedure', 'Trigger'],
                        'correct_option' => 'option2'
                    ],
                    [
                        'question' => 'Which PostgreSQL feature ensures data integrity through rules?',
                        'options' => ['Constraints', 'Indexes', 'Sequences'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which PostgreSQL extension is used for full-text search?',
                        'options' => ['pg_trgm', 'pg_search', 'pg_fulltext'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which function returns the number of rows affected by a query?',
                        'options' => ['ROW_COUNT()', 'COUNT_ROWS()', 'GET_ROWS()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the correct syntax to create an index in PostgreSQL?',
                        'options' => ['CREATE INDEX', 'NEW INDEX', 'ADD INDEX'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
            'Laravel' => [
                'easy' => [
                    [
                        'question' => 'What is Laravel?',
                        'options' => ['A PHP framework', 'A JavaScript library', 'A database system'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which command is used to create a new Laravel project?',
                        'options' => ['laravel new', 'php artisan make', 'composer create-project'],
                        'correct_option' => 'option3'
                    ],
                    [
                        'question' => 'What is the default templating engine in Laravel?',
                        'options' => ['Blade', 'Twig', 'Smarty'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which file contains environment configuration in Laravel?',
                        'options' => ['.env', 'config.php', 'settings.json'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which command is used to run migrations in Laravel?',
                        'options' => ['php artisan migrate', 'php artisan run', 'php migrate'],
                        'correct_option' => 'option1'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'Which Laravel feature is used for database version control?',
                        'options' => ['Migrations', 'Seeders', 'Factories'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is Eloquent in Laravel?',
                        'options' => ['ORM', 'Template Engine', 'Routing System'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'How do you define a route in Laravel?',
                        'options' => ['Route::get()', 'Router::add()', 'Path::define()'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the command to create a new controller in Laravel?',
                        'options' => ['php artisan make:controller', 'php artisan create:controller', 'php make controller'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which directory contains middleware in Laravel?',
                        'options' => ['app/Http/Middleware', 'app/Middleware', 'resources/middleware'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'How do you bind a model to a route in Laravel?',
                        'options' => ['Route Model Binding', 'Route Linking', 'Route Associating'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is used for task scheduling in Laravel?',
                        'options' => ['Scheduler', 'Cron', 'Queue'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What does the method "withTrashed()" do in Laravel?',
                        'options' => ['Includes soft-deleted records', 'Deletes a record', 'Restores a record'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which facade is used for logging in Laravel?',
                        'options' => ['Log', 'Logger', 'File'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which directory contains the event and listener classes in Laravel?',
                        'options' => ['app/Events', 'resources/Events', 'config/Listeners'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
            'React' => [
                'easy' => [
                    [
                        'question' => 'What is React?',
                        'options' => ['A JavaScript library for building UIs', 'A CSS framework', 'A database management system'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Who developed React?',
                        'options' => ['Facebook', 'Google', 'Microsoft'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is a component in React?',
                        'options' => ['A reusable piece of UI', 'A database table', 'A CSS class'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which command creates a new React app?',
                        'options' => ['npx create-react-app', 'npm start', 'react-init'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What syntax is used to write HTML in React?',
                        'options' => ['JSX', 'HTML5', 'XML'],
                        'correct_option' => 'option1'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'How do you manage state in a functional component?',
                        'options' => ['useState Hook', 'setState Method', 'this.state'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the purpose of useEffect in React?',
                        'options' => ['To perform side effects in components', 'To handle CSS styling', 'To manage routing'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which method is used to pass data to child components?',
                        'options' => ['Props', 'State', 'Context'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the virtual DOM in React?',
                        'options' => ['A lightweight copy of the real DOM', 'A server-side rendering tool', 'A database'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is true about React Router?',
                        'options' => ['It enables navigation in single-page applications', 'It manages component state', 'It styles components'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'What is the context API in React used for?',
                        'options' => ['To manage global state', 'To handle component lifecycle', 'To fetch data from APIs'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'How do you optimize performance in React apps?',
                        'options' => ['Using memoization', 'Writing more CSS', 'Adding more components'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What does useMemo hook do?',
                        'options' => ['Memoizes a computed value', 'Handles API calls', 'Updates component props'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which hook is used to reference DOM elements in React?',
                        'options' => ['useRef', 'useDom', 'useElement'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'How do you implement lazy loading in React?',
                        'options' => ['Using React.lazy and Suspense', 'By adding more CSS', 'With useState hook'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
            'Algorithms' => [
                'easy' => [
                    [
                        'question' => 'What is the time complexity of binary search?',
                        'options' => ['O(log n)', 'O(n)', 'O(n log n)'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which data structure uses FIFO (First In First Out)?',
                        'options' => ['Queue', 'Stack', 'Tree'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which algorithm is used for finding the shortest path in a graph?',
                        'options' => ["Dijkstra's algorithm", 'Bubble sort', 'Binary search'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the space complexity of Merge Sort?',
                        'options' => ['O(n)', 'O(1)', 'O(log n)'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is a divide and conquer algorithm?',
                        'options' => ['Quick Sort', 'Linear Search', 'Selection Sort'],
                        'correct_option' => 'option1'
                    ],
                ],
                'medium' => [
                    [
                        'question' => 'What is a characteristic of a greedy algorithm?',
                        'options' => ['Makes locally optimal choices', 'Uses recursion heavily', 'Always backtracks'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which algorithm is used for cycle detection in a graph?',
                        'options' => ["Floyd's Cycle Detection", "Prim's Algorithm", "Kruskal's Algorithm"],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is dynamic programming mainly used for?',
                        'options' => ['Solving problems with overlapping subproblems', 'Sorting arrays', 'Encrypting data'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the time complexity of Quick Sort in the worst case?',
                        'options' => ['O(n^2)', 'O(n log n)', 'O(log n)'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which of the following is not a stable sorting algorithm?',
                        'options' => ['Quick Sort', 'Merge Sort', 'Bubble Sort'],
                        'correct_option' => 'option1'
                    ],
                ],
                'hard' => [
                    [
                        'question' => 'What is the time complexity of the Travelling Salesman Problem using brute-force?',
                        'options' => ['O(n!)', 'O(2^n)', 'O(n^2)'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which algorithm is used to find strongly connected components in a graph?',
                        'options' => ["Kosaraju's Algorithm", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the best time complexity for comparison-based sorting algorithms?',
                        'options' => ['O(n log n)', 'O(log n)', 'O(n)'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'Which algorithm is used for finding maximum flow in a network?',
                        'options' => ['Ford-Fulkerson Algorithm', "Dijkstra's Algorithm", 'Bellman-Ford Algorithm'],
                        'correct_option' => 'option1'
                    ],
                    [
                        'question' => 'What is the purpose of the Bellman-Ford algorithm?',
                        'options' => ['To find shortest paths in graphs with negative weights', 'To sort elements', 'To balance binary trees'],
                        'correct_option' => 'option1'
                    ],
                ],
            ],
        ];

        return $questions[$topic][$difficulty] ?? [];
    }
}
