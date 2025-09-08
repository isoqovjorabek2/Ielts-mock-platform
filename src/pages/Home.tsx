import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Headphones, 
  PenTool, 
  Mic, 
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  Target,
  ArrowRight,
  Play
} from 'lucide-react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../hooks/useAuth'
import { RelatedContent } from '../components/UI/InternalLinks'

export function Home() {
  const { t } = useTranslation()
  const { user } = useAuth()

  const features = [
    {
      icon: Clock,
      title: 'Real Exam Timing',
      description: 'Experience authentic IELTS conditions with precise timing and pressure simulation',
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      icon: Target,
      title: 'AI-Powered Scoring',
      description: 'Get instant, accurate band scores with detailed performance analytics',
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      icon: Users,
      title: 'Expert Feedback',
      description: 'Receive personalized feedback from certified IELTS instructors',
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    {
      icon: Globe,
      title: 'Uzbek-Focused',
      description: 'Designed specifically for Uzbek students with local payment support',
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    }
  ]

  const examTypes = [
    {
      icon: Headphones,
      name: 'listening',
      duration: '30 min',
      questions: '40 questions',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Test your listening skills with authentic recordings'
    },
    {
      icon: BookOpen,
      name: 'reading',
      duration: '60 min',
      questions: '40 questions',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      description: 'Practice with academic and general reading passages'
    },
    {
      icon: PenTool,
      name: 'writing',
      duration: '60 min',
      questions: '2 tasks',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Improve your writing with Task 1 and Task 2 practice'
    },
    {
      icon: Mic,
      name: 'speaking',
      duration: '15 min',
      questions: '3 parts',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Build confidence with speaking practice sessions'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Students Helped', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '4.9/5', label: 'Student Rating', icon: Star },
    { number: '24/7', label: 'Support Available', icon: Shield }
  ]

  const testimonials = [
    {
      name: 'Aziza Karimova',
      location: 'Tashkent',
      score: '8.5',
      text: 'This platform helped me achieve my target score! The practice tests were exactly like the real exam.',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Bobur Rahimov',
      location: 'Samarkand',
      score: '7.5',
      text: 'The feedback was incredibly detailed. I improved my writing score by 1.5 bands in just 2 months!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Malika Tursunova',
      location: 'Bukhara',
      score: '8.0',
      text: 'The bilingual interface made it so easy to understand. Highly recommend for Uzbek students!',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]

  return (
    <Layout showBreadcrumbs={false}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-transparent"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Trusted by 10,000+ students</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Master IELTS with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Confidence
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
                The most advanced IELTS preparation platform designed specifically for Uzbek students. 
                Get real exam experience with AI-powered feedback.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {user ? (
                  <>
                    <Link 
                      to="/exams" 
                      className="group bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                      aria-label="Continue practicing with mock exams"
                      title="Continue practicing with IELTS mock exams"
                    >
                      <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Continue Practice</span>
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      aria-label="View your progress dashboard"
                      aria-label="View your progress dashboard"
                    >
                      <TrendingUp className="w-5 h-5" />
                      <span>View Progress</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="group bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                      aria-label="Sign up for free IELTS practice"
                      title="Start your free IELTS practice trial"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to="/exams" 
                      className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      aria-label="Try demo IELTS practice test"
                      aria-label="Try demo IELTS practice test"
                    >
                      <Play className="w-5 h-5" />
                      <span>Try Demo</span>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-6 text-primary-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free trial included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Practice Test Results</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Band 8.5
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Listening</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                        </div>
                        <span className="text-sm font-medium">9.0</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Reading</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm font-medium">8.5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Writing</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '80%'}}></div>
                        </div>
                        <span className="text-sm font-medium">8.0</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Speaking</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm font-medium">8.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most advanced IELTS preparation with features designed specifically for success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200">
                <div className={`p-4 rounded-xl ${feature.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Master All IELTS Sections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive practice tests for every part of the IELTS exam with real-time feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {examTypes.map((exam, index) => (
              <div key={index} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${exam.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  <div className={`p-4 rounded-xl ${exam.bgColor} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <exam.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                    {t(exam.name)}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {exam.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{exam.duration}</span>
                    </span>
                    <span>{exam.questions}</span>
                  </div>
                  
                  <Link 
                    to={`/exam/${exam.name}`}
                    title={`Start ${t(exam.name)} IELTS practice test`}
                    aria-label={`Begin ${t(exam.name)} section practice`}
                    className="group/btn w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Practice Now</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/exams" 
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              title="View all IELTS practice tests and mock exams"
              aria-label="Browse all available IELTS practice tests"
            >
              <span>View All Practice Tests</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of Uzbek students who achieved their target IELTS scores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.location}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-sm text-gray-500">Band Score:</span>
                      <span className="font-bold text-primary-600">{testimonial.score}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Achieve Your Target Score?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join over 10,000 successful students who improved their IELTS scores with our platform. 
            Start your journey today with a free trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {user ? (
              <>
                <Link 
                  to="/exams" 
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Continue practicing IELTS mock exams"
                  title="Continue with IELTS practice tests"
                >
                  Continue Practice Tests
                </Link>
                <Link 
                  to="/booking" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                  aria-label="Book local supervised IELTS exam"
                  aria-label="Book local supervised IELTS exam"
                >
                  Book Local Exam
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Sign up for free IELTS practice account"
                  title="Start free IELTS practice trial"
                >
                  Start Free Trial
                </Link>
                <Link 
                  to="/exams" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                  aria-label="Try demo IELTS practice test"
                  aria-label="Try demo IELTS practice test"
                >
                  Try Demo Test
                </Link>
              </>
            )}
          </div>

          <RelatedContent currentPage="home" />


          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-primary-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free trial • No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Secure • Trusted by 10,000+ students</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}