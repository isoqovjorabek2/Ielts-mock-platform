import React from 'react';

const ScoreCard: React.FC<{ score: number }> = ({ score }) => {
    return (
        <div className="score-card">
            <h2>Your Score</h2>
            <p>{score}</p>
        </div>
    );
};

export default ScoreCard;