import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { Github, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/why-us' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '#' },
  ],
  services: [
    { name: 'AI Solutions', href: '/services' },
    { name: 'EdTech Platform', href: '/students' },
    { name: 'AI Tools', href: '/tools' },
    { name: 'Consulting', href: '/services' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Help Center', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Logo className="mb-6" />
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                Empowering the future through AI innovation. We build cutting-edge software solutions, 
                ed-tech platforms, and AI tools that transform businesses and education.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>info@cipherai.in</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>services@cipherai.in</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>+91 80 1234 5678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} CipherAI. All rights reserved. Made with ❤️ in Bengaluru, India
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
