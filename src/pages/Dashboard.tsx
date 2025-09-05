import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BarChart3, Clock, Trophy, TrendingUp, BookOpen } from 'lucide-react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { LoadingSpinner } from '../components/UI/LoadingSpinner'
import { getScoreColor, formatTime } from '../lib/utils'

interface ExamResult {
  id: string
  exam_type: string
  overall_score: number
  time_taken: number
  completed_at: string
  section_scores: Record<string, number>
}

export function Dashboard() {
  const { t } = useTranslation()
  const { user, profile, loading: authLoading } = useAuth()
  const [results, setResults] = useState<ExamResult[]>([])
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && user) {
      fetchResults()
    }
  }, [user, authLoading])

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', user!.id)
        .order('completed_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setResults(data || [])
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setDashboardLoading(false)
    }
  }

  // If auth is still loading, don't render anything (App.tsx will show global spinner)
  if (authLoading) {
    return null
  }

  // If auth is done but no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If we have a user but dashboard data is still loading, show local spinner
  if (dashboardLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    )
  }


  const averageScore = results.length > 0 
    ? results.reduce((sum, result) => sum + result.overall_score, 0) / results.length
    : 0

  const totalTestsTaken = results.length
  const freeTestsRemaining = 1 // Simplified for now

  const getExamTypeStats = () => {
    const stats: Record<string, { count: number; avgScore: number }> = {}
    
    results.forEach(result => {
      if (!stats[result.exam_type]) {
        stats[result.exam_type] = { count: 0, avgScore: 0 }
      }
      stats[result.exam_type].count++
      stats[result.exam_type].avgScore += result.overall_score
    })

    Object.keys(stats).forEach(type => {
      stats[type].avgScore = stats[type].avgScore / stats[type].count
    })

    return stats
  }

  const examStats = getExamTypeStats()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-gray-600">
            Welcome back, {profile?.full_name || user.email}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-primary-600" />
            </div>
            <div className={`text-2xl font-bold mb-1 ${getScoreColor(averageScore)}`}>
              {averageScore > 0 ? averageScore.toFixed(1) : '--'}
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>

          <div className="card text-center">
            <div className="bg-success-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-success-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {totalTestsTaken}
            </div>
            <div className="text-sm text-gray-600">Tests Completed</div>
          </div>

          <div className="card text-center">
            <div className="bg-warning-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-warning-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {freeTestsRemaining}
            </div>
            <div className="text-sm text-gray-600">{t('freeTestsRemaining')}</div>
          </div>

          <div className="card text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {profile?.subscription_status === 'premium' ? 'Premium' : 'Free'}
            </div>
            <div className="text-sm text-gray-600">Account Status</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tests */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t('recentTests')}
              </h3>
              
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No tests completed yet</p>
                  <Link to="/exams" className="btn-primary">
                    Take Your First Test
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="capitalize font-medium text-gray-900">
                          {t(result.exam_type)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(result.completed_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(result.time_taken)}</span>
                        </div>
                        <div className={`text-lg font-semibold ${getScoreColor(result.overall_score)}`}>
                          {result.overall_score.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="space-y-6">
            {/* Section Performance */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Section Performance
              </h3>
              
              {Object.keys(examStats).length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  Complete some tests to see your performance
                </p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(examStats).map(([type, stats]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="capitalize text-gray-700">
                        {t(type)}
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${getScoreColor(stats.avgScore)}`}>
                          {stats.avgScore.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stats.count} test{stats.count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link to="/exams" className="block w-full btn-primary text-center">
                  Take New Test
                </Link>
                <Link to="/profile" className="block w-full btn-outline text-center">
                  Edit Profile
                </Link>
                {profile?.subscription_status !== 'premium' && (
                  <button className="w-full btn-secondary">
                    {t('upgradeAccount')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}