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
  Rocket,
  ChevronRight,
  Play,
  PenTool,
} from 'lucide-react'

// PROJECT 3 - Premium Multi-Page with Enhanced Animations
// Sophisticated animations, gradient backgrounds, and premium feel

const pages = [
  { id: 'welcome', label: 'Welcome', icon: Sparkles },
  { id: 'recap', label: 'Meeting Recap', icon: MessageSquare },
  { id: 'about', label: 'About Us', icon: Building2 },
  { id: 'proposal', label: 'Your Proposal', icon: Package },
  { id: 'timeline', label: 'Timeline', icon: CalendarDays },
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

export default function Project3Page() {
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

  const pageVariants = {
    initial: { opacity: 0, x: 100, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.95 }
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const renderContent = () => {
    const page = pages[currentPage].id

    if (page === 'welcome') {
      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="text-center space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur-2xl opacity-50" />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl font-bold text-white">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{clientInfo.name.split(' ')[0]}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl text-zinc-400 max-w-lg mx-auto">
            Your personalized proposal for <span className="text-white font-semibold">{clientInfo.company}</span>
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {[
              { icon: Building2, label: 'Company', value: clientInfo.company, color: 'from-violet-500 to-purple-500' },
              { icon: Users, label: 'Industry', value: clientInfo.industry, color: 'from-fuchsia-500 to-pink-500' },
              { icon: Mail, label: 'Email', value: clientInfo.email, color: 'from-cyan-500 to-blue-500' },
              { icon: Phone, label: 'Phone', value: clientInfo.phone, color: 'from-emerald-500 to-teal-500' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group relative bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all cursor-default"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                <div className="relative flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">{item.label}</p>
                    <p className="text-sm text-white font-medium truncate">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 pt-8"
          >
            {pages.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs ${
                  i === 0
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-zinc-500'
                }`}
              >
                <p.icon className="w-3 h-3" />
                {p.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )
    }

    if (page === 'recap') {
      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Meeting Recap</h2>
            <p className="text-zinc-400">Key takeaways from our conversation</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 pb-5 border-b border-zinc-800 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Play className="w-7 h-7 text-white ml-0.5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Discovery Call</p>
                <p className="text-sm text-zinc-400">January 15, 2026 • 45 min</p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              Thank you for discussing {clientInfo.company}'s growth objectives. We explored your current 
              outbound strategy, identified key bottlenecks, and discussed how our {packageInfo.name} can 
              help you achieve your revenue goals.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">Key Discussion Points</p>
            <div className="space-y-3">
              {['Current outbound challenges', 'Target ICP and market segments', 'Revenue goals for Q1-Q2', 'Implementation timeline'].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-zinc-200">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )
    }

    if (page === 'about') {
      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">About RevGen Labs</h2>
            <p className="text-zinc-400">Your partner in predictable growth</p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Clients', icon: Users, color: 'from-violet-500 to-purple-500' },
              { value: '$2.4B', label: 'Pipeline', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
              { value: '94%', label: 'Retention', icon: Award, color: 'from-amber-500 to-orange-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 blur-xl rounded-2xl`} />
                <div className="relative bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-4 text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color.includes('violet') ? '#8b5cf6' : stat.color.includes('emerald') ? '#10b981' : '#f59e0b' }} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, title: 'Precision Targeting', desc: 'AI-powered ICP identification', color: '#8b5cf6' },
              { icon: Zap, title: 'Multi-Channel', desc: 'Email + LinkedIn + Phone', color: '#06b6d4' },
              { icon: Shield, title: 'Compliance Ready', desc: 'GDPR & CCPA compliant', color: '#10b981' },
              { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Live performance dashboards', color: '#f59e0b' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-colors"
              >
                <item.icon className="w-6 h-6 mb-3" style={{ color: item.color }} />
                <p className="font-medium text-white mb-1">{item.title}</p>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )
    }

    if (page === 'proposal') {
      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-md mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Your Investment</h2>
            <p className="text-zinc-400">Recommended for {clientInfo.company}</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent rounded-3xl" />
            
            <div className="relative bg-zinc-900/80 backdrop-blur border-2 border-violet-500/30 rounded-3xl p-8">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{packageInfo.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white">${(packageInfo.price / 100).toLocaleString()}</span>
                <span className="text-zinc-400">/month</span>
              </div>

              <div className="space-y-3 mb-8">
                {packageInfo.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-violet-400" />
                    </div>
                    <span className="text-zinc-200">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Setup fee</span>
                  <span className="text-emerald-400 font-medium">Waived</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white font-medium">Total due today</span>
                  <span className="text-2xl font-bold text-white">${(packageInfo.price / 100).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    }

    if (page === 'timeline') {
      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Implementation Timeline</h2>
            <p className="text-zinc-400">Your path to predictable revenue</p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            {[
              { week: 'Week 1', title: 'Onboarding & Setup', desc: 'Kickoff call, ICP refinement, tech stack integration', color: '#8b5cf6' },
              { week: 'Week 2', title: 'Strategy Development', desc: 'Messaging, sequence design, playbook creation', color: '#06b6d4' },
              { week: 'Week 3', title: 'Campaign Launch', desc: 'Go live with first outbound campaigns', color: '#10b981' },
              { week: 'Week 4+', title: 'Optimization & Scale', desc: 'A/B testing, performance optimization, scaling winners', color: '#f59e0b' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex gap-4 items-start"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  style={{ background: step.color }}
                >
                  {i + 1}
                </div>
                <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-4 flex-1">
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: step.color }}>{step.week}</p>
                  <p className="font-semibold text-white mb-1">{step.title}</p>
                  <p className="text-sm text-zinc-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )
    }

    if (page === 'agreement') {
      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Service Agreement</h2>
            <p className="text-zinc-400">Review and sign to proceed</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6 max-h-48 overflow-y-auto">
            <div className="text-sm text-zinc-400 font-mono space-y-4">
              <p><strong className="text-white">1. SERVICES</strong><br />
              Provider agrees to deliver {packageInfo.name} services as outlined.</p>
              <p><strong className="text-white">2. TERM</strong><br />
              3-month initial term, renewing monthly thereafter.</p>
              <p><strong className="text-white">3. PAYMENT</strong><br />
              ${(packageInfo.price / 100).toLocaleString()}/month due at period start.</p>
              <p><strong className="text-white">4. GUARANTEE</strong><br />
              80% delivery guarantee with pro-rated credits.</p>
            </div>
          </motion.div>

          {!isSigned ? (
            <motion.div variants={fadeUp} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6">
              {isSigning ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <PenTool className="w-4 h-4" /> Draw your signature
                    </span>
                    <button onClick={() => { sigCanvas.current?.clear(); setIsEmpty(true) }} className="text-sm text-zinc-500 hover:text-white">
                      Clear
                    </button>
                  </div>
                  <div className="bg-white rounded-xl overflow-hidden ring-2 ring-violet-500/30">
                    <SignatureCanvas
                      ref={sigCanvas}
                      canvasProps={{ style: { width: '100%', height: '140px' } }}
                      backgroundColor="white"
                      penColor="#8b5cf6"
                      onEnd={() => setIsEmpty(sigCanvas.current?.isEmpty() ?? true)}
                    />
                  </div>
                  <button
                    onClick={handleSign}
                    disabled={isEmpty}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold disabled:opacity-40"
                  >
                    Confirm Signature
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSigning(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                >
                  Click to Sign Agreement
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center"
            >
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-emerald-400">Agreement Signed</p>
              <p className="text-sm text-zinc-400 mt-1">Signed on {new Date().toLocaleDateString()}</p>
            </motion.div>
          )}
        </motion.div>
      )
    }

    if (page === 'payment') {
      if (paymentComplete) {
        return (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6 max-w-md mx-auto"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-50" />
              <div className="relative w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Aboard! 🚀</h2>
            <p className="text-zinc-400">Check your email for next steps</p>
            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6 text-left">
              <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">What's Next</p>
              {['Welcome email with portal access', 'Onboarding call in 24h', 'Campaign launch in 14 days'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )
      }

      return (
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-md mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Complete Payment</h2>
            <p className="text-zinc-400">Secure checkout powered by Stripe</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-4">
              <span className="text-zinc-400">{packageInfo.name}</span>
              <span className="text-white font-medium">${(packageInfo.price / 100).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Due Today</span>
              <span className="text-3xl font-bold text-white">${(packageInfo.price / 100).toLocaleString()}</span>
            </div>
          </motion.div>

          <motion.button
            variants={fadeUp}
            onClick={handlePayment}
            disabled={!isSigned || isProcessing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold disabled:opacity-40 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : !isSigned ? (
              <><Lock className="w-5 h-5" /> Sign Agreement First</>
            ) : (
              <><CreditCard className="w-5 h-5" /> Pay ${(packageInfo.price / 100).toLocaleString()}</>
            )}
          </motion.button>

          <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> 256-bit SSL • PCI compliant
          </p>
        </motion.div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">RevGen<span className="text-violet-400">Labs</span></span>
          </div>

          <div className="flex items-center gap-1.5">
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setCurrentPage(i)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  i === currentPage
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
                    : i < currentPage
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {i < currentPage ? <Check className="w-4 h-4" /> : <p.icon className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative pt-24 pb-28 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 inset-x-0 z-50 bg-black/80 backdrop-blur-xl border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white border border-zinc-800 disabled:opacity-30 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <div className="flex gap-2">
            {pages.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentPage
                    ? 'w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500'
                    : i < currentPage
                    ? 'w-2 bg-violet-500/50'
                    : 'w-2 bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(pages.length - 1, p + 1))}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium disabled:opacity-30 hover:shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Design Label */}
      <div className="fixed top-20 left-4 px-3 py-1.5 bg-violet-500/20 border border-violet-500/30 rounded-lg z-50">
        <span className="text-xs font-medium text-violet-400">Project 3 - Premium Animated Design</span>
      </div>
    </div>
  )
}
