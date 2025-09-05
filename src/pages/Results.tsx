import { useLocation, Navigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Trophy, Clock, Target, TrendingUp, Home } from 'lucide-react'
import { Layout } from '../components/Layout/Layout'
import { getScoreColor, getScoreBgColor, formatTime } from '../lib/utils'

interface ResultsState {
  examType: string
  score: number
  correct: number
  total: number
  timeSpent: number
  answers: Record<string, any>
}

export function Results() {
  const { t } = useTranslation()
  const location = useLocation()
  const state = location.state as ResultsState

  if (!state) {
    return <Navigate to="/exams" replace />
  }

  const { examType, score, correct, total, timeSpent } = state
  const percentage = Math.round((correct / total) * 100)

  const getPerformanceMessage = (score: number) => {
    if (score >= 8.0) return 'Excellent! You\'re ready for the real exam.'
    if (score >= 7.0) return 'Great job! You\'re on the right track.'
    if (score >= 6.0) return 'Good work! Keep practicing to improve.'
    if (score >= 5.0) return 'You\'re making progress. Focus on weak areas.'
    return 'Keep practicing! You can improve with more preparation.'
  }

  const getImprovementAreas = (score: number, examType: string) => {
    const areas = []
    if (score < 6.0) {
      switch (examType) {
        case 'listening':
          areas.push('Focus on different accents and speaking speeds')
          areas.push('Practice note-taking while listening')
          break
        case 'reading':
          areas.push('Improve skimming and scanning techniques')
          areas.push('Work on vocabulary and comprehension')
          break
        case 'writing':
          areas.push('Practice essay structure and organization')
          areas.push('Expand vocabulary and grammar range')
          break
        case 'speaking':
          areas.push('Work on fluency and pronunciation')
          areas.push('Practice expressing ideas clearly')
          break
      }
    }
    return areas
  }

  const improvementAreas = getImprovementAreas(score, examType)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('yourScore')}
          </h1>
          <p className="text-xl text-gray-600 capitalize">
            IELTS {t(examType)} Test Results
          </p>
        </div>

        {/* Score Card */}
        <div className={`card mb-8 text-center ${getScoreBgColor(score)}`}>
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score.toFixed(1)}
            </div>
            <div className="text-lg text-gray-600">
              Band Score
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {correct}/{total}
              </div>
              <div className="text-sm text-gray-600">
                Correct Answers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">
                Accuracy
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 flex items-center justify-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Time Taken
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700">
            {getPerformanceMessage(score)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Breakdown */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Performance Breakdown
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Questions Answered</span>
                <span className="font-semibold">{Object.keys(state.answers).length}/{total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Correct Answers</span>
                <span className="font-semibold text-success-600">{correct}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Incorrect Answers</span>
                <span className="font-semibold text-error-600">{total - correct}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Accuracy Rate</span>
                <span className="font-semibold">{percentage}%</span>
              </div>
            </div>
          </div>

          {/* Improvement Areas */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-warning-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                {improvementAreas.length > 0 ? t('weakAreas') : t('strengths')}
              </h3>
            </div>
            
            {improvementAreas.length > 0 ? (
              <ul className="space-y-2">
                {improvementAreas.map((area, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-success-700">
                <p>Excellent performance! You demonstrated strong skills in:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Accuracy and comprehension</li>
                  <li>• Time management</li>
                  <li>• Question analysis</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link to="/exams" className="btn-primary">
            Take Another Test
          </Link>
          <Link to="/dashboard" className="btn-outline">
            View Dashboard
          </Link>
          <Link to="/" className="btn-secondary flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </Layout>
  )
}