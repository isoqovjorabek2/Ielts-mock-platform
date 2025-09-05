import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface Question {
  id: string
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'matching'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  passage?: string
  audio?: string
}

interface QuestionComponentProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  answer: string | string[]
  onAnswerChange: (answer: string | string[]) => void
}

export function QuestionComponent({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswerChange
}: QuestionComponentProps) {
  const { t } = useTranslation()

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'fill-blank':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={answer as string || ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="input-field"
              placeholder="Type your answer here..."
            />
          </div>
        )

      case 'true-false':
        return (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="question-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('question')} {questionNumber} {t('of')} {totalQuestions}
        </h3>
      </div>

      {question.passage && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Reading Passage:</h4>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {question.passage}
          </div>
        </div>
      )}

      {question.audio && (
        <div className="mb-6">
          <audio controls className="w-full">
            <source src={question.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="mb-6">
        <p className="text-gray-900 font-medium mb-4">{question.question}</p>
        {renderQuestion()}
      </div>
    </div>
  )
}