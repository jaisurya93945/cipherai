import {
  Code,
  Brain,
  Cloud,
  Shield,
  GraduationCap,
  Briefcase,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Database,
  Cpu,
  Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: Code,
    title: 'Custom Software Development',
    description: 'End-to-end software development services tailored to your business needs. From web applications to mobile apps and enterprise systems.',
    features: [
      'Full-stack web development',
      'Mobile app development (iOS & Android)',
      'Enterprise software solutions',
      'API development and integration',
      'Legacy system modernization',
    ],
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent applications.',
    features: [
      'Custom ML model development',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics',
      'AI consulting and strategy',
    ],
    color: 'purple',
  },
  {
    icon: Cloud,
    title: 'Cloud and Infrastructure Solutions',
    description: 'Scalable cloud infrastructure and migration services to optimize your operations and reduce costs.',
    features: [
      'Cloud migration strategy',
      'AWS, Azure, GCP services',
      'DevOps and CI/CD pipelines',
      'Serverless architecture',
      'Cloud cost optimization',
    ],
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your data, applications, and infrastructure from evolving threats.',
    features: [
      'Security audits and assessments',
      'Penetration testing',
      'Compliance consulting (SOC 2, GDPR)',
      'Security monitoring',
      'Incident response planning',
    ],
    color: 'green',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Transform your raw data into actionable insights with our data engineering and analytics services.',
    features: [
      'Data pipeline development',
      'Data warehouse solutions',
      'Real-time analytics',
      'ETL/ELT processes',
      'Data governance',
    ],
    color: 'orange',
  },
  {
    icon: Cpu,
    title: 'IoT Solutions',
    description: 'Connect and manage devices at scale with our Internet of Things development and integration services.',
    features: [
      'IoT platform development',
      'Device management systems',
      'Edge computing solutions',
      'Sensor integration',
      'Real-time monitoring dashboards',
    ],
    color: 'pink',
  },
  {
    icon: GraduationCap,
    title: 'Technical Training & Workshops',
    description: 'Professional training programs designed to help students and professionals develop skills in modern IT.',
    features: [
      'AI and Machine Learning Advanced',
      'Cybersecurity training programs',
      'Software Development bootcamps',
      'Hands-on project-based learning',
      'Career-focused technical workshops',
    ],
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'IT Consulting',
    description: 'Strategic technology consulting services to help organizations adopt modern software, AI solutions, and secure digital infrastructure.',
    features: [
      'Technology strategy consulting',
      'Digital transformation planning',
      'IT infrastructure advisory',
      'AI adoption strategy',
      'Security-first architecture guidance',
    ],
    color: 'orange',
  },
]

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We analyze your requirements, understand your goals, and define the project scope.',
    icon: MessageSquare,
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Our team creates a detailed roadmap with timelines, milestones, and deliverables.',
    icon: BarChart3,
  },
  {
    step: '03',
    title: 'Development',
    description: 'Agile development with regular updates, ensuring transparency and quality.',
    icon: Code,
  },
  {
    step: '04',
    title: 'Deployment',
    description: 'Seamless deployment with comprehensive testing and ongoing support.',
    icon: Globe,
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
}

export function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Our Services</span>
          </div>
          <h1 className="heading-1 mb-6">
            <span className="text-white">Software Solutions for the </span>
            <span className="gradient-text">Modern Enterprise</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From concept to deployment, we deliver cutting-edge software solutions that
            drive innovation and accelerate business growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const colors = colorClasses[service.color]
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Our </span>
            <span className="gradient-text">Development Process</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A proven methodology that ensures successful delivery of every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {step.step}
              </div>
              <div className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '25+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '20+', label: 'Expert Developers' },
            { value: '24/7', label: 'Support Available' },
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Let&apos;s discuss how we can help transform your ideas into reality.
            </p>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
