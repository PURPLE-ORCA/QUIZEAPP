import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TopicsEdit({ topic }) {
    const { data, setData, put, processing, errors } = useForm({
        name: topic.name,
        slug: topic.slug,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/topics/${topic.id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto p-6 mt-44 bg-green-900 text-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-zinc-100 mb-6">Edit Topic: {topic.name}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-zinc-300 mb-1">Name:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter topic name"
                            className="w-full p-2 bg-green-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 text-white"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    <div>
                        <label className="block text-zinc-300 mb-1">Slug:</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="Auto-generated if left blank"
                            className="w-full p-2 bg-green-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 text-white"
                        />
                        {errors.slug && <span className="text-red-500 text-sm">{errors.slug}</span>}
                    </div>
                    <button type="submit" disabled={processing} className="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-md disabled:opacity-50">
                        Update Topic
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
