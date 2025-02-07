import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; // Import the modal
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TopicsIndex({ topics }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
    const [topicToDelete, setTopicToDelete] = useState(null); // Stores the topic to delete

    // Function to open the modal and set the topic to delete
    const openModal = (topic) => {
        setTopicToDelete(topic);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setTopicToDelete(null);
        setIsModalOpen(false);
    };

    // Function to handle the delete action
    const handleDelete = () => {
        if (topicToDelete) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/admin/topics/${topicToDelete.id}`;

            const methodInput = document.createElement('input');
            methodInput.type = 'hidden';
            methodInput.name = '_method';
            methodInput.value = 'DELETE';
            form.appendChild(methodInput);

            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            form.appendChild(csrfInput);

            document.body.appendChild(form);
            form.submit();
        }
        closeModal();
    };

    return (
        <AuthenticatedLayout >
            <div className="max-w-7xl mx-auto p-6 bg-black-900 text-white rounded-lg shadow-lg">
                <h1 className="text-5xl font-bold text-white-100 mb-6">Topics</h1>
                <Link href="/admin/topics/create">
                    <button className="mb-4 px-4 py-2 bg-green-900 hover:bg-green-600 text-white rounded-lg shadow-md">
                        Create New Topic
                    </button>
                </Link>
                <ul className="space-y-2">
                    {topics.length > 0 ? (
                        topics.map((topic) => (
                            <li key={topic.id} className="p-4 bg-zinc-800 rounded-lg shadow-md flex justify-between items-center">
                                <strong className="text-2xl text-zinc-200">{topic.name}</strong>{' '}
                                <span className="text-sm text-zinc-400">({topic.slug})</span>
                                <div className="mt-2 space-x-2">
                                    <Link href={`/admin/topics/${topic.id}/edit`}>
                                        <button className="px-3 py-1 bg-green-800 hover:bg-green-900 text-white rounded-md shadow">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => openModal(topic)}
                                        className="px-3 py-1 bg-red-900 hover:bg-red-800 text-white rounded-md shadow"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-white">No topics yet. create one!</p>
                    )}
                </ul>

                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleDelete}
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete the topic "${topicToDelete?.name}"? This action cannot be undone.`}
                />
            </div>
        </AuthenticatedLayout>
    );
}