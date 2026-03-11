import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Heart,
  Laptop,
  Plane,
  BookOpen,
  Target
} from 'lucide-react'
import { useState } from 'react'

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Salary',
    description: 'Above-market compensation with regular reviews and bonuses.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision coverage for you and family.',
  },
  {
    icon: Laptop,
    title: 'Remote First',
    description: 'Work from anywhere with flexible hours and home office stipend.',
  },
  {
    icon: Plane,
    title: 'Unlimited PTO',
    description: 'Take time off when you need it. We trust you to manage your time.',
  },
  {
    icon: BookOpen,
    title: 'Learning Budget',
    description: '$5,000 annual budget for courses, conferences, and books.',
  },
  {
    icon: Target,
    title: 'Equity',
    description: 'Stock options for all employees. Share in our success.',
  },
]

const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations']

const jobs = [
  {
    id: 1,
    title: 'Senior Machine Learning Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$150K - $200K',
    description: 'Build and deploy cutting-edge ML models that power our AI tools and learning platform.',
    requirements: [
      '5+ years of experience in ML/AI',
      'Strong Python and PyTorch/TensorFlow skills',
      'Experience with large-scale distributed systems',
      'PhD or MS in CS, ML, or related field',
    ],
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120K - $160K',
    description: 'Develop and maintain our web applications using React, Node.js, and modern technologies.',
    requirements: [
      '4+ years of full-stack development',
      'Expert in React, TypeScript, and Node.js',
      'Experience with cloud platforms (AWS/GCP)',
      'Strong understanding of web security',
    ],
  },
  {
    id: 3,
    title: 'Product Manager - AI Tools',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140K - $180K',
    description: 'Lead the product strategy and roadmap for our AI tools marketplace.',
    requirements: [
      '3+ years of product management experience',
      'Strong understanding of AI/ML technologies',
      'Experience with marketplace products',
      'Excellent communication and leadership skills',
    ],
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100K - $140K',
    description: 'Design beautiful, intuitive interfaces for our AI-powered products.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma and design systems',
      'Portfolio demonstrating strong visual design',
      'Experience with user research and testing',
    ],
  },
  {
    id: 5,
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90K - $130K',
    description: 'Drive user acquisition and growth for our ed-tech platform and AI tools.',
    requirements: [
      '4+ years of growth marketing experience',
      'Expertise in SEO, SEM, and paid social',
      'Data-driven approach to marketing',
      'Experience with B2B and B2C products',
    ],
  },
  {
    id: 6,
    title: 'Enterprise Sales Director',
    department: 'Sales',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120K - $180K + Commission',
    description: 'Sell our enterprise AI solutions to Fortune 500 companies.',
    requirements: [
      '5+ years of enterprise sales experience',
      'Track record of closing 6-figure deals',
      'Strong network in the tech industry',
      'Experience selling AI/ML solutions',
    ],
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130K - $170K',
    description: 'Build and maintain our cloud infrastructure and CI/CD pipelines.',
    requirements: [
      '4+ years of DevOps experience',
      'Expert in Kubernetes, Docker, and Terraform',
      'Strong AWS/GCP skills',
      'Experience with monitoring and observability',
    ],
  },
  {
    id: 8,
    title: 'AI Curriculum Developer',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100K - $140K',
    description: 'Create engaging, hands-on AI courses for our ed-tech platform.',
    requirements: [
      'Strong background in AI/ML',
      'Experience in technical writing or teaching',
      'Passion for education and making AI accessible',
      'Excellent communication skills',
    ],
  },
]

const values = [
  {
    title: 'Innovation First',
    description: 'We push boundaries and embrace new technologies to solve complex problems.',
  },
  {
    title: 'Customer Obsessed',
    description: 'Everything we do is focused on delivering value to our customers and students.',
  },
  {
    title: 'Continuous Learning',
    description: 'We never stop learning and growing, both personally and professionally.',
  },
  {
    title: 'Diversity & Inclusion',
    description: 'We believe diverse teams build better products. Everyone is welcome here.',
  },
]

export function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState('All')

  const filteredJobs = activeDepartment === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === activeDepartment)

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Join Our Team</span>
          </div>
          <h1 className="heading-1 mb-6">
            <span className="text-white">Build the Future of </span>
            <span className="gradient-text">AI & Education</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Join a team of passionate innovators building cutting-edge AI solutions 
            and transforming education worldwide.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '150+', label: 'Team Members' },
            { value: '25+', label: 'Countries' },
            { value: '4.8', label: 'Employee Rating' },
            { value: '95%', label: 'Retention Rate' },
          ].map((stat, index) => (
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

      {/* Benefits */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Why Work at </span>
            <span className="gradient-text">CipherAI?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            We offer competitive benefits and a culture that empowers you to do your best work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Our </span>
            <span className="gradient-text">Values</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Open </span>
            <span className="gradient-text">Positions</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Find your perfect role and join our growing team.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeDepartment === dept
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                  <p className="text-gray-400 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-blue-500/10 text-blue-400 font-medium rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No open positions in this department currently.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Don&apos;t See the Right Role?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@cipherai.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Send Resume
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
