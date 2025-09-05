import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Clock, 
  BookOpen, 
  CreditCard, 
  CheckCircle, 
  Users, 
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { LoadingSpinner } from '../components/UI/LoadingSpinner'
import { RelatedContent, SEOLink } from '../components/UI/InternalLinks'

interface Price {
  id: string
  exam_type: string
  price_cents: number
  currency: string
  is_active: boolean
}

export function Booking() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPrices(data || [])
    } catch (error) {
      console.error('Error fetching prices:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (cents: number, currency: string) => {
    const amount = cents / 100
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const handleBookExam = async (examType: string, priceCents: number) => {
    if (!user) {
      navigate('/login')
      return
    }

    setBookingLoading(true)
    
    try {
      // Here you would integrate with Stripe or your payment processor
      // For now, we'll show an alert with next steps
      alert(`Payment integration coming soon!\n\nExam: ${examType}\nPrice: ${formatPrice(priceCents, 'USD')}\n\nThis will redirect to secure payment processing.`)
      
      // TODO: Implement Stripe integration
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     exam_type: examType,
      //     price_cents: priceCents,
      //     user_id: user.id
      //   })
      // })
      // const { url } = await response.json()
      // window.location.href = url
      
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const fullExamPrice = prices.find(p => p.exam_type === 'full')

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Local Mock Exam
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take your IELTS preparation to the next level with our supervised mock exams in a real test environment
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Supervised Environment
            </h3>
            <p className="text-gray-600">
              Experience real exam conditions with professional supervision
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Local Test Centers
            </h3>
            <p className="text-gray-600">
              Convenient locations across Uzbekistan for easy access
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-warning-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Detailed Feedback
            </h3>
            <p className="text-gray-600">
              Get comprehensive feedback from certified IELTS instructors
            </p>
          </div>
        </div>

        {/* Pricing Card */}
        {fullExamPrice && (
          <div className="max-w-2xl mx-auto">
            <div className="card border-2 border-primary-200 relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-medium">
                Most Popular
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Full IELTS Mock Exam
                </h2>
                <p className="text-gray-600">
                  Complete 4-section exam with professional supervision
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <DollarSign className="w-6 h-6 text-gray-400" />
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(fullExamPrice.price_cents, fullExamPrice.currency)}
                  </span>
                </div>
                <p className="text-gray-600">per exam session</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-success-600" />
                  <span className="text-gray-700">2 hours 45 minutes total duration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-success-600" />
                  <span className="text-gray-700">All 4 sections: Listening, Reading, Writing, Speaking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-success-600" />
                  <span className="text-gray-700">Certified instructor supervision</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span className="text-gray-700">Detailed performance feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-success-600" />
                  <span className="text-gray-700">Flexible scheduling options</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {user ? (
                  <button
                    onClick={() => handleBookExam(fullExamPrice.exam_type, fullExamPrice.price_cents)}
                    disabled={bookingLoading}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    {bookingLoading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Book Now - {formatPrice(fullExamPrice.price_cents, fullExamPrice.currency)}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <SEOLink 
                      to="/login" 
                      className="w-full btn-primary text-center block"
                      title="Sign in to book IELTS supervised exam"
                      aria-label="Sign in to your account to book exam"
                      title="Sign in to book IELTS supervised exam"
                      aria-label="Sign in to your account to book exam"
                    >
                      Sign In to Book
                    </SEOLink>
                    <p className="text-sm text-gray-600 text-center">
                      Don't have an account?{' '}
                      <SEOLink 
                        to="/register" 
                        className="text-primary-600 hover:text-primary-500 font-medium"
                        title="Create free account for IELTS practice"
                        aria-label="Sign up for free IELTS practice account"
                        title="Create free account for IELTS practice"
                        aria-label="Sign up for free IELTS practice account"
                      >
                        Sign up free
                      </SEOLink>
                    </p>
                  </div>
                )}
                
                <SEOLink 
                  to="/exams" 
                  className="w-full btn-outline text-center block"
                  title="Try free online IELTS mock exam first"
                  aria-label="Practice with free online IELTS tests"
                  title="Try free online IELTS mock exam first"
                  aria-label="Practice with free online IELTS tests"
                >
                  Try Free Online Mock First
                </SEOLink>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's included in the mock exam?
                </h3>
                <p className="text-gray-600">
                  You'll take a complete IELTS exam including Listening, Reading, Writing, and Speaking sections under real test conditions with professional supervision.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I schedule my exam?
                </h3>
                <p className="text-gray-600">
                  After booking, you'll receive an email with available time slots at your nearest test center. You can choose the most convenient option for you.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  When will I get my results?
                </h3>
                <p className="text-gray-600">
                  You'll receive your detailed score report and feedback within 24 hours of completing your mock exam via email.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I reschedule my exam?
                </h3>
                <p className="text-gray-600">
                  Yes, you can reschedule up to 48 hours before your scheduled exam time without any additional fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help or Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with booking and any questions about the mock exam process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@ieltsmock.uz" className="btn-outline">
              Email Support
            </a>
            <a href="tel:+998901234567" className="btn-outline">
              Call Us: +998 90 123 45 67
            </a>
          </div>
        </div>

        <RelatedContent currentPage="booking" />

      </div>
    </Layout>
  )
}