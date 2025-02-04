import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ quiz, topics }) => {
    const { data, setData, put, processing, errors } = useForm({
        topic_id: quiz.topic_id,
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/quizzes/${quiz.id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-black text-white">
                <h1 className="text-2xl font-bold mb-4 text-green-400">Edit Quiz</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Topic</label>
                        <select
                            value={data.topic_id}
                            onChange={(e) => setData('topic_id', e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-gray-300"
                        >
                            <option value="" className="text-gray-400">
                                Select a topic
                            </option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id} className="text-gray-300">
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        {errors.topic_id && <p className="text-red-500 text-sm">{errors.topic_id}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-gray-300"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-gray-300"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Difficulty</label>
                        <select
                            value={data.difficulty}
                            onChange={(e) => setData('difficulty', e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-gray-300"
                        >
                            <option value="easy" className="text-gray-300">
                                Easy
                            </option>
                            <option value="medium" className="text-gray-300">
                                Medium
                            </option>
                            <option value="hard" className="text-gray-300">
                                Hard
                            </option>
                            <option value="masochist_mode" className="text-gray-300">
                                Masochist Mode
                            </option>
                        </select>
                        {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 disabled:opacity-50"
                    >
                        Update Quiz
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;