import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { signInWithGoogle } from '@/lib/auth'
import { signInWithGithub } from '@/lib/auth'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Sparkles,
  CheckCircle,
  User
} from 'lucide-react'
import { Logo } from '../components/Logo'
import toast from 'react-hot-toast'

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { email, password, name } = formData

    try {

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
          data: {
            name: name
          }
        }
      })

      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("Account already exists. Please sign in instead.")
        } else {
          toast.error(error.message)
        }

        setIsLoading(false)
        return
      }

      const newUser = data.user

      if (newUser) {

        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: newUser.id,
            email: newUser.email,
            daily_credits: 100,
            paid_credits: 0,
            max_credits: 100,
            plan_type: "free"
          })

        if (insertError) {
          console.error(insertError)
        }

      }

      toast.success("Account created successfully! Please verify your mail.")

      window.location.href = "/dashboard"

    } catch (err) {

      console.error(err)
      toast.error("Something went wrong")

    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-gray-400">Start your AI journey with 100 free credits</p>
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={signInWithGoogle}
            type="button"
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Must be at least 8 characters with letters, numbers, and symbols.
            </p>
          </div>

          <div className="flex items-start">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 mt-1 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500/20"
            />
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-400">
              I agree to the{' '}
              <Link to="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.agreeTerms}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full " />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/auth/login/" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign in
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
