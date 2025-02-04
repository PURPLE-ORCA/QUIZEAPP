import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmationModal from '@/Components/ConfirmationModal';

const Show = ({ quiz }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [bulkDeleteQuestions, setBulkDeleteQuestions] = useState(null); // State for bulk delete

    const openModal = (question) => {
        setQuestionToDelete(question);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuestionToDelete(null);
        setBulkDeleteQuestions(null); // Reset bulk delete state
    };

    const handleDelete = () => {
        if (questionToDelete) {
            router.delete(`/admin/questions/${questionToDelete.id}`, {
                onSuccess: () => {
                    closeModal(); // Close the modal after deletion
                },
            });
        }
    };

    const handleBulkDelete = () => {
        if (selectedQuestions.length > 0) {
            setBulkDeleteQuestions(selectedQuestions); // Set questions for bulk delete
            setIsModalOpen(true); // Open confirmation modal
        }
    };

    const handleConfirmBulkDelete = () => {
        if (bulkDeleteQuestions && bulkDeleteQuestions.length > 0) {
            router.post('/admin/questions/bulk-delete', {
                questions: bulkDeleteQuestions.map(q => q.id), // Send question IDs as an array
            }, {
                preserveState: true,
                onSuccess: () => {
                    setSelectedQuestions([]); // Clear selected questions after deletion
                    closeModal();
                },
            });
        }
    };

    const handleCheckboxChange = (question) => {
        setSelectedQuestions((prevSelected) => {
            if (prevSelected.some((q) => q.id === question.id)) {
                return prevSelected.filter((q) => q.id !== question.id);
            } else {
                return [...prevSelected, question];
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 mt-10 bg-black shadow-md rounded-lg max-w-4xl mx-auto text-white">
                <h1 className="text-3xl font-bold text-green-400 mb-6">{quiz.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <p className="text-gray-400 font-medium">Topic: <span className="text-gray-200">{quiz.topic?.name || 'No Topic'}</span></p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <p className="text-gray-400 font-medium">Difficulty: <span className="capitalize text-gray-200">{quiz.difficulty}</span></p>
                    </div>
                </div>
                <div className="mb-8">
                    <p className="text-gray-400 leading-relaxed">{quiz.description || 'No description available.'}</p>
                </div>
                <div className='flex justify-between items-center mb-6'>
                    <div className="">
                        <Link
                            href={`/admin/quizzes/${quiz.id}/questions/create`}
                            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
                        >
                            <i className='bx bx-plus mr-2'></i>
                            Add New Question
                        </Link>
                    </div>
                    <div className="">
                        <Link
                            href={`/admin/quizzes/${quiz.id}/edit`}
                            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
                        >
                            <i className='bx bx-edit mr-2'></i>
                            Edit Quiz
                        </Link>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-green-400 border-b border-gray-700 pb-2 mb-6">Questions</h2>
                {/* Bulk Actions */}
                {selectedQuestions.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Delete Selected ({selectedQuestions.length})
                        </button>
                    </div>
                )}
                {quiz.questions.length > 0 ? (
                    <div className="space-y-4">
                        {quiz.questions.map((question) => (
                            <div key={question.id} className="bg-gray-800 rounded-lg p-4 shadow-sm relative flex items-start">
                                <input
                                    type="checkbox"
                                    checked={selectedQuestions.some((q) => q.id === question.id)}
                                    onChange={() => handleCheckboxChange(question)}
                                    className="mr-4 accent-green-400"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-200 mb-3">{question.question_text}</h3>
                                    <ul className="space-y-2 pl-2">
                                        {['option1', 'option2', 'option3'].map((opt) => (
                                            <li key={opt} className="flex items-center text-gray-400">
                                                <i className='bx bxs-circle text-xs mr-2 text-green-400'></i>
                                                {question[opt]}
                                            </li>
                                        ))}
                                        <li className="flex items-center font-medium text-green-400 mt-2">
                                            <i className='bx bx-check text-lg mr-2'></i>
                                            Correct Answer: {question.correct_option}
                                        </li>
                                    </ul>
                                </div>
                                {/* Edit and Delete Links */}
                                <div className="absolute top-4 right-4 space-x-2">
                                    <Link
                                        href={`/admin/questions/${question.id}/edit`}
                                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
                                    >
                                        <i className='bx bx-edit mr-2'></i>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => openModal(question)}
                                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
                                    >
                                        <i className='bx bx-trash mr-2'></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No questions available for this quiz.</p>
                )}
                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={bulkDeleteQuestions ? handleConfirmBulkDelete : handleDelete}
                    title={bulkDeleteQuestions ? "Bulk Delete Questions" : "Delete Question"}
                    message={
                        bulkDeleteQuestions
                            ? `Are you sure you want to delete ${bulkDeleteQuestions.length} selected questions?`
                            : "Are you sure you want to delete this question? This action cannot be undone."
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;