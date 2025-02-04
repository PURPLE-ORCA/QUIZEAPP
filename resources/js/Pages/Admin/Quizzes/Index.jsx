import React, { useState , useCallback} from 'react';
import { Link, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import QuizRow from '@/Components/QuizRow';

const Index = ({ quizzes }) => {
    const [state, setState] = useState({
        isModalOpen: false,
        quizToDelete: null,
        selectedQuizzes: [],
    });

    // Handlers
    const openModal = useCallback((quiz) => {
        setState((prevState) => ({ ...prevState, isModalOpen: true, quizToDelete: quiz }));
    }, []);

    const closeModal = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            isModalOpen: false,
            quizToDelete: null,
            selectedQuizzes: [],
        }));
    }, []);

    const handleConfirmDelete = useCallback(() => {
        if (state.quizToDelete) {
            router.delete(`/admin/quizzes/${state.quizToDelete.id}`, {
                preserveState: true,
                onSuccess: () => closeModal(),
            });
        }
    }, [state.quizToDelete, closeModal]);

    const handleBulkDelete = useCallback(() => {
        if (state.selectedQuizzes.length > 0) {
            setState((prevState) => ({
                ...prevState,
                isModalOpen: true,
                quizToDelete: null,
            }));
        }
    }, [state.selectedQuizzes]);

    const handleConfirmBulkDelete = useCallback(() => {
        if (state.selectedQuizzes.length > 0) {
            router.post('/admin/quizzes/bulk-delete', {
                quizzes: state.selectedQuizzes.map((q) => q.id),
            }, {
                preserveState: true,
                onSuccess: () => {
                    setState((prevState) => ({
                        ...prevState,
                        selectedQuizzes: [],
                        isModalOpen: false,
                    }));
                },
            });
        }
    }, [state.selectedQuizzes]);

    const handleCheckboxChange = useCallback((quiz) => {
        setState((prevState) => ({
            ...prevState,
            selectedQuizzes: prevState.selectedQuizzes.includes(quiz)
                ? prevState.selectedQuizzes.filter((q) => q.id !== quiz.id)
                : [...prevState.selectedQuizzes, quiz],
        }));
    }, []);

    const handleSelectAll = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            selectedQuizzes: e.target.checked ? quizzes : [],
        }));
    }, [quizzes]);

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-black text-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-green-400 mb-6">Quizzes</h1>
                <Link href="/admin/quizzes/create" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow-md inline-block mb-4">
                    Create New Quiz
                </Link>

                {/* Bulk Actions */}
                {state.selectedQuizzes.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Delete Selected ({state.selectedQuizzes.length})
                        </button>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-black border border-gray-700 rounded-md">
                        <thead>
                            <tr className="bg-gray-800 text-gray-400">
                                <th className="py-3 px-4 border-b w-8">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        className="accent-green-400"
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
                                <QuizRow
                                    key={quiz.id}
                                    quiz={{ ...quiz, index }}
                                    selectedQuizzes={state.selectedQuizzes}
                                    onSelect={handleCheckboxChange}
                                    onOpenModal={openModal}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={state.isModalOpen}
                    onClose={closeModal}
                    onConfirm={state.selectedQuizzes.length > 0 ? handleConfirmBulkDelete : handleConfirmDelete}
                    title={state.selectedQuizzes.length > 0 ? "Bulk Delete Quizzes" : "Delete Quiz"}
                    message={
                        state.selectedQuizzes.length > 0
                            ? `Are you sure you want to delete ${state.selectedQuizzes.length} selected quizzes?`
                            : `Are you sure you want to delete the quiz "${state.quizToDelete?.title}"?`
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;