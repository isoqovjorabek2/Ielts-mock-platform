import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  BookOpen, 
  Trophy, 
  Users, 
  ArrowRight,
  Target,
  TrendingUp,
  Calendar
} from 'lucide-react'

interface InternalLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  title?: string
  'aria-label'?: string
}

// Enhanced Link component with SEO attributes
export function SEOLink({ to, children, className = '', title, 'aria-label': ariaLabel, ...props }: InternalLinkProps) {
  return (
    <Link
      to={to}
      className={`transition-colors duration-200 hover:text-primary-600 ${className}`}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Link>
  )
}

// Related content suggestions component
export function RelatedContent({ currentPage }: { currentPage: string }) {
  const { t } = useTranslation()

  const getRelatedLinks = () => {
    switch (currentPage) {
      case 'home':
        return [
          {
            to: '/exams',
            title: t('startPracticing'),
            description: t('takeYourFirstMockExam'),
            icon: BookOpen,
            variant: 'primary'
          },
          {
            to: '/booking',
            title: t('bookLocalExam'),
            description: t('experienceRealExamConditions'),
            icon: Calendar,
            variant: 'secondary'
          }
        ]
      
      case 'exams':
        return [
          {
            to: '/dashboard',
            title: t('viewProgress'),
            description: t('trackYourImprovement'),
            icon: TrendingUp,
            variant: 'primary'
          },
          {
            to: '/booking',
            title: t('bookSupervisedExam'),
            description: t('getExpertFeedback'),
            icon: Users,
            variant: 'secondary'
          }
        ]
      
      case 'results':
        return [
          {
            to: '/exams',
            title: t('practiceMore'),
            description: t('improveYourWeakAreas'),
            icon: Target,
            variant: 'primary'
          },
          {
            to: '/dashboard',
            title: t('viewAllResults'),
            description: t('trackProgressOverTime'),
            icon: Trophy,
            variant: 'secondary'
          }
        ]
      
      case 'dashboard':
        return [
          {
            to: '/exams',
            title: t('takeNewTest'),
            description: t('continueImproving'),
            icon: BookOpen,
            variant: 'primary'
          },
          {
            to: '/booking',
            title: t('upgradeToSupervised'),
            description: t('getPersonalizedFeedback'),
            icon: Users,
            variant: 'secondary'
          }
        ]
      
      default:
        return [
          {
            to: '/exams',
            title: t('practiceTests'),
            description: t('improveYourSkills'),
            icon: BookOpen,
            variant: 'primary'
          },
          {
            to: '/dashboard',
            title: t('trackProgress'),
            description: t('seeYourImprovement'),
            icon: TrendingUp,
            variant: 'secondary'
          }
        ]
    }
  }

  const relatedLinks = getRelatedLinks()

  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ArrowRight className="w-5 h-5 mr-2 text-primary-600" />
        {t('nextSteps')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedLinks.map((link, index) => (
          <SEOLink
            key={index}
            to={link.to}
            className={`
              block p-4 rounded-lg border transition-all duration-300 hover:shadow-md
              ${link.variant === 'primary' 
                ? 'bg-primary-50 border-primary-200 hover:bg-primary-100' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
              }
            `}
            title={link.title}
            aria-label={`${link.title}: ${link.description}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                p-2 rounded-lg
                ${link.variant === 'primary' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                <link.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{link.title}</h4>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
            </div>
          </SEOLink>
        ))}
      </div>
    </div>
  )
}

// Quick navigation component
export function QuickNavigation() {
  const { t } = useTranslation()

  const quickLinks = [
    { to: '/exams/listening', label: t('listeningTest'), icon: '🎧' },
    { to: '/exams/reading', label: t('readingTest'), icon: '📖' },
    { to: '/exams/writing', label: t('writingTest'), icon: '✍️' },
    { to: '/exams/speaking', label: t('speakingTest'), icon: '🎤' }
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h4 className="font-medium text-gray-900 mb-3">{t('quickAccess')}</h4>
      <div className="grid grid-cols-2 gap-2">
        {quickLinks.map((link) => (
          <SEOLink
            key={link.to}
            to={link.to}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-sm"
            title={`Start ${link.label}`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </SEOLink>
        ))}
      </div>
    </div>
  )
}