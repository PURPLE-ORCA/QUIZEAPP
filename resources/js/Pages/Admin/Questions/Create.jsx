import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ quiz }) => {
    const { data, setData, post, processing, errors } = useForm({
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        correct_option: 'option1', // Default value
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/quizzes/${quiz.id}/questions`, {
            onSuccess: () => {
                // Optionally reset the form after successful submission
                setData({
                    question_text: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    correct_option: 'option1',
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 mt-10 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Question</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Question Text */}
                    <div>
                        <label htmlFor="question_text" className="block text-sm font-medium text-gray-700">
                            Question Text
                        </label>
                        <input
                            type="text"
                            id="question_text"
                            name="question_text"
                            value={data.question_text}
                            onChange={(e) => setData('question_text', e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.question_text ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter the question text"
                        />
                        {errors.question_text && (
                            <p className="mt-2 text-sm text-red-600">{errors.question_text}</p>
                        )}
                    </div>

                    {/* Option 1 */}
                    <div>
                        <label htmlFor="option1" className="block text-sm font-medium text-gray-700">
                            Option 1
                        </label>
                        <input
                            type="text"
                            id="option1"
                            name="option1"
                            value={data.option1}
                            onChange={(e) => setData('option1', e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.option1 ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter option 1"
                        />
                        {errors.option1 && (
                            <p className="mt-2 text-sm text-red-600">{errors.option1}</p>
                        )}
                    </div>

                    {/* Option 2 */}
                    <div>
                        <label htmlFor="option2" className="block text-sm font-medium text-gray-700">
                            Option 2
                        </label>
                        <input
                            type="text"
                            id="option2"
                            name="option2"
                            value={data.option2}
                            onChange={(e) => setData('option2', e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.option2 ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter option 2"
                        />
                        {errors.option2 && (
                            <p className="mt-2 text-sm text-red-600">{errors.option2}</p>
                        )}
                    </div>

                    {/* Option 3 */}
                    <div>
                        <label htmlFor="option3" className="block text-sm font-medium text-gray-700">
                            Option 3
                        </label>
                        <input
                            type="text"
                            id="option3"
                            name="option3"
                            value={data.option3}
                            onChange={(e) => setData('option3', e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.option3 ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter option 3"
                        />
                        {errors.option3 && (
                            <p className="mt-2 text-sm text-red-600">{errors.option3}</p>
                        )}
                    </div>

                    {/* Correct Option */}
                    <div>
                        <label htmlFor="correct_option" className="block text-sm font-medium text-gray-700">
                            Correct Option
                        </label>
                        <select
                            id="correct_option"
                            name="correct_option"
                            value={data.correct_option}
                            onChange={(e) => setData('correct_option', e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.correct_option ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        {errors.correct_option && (
                            <p className="mt-2 text-sm text-red-600">{errors.correct_option}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
                        >
                            {processing ? (
                                <svg
                                    className="animate-spin h-5 w-5 mr-3"
                                    viewBox="0 0 24 24"
                                ></svg>
                            ) : (
                                <>
                                    <i className='bx bx-plus mr-2'></i>
                                    Add Question
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;