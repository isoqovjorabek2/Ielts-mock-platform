import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './lib/i18n'

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
        <Route path="/booking" element={<Booking />} />
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