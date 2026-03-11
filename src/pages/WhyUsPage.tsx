import {
  Shield,
  Zap,
  Users,
  TrendingUp,
  Heart,
  Star,
  Cpu
} from 'lucide-react'
import { Link } from 'react-router-dom'

const differentiators = [
  {
    icon: Cpu,
    title: 'Cutting-Edge AI',
    description: 'We use the latest AI technologies and research to build products that are years ahead of the competition.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our team includes PhDs from top universities and engineers from Google, Meta, and OpenAI.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with bank-grade encryption and regular security audits.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our infrastructure is optimized for speed, delivering sub-second response times globally.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: '24/7 support with dedicated success managers for enterprise clients.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: 'Our clients see an average 300% ROI within the first year of implementation.',
  },
]

const stats = [
  { value: '2026', label: 'Founded' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '5K+', label: 'Students' },
  { value: '50+', label: 'Team Members' },
  { value: '25+', label: 'Countries' },
  { value: '$1M', label: 'Funding Raised' },
]

const milestones = [
  { year: '2026', title: 'CipherAI Founded', description: 'Started with a mission to democratize AI education.' },
  { year: '2026', title: 'First 1000 Students', description: 'Reached our first milestone in student enrollment.' },
  { year: '2026', title: 'AI Tools Launch', description: 'Launched our marketplace with 20+ AI tools.' },
  { year: '2026', title: 'Enterprise Solutions', description: 'Expanded into B2B with custom AI solutions.' },
  { year: '2026', title: 'Series A Funding', description: 'Raised $30M to accelerate growth and innovation.' },
  { year: '2026', title: 'Global Expansion', description: 'Opened offices in Europe and Asia.' },
]

const leadership = [
  {
    name: 'Jaisurya B',
    role: 'CEO & Founder',
    bio: 'AI & Red Teaming, Ethical Hacker.',
    initials: 'JB',
  },
  {
    name: 'Michael Roberts',
    role: 'CTO & Co-Founder',
    bio: 'Built systems serving billions of users.',
    initials: 'MR',
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Chief AI Officer',
    bio: 'Former AI researcher.',
    initials: 'EW',
  },
  {
    name: 'David Khanna',
    role: 'VP of Engineering',
    bio: 'Led engineering Expert in scalable systems.',
    initials: 'DK',
  },
]

const certifications = [
  { name: 'SOC 2 Type II', description: 'Security & Availability' },
  { name: 'ISO 27001', description: 'Information Security' },
  { name: 'GDPR Compliant', description: 'Data Protection' },
  { name: 'HIPAA Compliant', description: 'Healthcare Data' },
]

export function WhyUsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Why CipherAI</span>
          </div>
          <h1 className="heading-1 mb-6">
            <span className="text-white">The Future of AI, </span>
            <span className="gradient-text">Built Today</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We combine cutting-edge AI research with practical applications to deliver
            solutions that transform businesses and education.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">What Sets Us </span>
            <span className="gradient-text">Apart</span>
          </h2>
          <p className="text-gray-400 text-lg">
            We don&apos;t just build products—we create transformative experiences powered by AI.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Our </span>
            <span className="gradient-text">Journey</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block" />
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-2xl font-bold gradient-text mb-2">{milestone.year}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block" />
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Meet Our </span>
            <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-gray-400 text-lg">
            World-class experts leading the AI revolution.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((person, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {person.initials}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{person.name}</h3>
              <div className="text-blue-400 text-sm mb-3">{person.role}</div>
              <p className="text-gray-400 text-sm">{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Enterprise-Grade </span>
            <span className="gradient-text">Security</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Your data is protected by industry-leading security standards.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
              <p className="text-gray-400 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the CipherAI Difference?
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Join thousands of businesses and students who trust CipherAI for their AI needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth/signup/"
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300"
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
      </section>
    </div>
  )
}
