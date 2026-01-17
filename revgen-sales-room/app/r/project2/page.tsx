'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SignatureCanvas from 'react-signature-canvas'
import {
  Check,
  Sparkles,
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
  Phone,
  CreditCard,
  Star,
  ArrowDown,
} from 'lucide-react'

// PROJECT 2 - Single Page Scrolling Design
// All sections visible on one scrolling page with sticky navigation

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

const sections = [
  { id: 'hero', label: 'Welcome' },
  { id: 'recap', label: 'Recap' },
  { id: 'about', label: 'About' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contract', label: 'Contract' },
  { id: 'payment', label: 'Pay' },
]

export default function Project2Page() {
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">RevGen<span className="text-emerald-400">Labs</span></span>
          </div>
          <div className="flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="text-center z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">Personalized Proposal</span>
            </div>
            
            <h1 className="text-6xl font-bold">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{clientInfo.name.split(' ')[0]}</span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Your custom revenue acceleration proposal for <span className="text-white font-medium">{clientInfo.company}</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { icon: Building2, value: clientInfo.company },
                { icon: Mail, value: clientInfo.email },
                { icon: Phone, value: clientInfo.phone },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-zinc-300">{item.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo('recap')}
              className="mt-12 flex flex-col items-center gap-2 text-zinc-500 hover:text-emerald-400 transition mx-auto"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Meeting Recap */}
      <section id="recap" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Meeting Recap</h2>
            <p className="text-zinc-400">Key insights from our discovery call</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium">Discovery Call</p>
                <p className="text-zinc-400">January 15, 2026</p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mb-8 text-lg">
              Thank you for discussing {clientInfo.company}'s growth objectives. We explored your 
              current outbound strategy, identified key bottlenecks, and outlined how our 
              {packageInfo.name} can help you achieve your revenue goals.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {['Current challenges in outbound sales', 'Ideal customer profile refinement', 'Revenue goals for 2026', 'Timeline and implementation plan'].map((point, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-300">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why RevGen Labs?</h2>
            <p className="text-zinc-400">Trusted by 500+ B2B companies worldwide</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { value: '500+', label: 'Clients Served', icon: Users },
              { value: '$2.4B', label: 'Pipeline Generated', icon: TrendingUp },
              { value: '94%', label: 'Client Retention', icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-zinc-900 border border-zinc-800 rounded-2xl"
              >
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Target, title: 'Precision Targeting', desc: 'AI-powered ICP' },
              { icon: Zap, title: 'Multi-Channel', desc: 'Email + LinkedIn + Phone' },
              { icon: Shield, title: 'Compliance', desc: 'GDPR & CCPA ready' },
              { icon: BarChart3, title: 'Analytics', desc: 'Real-time dashboards' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center"
              >
                <item.icon className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
                <p className="font-medium mb-1">{item.title}</p>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Your Investment</h2>
            <p className="text-zinc-400">Recommended for {clientInfo.company}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-b from-emerald-500/10 to-zinc-900 border-2 border-emerald-500/30 rounded-3xl p-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold rounded-bl-xl">
              RECOMMENDED
            </div>

            <h3 className="text-2xl font-bold mb-4">{packageInfo.name}</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold">${(packageInfo.price / 100).toLocaleString()}</span>
              <span className="text-zinc-400 text-xl">/month</span>
            </div>

            <div className="space-y-4 mb-8">
              {packageInfo.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-zinc-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-700 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Setup fee</span>
                <span className="text-emerald-400 font-medium">Waived</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Total due today</span>
                <span className="font-bold">${(packageInfo.price / 100).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contract Section */}
      <section id="contract" className="py-32 px-6 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Service Agreement</h2>
            <p className="text-zinc-400">Review and sign to proceed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-h-64 overflow-y-auto">
              <div className="text-sm text-zinc-400 font-mono space-y-4">
                <p><strong className="text-white">1. SERVICES</strong><br />
                RevGen Labs ("Provider") agrees to provide {packageInfo.name} services as outlined in this proposal to {clientInfo.company} ("Client").</p>
                <p><strong className="text-white">2. TERM</strong><br />
                Initial term of 3 months, automatically renewing on a month-to-month basis thereafter. Either party may terminate with 30 days written notice.</p>
                <p><strong className="text-white">3. INVESTMENT</strong><br />
                Client agrees to pay ${(packageInfo.price / 100).toLocaleString()} per month. First payment due upon signing.</p>
                <p><strong className="text-white">4. PERFORMANCE GUARANTEE</strong><br />
                Provider guarantees 80% delivery of promised prospect volume. Any shortfall will be credited pro-rata.</p>
              </div>
            </div>

            {!isSigned ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                {isSigning ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Draw your signature</span>
                      <button onClick={() => { sigCanvas.current?.clear(); setIsEmpty(true) }} className="text-sm text-zinc-500 hover:text-white">
                        Clear
                      </button>
                    </div>
                    <div className="bg-white rounded-xl overflow-hidden">
                      <SignatureCanvas
                        ref={sigCanvas}
                        canvasProps={{ style: { width: '100%', height: '150px' } }}
                        backgroundColor="white"
                        penColor="#10b981"
                        onEnd={() => setIsEmpty(sigCanvas.current?.isEmpty() ?? true)}
                      />
                    </div>
                    <button
                      onClick={handleSign}
                      disabled={isEmpty}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold disabled:opacity-40"
                    >
                      Confirm Signature
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSigning(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:opacity-90 transition"
                  >
                    Click to Sign Agreement
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-emerald-400">Agreement Signed Successfully</p>
                <p className="text-zinc-400 mt-2">Signed on {new Date().toLocaleDateString()}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="py-32 px-6">
        <div className="max-w-2xl mx-auto">
          {paymentComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Welcome Aboard! 🚀</h2>
              <p className="text-xl text-zinc-400 mb-8">Your journey to predictable revenue starts now</p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left max-w-md mx-auto">
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-4">What's Next</p>
                {['Welcome email with portal access', 'Onboarding call scheduled within 24h', 'Campaign launch in 14 days'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Complete Payment</h2>
                <p className="text-zinc-400">Secure checkout powered by Stripe</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <div className="flex justify-between items-center pb-6 border-b border-zinc-800 mb-6">
                  <span className="text-zinc-400">{packageInfo.name}</span>
                  <span className="font-medium">${(packageInfo.price / 100).toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Due Today</span>
                  <span className="text-3xl font-bold">${(packageInfo.price / 100).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!isSigned || isProcessing}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg font-semibold disabled:opacity-40 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Processing...</>
                ) : !isSigned ? (
                  <><Lock className="w-6 h-6" /> Sign Agreement First</>
                ) : (
                  <><CreditCard className="w-6 h-6" /> Pay ${(packageInfo.price / 100).toLocaleString()}</>
                )}
              </button>

              <p className="text-center text-sm text-zinc-500 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> 256-bit SSL encryption • PCI compliant
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Design Label */}
      <div className="fixed top-20 left-4 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg z-50">
        <span className="text-xs font-medium text-emerald-400">Project 2 - Single Page Scroll Design</span>
      </div>
    </div>
  )
}
