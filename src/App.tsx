import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from './hooks/useAuth'
import { LoadingSpinner } from './components/UI/LoadingSpinner'
import './lib/i18n'

// Pages
import { Home } from './pages/Home'
import { Exams } from './pages/Exams'
import { ExamPage } from './pages/ExamPage'
import { Results } from './pages/Results'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { Profile } from './pages/Profile'

function App() {
  const { ready } = useTranslation()
  const { user, loading: authLoading } = useAuth()

  // Only show loading if i18n is not ready, or if auth is still loading AND we don't have a user yet
  if (!ready || (authLoading && user === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exam/:examType" element={<ExamPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App