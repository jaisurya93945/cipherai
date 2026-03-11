import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from "react-hot-toast"
import {
  Search,
  Sparkles,
  Image,
  FileText,
  Code,
  BarChart3,
  Mic,
  Languages,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Brain,
  Video,
  Music,
  Database,
  Shield,
  Globe,
  Cpu,
  Download,
  ExternalLink,
  Filter
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { id } from 'date-fns/locale'

const categories = [
  { id: 'all', name: 'All Tools', icon: Sparkles },
  { id: 'text', name: 'Text & Writing', icon: FileText },
  { id: 'image', name: 'Image & Video', icon: Image },
  { id: 'code', name: 'Code & Dev', icon: Code },
  { id: 'data', name: 'Data & Analytics', icon: BarChart3 },
  { id: 'audio', name: 'Audio & Speech', icon: Mic },
  { id: 'translate', name: 'Translation', icon: Languages },
  { id: 'ai', name: 'AI Models', icon: Brain },
]

const tools = [
  {
    id: 1,
    name: 'Prompt Enhancer',
    description: 'Generate high-quality prompts, enhanced prompts, and copy in seconds.',
    category: 'text',
    icon: FileText,
    credits: 10,
    rating: 4.9,
    users: '25K+',
    popular: true,
    color: 'blue',
    tags: ['Content', 'Marketing'],
  },
  {
    id: 2,
    name: 'ImageGen AI',
    description: 'Create stunning images from text descriptions with advanced AI models.',
    category: 'image',
    icon: Image,
    credits: 25,
    rating: 4.8,
    users: '18K+',
    popular: true,
    color: 'purple',
    tags: ['Art', 'Design'],
  },
  {
    id: 3,
    name: 'CodeCompanion',
    description: 'AI-powered code completion, review, and bug detection for all languages.',
    category: 'code',
    icon: Code,
    credits: 15,
    rating: 4.9,
    users: '32K+',
    popular: true,
    color: 'green',
    tags: ['Development', 'Coding'],
  },
  {
    id: 4,
    name: 'DataInsight',
    description: 'Analyze datasets, generate visualizations, and extract insights automatically.',
    category: 'data',
    icon: BarChart3,
    credits: 20,
    rating: 4.7,
    users: '12K+',
    popular: false,
    color: 'orange',
    tags: ['Analytics', 'Business'],
  },
  {
    id: 5,
    name: 'VoiceTranscribe',
    description: 'Convert speech to text with 99% accuracy in 50+ languages.',
    category: 'audio',
    icon: Mic,
    credits: 12,
    rating: 4.8,
    users: '15K+',
    popular: false,
    color: 'pink',
    tags: ['Speech', 'Transcription'],
  },
  {
    id: 6,
    name: 'TranslatePro',
    description: 'Professional-grade translation with context awareness for 100+ languages.',
    category: 'translate',
    icon: Languages,
    credits: 8,
    rating: 4.6,
    users: '20K+',
    popular: false,
    color: 'cyan',
    tags: ['Language', 'Global'],
  },
  {
    id: 7,
    name: 'Summarizer AI',
    description: 'Summarize long documents, articles, and reports into key points.',
    category: 'text',
    icon: FileText,
    credits: 5,
    rating: 4.7,
    users: '22K+',
    popular: false,
    color: 'blue',
    tags: ['Productivity', 'Research'],
  },
  {
    id: 8,
    name: 'ArtStudio',
    description: 'Create digital art, illustrations, and designs with AI assistance.',
    category: 'image',
    icon: Image,
    credits: 30,
    rating: 4.9,
    users: '14K+',
    popular: true,
    color: 'purple',
    tags: ['Art', 'Creative'],
  },
  {
    id: 9,
    name: 'DebugMaster',
    description: 'Automatically detect and fix bugs in your code with AI analysis.',
    category: 'code',
    icon: Code,
    credits: 18,
    rating: 4.8,
    users: '16K+',
    popular: false,
    color: 'green',
    tags: ['Debugging', 'Quality'],
  },
  {
    id: 10,
    name: 'VideoCraft AI',
    description: 'Generate professional videos from text scripts with AI avatars.',
    category: 'image',
    icon: Video,
    credits: 50,
    rating: 4.9,
    users: '8K+',
    popular: true,
    color: 'red',
    tags: ['Video', 'Content'],
  },
  {
    id: 11,
    name: 'NeuralChat',
    description: 'Build custom chatbots and conversational AI for your business.',
    category: 'ai',
    icon: Brain,
    credits: 35,
    rating: 4.8,
    users: '11K+',
    popular: false,
    color: 'indigo',
    tags: ['Chatbot', 'NLP'],
  },
  {
    id: 12,
    name: 'DataSync',
    description: 'Automated data pipelines and ETL processes with AI optimization.',
    category: 'data',
    icon: Database,
    credits: 25,
    rating: 4.6,
    users: '6K+',
    popular: false,
    color: 'teal',
    tags: ['Data', 'Automation'],
  },
  {
    id: 13,
    name: 'VoiceClone',
    description: 'Clone voices with just 30 seconds of audio for content creation.',
    category: 'audio',
    icon: Music,
    credits: 40,
    rating: 4.7,
    users: '5K+',
    popular: false,
    color: 'rose',
    tags: ['Voice', 'Audio'],
  },
  {
    id: 14,
    name: 'SecureScan',
    description: 'AI-powered security scanning for vulnerabilities and threats.',
    category: 'code',
    icon: Shield,
    credits: 22,
    rating: 4.8,
    users: '9K+',
    popular: false,
    color: 'emerald',
    tags: ['Security', 'Scanning'],
  },
  {
    id: 15,
    name: 'GlobalSEO',
    description: 'Optimize content for search engines in multiple languages.',
    category: 'text',
    icon: Globe,
    credits: 15,
    rating: 4.5,
    users: '13K+',
    popular: false,
    color: 'amber',
    tags: ['SEO', 'Marketing'],
  },
  {
    id: 16,
    name: 'ModelHub',
    description: 'Access and fine-tune pre-trained AI models for your use case.',
    category: 'ai',
    icon: Cpu,
    credits: 45,
    rating: 4.9,
    users: '7K+',
    popular: true,
    color: 'violet',
    tags: ['ML', 'Models'],
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string; gradient: string }> = {
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'hover:shadow-blue-500/20',
    gradient: 'from-blue-500 to-cyan-500'
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    glow: 'hover:shadow-purple-500/20',
    gradient: 'from-purple-500 to-pink-500'
  },
  green: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/30',
    glow: 'hover:shadow-green-500/20',
    gradient: 'from-green-500 to-emerald-500'
  },
  orange: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    glow: 'hover:shadow-orange-500/20',
    gradient: 'from-orange-500 to-amber-500'
  },
  pink: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    glow: 'hover:shadow-pink-500/20',
    gradient: 'from-pink-500 to-rose-500'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'hover:shadow-cyan-500/20',
    gradient: 'from-cyan-500 to-teal-500'
  },
  red: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    glow: 'hover:shadow-red-500/20',
    gradient: 'from-red-500 to-orange-500'
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    glow: 'hover:shadow-indigo-500/20',
    gradient: 'from-indigo-500 to-purple-500'
  },
  teal: {
    bg: 'bg-teal-500/10',
    text: 'text-teal-400',
    border: 'border-teal-500/30',
    glow: 'hover:shadow-teal-500/20',
    gradient: 'from-teal-500 to-cyan-500'
  },
  rose: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    glow: 'hover:shadow-rose-500/20',
    gradient: 'from-rose-500 to-pink-500'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'hover:shadow-emerald-500/20',
    gradient: 'from-emerald-500 to-green-500'
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'hover:shadow-amber-500/20',
    gradient: 'from-amber-500 to-yellow-500'
  },
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'hover:shadow-violet-500/20',
    gradient: 'from-violet-500 to-purple-500'
  },
}

export function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'credits'>('popular')
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [credits] = useState(0)

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const handleUseTool = async (tool: any) => {

    const { data: authData } = await supabase.auth.getUser()
    const user = authData.user

    if (!user) {
      toast.error("Please login first")
      navigate("/auth/login")
      return
    }

    // get user credits
    const { data: userData, error } = await supabase
      .from("users")
      .select("daily_credits, paid_credits")
      .eq("id", user.id)
      .single()

    if (error || !userData) {
      toast.error("Unable to fetch credits")
      return
    }

    const totalCredits =
      userData.daily_credits + userData.paid_credits

    if (totalCredits < tool.credits) {
      toast.error("Not enough credits. Redirecting...")
      setTimeout(() => navigate("/buy-credits"), 1200)
      return
    }


    toast.success(`Launching ${tool.name}`)

    // launch tool logic here

    if (tool.name === "Prompt Enhancer") {
      navigate("/tools/prompt-enhancer")
    }

  }

  const ScrollToTool = (id: number) => {
    const element = document.getElementById(`tool-${id}`)

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
      element.classList.add("animate-pulse")

      setTimeout(() => {
        element.classList.remove("animate-pulse")
      }, 1200)
    }
  }

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'credits') return a.credits - b.credits
    return 0
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI Tools Marketplace</span>
          </div>
          <h1 className="heading-1 mb-6">
            <span className="text-white">Powerful AI Tools at Your </span>
            <span className="gradient-text">Fingertips</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Access cutting-edge AI tools with 100 free credits every day. Generate content,
            create images, analyze data, and more.
          </p>

          {/* Credit Banner */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">100 Free Credits Daily</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Resets daily at midnight IST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search AI tools by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Filter & Sort */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'credits')}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50"
              >
                <option value="popular" className="bg-[#0a0a0f]">Most Popular</option>
                <option value="rating" className="bg-[#0a0a0f]">Highest Rated</option>
                <option value="credits" className="bg-[#0a0a0f]">Lowest Credits</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      {activeCategory === 'all' && !searchQuery && sortBy === 'popular' && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Popular Tools</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.filter(t => t.popular).slice(0, 4).map((tool) => {
              const colors = colorClasses[tool.color]
              return (
                <div
                  key={tool.id}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("button")) return
                    ScrollToTool(tool.id)
                  }}
                  className={`group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-lg ${colors.glow}`}
                >
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium">
                    Popular
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${favorites.includes(tool.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-500 hover:text-red-400'
                          }`}
                      />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tool.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-300">{tool.rating}</span>
                      </div>
                      <div className="text-gray-500">{tool.users} users</div>
                    </div>
                    <div className={`flex items-center gap-1 ${colors.text}`}>
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">{tool.credits}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* All Tools */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {activeCategory === 'all' && !searchQuery ? 'All Tools' : 'Results'}
          </h2>
          <span className="text-gray-500 text-sm">{filteredTools.length} tools</span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => {
              const colors = colorClasses[tool.color]
              return (
                <div
                  key={tool.id}
                  id={`tool-${tool.id}`}
                  className={`group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-lg ${colors.glow} flex flex-col cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <Heart
                        onClick={(e) => e.stopPropagation()}
                        className={`w-5 h-5 transition-colors ${favorites.includes(tool.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-500 hover:text-red-400'
                          }`}
                      />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{tool.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-300">{tool.rating}</span>
                      </div>
                      <div className="text-gray-500">{tool.users}</div>
                    </div>
                    <div className={`flex items-center gap-1 ${colors.text}`}>
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">{tool.credits}</span>
                    </div>
                  </div>
                  <button onClick={() => handleUseTool(tool)} className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${colors.gradient} text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                    Try Now
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 mb-4">
            <span className="text-white">Why Use Our </span>
            <span className="gradient-text">AI Tools?</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: CheckCircle,
              title: '100 Free Credits Daily',
              description: 'Get 100 free credits every day to try out all our AI tools without any commitment.',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Our AI models are optimized for speed, delivering results in seconds.',
            },
            {
              icon: Star,
              title: 'Enterprise Quality',
              description: 'Access the same AI technology used by Fortune 500 companies.',
            },
            {
              icon: Download,
              title: 'Easy Integration',
              description: 'Simple API integration with comprehensive documentation and SDKs.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Supercharge Your Workflow?
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Sign up now and get 100 free credits to start using our AI tools immediately.
            </p>
            <Link
              to="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 hover:shadow-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
