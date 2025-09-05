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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('exams')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive collection of IELTS mock exams
          </p>
        </div>

        {!user && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Sign up to start practicing
              </h3>
              <p className="text-primary-700 mb-4">
                Create a free account to access one complete mock exam
              </p>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary"
              >
                {t('register')}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="mt-12 text-center">
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-warning-900 mb-2">
                {t('freeTrialEnded')}
              </h3>
              <p className="text-warning-700 mb-4">
                {t('upgradeToAccess')}
              </p>
              <button className="btn-primary">
                {t('upgradeAccount')}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}