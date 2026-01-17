'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Users, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  Shield,
  BarChart3,
  FileText,
  CreditCard,
  MessageSquare,
  Star,
  ChevronRight,
  Globe,
  Lock,
  Layers,
} from 'lucide-react'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: MessageSquare, title: 'Meeting Recaps', desc: 'AI-powered summaries that capture every key point', color: '#22d3ee' },
    { icon: FileText, title: 'Smart Proposals', desc: 'Dynamic pricing that updates in real-time', color: '#a78bfa' },
    { icon: Shield, title: 'E-Signatures', desc: 'Legally binding signatures in seconds', color: '#34d399' },
    { icon: CreditCard, title: 'Instant Payments', desc: 'Stripe-powered checkout built right in', color: '#f472b6' },
    { icon: BarChart3, title: 'Analytics', desc: 'Know exactly when prospects engage', color: '#fbbf24' },
    { icon: Layers, title: 'Templates', desc: 'Beautiful templates for every deal type', color: '#fb923c' },
  ]

  const testimonials = [
    { quote: "Cut our sales cycle from 3 weeks to 4 days. Game changer.", author: "Sarah Chen", role: "VP Sales, CloudScale", avatar: "SC" },
    { quote: "The best investment we made this year. ROI was immediate.", author: "Marcus Johnson", role: "CRO, DataSync", avatar: "MJ" },
    { quote: "Our close rate jumped 40% in the first month.", author: "Emily Watson", role: "Sales Director, TechFlow", avatar: "EW" },
  ]

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#030303',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(34, 211, 238, 0.08), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        background: isScrolled ? 'rgba(3, 3, 3, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.3)',
            }}>
              <Sparkles size={22} style={{ color: 'white' }} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
              RevGen<span style={{ color: '#22d3ee' }}>Labs</span>
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#a1a1aa',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = '#a1a1aa'
              }}
              >
                Dashboard
              </button>
            </Link>
            <Link href="/r/techscale-jan2026" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                border: 'none',
                color: '#030303',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 32px rgba(34, 211, 238, 0.35)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(34, 211, 238, 0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(34, 211, 238, 0.35)'
              }}
              >
                View Demo
                <Play size={14} style={{ fill: '#030303' }} />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            borderRadius: '100px',
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            marginBottom: '32px',
          }}>
            <Zap size={16} style={{ color: '#22d3ee' }} />
            <span style={{ fontSize: '14px', color: '#22d3ee', fontWeight: 500 }}>
              The Future of B2B Sales
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: '28px',
          }}>
            <span style={{ color: 'white' }}>Close Deals</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              10x Faster
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '20px',
            color: '#71717a',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 48px',
          }}>
            One beautiful link with your meeting recap, pricing, contract, 
            and payment. Everything your prospect needs to say yes.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/r/techscale-jan2026" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 36px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                border: 'none',
                color: 'white',
                fontSize: '17px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 16px 48px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 24px 56px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
              >
                Experience a Sales Room
                <ArrowRight size={20} />
              </button>
            </Link>

            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 36px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '17px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                Open Dashboard
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginTop: '80px',
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            {[
              { icon: TrendingUp, value: '3.2x', label: 'Faster Close Rate', color: '#22d3ee' },
              { icon: Users, value: '500+', label: 'Happy Clients', color: '#a78bfa' },
              { icon: Zap, value: '$50M+', label: 'Revenue Generated', color: '#34d399' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <stat.icon size={26} style={{ color: stat.color }} />
                </div>
                <div style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: '#52525b' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '44px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
              Everything You Need to Close
            </h2>
            <p style={{ fontSize: '18px', color: '#71717a', maxWidth: '500px', margin: '0 auto' }}>
              One link replaces 10 tools. Your prospects will love it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {features.map((feature, i) => (
              <div
                key={feature.title}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                  background: hoveredFeature === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hoveredFeature === i ? feature.color + '40' : 'rgba(255,255,255,0.05)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hoveredFeature === i ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#71717a', lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '44px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
              Loved by Sales Teams
            </h2>
            <p style={{ fontSize: '18px', color: '#71717a' }}>
              Join hundreds of companies closing deals faster
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  ))}
                </div>
                <p style={{ fontSize: '16px', color: '#e4e4e7', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{testimonial.author}</div>
                    <div style={{ fontSize: '13px', color: '#71717a' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '64px',
          borderRadius: '32px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(34, 211, 238, 0.1))',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15), transparent 50%)',
            pointerEvents: 'none',
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '40px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
              Ready to Transform Your Sales?
            </h2>
            <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
              Start closing deals faster today. No credit card required.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/admin/rooms/new" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '18px 40px',
                  borderRadius: '16px',
                  background: 'white',
                  border: 'none',
                  color: '#030303',
                  fontSize: '17px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 16px 48px rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 24px 56px rgba(255, 255, 255, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(255, 255, 255, 0.15)'
                }}
                >
                  Create Your First Room
                  <ArrowRight size={20} />
                </button>
              </Link>

              <Link href="/r/techscale-jan2026" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '18px 32px',
                  borderRadius: '16px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                  See Demo
                  <Play size={16} style={{ fill: 'white' }} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={18} style={{ color: 'white' }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>
                RevGen<span style={{ color: '#22d3ee' }}>Labs</span>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {[
                { icon: Globe, label: 'Website' },
                { icon: Lock, label: 'Privacy' },
                { icon: FileText, label: 'Terms' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#52525b', fontSize: '14px', cursor: 'pointer' }}>
                  <item.icon size={14} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <p style={{ color: '#3f3f46', fontSize: '14px' }}>
              © 2026 RevGen Labs. Crafted with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
