import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Breadcrumbs } from '../UI/Breadcrumbs'
import { Breadcrumbs } from '../UI/Breadcrumbs'

interface LayoutProps {
  children: ReactNode
  showFooter?: boolean
  showBreadcrumbs?: boolean
  showFooter?: boolean
  showBreadcrumbs?: boolean
}

export function Layout({ children, showFooter = true, showBreadcrumbs = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showBreadcrumbs && <Breadcrumbs />}
      {showBreadcrumbs && <Breadcrumbs />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}