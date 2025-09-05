import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout/Layout'
import { ExamCard } from '../components/Exam/ExamCard'
import { useAuth } from '../hooks/useAuth'

export function Exams() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, canTakeTest } = useAuth()

  const examTypes = [
    {
      type: 'listening' as const,
      duration: 30,
      questions: 40
    },
    {
      type: 'reading' as const,
      duration: 60,
      questions: 40
    },
    {
      type: 'writing' as const,
      duration: 60,
      questions: 2
    },
    {
      type: 'speaking' as const,
      duration: 15,
      questions: 3
    },
    {
      type: 'full' as const,
      duration: 165,
      questions: 85
    }
  ]

  const handleStartExam = (examType: string) => {
    if (!user) {
      navigate('/login')
      return
    }

    if (!canTakeTest()) {
      // Show upgrade modal or redirect to payment
      alert(t('upgradeToAccess'))
      return
    }

    navigate(`/exam/${examType}`)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('exams')}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive collection of IELTS mock exams designed to replicate real test conditions
          </p>
        </div>

        {!user && (
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-8 mb-12 shadow-lg">
            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                Sign up to start practicing
              </h3>
              <p className="text-lg text-primary-700 mb-6 max-w-md mx-auto">
                Create a free account to access one complete mock exam with detailed feedback
              </p>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('register')}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examTypes.map((exam) => (
            <ExamCard
              key={exam.type}
              type={exam.type}
              duration={exam.duration}
              questions={exam.questions}
              onStart={() => handleStartExam(exam.type)}
              disabled={user ? !canTakeTest() : false}
            />
          ))}
        </div>

        {user && !canTakeTest() && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 rounded-2xl p-8 max-w-lg mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-warning-900 mb-4">
                {t('freeTrialEnded')}
              </h3>
              <p className="text-lg text-warning-700 mb-6">
                {t('upgradeToAccess')}
              </p>
              <button className="bg-warning-600 hover:bg-warning-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('upgradeAccount')}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}