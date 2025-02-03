import { Head, useForm } from '@inertiajs/react';

export default function QuizShow({ quiz, flash }) {
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('quizzes.submit', quiz.id));
    };

    return (
        <>
            <Head title={quiz.title} />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
                <p className="text-gray-600">Difficulty: <span className="font-semibold">{quiz.difficulty}</span></p>
                <p className="text-gray-600">Topic: <span className="font-semibold">{quiz.topic?.title || 'No Topic'}</span></p>

                {flash?.success && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                        <p className="font-semibold">{flash.success}</p>
                        {flash.results && (
                            <ul className="mt-2 space-y-2">
                                {flash.results.map((result) => (
                                    <li key={result.question_id} className="p-3 border rounded-lg bg-white shadow-sm">
                                        <strong className="text-gray-800">{result.question_text}</strong>
                                        <p>Your answer: <span className="font-semibold">{result.user_answer}</span></p>
                                        <p>Correct answer: <span className="font-semibold text-green-600">{result.correct_answer}</span></p>
                                        <p className={result.is_correct ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                            {result.is_correct ? 'Correct!' : 'Incorrect.'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {!flash?.success && (
                    <form onSubmit={handleSubmit} className="mt-6">
                        {quiz.questions.map((question) => (
                            <div key={question.id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{question.question_text}</h3>
                                <div className="space-y-2">
                                    {["option1", "option2", "option3"].map((option, index) => (
                                        <label key={option} className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-sm border cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option}
                                                className="w-5 h-5 text-red-500 focus:ring-red-400"
                                                onChange={() => setData('answers', { ...data.answers, [question.id]: option })}
                                            />
                                            <span className="text-gray-700">{question[option]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#FF2D20] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#e6291f] disabled:opacity-50"
                        >
                            Submit Answers
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
