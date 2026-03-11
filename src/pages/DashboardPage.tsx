import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  User,
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  Zap,
  ChevronRight,
  Star,
  Play,
  CheckCircle,
  Target
} from 'lucide-react'

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard/', icon: LayoutDashboard },
  { name: 'My Courses', href: '#courses', icon: BookOpen },
  { name: 'Tests & Exams', href: '#tests', icon: FileQuestion },
  { name: 'AI Tools', href: '/tools/', icon: Sparkles },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Courses Catalogue', href: '/courses', icon: BookOpen },
]



const upcomingTests = [
  {
    id: 1,
    title: 'ML Fundamentals Quiz',
    date: 'Tomorrow, 10:00 AM',
    duration: '30 min',
    questions: 20,
  },
  {
    id: 2,
    title: 'Python for AI Midterm',
    date: 'Dec 15, 2:00 PM',
    duration: '90 min',
    questions: 50,
  },
]

const recentActivity = [
  { action: 'Completed lesson', item: 'Neural Networks Basics', time: '2 hours ago' },
  { action: 'Earned certificate', item: 'Python for Data Science', time: '1 day ago' },
  { action: 'Started course', item: 'Deep Learning with PyTorch', time: '2 days ago' },
  { action: 'Used AI Tool', item: 'CodeCompanion - 15 credits', time: '3 days ago' },
]

const colorClasses: Record<string, { bg: string; text: string; bar: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'bg-purple-500' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', bar: 'bg-green-500' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', bar: 'bg-yellow-500' },
}

export function DashboardPage() {
  const [isSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [credits, setCredits] = useState(0)
  const [maxCredits, setMaxCredits] = useState(100)
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    inProgress: 0,
    completed: 0,
    certificates: 0,
    credits: 0
  })

  const statsUI = [
    {
      label: "Courses in Progress",
      value: stats.inProgress,
      icon: BookOpen,
      color: "blue",
    },
    {
      label: "Completed Courses",
      value: stats.completed,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Certificates",
      value: stats.certificates,
      icon: Award,
      color: "purple",
    },
    {
      label: "AI Credits",
      value: stats.credits,
      icon: Zap,
      color: "yellow",
    },]

  useEffect(() => {
    const loadUser = async () => {

      const { data } = await supabase.auth.getUser()
      const currentUser = data.user

      if (!currentUser) return

      setUser(currentUser)

      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("id", currentUser.id)
        .single()

      setProfile(profileData)

      if (profileData) {
        setCredits(profileData.daily_credits + profileData.paid_credits)
        setMaxCredits(profileData.maxCredits)
      }

    }

    loadUser()


    const loadDashboard = async () => {

      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user

      if (!user) return

      const { data: enrollments } = await supabase
        .from("user_courses")
        .select("*, courses(*)")
        .eq("user_id", user.id)

      const inProgress = enrollments?.filter(c => c.status === "in_progress") || []
      const completed = enrollments?.filter(c => c.status === "completed") || []

      const { data: profile } = await supabase
        .from("users")
        .select("daily_credits, paid_credits")
        .eq("id", user.id)
        .single()

      const totalCredits = (profile?.daily_credits || 0) + (profile?.paid_credits || 0)

      setStats({
        inProgress: inProgress.length,
        completed: completed.length,
        certificates: completed.length,
        credits: totalCredits
      })

      setCredits(totalCredits)

    }

    loadDashboard()



  }, [])

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0f1117] border-r border-white/5 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 lg:block rounded-2xl`}>
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
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
                </div>
                <div>
                  <div className="text-white font-medium">{profile?.name || "User"}</div>

                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${link.href === '/dashboard/'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full mt-8">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {profile?.name || "User"}</h1>
              <p className="text-gray-400">Here&apos;s what&apos;s happening with your learning journey.</p>
            </div>

            {/* Stats Grid */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsUI.map((stat, index) => {
                const colors = colorClasses[stat.color]
                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                )
              })}
            </div>


            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* In Progress Courses */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">In Progress</h2>
                    <Link to="#courses" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {courses.map((course) => {
                      const colors = colorClasses[course.color]
                      return (
                        <div
                          key={course.id}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
                        >
                          <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-lg font-bold ${colors.text}`}>{course.image}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium mb-1 truncate">{course.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.lastAccessed}
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                            <Play className="w-5 h-5" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                        <div className="flex-1">
                          <p className="text-gray-300">
                            <span className="text-white">{activity.action}</span>: {activity.item}
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Upcoming Tests */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Upcoming Tests</h2>
                    <Target className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="space-y-4">
                    {upcomingTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 rounded-xl bg-white/5"
                      >
                        <h3 className="text-white font-medium mb-2">{test.title}</h3>
                        <div className="space-y-1 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {test.date}
                          </div>
                          <div className="flex items-center gap-4">
                            <span>{test.duration}</span>
                            <span>{test.questions} questions</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-3 rounded-xl bg-blue-500/10 text-blue-400 font-medium hover:bg-blue-500 hover:text-white transition-all">
                    View All Tests
                  </button>
                </div>

                {/* Daily Credits */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Daily Credits</h2>
                      <p className="text-sm text-gray-400">Resets at midnight</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{credits}/100</div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(credits / 100) * 100}%` }} />
                  </div>
                  <Link
                    to="/tools/"
                    className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Use AI Tools
                  </Link>
                </div>

                {/* Achievements */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Achievements</h2>
                    <Award className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-xl flex items-center justify-center ${index < 5 ? 'bg-yellow-500/20' : 'bg-white/5'
                          }`}
                      >
                        <Star className={`w-6 h-6 ${index < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
