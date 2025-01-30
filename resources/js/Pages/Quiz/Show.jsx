import { Head, Link } from '@inertiajs/react';

export default function QuizShow({ quiz }) {
    return (
        <>
            <Head title={quiz.title} />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="py-10">
                            <h1 className="text-3xl font-bold">{quiz.title}</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Topic: {quiz.topic?.name || 'No Topic'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Difficulty: {quiz.difficulty}
                            </p>
                        </header>

                        <main className="mt-6">
                            <form>
                                {quiz.questions.map((question, index) => (
                                    <div key={question.id} className="mb-6">
                                        <h3 className="text-lg font-semibold">{index + 1}. {question.question_text}</h3>
                                        <div className="ml-4">
                                            <label className="block">
                                                <input type="radio" name={`question-${question.id}`} value="option1" />
                                                <span className="ml-2">{question.option1}</span>
                                            </label>
                                            <label className="block">
                                                <input type="radio" name={`question-${question.id}`} value="option2" />
                                                <span className="ml-2">{question.option2}</span>
                                            </label>
                                            <label className="block">
                                                <input type="radio" name={`question-${question.id}`} value="option3" />
                                                <span className="ml-2">{question.option3}</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    className="mt-4 inline-block bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Submit Answers
                                </button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}