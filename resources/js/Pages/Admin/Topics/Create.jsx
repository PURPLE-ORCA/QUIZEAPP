import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TopicsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/topics');
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto mt-44 p-6 bg-green-900 text-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white-100 mb-6">Create New Topic</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Name:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter topic name"
                            className="w-full p-2 bg-green-800 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    <div>
                        <label className="block text-white mb-1">Slug (optional):</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="Auto-generated if left blank"
                            className="w-full p-2 bg-green-800 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                        />
                        {errors.slug && <span className="text-red-500 text-sm">{errors.slug}</span>}
                    </div>
                    <button type="submit" disabled={processing} className="w-full py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg shadow-md disabled:opacity-50">
                        Create Topic
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
