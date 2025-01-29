import React from 'react';
import { Link } from '@inertiajs/react';

const Show = ({ quiz }) => {


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
            <p className="text-gray-700">Topic: {quiz.topic?.name || 'No Topic'}</p>
            <p className="text-gray-700">Difficulty: {quiz.difficulty}</p>
            <p className="text-gray-700">Description: {quiz.description || 'No description available.'}</p>

            <h2 className="text-xl font-bold mt-6 mb-4">Questions</h2>
            {quiz.questions.length > 0 ? (
                <ul>
                    {quiz.questions.map((question) => (
                        <li key={question.id} className="mb-2">
                            {question.question_text}
                            <ul>
                                <li><i class='bx bxs-circle'></i> {question.option1}</li>
                                <li><i class='bx bxs-circle'></i> {question.option2}</li>
                                <li><i class='bx bxs-circle'></i> {question.option3}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions available for this quiz.</p>
            )}

            <Link href={`/admin/quizzes/${quiz.id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
                Edit Quiz
            </Link>
        </div>
    );
};

export default Show;