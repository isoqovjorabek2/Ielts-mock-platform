import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface BreadcrumbItem {
  label: string
  path: string
  isActive?: boolean
}

export function Breadcrumbs() {
  const { t } = useTranslation()
  const location = useLocation()
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: t('home'), path: '/' }
    ]

    // Build breadcrumbs based on current path
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1

      switch (segment) {
        case 'exams':
          breadcrumbs.push({
            label: t('mockExams'),
            path: currentPath,
            isActive: isLast
          })
          break
        case 'exam':
          if (pathSegments[index + 1]) {
            const examType = pathSegments[index + 1]
            breadcrumbs.push({
              label: t('mockExams'),
              path: '/exams'
            })
            breadcrumbs.push({
              label: `${t(examType)} ${t('test')}`,
              path: currentPath + `/${examType}`,
              isActive: true
            })
          }
          break
        case 'dashboard':
          breadcrumbs.push({
            label: t('dashboard'),
            path: currentPath,
            isActive: isLast
          })
          break
        case 'profile':
          breadcrumbs.push({
            label: t('profile'),
            path: currentPath,
            isActive: isLast
          })
          break
        case 'booking':
          breadcrumbs.push({
            label: t('bookExam'),
            path: currentPath,
            isActive: isLast
          })
          break
        case 'results':
          breadcrumbs.push({
            label: t('testResults'),
            path: currentPath,
            isActive: isLast
          })
          break
        case 'login':
          breadcrumbs.push({
            label: t('signIn'),
            path: currentPath,
            isActive: isLast
          })
          break
        case 'register':
          breadcrumbs.push({
            label: t('signUp'),
            path: currentPath,
            isActive: isLast
          })
          break
        default:
          // Handle dynamic segments
          if (segment.length > 0) {
            breadcrumbs.push({
              label: segment.charAt(0).toUpperCase() + segment.slice(1),
              path: currentPath,
              isActive: isLast
            })
          }
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  // Don't show breadcrumbs on home page or if only home exists
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav 
      className="bg-gray-50 border-b border-gray-200 py-3"
      aria-label="Breadcrumb navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              
              {breadcrumb.isActive ? (
                <span 
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-primary-600 hover:text-primary-800 transition-colors duration-200 flex items-center"
                  title={`Navigate to ${breadcrumb.label}`}
                >
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}