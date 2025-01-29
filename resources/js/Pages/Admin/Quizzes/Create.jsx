import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ topics }) => {
    const { data, setData, post, processing, errors } = useForm({
        topic_id: '',
        title: '',
        description: '',
        difficulty: 'easy',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/quizzes');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Topic</label>
                        <select
                            value={data.topic_id}
                            onChange={(e) => setData('topic_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select a topic</option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        {errors.topic_id && <p className="text-red-500 text-sm">{errors.topic_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                        <select
                            value={data.difficulty}
                            onChange={(e) => setData('difficulty', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Create Quiz
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;