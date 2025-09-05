import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen, Clock, Users, Award, Headphones, PenTool, Mic } from 'lucide-react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const { t } = useTranslation()
  const { user } = useAuth()

  const features = [
    {
      icon: Clock,
      title: 'Timed Practice',
      description: 'Experience real exam conditions with precise timing'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Tests',
      description: 'Complete practice tests for all IELTS sections'
    },
    {
      icon: Award,
      title: 'Instant Scoring',
      description: 'Get immediate feedback and band scores'
    },
    {
      icon: Users,
      title: 'Local Support',
      description: 'Designed specifically for Uzbek students'
    }
  ]

  const examTypes = [
    {
      icon: Headphones,
      name: 'listening',
      duration: '30 min',
      questions: '40 questions',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      icon: BookOpen,
      name: 'reading',
      duration: '60 min',
      questions: '40 questions',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      icon: PenTool,
      name: 'writing',
      duration: '60 min',
      questions: '2 tasks',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      icon: Mic,
      name: 'speaking',
      duration: '15 min',
      questions: '3 parts',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('welcomeSubtitle')}
            </p>
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard
                </Link>
                <Link to="/exams" className="btn-outline text-lg px-8 py-3">
                  Take Mock Exams
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/exams" className="btn-primary text-lg px-8 py-3">
                  {t('getStarted')}
                </Link>
                <Link to="/register" className="btn-outline text-lg px-8 py-3">
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for Uzbek students with local payment support and bilingual interface
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Practice All IELTS Sections
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive mock tests for every part of the IELTS exam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examTypes.map((exam, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-lg ${exam.color} w-fit mb-4`}>
                  <exam.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                  {t(exam.name)}
                </h3>
                <div className="text-gray-600 space-y-1">
                  <p>{exam.duration}</p>
                  <p>{exam.questions}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            {user ? (
              <Link to="/exams" className="btn-primary text-lg px-8 py-3">
                Continue Practice Tests
              </Link>
            ) : (
              <Link to="/exams" className="btn-primary text-lg px-8 py-3">
                Start Practice Tests
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your IELTS?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Uzbek students who have improved their IELTS scores with our platform
          </p>
          {user ? (
            <Link to="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Get Started Free
            </Link>
          )}
        </div>
      </section>
    </Layout>
  )
}