'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles,
  Check,
  ChevronDown,
  Play,
  ArrowRight,
  Clock,
  Target,
  Zap,
  Users,
  BarChart3,
  Shield,
  Star,
  Quote,
  CheckCircle2,
  FileSignature,
  CreditCard,
  MessageSquare,
  Calendar,
  TrendingUp,
  Award,
  Rocket,
  X,
} from 'lucide-react'
import { SignaturePad } from '@/components/room-viewer/signature-pad'

// RevGen Labs Demo Data
const roomData = {
  prospect: {
    name: 'Alex Thompson',
    company: 'TechScale Inc',
    email: 'alex@techscale.io',
  },
  meeting: {
    date: 'January 15, 2024',
    duration: '45 minutes',
    summary: `Thank you for the excellent conversation about TechScale's growth ambitions, Alex. Your vision for expanding into the enterprise market while maintaining your startup agility really resonated with us.

We discussed the key challenges you're facing with your current outbound strategy - specifically the difficulty in reaching decision-makers at Fortune 500 companies and the inconsistent pipeline that's making revenue forecasting challenging.

Based on our discussion, we've tailored a comprehensive lead generation solution that combines our AI-powered prospecting with human-verified outreach to ensure you're connecting with exactly the right buyers at the right time.`,
    keyPoints: [
      'Current challenge: 15 qualified meetings/month, target is 50+',
      'ICP: VP+ level at companies with $10M-$100M ARR',
      'Main verticals: FinTech, HealthTech, Enterprise SaaS',
      'Timeline: Launch within 2 weeks, see results in 30 days',
      'Budget: Approved for $5K-$10K/month investment',
    ],
    nextSteps: [
      'Sign agreement to lock in Q1 pricing (15% early bird discount)',
      'Complete onboarding questionnaire (10 minutes)',
      'Kickoff call with your dedicated growth strategist',
      'Campaign launch within 14 days',
    ],
  },
  services: {
    title: 'Why RevGen Labs?',
    description: 'We\'re not just another lead gen agency. We\'re your unfair advantage in the market.',
    features: [
      {
        icon: Target,
        title: 'Precision Targeting',
        description: 'AI-powered ICP identification that finds your perfect buyers before your competitors do.',
      },
      {
        icon: Zap,
        title: 'Multi-Channel Outreach',
        description: 'Coordinated campaigns across email, LinkedIn, and phone that feel personal at scale.',
      },
      {
        icon: Users,
        title: 'Human Verified',
        description: 'Every contact verified by our team. No bots, no spam, just real conversations.',
      },
      {
        icon: BarChart3,
        title: 'Transparent Analytics',
        description: 'Real-time dashboard showing exactly where every lead comes from and costs.',
      },
      {
        icon: Shield,
        title: 'Compliance First',
        description: 'GDPR, CCPA, and CAN-SPAM compliant. Protect your brand reputation.',
      },
      {
        icon: Rocket,
        title: 'Speed to Value',
        description: 'First qualified meetings within 14 days or we extend your contract free.',
      },
    ],
  },
  testimonials: [
    {
      quote: "RevGen Labs transformed our pipeline. We went from struggling to book 10 meetings a month to consistently hitting 50+. The ROI has been incredible - 12x in the first quarter alone.",
      author: 'Sarah Chen',
      title: 'VP of Sales',
      company: 'DataFlow Systems',
      avatar: 'SC',
      metrics: '12x ROI in 90 days',
    },
    {
      quote: "What sets RevGen apart is their obsession with quality. Every lead they send us is exactly who we want to talk to. Our sales team actually enjoys working these leads.",
      author: 'Marcus Johnson',
      title: 'CRO',
      company: 'Elevate AI',
      avatar: 'MJ',
      metrics: '340% increase in SQLs',
    },
    {
      quote: "We've tried 4 agencies before. RevGen is the first one that actually delivered. They feel like an extension of our team, not a vendor.",
      author: 'Emily Rodriguez',
      title: 'CEO',
      company: 'ScaleUp Ventures',
      avatar: 'ER',
      metrics: '$2.4M pipeline in 60 days',
    },
  ],
  pricing: [
    {
      id: 'growth',
      name: 'Growth',
      subtitle: 'For scaling teams',
      price: 4999,
      originalPrice: 5999,
      period: '/month',
      description: 'Everything you need to accelerate pipeline growth',
      features: [
        '75 qualified meetings/month',
        'Email + LinkedIn campaigns',
        'Dedicated account manager',
        '3 ICP verticals',
        'Weekly strategy calls',
        'Real-time analytics dashboard',
        'CRM integration',
      ],
      cta: 'Select Growth',
      popular: false,
    },
    {
      id: 'scale',
      name: 'Scale',
      subtitle: 'Most popular',
      price: 7999,
      originalPrice: 9499,
      period: '/month',
      description: 'For teams ready to dominate their market',
      features: [
        '150 qualified meetings/month',
        'Full omnichannel (Email, LinkedIn, Phone)',
        'Senior growth strategist',
        'Unlimited ICP verticals',
        'Daily performance updates',
        'Custom reporting & attribution',
        'Slack integration',
        'Priority support',
        'A/B testing optimization',
      ],
      cta: 'Select Scale',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'For market leaders',
      price: 14999,
      originalPrice: null,
      period: '/month',
      description: 'Full-service revenue acceleration',
      features: [
        'Unlimited meetings',
        'Dedicated pod (3+ specialists)',
        'Executive sponsor',
        'Custom playbook development',
        'Quarterly business reviews',
        'Multi-market expansion',
        'Event & ABM campaigns',
        'Revenue attribution modeling',
        '24/7 support',
      ],
      cta: 'Contact Us',
      popular: false,
    },
  ],
  contract: {
    terms: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into between RevGen Labs, Inc. ("Provider") and TechScale Inc ("Client"), effective as of the signature date below.

1. SERVICES
Provider agrees to deliver B2B lead generation services as specified in the selected package, including but not limited to: prospect research, multi-channel outreach campaigns, meeting scheduling, and performance reporting.

2. TERM
Initial term of three (3) months, automatically renewing monthly thereafter unless cancelled with 30 days written notice.

3. PAYMENT
Client agrees to pay the monthly fee associated with the selected package. Payment is due upon signing and on the same date each subsequent month.

4. PERFORMANCE GUARANTEE
If Provider fails to deliver at least 80% of the promised qualified meetings in any given month, Client will receive a pro-rated credit for the shortfall.

5. CONFIDENTIALITY
Both parties agree to maintain strict confidentiality of all business information, prospect data, and campaign strategies shared during the engagement.

6. DATA PROTECTION
Provider maintains SOC 2 Type II compliance and adheres to all applicable data protection regulations including GDPR and CCPA.`,
  },
}

export default function RevGenRoomPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showSignature, setShowSignature] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % roomData.testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSign = (signatureData: string) => {
    setIsSigned(true)
    setShowSignature(false)
  }

  const handlePayment = () => {
    setShowPaymentSuccess(true)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] gradient-mesh-premium">
      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              RevGen<span className="text-cyan-400">Labs</span>
            </span>
          </Link>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center gap-3">
            {[
              { label: 'Viewed', done: true },
              { label: 'Selected', done: !!selectedPackage },
              { label: 'Signed', done: isSigned },
              { label: 'Paid', done: showPaymentSuccess },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  step.done 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-white/5 text-zinc-500 border border-white/10'
                }`}>
                  {step.done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-px ${step.done ? 'bg-cyan-500/30' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold text-sm"
          >
            View Pricing
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-300 text-sm">
              Prepared exclusively for <span className="text-white font-medium">{roomData.prospect.company}</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]"
          >
            <span className="text-white">Your Growth</span>
            <br />
            <span className="text-gradient-cyan">Acceleration Plan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 mb-6 max-w-2xl mx-auto"
          >
            Hello {roomData.prospect.name.split(' ')[0]}! Everything we discussed, 
            ready for you to review and get started.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              {roomData.meeting.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              {roomData.meeting.duration}
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              {roomData.prospect.email}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ y: 5 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => document.getElementById('recap')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Meeting Recap */}
      <section id="recap" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20">
                <FileSignature className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Meeting Recap</h2>
                <p className="text-zinc-500">From our conversation on {roomData.meeting.date}</p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 md:p-12 border-glow">
              <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line mb-10">
                {roomData.meeting.summary}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Key Discussion Points
                  </h3>
                  <ul className="space-y-3">
                    {roomData.meeting.keyPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-zinc-400"
                      >
                        <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-purple-400" />
                    Next Steps
                  </h3>
                  <ul className="space-y-3">
                    {roomData.meeting.nextSteps.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-zinc-400"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why RevGen Labs */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {roomData.services.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {roomData.services.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomData.services.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl p-6 border-glow group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Growth Leaders
            </h2>
            <p className="text-xl text-zinc-400">
              See what our clients have to say
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-8 md:p-12 border-glow"
              >
                <Quote className="w-12 h-12 text-cyan-400/30 mb-6" />
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed mb-8 font-light italic">
                  "{roomData.testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {roomData.testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{roomData.testimonials[currentTestimonial].author}</p>
                      <p className="text-sm text-zinc-500">
                        {roomData.testimonials[currentTestimonial].title} at {roomData.testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-400 font-semibold text-sm">
                      {roomData.testimonials[currentTestimonial].metrics}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {roomData.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentTestimonial ? 'bg-cyan-400 w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-zinc-300">Early Bird Pricing - Save up to 20%</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              All plans include our performance guarantee. No risk, just results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {roomData.pricing.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPackage(tier.id)}
                className={`relative rounded-3xl p-8 cursor-pointer transition-all ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-cyan-500/10 to-purple-500/5 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10' 
                    : 'glass-card border border-white/5 hover:border-white/10'
                } ${selectedPackage === tier.id ? 'ring-2 ring-cyan-400 ring-offset-4 ring-offset-black' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {selectedPackage === tier.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm text-zinc-500 mb-1">{tier.subtitle}</p>
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">${tier.price.toLocaleString()}</span>
                    <span className="text-zinc-500">{tier.period}</span>
                  </div>
                  {tier.originalPrice && (
                    <p className="text-sm text-zinc-500 mt-1">
                      <span className="line-through">${tier.originalPrice.toLocaleString()}</span>
                      <span className="text-cyan-400 ml-2">Save ${(tier.originalPrice - tier.price).toLocaleString()}</span>
                    </p>
                  )}
                </div>

                <p className="text-zinc-400 text-sm mb-6">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-cyan-400' : 'text-zinc-500'}`} />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {selectedPackage === tier.id ? 'Selected' : tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract & Signature */}
      {selectedPackage && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-32 px-6"
          id="contract"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border border-cyan-500/30 mb-6"
              >
                <FileSignature className="w-10 h-10 text-cyan-400" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Almost There! 🎉
              </h2>
              <p className="text-xl text-zinc-400">
                Review the agreement and sign to get started with{' '}
                <span className="text-cyan-400 font-semibold">
                  {roomData.pricing.find(p => p.id === selectedPackage)?.name}
                </span>
              </p>
            </div>

            {/* Contract */}
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8 border-glow">
              <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed">
                {roomData.contract.terms}
              </pre>
            </div>

            {/* Signature */}
            {!isSigned ? (
              <motion.div 
                className="glass-card rounded-3xl p-8 border-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-cyan-400" />
                  Sign to Accept
                </h3>
                <SignaturePad onSign={handleSign} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card rounded-3xl p-12 text-center border-glow"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Agreement Signed!</h3>
                <p className="text-zinc-400 mb-8">
                  Thank you, {roomData.prospect.name.split(' ')[0]}! Complete your payment to activate your account.
                </p>

                {!showPaymentSuccess ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                  >
                    <CreditCard className="w-5 h-5 mr-3 inline" />
                    Complete Payment - ${roomData.pricing.find(p => p.id === selectedPackage)?.price.toLocaleString()}/mo
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30"
                    >
                      <Check className="w-12 h-12 text-black" />
                    </motion.div>
                    <div>
                      <h4 className="text-3xl font-bold text-white mb-2">Welcome to RevGen Labs! 🚀</h4>
                      <p className="text-zinc-400">
                        Your payment was successful. Check your email for next steps.
                      </p>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-left max-w-md mx-auto">
                      <h5 className="font-semibold text-white mb-4">What's Next?</h5>
                      <ul className="space-y-3 text-sm">
                        {[
                          'Welcome email with portal access',
                          'Onboarding call within 24 hours',
                          'Campaign kickoff in 14 days',
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-zinc-400">
                            <Check className="w-4 h-4 text-emerald-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">
              RevGen<span className="text-cyan-400">Labs</span>
            </span>
          </div>
          <p className="text-zinc-600 text-sm">
            © 2024 RevGen Labs, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
