'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SignatureCanvas from 'react-signature-canvas'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  MessageSquare,
  Package,
  FileText,
  CreditCard,
  Users,
  Target,
  Zap,
  Shield,
  CheckCircle2,
  Loader2,
  Building2,
  Mail,
  Calendar,
  TrendingUp,
  BarChart3,
  Award,
  Lock,
  CalendarDays,
  Phone,
  Globe,
  Clock,
  Star,
  ChevronRight,
} from 'lucide-react'

// PROJECT 1 - Original Multi-Page Design with Glass Cards & Gradient Effects
// This was the first design iteration with a dark theme and cyan/purple gradients

const pages = [
  { id: 'welcome', label: 'Welcome', icon: Sparkles },
  { id: 'recap', label: 'Meeting Recap', icon: MessageSquare },
  { id: 'about', label: 'About Us', icon: Building2 },
  { id: 'proposal', label: 'Proposal', icon: Package },
  { id: 'agreement', label: 'Agreement', icon: FileText },
  { id: 'payment', label: 'Payment', icon: CreditCard },
]

const clientInfo = {
  name: 'Alex Thompson',
  email: 'alex@techscale.com',
  company: 'TechScale Inc',
  phone: '+1 (415) 555-0123',
  industry: 'B2B SaaS',
  size: '50-100 employees',
}

const packageInfo = {
  name: 'Growth Package',
  price: 4999,
  features: [
    '1,500 qualified prospects/month',
    'Email + LinkedIn outreach',
    'Bi-weekly strategy calls',
    'CRM integration',
    'A/B testing & optimization',
  ],
}

export default function Project1Page() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isSigning, setIsSigning] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const sigCanvas = useRef<SignatureCanvas>(null)

  const handleSign = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setIsSigning(false)
      setIsSigned(true)
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsProcessing(false)
    setPaymentComplete(true)
  }

  const renderContent = () => {
    const page = pages[currentPage].id

    if (page === 'welcome') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Personalized Proposal</span>
          </div>

          <h1 className="text-5xl font-bold text-white">
            Welcome, {clientInfo.name.split(' ')[0]}
          </h1>

          <p className="text-xl text-gray-400 max-w-lg mx-auto">
            Your custom proposal for <span className="text-white font-medium">{clientInfo.company}</span>
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
            {[
              { icon: Building2, label: 'Company', value: clientInfo.company },
              { icon: Users, label: 'Industry', value: clientInfo.industry },
              { icon: Mail, label: 'Email', value: clientInfo.email },
              { icon: Phone, label: 'Phone', value: clientInfo.phone },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-left"
              >
                <item.icon className="w-5 h-5 text-cyan-400 mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm text-white font-medium truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )
    }

    if (page === 'recap') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">Meeting Recap</h2>
          <p className="text-gray-400 text-center">Key insights from our discovery call</p>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Discovery Call</p>
                <p className="text-sm text-gray-400">January 15, 2026</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Thank you for discussing {clientInfo.company}'s growth objectives. We explored your current 
              outbound strategy, identified bottlenecks, and outlined how our {packageInfo.name} can 
              accelerate your pipeline growth.
            </p>

            <div className="space-y-3 pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Key Discussion Points</p>
              {['Current challenges in outbound', 'Target ICP refinement', 'Revenue goals for 2026', 'Timeline expectations'].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )
    }

    if (page === 'about') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">About RevGen Labs</h2>
          <p className="text-gray-400 text-center">Your partner in predictable revenue</p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Clients', icon: Users },
              { value: '$2.4B', label: 'Pipeline', icon: TrendingUp },
              { value: '94%', label: 'Retention', icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, title: 'Precision Targeting', desc: 'AI-powered ICP identification' },
              { icon: Zap, title: 'Multi-Channel', desc: 'Email, LinkedIn, Phone' },
              { icon: Shield, title: 'Compliance Ready', desc: 'GDPR & CCPA compliant' },
              { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Live performance dashboards' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
                <item.icon className="w-5 h-5 text-cyan-400 mb-2" />
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )
    }

    if (page === 'proposal') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">Your Investment</h2>
          <p className="text-gray-400 text-center">Recommended for {clientInfo.company}</p>

          <div className="relative bg-gradient-to-b from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border-2 border-cyan-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-xs font-bold text-white uppercase">
              Recommended
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{packageInfo.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">${(packageInfo.price / 100).toLocaleString()}</span>
              <span className="text-gray-400">/month</span>
            </div>

            <div className="space-y-3 mb-6">
              {packageInfo.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Setup fee</span>
                <span className="text-green-400 font-medium">Waived</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white font-medium">Due today</span>
                <span className="text-xl font-bold text-white">${(packageInfo.price / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    if (page === 'agreement') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">Service Agreement</h2>
          <p className="text-gray-400 text-center">Review and sign below</p>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 max-h-48 overflow-y-auto">
            <div className="text-sm text-gray-400 font-mono space-y-3">
              <p><strong className="text-white">1. SERVICES:</strong> Provider agrees to deliver the {packageInfo.name} as specified.</p>
              <p><strong className="text-white">2. TERM:</strong> 3-month initial term, renewing monthly thereafter.</p>
              <p><strong className="text-white">3. PAYMENT:</strong> ${(packageInfo.price / 100).toLocaleString()}/month due at period start.</p>
              <p><strong className="text-white">4. GUARANTEE:</strong> 80% delivery guarantee with pro-rated credits.</p>
            </div>
          </div>

          {!isSigned ? (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              {isSigning ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Draw your signature</span>
                    <button onClick={() => { sigCanvas.current?.clear(); setIsEmpty(true) }} className="text-sm text-gray-500 hover:text-white">
                      Clear
                    </button>
                  </div>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <SignatureCanvas
                      ref={sigCanvas}
                      canvasProps={{ style: { width: '100%', height: '140px' } }}
                      backgroundColor="white"
                      penColor="#0891b2"
                      onEnd={() => setIsEmpty(sigCanvas.current?.isEmpty() ?? true)}
                    />
                  </div>
                  <button
                    onClick={handleSign}
                    disabled={isEmpty}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold disabled:opacity-40"
                  >
                    Confirm Signature
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSigning(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
                >
                  Click to Sign Agreement
                </button>
              )}
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-green-400 font-semibold">Agreement Signed</p>
            </div>
          )}
        </motion.div>
      )
    }

    if (page === 'payment') {
      if (paymentComplete) {
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Aboard! 🚀</h2>
            <p className="text-gray-400">Check your email for next steps</p>
          </motion.div>
        )
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">Complete Payment</h2>
          <p className="text-gray-400 text-center">Secure checkout</p>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
              <span className="text-gray-400">{packageInfo.name}</span>
              <span className="text-white font-medium">${(packageInfo.price / 100).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Due Today</span>
              <span className="text-2xl font-bold text-white">${(packageInfo.price / 100).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!isSigned || isProcessing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : !isSigned ? (
              <><Lock className="w-5 h-5" /> Sign Agreement First</>
            ) : (
              <><CreditCard className="w-5 h-5" /> Pay ${(packageInfo.price / 100).toLocaleString()}</>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> 256-bit SSL encryption
          </p>
        </motion.div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">RevGen<span className="text-cyan-400">Labs</span></span>
          </div>

          <div className="flex items-center gap-2">
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  i === currentPage
                    ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white'
                    : i < currentPage
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-white/5 text-gray-500'
                }`}
              >
                {i < currentPage ? <Check className="w-4 h-4" /> : <p.icon className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-28 px-6 max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <div key={currentPage}>{renderContent()}</div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 inset-x-0 z-50 bg-gray-900/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-400 hover:text-white disabled:opacity-30 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <div className="flex gap-2">
            {pages.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentPage ? 'w-8 bg-gradient-to-r from-cyan-500 to-purple-500' : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(pages.length - 1, p + 1))}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium disabled:opacity-30 transition"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Design Label */}
      <div className="fixed top-20 left-4 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
        <span className="text-xs font-medium text-cyan-400">Project 1 - Original Glass Cards Design</span>
      </div>
    </div>
  )
}
