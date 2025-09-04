import React, { useState, useEffect } from 'react';

interface ExamTimerProps {
    duration: number;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <h2>Exam Timer</h2>
            <p>{formatTime(timeLeft)}</p>
        </div>
    );
};

export default ExamTimer;