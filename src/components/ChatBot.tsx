import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, X, Send, User, Mail, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface UserInfo {
  name: string
  email: string
}

const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! Welcome to CipherAI! I'm your AI assistant. How can I help you today?",
    "Hi there! Thanks for visiting CipherAI. What brings you here?",
    "Welcome! I'm here to help you explore CipherAI's services and answer your questions."
  ],
  services: [
    "CipherAI offers AI-powered software solutions, ed-tech platforms, and AI tools marketplace. Would you like to know more about any specific service?",
    "We specialize in custom AI development, learning management systems, and AI tool integration. Check out our Services page for details!",
    "Our services include AI consulting, custom development, ed-tech solutions, and enterprise AI tools. What are you looking for?"
  ],
  pricing: [
    "We offer flexible pricing plans starting from ₹2,499/month. Would you like me to connect you with our sales team for a custom quote?",
    "Our pricing varies based on your needs. We have plans for individuals, startups, and enterprises. Visit our Tools page to see detailed pricing!",
    "We offer competitive pricing with a pay-as-you-go model for our AI tools. Can I get your email to send you our pricing brochure?"
  ],
  contact: [
    "You can reach us at info@cipherai.in for general inquiries or services@cipherai.in for service-related queries. We're based in Bengaluru, Karnataka, India!",
    "Our team is available Mon-Sat, 9am-7pm IST. You can also fill out the contact form on our Contact page. Would you like me to guide you there?",
    "The best way to reach us is through the contact form on our website or email us at info@cipherai.in. How would you prefer to connect?"
  ],
  careers: [
    "We're always looking for talented individuals! Check out our Careers page for current openings in AI, engineering, and design.",
    "Great question! We have openings for AI engineers, full-stack developers, and product designers. Interested in applying?",
    "Join our team! We offer competitive salaries, remote work options, and exciting AI projects. Visit our Careers page to learn more."
  ],
  students: [
    "Our Student Portal offers AI courses, certifications, and hands-on projects. Students get special discounts too!",
    "We have comprehensive AI learning paths for beginners to advanced learners. Are you looking to start your AI journey?",
    "Students can access our platform with special pricing, earn certificates, and get mentorship from industry experts. Interested?"
  ],
  location: [
    "We're proudly based in Bengaluru, Karnataka, India - the Silicon Valley of India! Our office is in the heart of the tech district.",
    "CipherAI is headquartered in Bengaluru, Karnataka, India. We'd love to meet you if you're in the area!",
    "Our main office is located in Bengaluru, Karnataka, India. We also have remote team members across the country."
  ],
  default: [
    "That's interesting! Tell me more about what you're looking for.",
    "I understand. How can I assist you further with CipherAI?",
    "Thanks for sharing! Is there anything specific about our AI solutions you'd like to know?",
    "I'd love to help! Could you provide more details about your requirements?",
    "Great! Let me know if you'd like to schedule a demo or speak with our team."
  ],
  goodbye: [
    "Thank you for chatting! Feel free to reach out anytime. Have a great day!",
    "It was nice talking to you! Don't hesitate to come back if you have more questions.",
    "Thanks for visiting CipherAI! We look forward to helping you with your AI needs."
  ]
}

const getIntent = (message: string): string => {
  const lower = message.toLowerCase()
  if (lower.match(/hi|hello|hey|greetings/)) return 'greeting'
  if (lower.match(/service|offer|provide|do|what|solution/)) return 'services'
  if (lower.match(/price|cost|pricing|plan|subscription|pay/)) return 'pricing'
  if (lower.match(/contact|reach|email|phone|call/)) return 'contact'
  if (lower.match(/career|job|work|hiring|join|position/)) return 'careers'
  if (lower.match(/student|learn|course|education|study|certification/)) return 'students'
  if (lower.match(/location|address|where|office|bangalore|bengaluru|india/)) return 'location'
  if (lower.match(/bye|goodbye|thanks|thank you|see you/)) return 'goodbye'
  return 'default'
}

const getRandomResponse = (intent: string): string => {
  const responses = botResponses[intent] || botResponses.default
  return responses[Math.floor(Math.random() * responses.length)]
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '' })
  const [showUserForm, setShowUserForm] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const timer = setTimeout(() => {
        addBotMessage(getRandomResponse('greeting'))
        setHasGreeted(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, hasGreeted])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        const toggleButton = document.querySelector('[data-chat-toggle]')
        if (!toggleButton?.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const addBotMessage = useCallback((text: string) => {
    setIsTyping(false)
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Check if we should ask for user info
    if (messages.length >= 3 && !userInfo.name && !showUserForm) {
      setTimeout(() => {
        addBotMessage("I'd love to help you better! Could you share your name and email so our team can follow up with you?")
        setShowUserForm(true)
        setIsTyping(false)
      }, 1000)
      return
    }

    // Generate response based on intent
    setTimeout(() => {
      const intent = getIntent(inputValue)
      addBotMessage(getRandomResponse(intent))
    }, 800 + Math.random() * 400)
  }, [inputValue, messages.length, userInfo.name, showUserForm, addBotMessage])

  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInfo.name || !userInfo.email) return

    const { error } = await supabase
      .from("chatbot_leads")
      .insert([
        {
          name: userInfo.name,
          email: userInfo.email
        }
      ])

    if (error) {
      console.error(error)
      addBotMessage("Something went wrong saving your details.")
      return
    }

    addBotMessage(
      `Thank you ${userInfo.name}! We've saved your email (${userInfo.email}). Our team will reach out soon. How else can I help you today?`
    )

    setShowUserForm(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        data-chat-toggle
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen
          ? 'bg-red-500 hover:bg-red-600 rotate-90'
          : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:shadow-blue-500/30'
          }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{ willChange: 'transform' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-[24rem] sm:w-96 bg-[#0f0f15] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            animation: 'chatSlideIn 0.3s ease-out',
            willChange: 'transform, opacity'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f0f15]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">CipherAI Assistant</h3>
                <p className="text-xs text-gray-400">Online • Typically replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 sm:h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.length === 0 && !hasGreeted && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animation: 'messageSlideIn 0.2s ease-out' }}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                    : 'bg-white/5 text-gray-200 rounded-bl-md border border-white/10'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-50 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 text-gray-200 rounded-2xl rounded-bl-md border border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* User Info Form */}
            {showUserForm && (
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
                style={{ animation: 'messageSlideIn 0.3s ease-out' }}
              >
                <p className="text-sm text-gray-300 mb-3">Please share your details:</p>
                <form onSubmit={handleUserFormSubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#0a0a0f]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Powered by CipherAI • Made in India
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
