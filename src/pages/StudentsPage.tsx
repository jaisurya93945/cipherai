import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Target,
  Clock,
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
  CheckCircle,
  Video,
  MessageCircle,
  FileCheck,
  Calendar,
  Sparkles,
  X
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const features = [
  {
    icon: BookOpen,
    title: '20+ AI Courses',
    description: 'Learn from beginner to advanced levels with our comprehensive AI curriculum.',
  },
  {
    icon: Target,
    title: 'Personalized Paths',
    description: 'AI-powered learning paths that adapt to your skill level and goals.',
  },
  {
    icon: Trophy,
    title: 'Earn Certificates',
    description: 'Get industry-recognized certificates upon course completion.',
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Join a community of 5000+ learners and collaborate on projects.',
  },
]

const courses = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML with hands-on projects and real-world examples.',
    level: 'Beginner',
    duration: '8 weeks',
    students: '2,500',
    rating: 4.8,
    image: 'ML',
    color: 'blue',
    topics: ['Supervised Learning', 'Neural Networks', 'Model Evaluation'],
  },
  {
    id: 2,
    title: 'Deep Learning with PyTorch',
    description: 'Master neural networks, CNNs, RNNs, and build cutting-edge AI models.',
    level: 'Advanced',
    duration: '12 weeks',
    students: '1,200',
    rating: 4.9,
    image: 'DL',
    color: 'purple',
    topics: ['CNNs', 'RNNs', 'Transformers', 'GANs'],
  },
  {
    id: 3,
    title: 'Natural Language Processing',
    description: 'Build chatbots, sentiment analyzers, and text generation models.',
    level: 'Intermediate',
    duration: '10 weeks',
    students: '800',
    rating: 4.7,
    image: 'NLP',
    color: 'green',
    topics: ['Tokenization', 'BERT', 'GPT Models', 'Chatbots'],
  },
  {
    id: 4,
    title: 'Computer Vision Fundamentals',
    description: 'Learn image processing, object detection, and facial recognition.',
    level: 'Intermediate',
    duration: '8 weeks',
    students: '500',
    rating: 4.8,
    image: 'CV',
    color: 'orange',
    topics: ['OpenCV', 'Object Detection', 'Face Recognition'],
  },
  {
    id: 5,
    title: 'MLOps & Model Deployment',
    description: 'Deploy ML models to production with CI/CD, monitoring, and scaling.',
    level: 'Advanced',
    duration: '6 weeks',
    students: '200',
    rating: 4.9,
    image: 'MLOps',
    color: 'pink',
    topics: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
  },
  {
    id: 6,
    title: 'AI Ethics & Responsible AI',
    description: 'Understand bias, fairness, and ethical considerations in AI systems.',
    level: 'Beginner',
    duration: '4 weeks',
    students: '1000',
    rating: 4.6,
    image: 'Ethics',
    color: 'cyan',
    topics: ['Bias Detection', 'Fairness', 'Explainability'],
  },
]

const testimonials = [
  {
    quote: "The personalized learning paths helped me go from zero to landing a job as an ML engineer in just 6 months.",
    author: "Ajay jhonson",
    role: "ML Engineer, CipherAI",
    avatar: "AJ"
  },
  {
    quote: "Best AI education platform I've used. The hands-on projects and community support are incredible.",
    author: "Maria Garcia",
    role: "Intern, Edurex",
    avatar: "MG"
  },
  {
    quote: "The certificates are recognized by employers. I got multiple interview calls after adding them to my resume.",
    author: "Danvanth Kushal",
    role: "AI intern, Cognizant",
    avatar: "DK"
  },
]

const demoFeatures = [
  { icon: Video, title: 'Live Demo Sessions', desc: 'Watch real-time AI model training' },
  { icon: MessageCircle, title: 'Expert Q&A', desc: 'Ask questions to industry experts' },
  { icon: FileCheck, title: 'Sample Projects', desc: 'Access to demo projects & code' },
  { icon: Calendar, title: 'Flexible Scheduling', desc: 'Book at your convenience' },
]

const colorClasses: Record<string, { bg: string; text: string; badge: string; gradient: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300', gradient: 'from-blue-500 to-cyan-500' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300', gradient: 'from-purple-500 to-pink-500' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', badge: 'bg-green-500/20 text-green-300', gradient: 'from-green-500 to-emerald-500' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300', gradient: 'from-orange-500 to-amber-500' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', badge: 'bg-pink-500/20 text-pink-300', gradient: 'from-pink-500 to-rose-500' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300', gradient: 'from-cyan-500 to-teal-500' },
}

const levelColors: Record<string, string> = {
  'Beginner': 'bg-green-500/20 text-green-300',
  'Intermediate': 'bg-yellow-500/20 text-yellow-300',
  'Advanced': 'bg-red-500/20 text-red-300',
}

export function StudentsPage() {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoForm, setDemoForm] = useState({ name: '', email: '', date: '', time: '' })
  const [demoSubmitted, setDemoSubmitted] = useState(false)

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from("demo_requests")
      .insert([
        {
          name: demoForm.name,
          email: demoForm.email,
          date: demoForm.date,
          time: demoForm.time
        }
      ])

    if (error) {
      console.error(error)
      toast.error("Something went wrong")
      return
    }

    setDemoSubmitted(true)

    setTimeout(() => {
      setShowDemoModal(false)
      setDemoSubmitted(false)
      setDemoForm({ name: '', email: '', date: '', time: '' })
    }, 3000)
  }

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
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6 animate-fade-in">
              <GraduationCap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">EdTech Platform</span>
            </div>
            <h1 className="heading-1 mb-6">
              <span className="text-white">Master AI with </span>
              <span className="gradient-text">Personalized Learning</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Join 50,000+ students learning AI through interactive courses, hands-on projects,
              and AI-powered personalized paths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Get Free Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-gray-500">AI Courses</div>
                </div>
                <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">10K+</div>
                  <div className="text-sm text-gray-500">Active Students</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">5K+</div>
                  <div className="text-sm text-gray-500">Certificates</div>
                </div>
                <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">4.9</div>
                  <div className="text-sm text-gray-500">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Everything You Need to </span>
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform provides all the tools and resources you need to master AI and advance your career.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 sm:p-12">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm text-white/90">Free Demo Session</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Experience Our Platform Firsthand
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Book a free 30-minute demo with our AI experts. See how our platform can accelerate your learning journey.
              </p>
              <button
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 hover:shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Schedule Your Demo
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {demoFeatures.map((feature, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <feature.icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="heading-2 mb-2">
              <span className="text-white">Popular </span>
              <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-gray-400">Start your AI journey with our most popular courses</p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const colors = colorClasses[course.color]
            return (
              <div
                key={course.id}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className={`h-32 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <span className={`text-3xl font-bold ${colors.text}`}>{course.image}</span>
                </div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.topics.slice(0, 3).map((topic, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-xs">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-300">{course.rating}</span>
                    </div>
                    <div className="text-gray-500">{course.students} students</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">How It </span>
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Start learning in just a few simple steps
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Sign Up', description: 'Create your free account in seconds' },
            { step: '2', title: 'Choose a Path', description: 'Select from personalized learning paths' },
            { step: '3', title: 'Learn & Practice', description: 'Complete courses and hands-on projects' },
            { step: '4', title: 'Get Certified', description: 'Earn certificates and showcase your skills' },
          ].map((item, index) => (
            <div key={index} className="relative text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Student </span>
            <span className="gradient-text">Success Stories</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
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
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-teal-600 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Your AI Journey Today
            </h2>
            <p className="text-green-100 text-lg mb-8">
              Join 50,000+ students and start learning AI for free. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="relative w-full max-w-md bg-[#0f0f15] border border-white/10 rounded-2xl p-6 sm:p-8"
            style={{ animation: 'modalSlideIn 0.3s ease-out' }}
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Demo Scheduled!</h3>
                <p className="text-gray-400">We&apos;ll send you a confirmation email shortly.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Schedule Your Free Demo</h3>
                  <p className="text-gray-400 text-sm">Get a personalized walkthrough of our platform</p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        required
                        value={demoForm.date}
                        onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                      <select
                        required
                        value={demoForm.time}
                        onChange={(e) => setDemoForm({ ...demoForm, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                      >
                        <option value="" className="bg-[#0a0a0f]">Select time</option>
                        <option value="10:00" className="bg-[#0a0a0f]">10:00 AM IST</option>
                        <option value="14:00" className="bg-[#0a0a0f]">2:00 PM IST</option>
                        <option value="16:00" className="bg-[#0a0a0f]">4:00 PM IST</option>
                        <option value="18:00" className="bg-[#0a0a0f]">6:00 PM IST</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Schedule Demo
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
