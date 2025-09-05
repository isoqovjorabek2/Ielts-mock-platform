import { Clock, BookOpen, Headphones, Mic, PenTool } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ExamCardProps {
  type: 'listening' | 'reading' | 'writing' | 'speaking' | 'full'
  duration: number
  questions: number
  onStart: () => void
  disabled?: boolean
}

const examIcons = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
  full: Clock
}

const examColors = {
  listening: 'bg-blue-50 border-blue-200 text-blue-800',
  reading: 'bg-green-50 border-green-200 text-green-800',
  writing: 'bg-purple-50 border-purple-200 text-purple-800',
  speaking: 'bg-orange-50 border-orange-200 text-orange-800',
  full: 'bg-primary-50 border-primary-200 text-primary-800'
}

export function ExamCard({ type, duration, questions, onStart, disabled = false }: ExamCardProps) {
  const { t } = useTranslation()
  const Icon = examIcons[type]

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${examColors[type]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
        {t(type)}
      </h3>

      <p className="text-gray-600 mb-4">
        {questions} questions • {duration} minutes
      </p>

      <button
        onClick={onStart}
        disabled={disabled}
        className={`w-full ${disabled ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`}
      >
        {t('start')} {t(type)}
      </button>

      {disabled && (
        <p className="text-sm text-error-600 mt-2 text-center">
          {t('upgradeToAccess')}
        </p>
      )}
    </div>
  )
}