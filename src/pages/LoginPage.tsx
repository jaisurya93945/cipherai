import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { signInWithGithub } from '@/lib/auth'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      console.error("Google login error:", error.message)
    }
  }

  const loginWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      console.error("GitHub login error:", error.message)
    }
  }

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    //Dummy
    localStorage.setItem("userLoggedIn", "True")

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first")
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Password reset email sent")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400">Sign in to continue your AI journey</p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200"
          >
            <Chrome className="w-5 h-5" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button
            onClick={signInWithGithub}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#0a0a0f] text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500/20"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <button
              type='button'
              onClick={handleForgotPassword}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/auth/signup/" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign up
          </Link>
        </p>

        {/* Features */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          {[
            { icon: Sparkles, text: '100 Free Credits Daily' },
            { icon: CheckCircle, text: 'No Credit Card Required' },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
              <feature.icon className="w-4 h-4 text-green-400" />
              {feature.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
