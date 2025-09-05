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
  
  const examGradients = {
    listening: 'from-blue-500 to-blue-600',
    reading: 'from-green-500 to-green-600',
    writing: 'from-purple-500 to-purple-600',
    speaking: 'from-orange-500 to-orange-600',
    full: 'from-primary-500 to-primary-600'
  }

  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200">
      <div className={`absolute inset-0 bg-gradient-to-br ${examGradients[type]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-xl ${examColors[type]} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="text-right text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration} min</span>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 capitalize group-hover:text-primary-600 transition-colors duration-300">
          {t(type)}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Practice with {questions} questions in {duration} minutes of focused preparation
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{questions}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{duration}</span>
        </div>

        <button
          onClick={onStart}
          disabled={disabled}
          className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
            disabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : `bg-gradient-to-r ${examGradients[type]} text-white hover:shadow-lg transform hover:-translate-y-0.5`
          }`}
        >
          <span>{t('start')} {t(type)}</span>
          {!disabled && <Icon className="w-4 h-4" />}
        </button>

        {disabled && (
          <p className="text-sm text-error-600 mt-3 text-center bg-error-50 py-2 px-4 rounded-lg">
            {t('upgradeToAccess')}
          </p>
        )}
      </div>
    </div>
  )
}