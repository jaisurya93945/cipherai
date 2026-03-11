import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { supabase } from '@/lib/supabase'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'AI Tools', href: '/tools' },
  { name: 'Students', href: '/students' },
  { name: 'Careers', href: '/careers' },
  { name: 'Why Us', href: '/why-us' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [credits, setCredits] = useState(0)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data?.user

      if (!user) return

      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

      setProfile(profileData)
    }
    loadProfile()
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      const currentUser = data.user

      setUser(currentUser)

      if (currentUser) {

        // check if user exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle()

        // create user if not exists
        if (!existingUser) {
          await supabase.from("users").insert({
            id: currentUser.id,
            email: currentUser.email,
            daily_credits: 100,
            paid_credits: 0,
            plan_type: "free"
          })

          setCredits(100)
        } else {
          setCredits(existingUser.daily_credits + existingUser.paid_credits)
        }
      }
    }

    getUser()
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === link.href
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>

                {user && (
                  <Link
                    to="/buy-credits" className="px-3 py-1 text-sm bg-gray-800 rounded-lg text-white flex items-center gap-1">
                    ⚡{credits}
                  </Link>
                )}

                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center"
                  >
                    {profile?.avatar ? (
                      <img
                        src={profile.avatar}
                        className='w-9 h-9 rounded-full object-cover'
                      />
                    ) : profile?.name ? (
                      profile.name[0].toUpperCase()
                    ) : user?.email ? (
                      String(user.email)[0].toUpperCase()
                    ) : (
                      "U"
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1a1a2e] rounded-lg shadow-lg p-2">
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 text-sm hover:bg-gray-700 rounded"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/buy-credits"
                        className="block px-3 py-2 text-sm hover:bg-gray-700 rounded"
                      >
                        Buy Credits
                      </Link>

                      <button
                        onClick={async () => {
                          await supabase.auth.signOut()
                          window.location.reload()
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-700 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  Sign In
                </Link>

                <Link
                  to="/auth/signup"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="py-4 space-y-1 border-t border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === link.href
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
              <Link
                to="/auth/login/"
                className="block w-full px-4 py-3 text-sm font-medium text-center text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup/"
                className="block w-full px-4 py-3 text-sm font-medium text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
