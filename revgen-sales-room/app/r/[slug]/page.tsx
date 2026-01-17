'use client'

import { useState, useRef, useEffect, use } from 'react'
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
  AlertCircle,
  Briefcase,
  MapPin,
  Linkedin,
  HeadphonesIcon,
  Rocket,
  LineChart,
  Settings,
  MessageCircle,
  FileCheck,
  DollarSign,
  Star,
  Quote,
  Play,
  ChevronDown,
} from 'lucide-react'

interface RoomData {
  id: string
  slug: string
  status: string
  createdAt: string
  prospect: {
    name: string
    email: string
    phone: string
    company: string
    website: string
    industry: string
    companySize: string
  }
  package: {
    id: string
    name: string
    price: number
    color: string
  }
  template: string
  meetingNotes: string
  customMessage: string
}

const pages = [
  { id: 'welcome', label: 'Welcome', icon: Sparkles },
  { id: 'recap', label: 'Meeting Recap', icon: MessageSquare },
  { id: 'about', label: 'About Us', icon: Building2 },
  { id: 'proposal', label: 'Your Proposal', icon: Package },
  { id: 'timeline', label: 'Timeline', icon: CalendarDays },
  { id: 'agreement', label: 'Agreement', icon: FileText },
  { id: 'payment', label: 'Payment', icon: CreditCard },
]

const packageFeatures: Record<string, { features: string[], deliverables: string[], support: string }> = {
  starter: {
    features: ['500 qualified prospects/month', 'Email outreach campaigns', 'Monthly strategy calls', 'Basic CRM integration', 'Performance reporting'],
    deliverables: ['Prospect list building', 'Email sequence creation', 'Weekly activity reports'],
    support: 'Email support with 24h response time',
  },
  growth: {
    features: ['1,500 qualified prospects/month', 'Email + LinkedIn outreach', 'Bi-weekly strategy calls', 'Full CRM integration', 'A/B testing & optimization', 'Dedicated account manager'],
    deliverables: ['ICP refinement workshop', 'Multi-channel sequences', 'Custom playbook development', 'Bi-weekly performance reviews', 'Monthly executive summary'],
    support: 'Priority support with 4h response time + Slack channel',
  },
  enterprise: {
    features: ['3,000+ qualified prospects/month', 'Full multi-channel outreach', 'Weekly strategy calls', 'Dedicated success team', 'Custom integrations', 'Executive quarterly reviews'],
    deliverables: ['Full GTM strategy', 'Custom tech stack setup', 'Dedicated SDR support', 'Real-time dashboards', 'Custom reporting'],
    support: '24/7 dedicated support + named success manager',
  },
  pilot: {
    features: ['250 qualified prospects', 'Email outreach campaign', '2 strategy sessions', 'Performance analysis', 'ROI assessment'],
    deliverables: ['Proof of concept', 'Sample prospect list', 'Campaign results report'],
    support: 'Direct access to pilot team',
  },
}

export default function PublicRoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [currentPage, setCurrentPage] = useState(0)
  const [isSigning, setIsSigning] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [roomData, setRoomData] = useState<RoomData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const sigCanvas = useRef<SignatureCanvas>(null)

  useEffect(() => {
    const loadRoom = () => {
      try {
        const savedRooms = localStorage.getItem('revgen-rooms')
        if (savedRooms) {
          const rooms: RoomData[] = JSON.parse(savedRooms)
          const room = rooms.find(r => r.slug === slug)
          if (room) {
            setRoomData(room)
            setIsLoading(false)
            return
          }
        }
        
        if (slug.includes('techscale') || slug.includes('dataflow') || slug.includes('elevate') || slug.includes('scaleup')) {
          const demoData: RoomData = {
            id: '1', slug, status: 'SENT', createdAt: new Date().toISOString(),
            prospect: {
              name: 'Alex Thompson', email: 'alex@techscale.com', phone: '+1 (415) 555-0123',
              company: 'TechScale Inc', website: 'https://techscale.com',
              industry: 'B2B SaaS', companySize: '50-100 employees',
            },
            package: { id: 'growth', name: 'Growth Package', price: 4999, color: '#a78bfa' },
            template: 'default', meetingNotes: '', customMessage: '',
          }
          setRoomData(demoData)
          setIsLoading(false)
          return
        }
        
        setNotFound(true)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading room:', error)
        setNotFound(true)
        setIsLoading(false)
      }
    }
    loadRoom()
  }, [slug])

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

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={32} style={{ color: '#a78bfa', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#71717a', fontSize: '14px', marginTop: '16px' }}>Loading your proposal...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <AlertCircle size={32} style={{ color: '#ef4444' }} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Room Not Found</h1>
          <p style={{ color: '#71717a', fontSize: '14px', marginBottom: '24px' }}>This proposal link may have expired or is invalid.</p>
          <a href="/" style={{ color: '#a78bfa', fontSize: '14px', textDecoration: 'none' }}>← Return to homepage</a>
        </div>
      </div>
    )
  }

  const data = roomData!
  const firstName = data.prospect.name.split(' ')[0]
  const pkgData = packageFeatures[data.package.id] || packageFeatures.growth
  const meetingDate = new Date(data.createdAt)

  const cardStyle: React.CSSProperties = {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#71717a',
    marginBottom: '16px',
  }

  const renderContent = () => {
    const page = pages[currentPage].id

    // ============== WELCOME PAGE ==============
    if (page === 'welcome') {
      return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '88px', height: '88px', borderRadius: '24px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px', boxShadow: '0 24px 48px rgba(139, 92, 246, 0.35)',
            }}>
              <Sparkles size={44} style={{ color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', marginBottom: '16px', lineHeight: '1.1' }}>
              Welcome, {firstName}
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '18px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
              We're excited to present your personalized growth proposal for <span style={{ color: 'white', fontWeight: '600' }}>{data.prospect.company}</span>
            </p>
          </div>

          {/* Client Information Card */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={sectionTitleStyle}>Client Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { icon: Building2, label: 'Company', value: data.prospect.company, color: '#22d3ee' },
                { icon: Briefcase, label: 'Industry', value: data.prospect.industry || 'Technology', color: '#a78bfa' },
                { icon: Users, label: 'Company Size', value: data.prospect.companySize || '50-100 employees', color: '#34d399' },
                { icon: Globe, label: 'Website', value: data.prospect.website || 'N/A', color: '#f472b6' },
                { icon: Mail, label: 'Email', value: data.prospect.email, color: '#fb923c' },
                { icon: Phone, label: 'Phone', value: data.prospect.phone || 'N/A', color: '#fbbf24' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#52525b', marginBottom: '3px' }}>{item.label}</div>
                    <div style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proposal Summary Card */}
          <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(34, 211, 238, 0.05))' }}>
            <div style={sectionTitleStyle}>What's Included in This Proposal</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {pages.slice(1).map((p, i) => (
                <div key={p.id} style={{
                  padding: '16px 12px', borderRadius: '12px', textAlign: 'center',
                  background: '#27272a', border: '1px solid #3f3f46',
                }}>
                  <p.icon size={20} style={{ color: '#a78bfa', marginBottom: '8px' }} />
                  <div style={{ fontSize: '12px', color: '#e4e4e7', fontWeight: '500' }}>{p.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#71717a', fontSize: '13px' }}>
              <Clock size={14} />
              <span>Proposal valid for 30 days • Created {meetingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      )
    }

    // ============== MEETING RECAP PAGE ==============
    if (page === 'recap') {
      return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Meeting Recap</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Summary of our discovery conversation</p>
          </div>

          {/* Meeting Details Card */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #27272a', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={26} style={{ color: '#a78bfa', marginLeft: '2px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Discovery Call</div>
                  <div style={{ fontSize: '14px', color: '#71717a' }}>{meetingDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', color: '#71717a' }}>Duration</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>45 minutes</div>
              </div>
            </div>

            <div style={sectionTitleStyle}>Meeting Summary</div>
            <p style={{ fontSize: '15px', color: '#d4d4d8', lineHeight: '1.8', marginBottom: '24px' }}>
              {data.meetingNotes || `Thank you for taking the time to discuss ${data.prospect.company}'s growth objectives and challenges. During our call, we explored your current outbound sales strategy, identified key bottlenecks in your pipeline, and discussed how our ${data.package.name} can help you achieve your revenue targets for the coming quarters. We're confident that our partnership will deliver significant value to your organization.`}
            </p>

            <div style={sectionTitleStyle}>Attendees</div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { name: data.prospect.name, role: 'Client', company: data.prospect.company },
                { name: 'Sarah Mitchell', role: 'Account Executive', company: 'RevGen Labs' },
                { name: 'James Wilson', role: 'Solutions Architect', company: 'RevGen Labs' },
              ].map((person, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#27272a', borderRadius: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', color: 'white' }}>
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'white' }}>{person.name}</div>
                    <div style={{ fontSize: '11px', color: '#71717a' }}>{person.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Discussion Points */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={sectionTitleStyle}>Key Discussion Points</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Current Challenges', desc: 'Inconsistent lead flow, difficulty scaling outbound, lack of dedicated SDR resources' },
                { title: 'Target Market', desc: `${data.prospect.industry} companies with 50-500 employees, primarily in North America` },
                { title: 'Revenue Goals', desc: 'Targeting 40% pipeline growth in Q1-Q2, with focus on enterprise accounts' },
                { title: 'Timeline', desc: 'Looking to launch within 2-3 weeks, with first qualified meetings expected by week 4' },
                { title: 'Budget', desc: `Approved budget of $${((data.package.price / 100) * 3).toLocaleString()} for initial 3-month engagement` },
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '16px', background: '#27272a', borderRadius: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={16} style={{ color: '#34d399' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{point.title}</div>
                    <div style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: '1.5' }}>{point.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Agreed Next Steps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Review this proposal and pricing details',
                'Sign service agreement (included in this document)',
                'Complete payment to secure start date',
                'Schedule kickoff call for onboarding',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: 'white' }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '14px', color: '#e4e4e7' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // ============== ABOUT US PAGE ==============
    if (page === 'about') {
      return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>About RevGen Labs</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Your trusted partner in B2B revenue acceleration</p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { value: '500+', label: 'Clients Served', icon: Users, color: '#22d3ee' },
              { value: '$2.4B', label: 'Pipeline Generated', icon: TrendingUp, color: '#34d399' },
              { value: '94%', label: 'Client Retention', icon: Award, color: '#fbbf24' },
              { value: '12M+', label: 'Prospects Reached', icon: Target, color: '#f472b6' },
            ].map((stat) => (
              <div key={stat.label} style={{ ...cardStyle, textAlign: 'center', padding: '20px' }}>
                <stat.icon size={24} style={{ color: stat.color, marginBottom: '12px' }} />
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Company Description */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={sectionTitleStyle}>Who We Are</div>
            <p style={{ fontSize: '15px', color: '#d4d4d8', lineHeight: '1.8', marginBottom: '20px' }}>
              RevGen Labs is a leading B2B revenue acceleration firm that helps companies build predictable, 
              scalable outbound sales pipelines. Founded in 2019, we've partnered with over 500 companies 
              across SaaS, FinTech, and professional services to generate billions in qualified pipeline.
            </p>
            <p style={{ fontSize: '15px', color: '#d4d4d8', lineHeight: '1.8' }}>
              Our team of 120+ sales development experts, data scientists, and growth strategists work as 
              an extension of your team to identify, engage, and qualify your ideal customers.
            </p>
          </div>

          {/* Capabilities */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={sectionTitleStyle}>Our Capabilities</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: Target, title: 'Precision Targeting', desc: 'AI-powered ICP identification and intent data analysis to find in-market buyers', color: '#22d3ee' },
                { icon: Zap, title: 'Multi-Channel Outreach', desc: 'Coordinated email, LinkedIn, and phone campaigns with personalized messaging', color: '#a78bfa' },
                { icon: LineChart, title: 'Data & Analytics', desc: 'Real-time dashboards, A/B testing, and performance optimization', color: '#34d399' },
                { icon: Shield, title: 'Compliance & Security', desc: 'GDPR, CCPA, and SOC 2 compliant infrastructure and processes', color: '#f472b6' },
                { icon: Settings, title: 'Tech Integration', desc: 'Seamless integration with Salesforce, HubSpot, Outreach, and 50+ tools', color: '#fbbf24' },
                { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Named account managers with weekly strategy calls and optimization', color: '#fb923c' },
              ].map((item) => (
                <div key={item.title} style={{ padding: '20px', background: '#27272a', borderRadius: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: '1.5' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonials */}
          <div style={cardStyle}>
            <div style={sectionTitleStyle}>What Our Clients Say</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { quote: "RevGen Labs helped us 3x our pipeline in just 6 months. They truly understand B2B sales.", author: "Michael Chen", role: "VP Sales", company: "CloudScale" },
                { quote: "The quality of leads is exceptional. These are real decision-makers who are ready to buy.", author: "Jennifer Walsh", role: "CRO", company: "DataSync" },
              ].map((testimonial, i) => (
                <div key={i} style={{ padding: '20px', background: '#27272a', borderRadius: '12px' }}>
                  <Quote size={20} style={{ color: '#a78bfa', marginBottom: '12px' }} />
                  <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>"{testimonial.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', color: 'white' }}>
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{testimonial.author}</div>
                      <div style={{ fontSize: '12px', color: '#71717a' }}>{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // ============== PROPOSAL PAGE ==============
    if (page === 'proposal') {
      return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Your Investment</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Customized package for {data.prospect.company}</p>
          </div>

          {/* Package Card */}
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(180deg, #18181b 0%, rgba(139, 92, 246, 0.08) 100%)',
            border: '2px solid rgba(139, 92, 246, 0.4)',
            marginBottom: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '20px', right: '20px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'white',
            }}>
              Recommended
            </div>

            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>{data.package.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '56px', fontWeight: 'bold', color: 'white' }}>${(data.package.price / 100).toLocaleString()}</span>
                <span style={{ fontSize: '18px', color: '#71717a' }}>/month</span>
              </div>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginTop: '8px' }}>Billed monthly • No long-term contracts required</div>
            </div>

            <div style={sectionTitleStyle}>What's Included</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {pkgData.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} style={{ color: '#a78bfa' }} />
                  </div>
                  <span style={{ fontSize: '15px', color: '#e4e4e7' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={sectionTitleStyle}>Deliverables</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
              {pkgData.deliverables.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#27272a', borderRadius: '10px' }}>
                  <FileCheck size={16} style={{ color: '#34d399' }} />
                  <span style={{ fontSize: '13px', color: '#d4d4d8' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={sectionTitleStyle}>Support Level</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#27272a', borderRadius: '12px', marginBottom: '28px' }}>
              <HeadphonesIcon size={20} style={{ color: '#22d3ee' }} />
              <span style={{ fontSize: '14px', color: '#e4e4e7' }}>{pkgData.support}</span>
            </div>

            <div style={{ paddingTop: '24px', borderTop: '1px solid #3f3f46' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#71717a' }}>Monthly subscription</span>
                <span style={{ fontSize: '14px', color: 'white' }}>${(data.package.price / 100).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#71717a' }}>Setup fee (one-time)</span>
                <span style={{ fontSize: '14px', color: '#34d399', fontWeight: '600' }}>Waived</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #3f3f46' }}>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Total due today</span>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>${(data.package.price / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ROI Projection */}
          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Projected ROI</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { label: 'Expected Meetings', value: '15-25/mo', icon: Calendar },
                { label: 'Pipeline Value', value: `$${((data.package.price / 100) * 20).toLocaleString()}+/mo`, icon: DollarSign },
                { label: 'Payback Period', value: '< 30 days', icon: Clock },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: 'center', padding: '20px', background: '#27272a', borderRadius: '12px' }}>
                  <item.icon size={24} style={{ color: '#a78bfa', marginBottom: '12px' }} />
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{item.value}</div>
                  <div style={{ fontSize: '12px', color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // ============== TIMELINE PAGE ==============
    if (page === 'timeline') {
      return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Implementation Timeline</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Your path to predictable revenue</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { 
                week: 'Week 1', 
                title: 'Onboarding & Strategy', 
                color: '#a78bfa',
                tasks: [
                  'Kickoff call with your dedicated team',
                  'ICP workshop and target account list creation',
                  'Tech stack integration (CRM, calendar, etc.)',
                  'Messaging framework development',
                ]
              },
              { 
                week: 'Week 2', 
                title: 'Campaign Development', 
                color: '#22d3ee',
                tasks: [
                  'Prospect list building and verification',
                  'Multi-touch sequence creation',
                  'Email and LinkedIn copy review',
                  'A/B test setup',
                ]
              },
              { 
                week: 'Week 3', 
                title: 'Launch & Optimization', 
                color: '#34d399',
                tasks: [
                  'Campaign launch across all channels',
                  'Daily monitoring and optimization',
                  'First responses and engagement tracking',
                  'Initial performance review',
                ]
              },
              { 
                week: 'Week 4+', 
                title: 'Scale & Iterate', 
                color: '#fbbf24',
                tasks: [
                  'First qualified meetings delivered',
                  'Weekly performance calls',
                  'Continuous A/B testing',
                  'Scale winning sequences',
                ]
              },
            ].map((step, i) => (
              <div key={i} style={{ ...cardStyle, display: 'flex', gap: '24px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px',
                    background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', fontWeight: 'bold', color: '#09090b',
                  }}>
                    {i + 1}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: step.color, marginBottom: '6px', fontWeight: '600' }}>{step.week}</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '14px' }}>{step.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {step.tasks.map((task, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Check size={14} style={{ color: '#71717a' }} />
                        <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expected Outcomes */}
          <div style={{ ...cardStyle, marginTop: '24px' }}>
            <div style={sectionTitleStyle}>Expected Outcomes (First 90 Days)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { value: '4,500+', label: 'Prospects Contacted' },
                { value: '45-75', label: 'Qualified Meetings' },
                { value: '$500K+', label: 'Pipeline Generated' },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: 'center', padding: '20px', background: '#27272a', borderRadius: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#34d399', marginBottom: '4px' }}>{item.value}</div>
                  <div style={{ fontSize: '12px', color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // ============== AGREEMENT PAGE ==============
    if (page === 'agreement') {
      return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Service Agreement</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Please review and sign below to proceed</p>
          </div>

          {/* Contract Terms */}
          <div style={{ ...cardStyle, marginBottom: '24px', maxHeight: '320px', overflowY: 'auto' }}>
            <div style={{ fontSize: '13px', color: '#d4d4d8', fontFamily: 'ui-monospace, monospace', lineHeight: '1.9' }}>
              <p style={{ marginBottom: '20px', fontSize: '14px', fontWeight: '600', color: 'white' }}>
                SERVICE AGREEMENT
              </p>
              <p style={{ marginBottom: '16px' }}>
                This Service Agreement ("Agreement") is entered into between RevGen Labs, Inc. ("Provider") 
                and {data.prospect.company} ("Client"), represented by {data.prospect.name}.
              </p>
              
              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>1. SERVICES</strong></p>
              <p style={{ marginBottom: '16px' }}>
                Provider agrees to deliver {data.package.name} services as outlined in this proposal, including 
                but not limited to: prospect identification, multi-channel outreach campaigns, meeting scheduling, 
                and performance reporting. All services shall be performed in accordance with industry best practices.
              </p>

              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>2. TERM AND TERMINATION</strong></p>
              <p style={{ marginBottom: '16px' }}>
                This Agreement shall commence upon payment and continue for an initial term of three (3) months 
                ("Initial Term"). After the Initial Term, this Agreement shall automatically renew on a month-to-month 
                basis. Either party may terminate with thirty (30) days written notice.
              </p>

              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>3. INVESTMENT AND PAYMENT</strong></p>
              <p style={{ marginBottom: '16px' }}>
                Client agrees to pay ${(data.package.price / 100).toLocaleString()} per month for the services described 
                herein. The first payment is due upon execution of this Agreement. Subsequent payments shall be due on 
                the same date of each following month. All fees are non-refundable except as provided in Section 4.
              </p>

              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>4. PERFORMANCE GUARANTEE</strong></p>
              <p style={{ marginBottom: '16px' }}>
                Provider guarantees delivery of at least 80% of the promised monthly prospect volume. In the event of 
                any shortfall, Client shall receive a pro-rated credit applied to the following month's invoice. 
                Provider makes no guarantees regarding meeting conversion rates, as these depend on Client's offerings.
              </p>

              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>5. CONFIDENTIALITY</strong></p>
              <p style={{ marginBottom: '16px' }}>
                Both parties agree to maintain the confidentiality of all proprietary information shared during the 
                course of this engagement. This includes but is not limited to: customer lists, business strategies, 
                pricing information, and technical specifications.
              </p>

              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>6. DATA PROTECTION</strong></p>
              <p style={{ marginBottom: '16px' }}>
                Provider shall comply with all applicable data protection laws including GDPR and CCPA. Provider 
                maintains SOC 2 Type II certification and implements industry-standard security measures to protect 
                Client and prospect data.
              </p>

              <p style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>7. LIMITATION OF LIABILITY</strong></p>
              <p style={{ marginBottom: '0' }}>
                Provider's total liability under this Agreement shall not exceed the total fees paid by Client in 
                the twelve (12) months preceding any claim. Neither party shall be liable for indirect, incidental, 
                or consequential damages.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          {!isSigned ? (
            <div style={cardStyle}>
              {isSigning ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>Your Signature</div>
                      <div style={{ fontSize: '13px', color: '#71717a' }}>Draw your signature in the box below</div>
                    </div>
                    <button
                      onClick={() => { sigCanvas.current?.clear(); setIsEmpty(true) }}
                      style={{ fontSize: '13px', color: '#71717a', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Clear
                    </button>
                  </div>
                  <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', border: '2px solid #a78bfa' }}>
                    <SignatureCanvas
                      ref={sigCanvas}
                      canvasProps={{ style: { width: '100%', height: '160px' } }}
                      backgroundColor="white"
                      penColor="#7c3aed"
                      onEnd={() => setIsEmpty(sigCanvas.current?.isEmpty() ?? true)}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setIsSigning(false)}
                      style={{
                        flex: 1, padding: '14px', borderRadius: '10px',
                        background: 'transparent', border: '1px solid #3f3f46',
                        color: '#a1a1aa', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSign}
                      disabled={isEmpty}
                      style={{
                        flex: 2, padding: '14px', borderRadius: '10px',
                        background: isEmpty ? '#27272a' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                        color: isEmpty ? '#52525b' : 'white',
                        fontSize: '14px', fontWeight: '600', border: 'none',
                        cursor: isEmpty ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Confirm Signature
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '8px' }}>By signing, I agree to the terms outlined above and confirm that I am authorized to enter into this agreement on behalf of {data.prospect.company}.</div>
                  </div>
                  <button
                    onClick={() => setIsSigning(true)}
                    style={{
                      width: '100%', padding: '18px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                      color: 'white', fontSize: '16px', fontWeight: '600',
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 12px 32px rgba(139, 92, 246, 0.35)',
                    }}
                  >
                    Click to Sign Agreement
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              ...cardStyle,
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              textAlign: 'center',
            }}>
              <CheckCircle2 size={56} style={{ color: '#34d399', marginBottom: '16px' }} />
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#34d399', marginBottom: '8px' }}>Agreement Signed Successfully</div>
              <div style={{ fontSize: '14px', color: '#71717a', marginBottom: '4px' }}>Signed by {data.prospect.name}</div>
              <div style={{ fontSize: '13px', color: '#52525b' }}>{new Date().toLocaleString()}</div>
            </div>
          )}
        </div>
      )
    }

    // ============== PAYMENT PAGE ==============
    if (page === 'payment') {
      if (paymentComplete) {
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: '96px', height: '96px', borderRadius: '50%',
              background: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 32px', boxShadow: '0 24px 48px rgba(52, 211, 153, 0.35)',
            }}>
              <Check size={48} style={{ color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Welcome Aboard! 🚀</h1>
            <p style={{ color: '#a1a1aa', fontSize: '16px', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
              Your payment has been processed successfully. We're excited to start this journey with you!
            </p>
            
            <div style={{ ...cardStyle, textAlign: 'left', marginBottom: '24px' }}>
              <div style={sectionTitleStyle}>What Happens Next</div>
              {[
                { icon: Mail, title: 'Welcome Email', desc: 'Check your inbox for login credentials and next steps', time: 'Sent now' },
                { icon: Calendar, title: 'Kickoff Call', desc: 'Our team will reach out to schedule your onboarding call', time: 'Within 24 hours' },
                { icon: Users, title: 'Meet Your Team', desc: 'Get introduced to your dedicated account manager', time: 'During kickoff' },
                { icon: Rocket, title: 'Campaign Launch', desc: 'First outbound campaigns go live', time: '~14 days' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: i < 3 ? '1px solid #27272a' : 'none' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <item.icon size={20} style={{ color: '#34d399' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#71717a' }}>{item.desc}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#52525b' }}>{item.time}</div>
                </div>
              ))}
            </div>

            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(34, 211, 238, 0.05))' }}>
              <div style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '12px' }}>Questions? Contact your account team:</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: '#a78bfa' }} />
                <span style={{ fontSize: '14px', color: 'white' }}>success@revgenlabs.com</span>
              </div>
            </div>
          </div>
        )
      }

      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Complete Payment</h1>
            <p style={{ color: '#71717a', fontSize: '16px' }}>Secure checkout powered by Stripe</p>
          </div>

          {/* Order Summary */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={sectionTitleStyle}>Order Summary</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #27272a', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>{data.package.name}</div>
                <div style={{ fontSize: '13px', color: '#71717a' }}>Monthly subscription</div>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>${(data.package.price / 100).toLocaleString()}/mo</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#71717a' }}>Subtotal</span>
              <span style={{ fontSize: '14px', color: 'white' }}>${(data.package.price / 100).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#71717a' }}>Setup fee</span>
              <span style={{ fontSize: '14px', color: '#34d399', fontWeight: '500' }}>Waived (-$1,500)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#71717a' }}>Tax</span>
              <span style={{ fontSize: '14px', color: 'white' }}>$0.00</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #27272a' }}>
              <span style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Total Due Today</span>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>${(data.package.price / 100).toLocaleString()}</span>
            </div>
          </div>

          {/* Billing Details */}
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <div style={sectionTitleStyle}>Billing Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '4px' }}>Billed To</div>
                <div style={{ fontSize: '14px', color: 'white' }}>{data.prospect.company}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '4px' }}>Contact</div>
                <div style={{ fontSize: '14px', color: 'white' }}>{data.prospect.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '14px', color: 'white' }}>{data.prospect.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '4px' }}>Next Billing Date</div>
                <div style={{ fontSize: '14px', color: 'white' }}>{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={!isSigned || isProcessing}
            style={{
              width: '100%', padding: '20px', borderRadius: '14px',
              background: !isSigned || isProcessing ? '#27272a' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              color: !isSigned || isProcessing ? '#52525b' : 'white',
              fontSize: '17px', fontWeight: '600', border: 'none',
              cursor: !isSigned || isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              boxShadow: isSigned && !isProcessing ? '0 12px 32px rgba(139, 92, 246, 0.35)' : 'none',
              marginBottom: '20px',
            }}
          >
            {isProcessing ? (
              <><Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} /> Processing Payment...</>
            ) : !isSigned ? (
              <><Lock size={20} /> Please Sign Agreement First</>
            ) : (
              <><CreditCard size={20} /> Pay ${(data.package.price / 100).toLocaleString()} Now</>
            )}
          </button>

          {/* Security Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', color: '#52525b', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} />
              <span>256-bit SSL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} />
              <span>PCI Compliant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} />
              <span>SOC 2 Certified</span>
            </div>
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
        background: 'rgba(9, 9, 11, 0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #18181b',
      }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto', padding: '0 24px',
          height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={20} style={{ color: 'white' }} />
            </div>
            <span style={{ fontSize: '17px', fontWeight: '600', color: 'white' }}>
              RevGen<span style={{ color: '#a78bfa' }}>Labs</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setCurrentPage(i)}
                style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: i === currentPage ? '#a78bfa' : i < currentPage ? 'rgba(139, 92, 246, 0.2)' : '#18181b',
                  color: i <= currentPage ? 'white' : '#52525b',
                }}
                title={p.label}
              >
                {i < currentPage ? <Check size={18} /> : <p.icon size={18} />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '100px', paddingBottom: '110px', paddingLeft: '24px', paddingRight: '24px' }}>
        {renderContent()}
      </main>

      {/* Footer Navigation */}
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(9, 9, 11, 0.95)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid #18181b',
      }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto', padding: '0 24px',
          height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={goBack}
            disabled={currentPage === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 24px', borderRadius: '12px',
              background: 'transparent', border: '1px solid #27272a',
              color: currentPage === 0 ? '#3f3f46' : '#a1a1aa',
              fontSize: '15px', fontWeight: '500',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {pages.map((p, i) => (
              <div
                key={i}
                style={{
                  height: '8px', borderRadius: '4px', transition: 'all 0.3s',
                  width: i === currentPage ? '32px' : '8px',
                  background: i === currentPage ? '#a78bfa' : i < currentPage ? 'rgba(139, 92, 246, 0.5)' : '#27272a',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === pages.length - 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 24px', borderRadius: '12px',
              background: currentPage === pages.length - 1 ? '#27272a' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              border: 'none',
              color: currentPage === pages.length - 1 ? '#52525b' : 'white',
              fontSize: '15px', fontWeight: '600',
              cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
              boxShadow: currentPage < pages.length - 1 ? '0 6px 24px rgba(139, 92, 246, 0.35)' : 'none',
            }}
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
