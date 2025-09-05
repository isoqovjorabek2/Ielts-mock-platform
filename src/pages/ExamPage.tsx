import { useParams, Navigate } from 'react-router-dom'
import { ExamInterface } from '../components/Exam/ExamInterface'
import { useAuth } from '../hooks/useAuth'

// Sample questions for demonstration
const sampleQuestions = {
  listening: [
    {
      id: '1',
      type: 'multiple-choice' as const,
      question: 'What is the main topic of the conversation?',
      options: ['Travel plans', 'Work schedule', 'Weather forecast', 'Restaurant booking'],
      correctAnswer: 'Travel plans'
    },
    {
      id: '2',
      type: 'fill-blank' as const,
      question: 'The meeting is scheduled for _______ o\'clock.',
      correctAnswer: 'three'
    }
  ],
  reading: [
    {
      id: '1',
      type: 'multiple-choice' as const,
      question: 'According to the passage, what is the main cause of climate change?',
      options: ['Natural disasters', 'Human activities', 'Solar radiation', 'Ocean currents'],
      correctAnswer: 'Human activities',
      passage: 'Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations occur naturally, scientific evidence shows that human activities have been the main driver of climate change since the 1800s. The burning of fossil fuels like coal, oil, and gas produces greenhouse gases that trap heat in Earth\'s atmosphere.'
    },
    {
      id: '2',
      type: 'true-false' as const,
      question: 'Climate variations only occur due to human activities.',
      correctAnswer: 'False',
      passage: 'Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations occur naturally, scientific evidence shows that human activities have been the main driver of climate change since the 1800s.'
    }
  ],
  writing: [
    {
      id: '1',
      type: 'fill-blank' as const,
      question: 'Task 1: The chart below shows the percentage of households in different income brackets. Summarize the information by selecting and reporting the main features.',
      correctAnswer: 'essay'
    }
  ],
  speaking: [
    {
      id: '1',
      type: 'fill-blank' as const,
      question: 'Part 1: Tell me about your hometown. What do you like most about it?',
      correctAnswer: 'recording'
    }
  ]
}

export function ExamPage() {
  const { examType } = useParams<{ examType: string }>()
  const { user, canTakeTest } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!canTakeTest()) {
    return <Navigate to="/exams" replace />
  }

  if (!examType || !['listening', 'reading', 'writing', 'speaking'].includes(examType)) {
    return <Navigate to="/exams" replace />
  }

  const questions = sampleQuestions[examType as keyof typeof sampleQuestions] || []
  const duration = examType === 'reading' || examType === 'writing' ? 60 : 30

  return (
    <ExamInterface
      examType={examType as 'listening' | 'reading' | 'writing' | 'speaking'}
      questions={questions}
      duration={duration}
    />
  )
}