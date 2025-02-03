import { Head, Link } from '@inertiajs/react';

export default function QuizResults({ quiz, flash }) {
    return (
        <>
            <Head title={`${quiz.title} - Results`} />

            <div className="mt-6 flex justify-center">
                <Link
                    href={route('quizzes.welcome')} // Route to the Welcome page
                    className="inline-block bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 shadow-md"
                >
                    Back to Quizzes
                </Link>
            </div>

            <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-6">
                <h1 className="text-3xl font-bold text-center mb-4">{quiz.title} - Results</h1>
                <p className="text-lg text-gray-600">Difficulty: {quiz.difficulty}</p>
                <p className="text-lg text-gray-600">Topic: {quiz.topic?.title || 'No Topic'}</p>

                {/* Display success message and results */}
                {flash?.success && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 border-l-4 border-green-600">
                        <p className="font-semibold">{flash.success}</p>
                        {flash.results && (
                            <ul className="mt-2 space-y-4">
                                {flash.results.map((result) => (
                                    <li key={result.question_id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                                        <strong className="block text-lg text-gray-800">{result.question_text}</strong>
                                        <p className="text-gray-700">Your answer: <span className="font-semibold">{result.user_answer}</span></p>
                                        <p className="text-gray-700">Correct answer: <span className="font-semibold">{result.correct_answer}</span></p>
                                        <p className={result.is_correct ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                            {result.is_correct ? '✅ Correct!' : '❌ Incorrect.'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Fallback if no flash data is available */}
                {!flash?.success && (
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4 border-l-4 border-yellow-600">
                        <p className="font-semibold">No results found. Please try submitting the quiz again.</p>
                    </div>
                )}
            </div>
        </>
    );
}
