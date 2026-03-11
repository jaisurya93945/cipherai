import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  Code,
  GraduationCap,
  Zap,
  Shield,
  Users,
  Sparkles,
  CheckCircle,
  Play
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const stats = [
  { value: '5K+', label: 'Active Students' },
  { value: '20+', label: 'AI Tools' },
  { value: '20+', label: 'Enterprise Clients' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths powered by advanced AI algorithms that adapt to your pace and style.',
  },
  {
    icon: Code,
    title: 'Custom Software Solutions',
    description: 'Enterprise-grade software development tailored to your business needs and objectives.',
  },
  {
    icon: GraduationCap,
    title: 'EdTech Platform',
    description: 'Comprehensive learning management system with courses, tests, and progress tracking.',
  },
  {
    icon: Zap,
    title: 'AI Tools Marketplace',
    description: 'Access cutting-edge AI tools with daily free credits. Generate content, analyze data, and more.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with SOC 2 compliance, encryption, and regular security audits.',
  },
  {
    icon: Users,
    title: '24/7 Support',
    description: 'Round-the-clock support from our team of experts to help you succeed.',
  },
]

const testimonials = [
  {
    quote: "I've been testing some of tools on CipherAI, especially the prompt enhancer. It's simple but quite useful for improving prompts quickly.",
    author: "Rahul K",
    role: "Developer,Cognizant.",
    avatar: "RK"
  },
  {
    quote: "The AI tools marketplace is a game-changer. We save hours every day on content creation and data analysis.",
    author: "Michael Roberts",
    role: "Student, Coventry University",
    avatar: "MR"
  },
  {
    quote: "Best ed-tech platform we've used. The personalized learning paths have helped our students achieve better results.",
    author: "Emily Watson",
    role: "Student, Coventry University",
    avatar: "EW"
  },
]

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const navigate = useNavigate()
  const handleGetStarted = async () => {
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Introducing AI Tools Marketplace</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </div>

            {/* Headline */}
            <h1 className="heading-1 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-white">Build the Future with</span>
              <br />
              <span className="gradient-text">Intelligent AI Solutions</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              CipherAI combines cutting-edge software development, AI-powered education,
              and a marketplace of intelligent tools to accelerate your success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={handleGetStarted}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/tools/"
                className="group flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Explore AI Tools
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-blue-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="heading-2 mb-4">
              <span className="text-white">Everything You Need to </span>
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From AI-powered learning to enterprise software solutions, we provide the tools
              and technologies that drive innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 card-hover reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Preview Section */}
      <section className="section py-24 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">AI Tools Marketplace</span>
              </div>
              <h2 className="heading-2 mb-4">
                <span className="text-white">100 Free Credits </span>
                <span className="gradient-text">Every Day</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Access powerful AI tools for content generation, image creation, code assistance,
                data analysis, and more. Start for free and scale as you grow.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Text generation and summarization',
                  'AI image creation and editing',
                  'Code completion and review',
                  'Data analysis and visualization',
                  'Speech-to-text and translation',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/tools/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Explore AI Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-[#0f1117] border border-white/10 rounded-3xl p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-gray-500">AI Code Assistant</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-gray-400">// Generate a React component</div>
                  <div className="text-blue-400">function</div>
                  <div className="text-purple-400 pl-4">HeroSection</div>
                  <div className="text-white pl-4">{'() {'}</div>
                  <div className="text-gray-300 pl-8">return (</div>
                  <div className="text-blue-300 pl-12">{'<div className="hero">'}</div>
                  <div className="text-green-300 pl-16">Welcome to CipherAI</div>
                  <div className="text-blue-300 pl-12">{'</div>'}</div>
                  <div className="text-gray-300 pl-8">);</div>
                  <div className="text-white pl-4">{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EdTech Section */}
      <section className="section py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                      <GraduationCap className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">5K+</div>
                    <div className="text-sm text-gray-500">Active Students</div>
                  </div>
                  <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">95%</div>
                    <div className="text-sm text-gray-500">Completion Rate</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">10+</div>
                    <div className="text-sm text-gray-500">AI Courses</div>
                  </div>
                  <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">9.3</div>
                    <div className="text-sm text-gray-500">Student Rating</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <GraduationCap className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">EdTech Platform</span>
              </div>
              <h2 className="heading-2 mb-4">
                <span className="text-white">Learn AI with </span>
                <span className="gradient-text">Personalized Paths</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Our AI-powered learning platform adapts to your skill level and learning style.
                Take courses, practice with tests, and earn certificates.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Personalized learning paths',
                  'Interactive coding exercises',
                  'AI-powered tutoring assistance',
                  'Progress tracking and analytics',
                  'Industry-recognized certificates',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/students/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section py-24 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="heading-2 mb-4">
              <span className="text-white">Loved by </span>
              <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-gray-400 text-lg">
              See what our customers and students have to say about CipherAI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 lg:p-16 text-center reveal">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Future?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join 5000+ students and 10+ enterprises already using CipherAI to
                accelerate their success.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/auth/signup/"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/contact/"
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
