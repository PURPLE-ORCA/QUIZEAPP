import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ quizzes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const [bulkDeleteQuizzes, setBulkDeleteQuizzes] = useState(null); // State for bulk delete

    const openModal = (quiz) => {
        setQuizToDelete(quiz);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuizToDelete(null);
        setBulkDeleteQuizzes(null); // Reset bulk delete state
    };

    const handleConfirmDelete = () => {
        if (quizToDelete) {
            router.delete(`/admin/quizzes/${quizToDelete.id}`, {
                preserveState: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleBulkDelete = () => {
        if (selectedQuizzes.length > 0) {
            setBulkDeleteQuizzes(selectedQuizzes); // Set quizzes for bulk delete
            setIsModalOpen(true); // Open confirmation modal
        }
    };

    const handleConfirmBulkDelete = () => {
        if (bulkDeleteQuizzes && bulkDeleteQuizzes.length > 0) {
            router.post('/admin/quizzes/bulk-delete', {
                quizzes: bulkDeleteQuizzes.map(q => q.id), // Send quiz IDs as an array
            }, {
                preserveState: true,
                onSuccess: () => {
                    setSelectedQuizzes([]); // Clear selected quizzes after deletion
                    closeModal();
                },
            });
        }
    };

    const handleCheckboxChange = (quiz) => {
        setSelectedQuizzes((prevSelected) => {
            if (prevSelected.some((q) => q.id === quiz.id)) {
                return prevSelected.filter((q) => q.id !== quiz.id);
            } else {
                return [...prevSelected, quiz];
            }
        });
    };

    return (
        <AuthenticatedLayout>    
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-zinc-900 text-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-zinc-100 mb-6">Quizzes</h1>
                <Link href="/admin/quizzes/create" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md inline-block mb-4">
                    Create New Quiz
                </Link>
                {/* Bulk Actions */}
                {selectedQuizzes.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Delete Selected ({selectedQuizzes.length})
                        </button>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-zinc-800 border border-zinc-700 rounded-md">
                        <thead>
                            <tr className="bg-zinc-700 text-zinc-300">
                                <th className="py-3 px-4 border-b w-8">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedQuizzes(quizzes);
                                            } else {
                                                setSelectedQuizzes([]);
                                            }
                                        }}
                                    />
                                </th>
                                <th className="py-3 px-4 border-b">Title</th>
                                <th className="py-3 px-4 border-b">Topic</th>
                                <th className="py-3 px-4 border-b">Difficulty</th>
                                <th className="py-3 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz, index) => (
                                <tr key={quiz.id} className={index % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-700'}>
                                    <td className="py-3 px-4 border-b">
                                        <input
                                            type="checkbox"
                                            checked={selectedQuizzes.some((q) => q.id === quiz.id)}
                                            onChange={() => handleCheckboxChange(quiz)}
                                        />
                                    </td>
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
                    onConfirm={bulkDeleteQuizzes ? handleConfirmBulkDelete : handleConfirmDelete}
                    title={bulkDeleteQuizzes ? "Bulk Delete Quizzes" : "Delete Quiz"}
                    message={
                        bulkDeleteQuizzes
                            ? `Are you sure you want to delete ${bulkDeleteQuizzes.length} selected quizzes?`
                            : `Are you sure you want to delete the quiz "${quizToDelete?.title}"?`
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;