import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User, Mail, Globe, Save } from 'lucide-react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../hooks/useAuth'
import { LoadingSpinner } from '../components/UI/LoadingSpinner'

export function Profile() {
  const { t, i18n } = useTranslation()
  const { user, profile, updateProfile, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    preferred_language: profile?.preferred_language || 'en'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await updateProfile(formData)
      
      if (error) {
        setMessage('Error updating profile: ' + error.message)
      } else {
        setMessage('Profile updated successfully!')
        // Update language if changed
        if (formData.preferred_language !== i18n.language) {
          i18n.changeLanguage(formData.preferred_language)
        }
      }
    } catch (err) {
      setMessage('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('profile')}
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`px-4 py-3 rounded-lg ${
                message.includes('Error') 
                  ? 'bg-error-50 border border-error-200 text-error-700'
                  : 'bg-success-50 border border-success-200 text-success-700'
              }`}>
                {message}
              </div>
            )}

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="input-field pl-10 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Preferred Language */}
            <div>
              <label htmlFor="preferred_language" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="preferred_language"
                  name="preferred_language"
                  value={formData.preferred_language}
                  onChange={handleChange}
                  className="input-field pl-10"
                >
                  <option value="en">English</option>
                  <option value="uz">O'zbekcha</option>
                </select>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Account Status:</span>
                  <span className="ml-2 font-medium capitalize">
                    {profile?.subscription_status || 'Free'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Free Tests Used:</span>
                  <span className="ml-2 font-medium">
                    {profile?.free_tests_used || 0} / 1
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {t('save')} Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}