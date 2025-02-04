import { Link } from "@inertiajs/react";
import QuizCheckbox from "./QuizCheckbox";

const QuizRow = ({ quiz, selectedQuizzes, onSelect, onOpenModal }) => {
    return (
        <tr className={quiz.index % 2 === 0 ? 'bg-black' : 'bg-gray-800'}>
            <td className="py-3 px-4 border-b">
                <QuizCheckbox quiz={quiz} selectedQuizzes={selectedQuizzes} onSelect={onSelect} />
            </td>
            <td className="py-3 px-4 border-b">{quiz.title}</td>
            <td className="py-3 px-4 border-b">{quiz.topic?.name || 'No Topic'}</td>
            <td className="py-3 px-4 border-b">{quiz.difficulty}</td>
            <td className="py-3 px-4 border-b flex space-x-2">
                <Link href={`/admin/quizzes/${quiz.id}`} className="text-green-400 hover:underline">
                    <i class="bx bxs-show"></i>
                </Link>
                <Link href={`/admin/quizzes/${quiz.id}/edit`} className="text-blue-400 hover:underline">
                    <i class="bx bxs-edit"></i>
                </Link>
                <button
                    onClick={() => onOpenModal(quiz)}
                    className="text-red-400 hover:underline"
                >
                    <i class="bx bxs-trash-alt"></i>
                </button>
            </td>
        </tr>
    );
};

export default QuizRow;