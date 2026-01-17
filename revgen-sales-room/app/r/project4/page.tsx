'use client'

import { useState, useRef } from 'react'
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
} from 'lucide-react'

// PROJECT 4 - Clean Admin-Style Design
// Matches the admin dashboard styling with inline styles

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

export default function Project4Page() {
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

  const goNext = () => setCurrentPage(p => Math.min(pages.length - 1, p + 1))
  const goBack = () => setCurrentPage(p => Math.max(0, p - 1))

  const cardStyle = {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px',
  }

  const renderContent = () => {
    const page = pages[currentPage].id

    // WELCOME PAGE
    if (page === 'welcome') {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
            }}>
              <Sparkles size={40} style={{ color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
              Welcome, {clientInfo.name.split(' ')[0]}
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '16px' }}>
              Your personalized proposal for <span style={{ color: 'white', fontWeight: '500' }}>{clientInfo.company}</span>
            </p>
          </div>

          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { icon: Building2, label: 'Company', value: clientInfo.company, color: '#22d3ee' },
                { icon: Users, label: 'Industry', value: clientInfo.industry, color: '#a78bfa' },
                { icon: Mail, label: 'Email', value: clientInfo.email, color: '#34d399' },
                { icon: Phone, label: 'Phone', value: clientInfo.phone, color: '#fbbf24' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#52525b', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(34, 211, 238, 0.05))' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#71717a', marginBottom: '16px', textAlign: 'center' }}>
              What's Included in This Proposal
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {pages.map((p, i) => (
                <div key={p.id} style={{
                  padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
                  background: i === 0 ? 'rgba(139, 92, 246, 0.2)' : '#27272a',
                  color: i === 0 ? '#a78bfa' : '#71717a',
                  border: i === 0 ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                }}>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // MEETING RECAP PAGE
    if (page === 'recap') {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Meeting Recap</h1>
            <p style={{ color: '#71717a', fontSize: '14px' }}>Key takeaways from our conversation</p>
          </div>

          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid #27272a', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={24} style={{ color: '#a78bfa' }} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Discovery Call</div>
                <div style={{ fontSize: '13px', color: '#71717a' }}>January 15, 2026</div>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.7' }}>
              Thank you for discussing {clientInfo.company}'s growth objectives. We explored your current 
              outbound strategy, identified key bottlenecks, and discussed how our {packageInfo.name} can 
              help you achieve your revenue goals.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#71717a', marginBottom: '20px' }}>Key Discussion Points</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Current outbound challenges', 'Ideal customer profile', 'Revenue goals and timeline', 'Team structure', 'Budget expectations'].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} style={{ color: '#34d399' }} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#e4e4e7' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // ABOUT US PAGE
    if (page === 'about') {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>About RevGen Labs</h1>
            <p style={{ color: '#71717a', fontSize: '14px' }}>Your partner in predictable revenue growth</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { value: '500+', label: 'Clients Served', icon: Users, color: '#22d3ee' },
              { value: '$2.4B', label: 'Pipeline Generated', icon: TrendingUp, color: '#34d399' },
              { value: '94%', label: 'Client Retention', icon: Award, color: '#fbbf24' },
            ].map((stat) => (
              <div key={stat.label} style={{ ...cardStyle, textAlign: 'center', padding: '20px' }}>
                <stat.icon size={24} style={{ color: stat.color, marginBottom: '12px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#71717a' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: Target, title: 'Precision Targeting', desc: 'AI-powered ICP identification', color: '#22d3ee' },
              { icon: Zap, title: 'Multi-Channel', desc: 'Email, LinkedIn, Phone', color: '#a78bfa' },
              { icon: Shield, title: 'Compliance Ready', desc: 'GDPR & CCPA compliant', color: '#34d399' },
              { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Live performance dashboards', color: '#fbbf24' },
            ].map((item) => (
              <div key={item.title} style={cardStyle}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#71717a', lineHeight: '1.5' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // PROPOSAL PAGE
    if (page === 'proposal') {
      return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Your Investment</h1>
            <p style={{ color: '#71717a', fontSize: '14px' }}>Recommended package for {clientInfo.company}</p>
          </div>

          <div style={{
            ...cardStyle,
            background: 'linear-gradient(180deg, #18181b 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '16px', right: '16px',
              padding: '6px 12px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'white',
            }}>
              Recommended
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>{packageInfo.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>${(packageInfo.price / 100).toLocaleString()}</span>
                <span style={{ fontSize: '16px', color: '#71717a' }}>/month</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {packageInfo.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} style={{ color: '#a78bfa' }} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#e4e4e7' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: '20px', borderTop: '1px solid #27272a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#71717a' }}>Setup fee</span>
                <span style={{ fontSize: '14px', color: '#34d399', fontWeight: '600' }}>Waived</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Total due today</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>${(packageInfo.price / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // TIMELINE PAGE
    if (page === 'timeline') {
      return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Implementation Timeline</h1>
            <p style={{ color: '#71717a', fontSize: '14px' }}>Your path to predictable revenue</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { week: 'Week 1', title: 'Onboarding & Setup', desc: 'Kickoff call, ICP refinement, tech stack integration', color: '#a78bfa' },
              { week: 'Week 2', title: 'Strategy Development', desc: 'Messaging, sequence design, playbook creation', color: '#22d3ee' },
              { week: 'Week 3', title: 'Campaign Launch', desc: 'Go live with first outbound campaigns', color: '#34d399' },
              { week: 'Week 4+', title: 'Optimization & Scale', desc: 'A/B testing, performance optimization, scaling winners', color: '#fbbf24' },
            ].map((step, i) => (
              <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
                  background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 'bold', color: '#09090b',
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: step.color, marginBottom: '4px' }}>{step.week}</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{step.title}</div>
                  <div style={{ fontSize: '13px', color: '#71717a' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // AGREEMENT PAGE
    if (page === 'agreement') {
      return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Service Agreement</h1>
            <p style={{ color: '#71717a', fontSize: '14px' }}>Review and sign to proceed</p>
          </div>

          <div style={{ ...cardStyle, marginBottom: '24px', maxHeight: '200px', overflowY: 'auto' }}>
            <div style={{ fontSize: '12px', color: '#a1a1aa', fontFamily: 'ui-monospace, monospace', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px' }}><strong style={{ color: '#e4e4e7' }}>1. SERVICES</strong><br />
              RevGen Labs agrees to provide {packageInfo.name} services to {clientInfo.company}.</p>
              <p style={{ marginBottom: '16px' }}><strong style={{ color: '#e4e4e7' }}>2. TERM</strong><br />
              3-month initial term, renewing monthly thereafter. 30 days notice to terminate.</p>
              <p style={{ marginBottom: '16px' }}><strong style={{ color: '#e4e4e7' }}>3. INVESTMENT</strong><br />
              ${(packageInfo.price / 100).toLocaleString()}/month. First payment due upon signing.</p>
              <p><strong style={{ color: '#e4e4e7' }}>4. GUARANTEE</strong><br />
              80% delivery guarantee with pro-rated credits.</p>
            </div>
          </div>

          {!isSigned ? (
            <div style={cardStyle}>
              {isSigning ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Draw your signature below</span>
                    <button
                      onClick={() => { sigCanvas.current?.clear(); setIsEmpty(true) }}
                      style={{ fontSize: '13px', color: '#71717a', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Clear
                    </button>
                  </div>
                  <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                    <SignatureCanvas
                      ref={sigCanvas}
                      canvasProps={{ style: { width: '100%', height: '140px' } }}
                      backgroundColor="white"
                      penColor="#7c3aed"
                      onEnd={() => setIsEmpty(sigCanvas.current?.isEmpty() ?? true)}
                    />
                  </div>
                  <button
                    onClick={handleSign}
                    disabled={isEmpty}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px',
                      background: isEmpty ? '#27272a' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                      color: isEmpty ? '#52525b' : 'white',
                      fontSize: '14px', fontWeight: '600', border: 'none',
                      cursor: isEmpty ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Confirm Signature
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSigning(true)}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                    color: 'white', fontSize: '15px', fontWeight: '600',
                    border: 'none', cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  Click to Sign Agreement
                </button>
              )}
            </div>
          ) : (
            <div style={{
              ...cardStyle,
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              textAlign: 'center',
            }}>
              <CheckCircle2 size={48} style={{ color: '#34d399', marginBottom: '16px' }} />
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#34d399', marginBottom: '4px' }}>Agreement Signed</div>
              <div style={{ fontSize: '13px', color: '#71717a' }}>Signed on {new Date().toLocaleDateString()}</div>
            </div>
          )}
        </div>
      )
    }

    // PAYMENT PAGE
    if (page === 'payment') {
      if (paymentComplete) {
        return (
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', boxShadow: '0 20px 40px rgba(52, 211, 153, 0.3)',
            }}>
              <Check size={40} style={{ color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Welcome Aboard! 🚀</h1>
            <p style={{ color: '#71717a', fontSize: '14px', marginBottom: '32px' }}>Check your email for next steps</p>
            
            <div style={cardStyle}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#71717a', marginBottom: '16px' }}>What Happens Next</div>
              {['Welcome email with portal access', 'Onboarding call scheduled within 24h', 'Campaign launch in 14 days'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 2 ? '1px solid #27272a' : 'none' }}>
                  <Check size={16} style={{ color: '#34d399' }} />
                  <span style={{ fontSize: '14px', color: '#e4e4e7' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Complete Payment</h1>
            <p style={{ color: '#71717a', fontSize: '14px' }}>Secure checkout powered by Stripe</p>
          </div>

          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #27272a', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: '#a1a1aa' }}>{packageInfo.name}</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>${(packageInfo.price / 100).toLocaleString()}/mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Due Today</span>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>${(packageInfo.price / 100).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!isSigned || isProcessing}
            style={{
              width: '100%', padding: '16px', borderRadius: '12px',
              background: !isSigned || isProcessing ? '#27272a' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              color: !isSigned || isProcessing ? '#52525b' : 'white',
              fontSize: '15px', fontWeight: '600', border: 'none',
              cursor: !isSigned || isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              boxShadow: isSigned && !isProcessing ? '0 10px 30px rgba(139, 92, 246, 0.3)' : 'none',
            }}
          >
            {isProcessing ? (
              <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
            ) : !isSigned ? (
              <><Lock size={18} /> Sign Agreement First</>
            ) : (
              <><CreditCard size={18} /> Pay ${(packageInfo.price / 100).toLocaleString()}</>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            <Lock size={14} style={{ color: '#52525b' }} />
            <span style={{ fontSize: '12px', color: '#52525b' }}>256-bit SSL encryption • PCI compliant</span>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090b' }}>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(9, 9, 11, 0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #18181b',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: 'white' }} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
              RevGen<span style={{ color: '#a78bfa' }}>Labs</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setCurrentPage(i)}
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: i === currentPage ? '#a78bfa' : i < currentPage ? 'rgba(139, 92, 246, 0.2)' : '#18181b',
                  color: i <= currentPage ? 'white' : '#52525b',
                }}
                title={p.label}
              >
                {i < currentPage ? <Check size={16} /> : <p.icon size={16} />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '96px', paddingBottom: '100px', paddingLeft: '24px', paddingRight: '24px' }}>
        {renderContent()}
      </main>

      {/* Footer Navigation */}
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(9, 9, 11, 0.9)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid #18181b',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px',
          height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={goBack}
            disabled={currentPage === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '10px',
              background: 'transparent', border: '1px solid #27272a',
              color: currentPage === 0 ? '#3f3f46' : '#a1a1aa',
              fontSize: '14px', fontWeight: '500',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {pages.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '6px', borderRadius: '3px', transition: 'all 0.3s',
                  width: i === currentPage ? '24px' : '6px',
                  background: i === currentPage ? '#a78bfa' : i < currentPage ? 'rgba(139, 92, 246, 0.5)' : '#27272a',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === pages.length - 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '10px',
              background: currentPage === pages.length - 1 ? '#27272a' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              border: 'none',
              color: currentPage === pages.length - 1 ? '#52525b' : 'white',
              fontSize: '14px', fontWeight: '600',
              cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
              boxShadow: currentPage < pages.length - 1 ? '0 4px 20px rgba(139, 92, 246, 0.3)' : 'none',
            }}
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>
      </footer>

      {/* Design Label */}
      <div style={{
        position: 'fixed', top: '80px', left: '16px', zIndex: 50,
        padding: '6px 12px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '8px',
      }}>
        <span style={{ fontSize: '12px', fontWeight: '500', color: '#a78bfa' }}>Project 4 - Clean Admin-Style Design</span>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
