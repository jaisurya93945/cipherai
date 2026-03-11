import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Briefcase
} from 'lucide-react'
import toast from 'react-hot-toast'

const contactInfo = [
  {
    icon: Mail,
    title: 'General Inquiries',
    value: 'info@cipherai.in',
    description: 'We&apos;ll respond within 24 hours',
    color: 'blue',
  },
  {
    icon: Briefcase,
    title: 'Services',
    value: 'services@cipherai.in',
    description: 'For project consultations',
    color: 'purple',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 80 1234 5678',
    description: 'Mon-Sat from 9am to 7pm IST',
    color: 'green',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'Bengaluru, Karnataka',
    description: 'India - 560001',
    color: 'orange',
  },
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'sales', label: 'Sales & Enterprise' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'careers', label: 'Careers' },
  { value: 'press', label: 'Press & Media' },
]

const colorClasses: Record<string, { icon: string; text: string }> = {
  blue: { icon: 'text-blue-400', text: 'text-blue-400' },
  purple: { icon: 'text-purple-400', text: 'text-purple-400' },
  green: { icon: 'text-green-400', text: 'text-green-400' },
  orange: { icon: 'text-orange-400', text: 'text-orange-400' },
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'general',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          inquiry_type: formData.inquiryType,
          message: formData.message
        }
      ])

    if (error) {
      console.error(error)
      toast.error("Failed to send message")
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        inquiryType: "general",
        message: ""
      })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 animate-fade-in">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Get in Touch</span>
          </div>
          <h1 className="heading-1 mb-6">
            <span className="text-white">Let&apos;s Start a </span>
            <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question or want to learn more? We&apos;d love to hear from you.
            Reach out and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => {
            const colors = colorClasses[item.color]
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <div className={`${colors.text} mb-2 font-medium`}>{item.value}</div>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-[#0a0a0f]">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How quickly will you respond?',
                    a: 'We typically respond to all inquiries within 24 hours during business days.',
                  },
                  {
                    q: 'Do you offer enterprise support?',
                    a: 'Yes, our enterprise customers get 24/7 dedicated support with SLA guarantees.',
                  },
                  {
                    q: 'Can I schedule a demo?',
                    a: 'Absolutely! Select "Sales & Enterprise" and we&apos;ll schedule a personalized demo.',
                  },
                ].map((faq, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-200">
                    <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                    <p className="text-gray-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Connect With Us</h2>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-medium">Support Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Monday - Saturday</span>
                  <span className="text-white">9:00 AM - 7:00 PM IST</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Enterprise Support</span>
                  <span className="text-green-400">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-orange-500/10 border border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          <div className="text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Bengaluru, Karnataka</h3>
            <p className="text-gray-400">India - Silicon Valley of India</p>
            <p className="text-gray-500 text-sm mt-1">560001</p>
          </div>
        </div>
      </section>
    </div>
  )
}
