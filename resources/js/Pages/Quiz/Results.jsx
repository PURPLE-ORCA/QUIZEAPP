import { Head, Link } from '@inertiajs/react';

export default function QuizResults({ quiz, success, results }) {
    return (
        <div className="bg-black text-white">
            <Head title={`${quiz.title} - Results`} />
            <div className="mt-6 flex justify-center">
                <Link
                    href={route('quizzes.welcome')}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-300 shadow-md focus:outline-none focus-visible:ring focus-visible:ring-green-400"
                >
                    Back to Quizzes
                </Link>
            </div>
            <div className="p-6 max-w-3xl mx-auto bg-black shadow-lg rounded-lg mt-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-green-400">{quiz.title} - Results</h1>
                <p className="text-lg text-gray-400 text-center">Difficulty: {quiz.difficulty}</p>
                {success && (
                    <div className="bg-black border border-green-600 text-green-400 p-4 rounded-md mb-4">
                        <p className="font-semibold">{success}</p>
                        {results && (
                            <ul className="mt-2 space-y-4">
                                {results.map((result) => (
                                    <li
                                        key={result.question_id}
                                        className="p-4 border border-gray-700 rounded-md shadow-sm bg-black"
                                    >
                                        <strong className="block text-lg text-green-400">{result.question_text}</strong>
                                        <p className="text-gray-400">
                                            Your answer: <span className="font-semibold">{result.user_answer}</span>
                                        </p>
                                        <p className="text-gray-400">
                                            Correct answer: <span className="font-semibold">{result.correct_answer}</span>
                                        </p>
                                        <p
                                            className={
                                                result.is_correct
                                                    ? 'text-green-400 font-semibold'
                                                    : 'text-red-400 font-semibold'
                                            }
                                        >
                                            {result.is_correct ? '✅ Correct!' : '❌ Incorrect.'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {!success && (
                    <div className="bg-black border border-yellow-400 text-yellow-400 p-4 rounded-md mb-4">
                        <p className="font-semibold">No results found. Please try submitting the quiz again.</p>
                    </div>
                )}
            </div>
        </div>
    );
}