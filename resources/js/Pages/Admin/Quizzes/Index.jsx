import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ quizzes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    const openModal = (quiz) => {
        setQuizToDelete(quiz);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuizToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (quizToDelete) {
            if (quizToDelete) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/admin/quizzes/${quizToDelete.id}`;
    
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
        }
    };

    return (
        <AuthenticatedLayout>    
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-zinc-900 text-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-zinc-100 mb-6">Quizzes</h1>
                <Link href="/admin/quizzes/create" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md inline-block mb-4">
                    Create New Quiz
                </Link>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-zinc-800 border border-zinc-700 rounded-md">
                        <thead>
                            <tr className="bg-zinc-700 text-zinc-300">
                                <th className="py-3 px-4 border-b">Title</th>
                                <th className="py-3 px-4 border-b">Topic</th>
                                <th className="py-3 px-4 border-b">Difficulty</th>
                                <th className="py-3 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz, index) => (
                                <tr key={quiz.id} className={index % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-700'}>
                                    <td className="py-3 px-4 border-b">{quiz.title}</td>
                                    <td className="py-3 px-4 border-b">{quiz.topic?.name || 'No Topic'}</td>
                                    <td className="py-3 px-4 border-b">{quiz.difficulty}</td>
                                    <td className="py-3 px-4 border-b flex space-x-2">
                                        <Link href={`/admin/quizzes/${quiz.id}`} className="text-green-400 hover:underline">
                                            View
                                        </Link>
                                        <Link href={`/admin/quizzes/${quiz.id}/edit`} className="text-blue-400 hover:underline">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => openModal(quiz)}
                                            className="text-red-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    title="Delete Quiz"
                    message={`Are you sure you want to delete the quiz "${quizToDelete?.title}"? `}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
