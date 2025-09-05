import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react'
import { Timer } from '../UI/Timer'
import { ProgressBar } from '../UI/ProgressBar'
import { QuestionComponent, Question } from './QuestionComponent'
import { useTimer } from '../../hooks/useTimer'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { calculateBandScore } from '../../lib/utils'

interface ExamInterfaceProps {
  examType: 'listening' | 'reading' | 'writing' | 'speaking'
  questions: Question[]
  duration: number // in minutes
}

export function ExamInterface({ examType, questions, duration }: ExamInterfaceProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, incrementFreeTestUsage } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { timeLeft, isRunning, start, getTimeSpent } = useTimer(
    duration * 60,
    handleTimeUp
  )

  useEffect(() => {
    start()
  }, [])

  function handleTimeUp() {
    handleSubmitExam()
  }

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    
    questions.forEach(question => {
      const userAnswer = answers[question.id]
      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer) && 
            userAnswer.length === question.correctAnswer.length &&
            userAnswer.every(ans => question.correctAnswer.includes(ans))) {
          correctAnswers++
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++
        }
      }
    })

    return {
      correct: correctAnswers,
      total: questions.length,
      bandScore: calculateBandScore(correctAnswers, questions.length)
    }
  }

  const handleSubmitExam = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const score = calculateScore()
      const timeSpent = getTimeSpent()

      // Save exam result
      if (user) {
        await supabase.from('exam_results').insert({
          user_id: user.id,
          exam_type: examType,
          section_scores: { [examType]: score.bandScore },
          overall_score: score.bandScore,
          time_taken: timeSpent,
          answers: answers
        })

        // Increment free test usage if needed
        await incrementFreeTestUsage()
      }

      // Navigate to results page with score data
      navigate('/results', {
        state: {
          examType,
          score: score.bandScore,
          correct: score.correct,
          total: score.total,
          timeSpent,
          answers
        }
      })
    } catch (error) {
      console.error('Error submitting exam:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const answeredQuestions = Object.keys(answers).length

  return (
    <div className="exam-interface">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900 capitalize">
              IELTS {t(examType)} Test
            </h1>
            <ProgressBar
              current={currentQuestion + 1}
              total={questions.length}
              className="w-32"
            />
          </div>
          <Timer timeLeft={timeLeft} isRunning={isRunning} />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question navigation sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`
                      w-8 h-8 rounded text-sm font-medium transition-colors
                      ${currentQuestion === index
                        ? 'bg-primary-600 text-white'
                        : answers[questions[index].id]
                        ? 'bg-success-100 text-success-800 border border-success-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Answered: {answeredQuestions}/{questions.length}</p>
              </div>
            </div>
          </div>

          {/* Question content */}
          <div className="lg:col-span-3">
            <QuestionComponent
              question={currentQ}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              answer={answers[currentQ.id] || ''}
              onAnswerChange={(answer) => handleAnswerChange(currentQ.id, answer)}
            />

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t('previousQuestion')}</span>
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    // Mark for review functionality could be added here
                  }}
                  className="flex items-center space-x-2 btn-outline"
                >
                  <Flag className="w-4 h-4" />
                  <span>Flag for Review</span>
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmitExam}
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? 'Submitting...' : t('finishExam')}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center space-x-2 btn-primary"
                  >
                    <span>{t('nextQuestion')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}