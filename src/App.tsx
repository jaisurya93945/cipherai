import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ChatBot } from './components/ChatBot'
import { CustomCursor } from './components/CustomCursor'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { ToolsPage } from './pages/ToolsPage'
import { StudentsPage } from './pages/StudentsPage'
import { CareersPage } from './pages/CareersPage'
import { WhyUsPage } from './pages/WhyUsPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import BuyCreditsPage from './pages/BuyCreditsPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import CoursesPage from './pages/CoursesPage'
import PromptEnhancerPage from './tools/prompt-enhancer/PromptEnhancerPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
          <CustomCursor />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/why-us" element={<WhyUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/buy-credits" element={<ProtectedRoute><BuyCreditsPage /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/tools/prompt-enhancer" element={<PromptEnhancerPage />} />

            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
