import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; 

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
            <Link href="/admin/quizzes/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Create New Quiz
            </Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Topic</th>
                        <th className="py-2 px-4 border-b">Difficulty</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td className="py-2 px-4 border-b">{quiz.title}</td>
                            <td className="py-2 px-4 border-b">{quiz.topic?.name || 'No Topic'}</td>
                            <td className="py-2 px-4 border-b">{quiz.difficulty}</td>
                            <td className="py-2 px-4 border-b">
                                <Link href={`/admin/quizzes/${quiz.id}`} className="text-green-500 hover:underline">
                                    View
                                </Link>
                                <Link href={`/admin/quizzes/${quiz.id}/edit`} className="text-blue-500 mr-2">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => openModal(quiz)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
                title="Delete Quiz"
                message={`Are you sure you want to delete the quiz "${quizToDelete?.title}"? `}
            />
        </div>
    );
};

export default Index;