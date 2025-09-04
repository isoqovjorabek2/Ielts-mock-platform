import React from 'react';

const QuestionCard: React.FC<{ question: string; answer: string; }> = ({ question, answer }) => {
    return (
        <div className="question-card">
            <h2>Question</h2>
            <p>{question}</p>
            <h3>Answer</h3>
            <p>{answer}</p>
        </div>
    );
};

export default QuestionCard;