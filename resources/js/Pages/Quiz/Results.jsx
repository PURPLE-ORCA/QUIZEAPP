import { Head, Link } from '@inertiajs/react';

export default function QuizResults({ quiz, flash }) {
    return (
        <>
            <Head title={`${quiz.title} - Results`} />

            <div className="mt-6">
                <Link
                    href={route('quizzes.welcome')} // Route to the Welcome page
                    className="inline-block bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                >
                    Back to Quizzes
                </Link>
            </div>

            <div className="p-6">
                <h1 className="text-2xl font-bold">{quiz.title} - Results</h1>
                <p>Difficulty: {quiz.difficulty}</p>
                <p>Topic: {quiz.topic?.title || 'No Topic'}</p>

                {/* Display success message and results */}
                {flash?.success && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
                        <p>{flash.success}</p>
                        {flash.results && (
                            <ul className="mt-2">
                                {flash.results.map((result) => (
                                    <li key={result.question_id} className="mb-2">
                                        <strong>{result.question_text}</strong>
                                        <p>Your answer: {result.user_answer}</p>
                                        <p>Correct answer: {result.correct_answer}</p>
                                        <p className={result.is_correct ? 'text-green-600' : 'text-red-600'}>
                                            {result.is_correct ? 'Correct!' : 'Incorrect.'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Fallback if no flash data is available */}
                {!flash?.success && (
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4">
                        <p>No results found. Please try submitting the quiz again.</p>
                    </div>
                )}


            </div>
        </>
    );
}