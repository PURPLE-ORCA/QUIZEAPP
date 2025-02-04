import { Head, useForm } from '@inertiajs/react';

export default function UserShow({ quiz, questions }) {
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('quizzes.submit', quiz.id), { data: { answers: data.answers } });
    };

    return (
        <div className="bg-black text-white">
            <Head title={quiz.title} />
            <div className="max-w-2xl mx-auto p-6 bg-black shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-green-400 mb-2">{quiz.title}</h1>
                <p className="text-gray-400">Difficulty: <span className="font-semibold">{quiz.difficulty}</span></p>
                <form onSubmit={handleSubmit} className="mt-6">
                    {questions.map((question) => (
                        <div key={question.id} className="mb-6 p-4 bg-black border border-gray-700 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-green-400 mb-2">{question.question_text}</h3>
                            <div className="space-y-2">
                                {[question.option1, question.option2, question.option3].map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center space-x-2 p-2 bg-black rounded-md border border-gray-600 cursor-pointer hover:bg-gray-800"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            className="w-5 h-5 text-green-400 focus:ring-green-400"
                                            onChange={(e) =>
                                                setData('answers', { ...data.answers, [question.id]: e.target.value })
                                            }
                                        />
                                        <span className="text-gray-400">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-500 disabled:opacity-50"
                    >
                        Submit Answers
                    </button>
                </form>
            </div>
        </div>
    );
}