const QuizCheckbox = ({ quiz, selectedQuizzes, onSelect }) => {
    const isChecked = selectedQuizzes.some((q) => q.id === quiz.id);
    return (
        <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onSelect(quiz)}
            className="accent-green-700"
        />
    );
};

export default QuizCheckbox;