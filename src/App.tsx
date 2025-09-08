import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './lib/i18n'

// Components
import { ProtectedRoute } from './components/Auth/ProtectedRoute'

// Pages
import { Home } from './pages/Home'
import { Exams } from './pages/Exams'
import { Booking } from './pages/Booking'
import { ExamPage } from './pages/ExamPage'
import { Results } from './pages/Results'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exams" element={<Exams />} />
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exam/:examType" 
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/results" 
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App