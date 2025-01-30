import { Head, useForm } from '@inertiajs/react';

export default function QuizShow({ quiz, flash }) {
    const { data, setData, post, processing } = useForm({
        answers: {}, // Store user answers here
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('quizzes.submit', quiz.id)); // Submit answers to the server
    };

    return (
        <>
            <Head title={quiz.title} />
            <div className="p-6">
                <h1 className="text-2xl font-bold">{quiz.title}</h1>
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

                {/* Quiz form */}
                {!flash?.success && (
                    <form onSubmit={handleSubmit}>
                        {quiz.questions.map((question) => (
                            <div key={question.id} className="mb-4">
                                <h3 className="text-lg font-semibold">{question.question_text}</h3>
                                <label className="block">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value="option1"
                                        onChange={() =>
                                            setData('answers', { ...data.answers, [question.id]: 'option1' })
                                        }
                                    />
                                    <span className="ml-2">{question.option1}</span>
                                </label>
                                <label className="block">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value="option2"
                                        onChange={() =>
                                            setData('answers', { ...data.answers, [question.id]: 'option2' })
                                        }
                                    />
                                    <span className="ml-2">{question.option2}</span>
                                </label>
                                <label className="block">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value="option3"
                                        onChange={() =>
                                            setData('answers', { ...data.answers, [question.id]: 'option3' })
                                        }
                                    />
                                    <span className="ml-2">{question.option3}</span>
                                </label>
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 inline-block bg-[#FF2D20] text-white px-4 py-2 rounded-md hover:bg-[#e6291f]"
                        >
                            Submit Answers
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}