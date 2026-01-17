'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  FileText,
  Zap,
  Rocket,
  Building2,
  Target,
  Users,
  TrendingUp,
  Star,
  Check,
  Eye,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Crown,
  X,
  CheckCircle2,
  GripVertical,
  Trash2,
  MessageSquare,
  Package,
  CreditCard,
  CalendarDays,
} from 'lucide-react'

const iconOptions = [
  { id: 'rocket', icon: Rocket, name: 'Rocket' },
  { id: 'trending', icon: TrendingUp, name: 'Growth' },
  { id: 'building', icon: Building2, name: 'Enterprise' },
  { id: 'target', icon: Target, name: 'Target' },
  { id: 'users', icon: Users, name: 'Users' },
  { id: 'zap', icon: Zap, name: 'Zap' },
  { id: 'crown', icon: Crown, name: 'Crown' },
  { id: 'sparkles', icon: Sparkles, name: 'Sparkles' },
]

const getIconComponent = (iconId: string) => {
  return iconOptions.find(i => i.id === iconId)?.icon || Rocket
}

const colorOptions = ['#22d3ee', '#a78bfa', '#f59e0b', '#10b981', '#ec4899', '#6366f1', '#f97316', '#14b8a6']

const defaultSections = [
  'Welcome',
  'Meeting Recap', 
  'About Us',
  'Your Proposal',
  'Agreement',
  'Payment',
]

const sectionIcons: Record<string, any> = {
  'Welcome': Sparkles,
  'Meeting Recap': MessageSquare,
  'About Us': Building2,
  'Your Proposal': Package,
  'Agreement': FileText,
  'Payment': CreditCard,
  'Implementation': CalendarDays,
}

const defaultTemplates = [
  {
    id: 'starter-outbound',
    name: 'Starter Outbound',
    description: 'Perfect for introducing new clients to your lead generation services. Includes basic overview and simple pricing.',
    iconId: 'rocket',
    color: '#22d3ee',
    category: 'Lead Generation',
    sections: ['Welcome', 'Meeting Recap', 'About Us', 'Starter Package', 'Agreement', 'Payment'],
    usageCount: 45,
    isPopular: false,
  },
  {
    id: 'growth-package',
    name: 'Growth Package',
    description: 'Our most popular template for scaling companies. Comprehensive proposal with multi-channel outreach details.',
    iconId: 'trending',
    color: '#a78bfa',
    category: 'Lead Generation',
    sections: ['Welcome', 'Meeting Recap', 'About Us', 'Case Studies', 'Growth Package', 'ROI Calculator', 'Agreement', 'Payment'],
    usageCount: 128,
    isPopular: true,
  },
  {
    id: 'enterprise-sales',
    name: 'Enterprise Sales',
    description: 'Full enterprise proposal with SLA, custom integrations, and dedicated team structure. For high-value deals.',
    iconId: 'building',
    color: '#f59e0b',
    category: 'Enterprise',
    sections: ['Executive Summary', 'Meeting Recap', 'About Us', 'Case Studies', 'Custom Solution', 'Team Structure', 'SLA', 'Agreement', 'Payment'],
    usageCount: 32,
    isPopular: false,
  },
  {
    id: 'consulting-retainer',
    name: 'Consulting Retainer',
    description: 'Strategy consulting and advisory services. Includes discovery findings and strategic recommendations.',
    iconId: 'target',
    color: '#10b981',
    category: 'Consulting',
    sections: ['Welcome', 'Discovery Findings', 'Strategic Analysis', 'Recommendations', 'Retainer Details', 'Agreement', 'Payment'],
    usageCount: 67,
    isPopular: true,
  },
  {
    id: 'pilot-program',
    name: 'Pilot Program',
    description: 'Low-commitment trial for hesitant prospects. 30-day pilot with clear success metrics and conversion path.',
    iconId: 'zap',
    color: '#ec4899',
    category: 'Lead Generation',
    sections: ['Welcome', 'Meeting Recap', 'Pilot Overview', 'Success Metrics', 'Timeline', 'Pilot Agreement', 'Payment'],
    usageCount: 89,
    isPopular: true,
  },
  {
    id: 'agency-partnership',
    name: 'Agency Partnership',
    description: 'White-label partnership proposal for agencies. Includes partner benefits and co-marketing opportunities.',
    iconId: 'users',
    color: '#6366f1',
    category: 'Partnership',
    sections: ['Welcome', 'Partnership Overview', 'About Us', 'Partner Benefits', 'Revenue Share', 'Partnership Agreement', 'Onboarding'],
    usageCount: 23,
    isPopular: false,
  },
  {
    id: 'renewal-upsell',
    name: 'Renewal & Upsell',
    description: 'For existing clients ready to renew or upgrade. Highlights achievements and presents expanded offerings.',
    iconId: 'crown',
    color: '#f97316',
    category: 'Retention',
    sections: ['Welcome Back', 'Your Achievements', 'Results Summary', 'Whats New', 'Upgrade Options', 'Renewal Agreement', 'Payment'],
    usageCount: 56,
    isPopular: false,
  },
  {
    id: 'startup-special',
    name: 'Startup Special',
    description: 'Tailored for early-stage startups. Includes flexible pricing, milestone-based payments, and growth roadmap.',
    iconId: 'sparkles',
    color: '#14b8a6',
    category: 'Startups',
    sections: ['Welcome', 'Meeting Recap', 'Startup Success Stories', 'Flexible Pricing', 'Growth Roadmap', 'Milestone Plan', 'Agreement', 'Payment'],
    usageCount: 78,
    isPopular: true,
  },
]

const categories = ['All', 'Lead Generation', 'Enterprise', 'Consulting', 'Partnership', 'Retention', 'Startups']

interface Template {
  id: string
  name: string
  description: string
  iconId: string
  color: string
  category: string
  sections: string[]
  usageCount: number
  isPopular: boolean
}

// Section content for preview
const getSectionContent = (sectionName: string, templateColor: string) => {
  const contents: Record<string, { title: string; description: string; features?: string[] }> = {
    'Welcome': {
      title: 'Welcome, [Client Name]!',
      description: 'We\'ve prepared a personalized proposal for [Company Name]. This document outlines our recommended solution based on our discovery conversation.',
    },
    'Meeting Recap': {
      title: 'Meeting Recap',
      description: 'Summary of our discovery call, key discussion points, and identified objectives for your outbound strategy.',
      features: ['Current challenges identified', 'Growth targets discussed', 'Timeline requirements', 'Budget alignment'],
    },
    'About Us': {
      title: 'About RevGen Labs',
      description: 'Your partner in predictable revenue growth. We\'ve helped 500+ companies generate $2.4B in pipeline.',
      features: ['500+ clients served', '94% retention rate', 'B2B SaaS specialists', 'Proven methodology'],
    },
    'Your Proposal': {
      title: 'Your Tailored Proposal',
      description: 'Based on our conversation, we recommend the following solution designed specifically for your needs.',
    },
    'Agreement': {
      title: 'Service Agreement',
      description: 'Review the terms of our engagement. Sign digitally to proceed.',
    },
    'Payment': {
      title: 'Complete Your Order',
      description: 'Secure payment processing powered by Stripe.',
    },
  }
  
  return contents[sectionName] || {
    title: sectionName,
    description: `Content for the ${sectionName} section will be displayed here.`,
  }
}

export default function TemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewPage, setPreviewPage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Lead Generation',
    iconId: 'rocket',
    color: '#22d3ee',
    sections: [...defaultSections],
    newSection: '',
  })

  // Load templates from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('revgen-templates')
    if (saved) {
      setTemplates(JSON.parse(saved))
    } else {
      setTemplates(defaultTemplates)
      localStorage.setItem('revgen-templates', JSON.stringify(defaultTemplates))
    }
  }, [])

  // Save templates to localStorage whenever they change
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem('revgen-templates', JSON.stringify(templates))
    }
  }, [templates])

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const selected = templates.find(t => t.id === selectedTemplate)

  const addSection = () => {
    if (formData.newSection.trim()) {
      setFormData({
        ...formData,
        sections: [...formData.sections, formData.newSection.trim()],
        newSection: '',
      })
    }
  }

  const removeSection = (index: number) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = () => {
    if (!formData.name) return
    
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description || `Custom template: ${formData.name}`,
      iconId: formData.iconId,
      color: formData.color,
      category: formData.category,
      sections: formData.sections,
      usageCount: 0,
      isPopular: false,
    }
    
    const updatedTemplates = [newTemplate, ...templates]
    setTemplates(updatedTemplates)
    setShowModal(false)
    setShowSuccess(true)
    setFormData({
      name: '',
      description: '',
      category: 'Lead Generation',
      iconId: 'rocket',
      color: '#22d3ee',
      sections: [...defaultSections],
      newSection: '',
    })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleUseTemplate = (templateId: string) => {
    // Update usage count
    const updatedTemplates = templates.map(t => 
      t.id === templateId ? { ...t, usageCount: t.usageCount + 1 } : t
    )
    setTemplates(updatedTemplates)
    
    // Store the selected template in localStorage for the room creation page
    const template = templates.find(t => t.id === templateId)
    if (template) {
      localStorage.setItem('revgen-selected-template', JSON.stringify(template))
    }
    
    // Navigate to create room with template
    router.push(`/admin/rooms/new?template=${templateId}`)
  }

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId)
    setTemplates(updatedTemplates)
    if (selectedTemplate === templateId) {
      setSelectedTemplate(null)
    }
  }

  const openPreview = () => {
    setPreviewPage(0)
    setShowPreview(true)
  }

  return (
    <div style={{ padding: '32px', minHeight: '100vh', position: 'relative' }}>
      {/* Success Toast */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          padding: '16px 24px',
          borderRadius: '12px',
          background: '#18181b',
          border: '1px solid #34d399',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 100,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          <CheckCircle2 size={20} style={{ color: '#34d399' }} />
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Template created successfully!</span>
        </div>
      )}

      {/* Interactive Preview Modal */}
      {showPreview && selected && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
        }}>
          {/* Preview Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid #27272a',
            background: '#0a0a0b',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={18} style={{ color: 'white' }} />
              </div>
              <span style={{ fontWeight: '600', color: 'white' }}>RevGenLabs</span>
              <span style={{ color: '#52525b', marginLeft: '16px' }}>|</span>
              <span style={{ color: '#71717a', marginLeft: '8px', fontSize: '14px' }}>
                Preview: {selected.name}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              {selected.sections.map((section, i) => {
                const SectionIcon = sectionIcons[section] || FileText
                return (
                  <button
                    key={i}
                    onClick={() => setPreviewPage(i)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: i === previewPage ? selected.color : i < previewPage ? 'rgba(34, 211, 238, 0.15)' : '#18181b',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i < previewPage ? (
                      <Check size={14} style={{ color: '#22d3ee' }} />
                    ) : (
                      <SectionIcon size={14} style={{ color: i === previewPage ? 'black' : '#52525b' }} />
                    )}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setShowPreview(false)}
              style={{ padding: '8px 16px', borderRadius: '8px', background: '#27272a', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: '14px' }}
            >
              Close Preview
            </button>
          </div>

          {/* Preview Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '48px 24px' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {(() => {
                const currentSection = selected.sections[previewPage]
                const content = getSectionContent(currentSection, selected.color)
                const SectionIcon = sectionIcons[currentSection] || FileText
                
                return (
                  <div style={{
                    padding: '48px',
                    background: '#18181b',
                    borderRadius: '20px',
                    border: '1px solid #27272a',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      margin: '0 auto 24px',
                      borderRadius: '16px',
                      background: `${selected.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <SectionIcon size={32} style={{ color: selected.color }} />
                    </div>

                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
                      {content.title}
                    </h2>
                    <p style={{ fontSize: '16px', color: '#a1a1aa', lineHeight: '1.7', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                      {content.description}
                    </p>

                    {content.features && (
                      <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                        {content.features.map((feature, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Check size={16} style={{ color: selected.color }} />
                            <span style={{ fontSize: '14px', color: '#e4e4e7' }}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ 
                      marginTop: '40px', 
                      paddingTop: '24px', 
                      borderTop: '1px solid #27272a',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '16px',
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#52525b', marginBottom: '4px' }}>SECTION</div>
                        <div style={{ fontSize: '14px', color: 'white' }}>{previewPage + 1} of {selected.sections.length}</div>
                      </div>
                      <div style={{ width: '1px', background: '#27272a' }} />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#52525b', marginBottom: '4px' }}>TEMPLATE</div>
                        <div style={{ fontSize: '14px', color: selected.color }}>{selected.name}</div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Section list */}
              <div style={{ marginTop: '32px', padding: '24px', background: '#18181b', borderRadius: '16px', border: '1px solid #27272a' }}>
                <h4 style={{ fontSize: '12px', color: '#71717a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  All Sections in This Template
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selected.sections.map((section, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewPage(i)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: i === previewPage ? selected.color : '#27272a',
                        border: 'none',
                        color: i === previewPage ? 'black' : '#a1a1aa',
                        fontSize: '13px',
                        fontWeight: i === previewPage ? '600' : '400',
                        cursor: 'pointer',
                      }}
                    >
                      {i + 1}. {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Footer Navigation */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #27272a',
            background: '#0a0a0b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <button
              onClick={() => setPreviewPage(Math.max(0, previewPage - 1))}
              disabled={previewPage === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid #27272a',
                color: previewPage === 0 ? '#52525b' : '#a1a1aa',
                fontSize: '14px',
                cursor: previewPage === 0 ? 'default' : 'pointer',
              }}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={() => {
                setShowPreview(false)
                handleUseTemplate(selected.id)
              }}
              style={{
                padding: '12px 32px',
                borderRadius: '10px',
                background: selected.color,
                border: 'none',
                color: 'black',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Use This Template
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setPreviewPage(Math.min(selected.sections.length - 1, previewPage + 1))}
              disabled={previewPage === selected.sections.length - 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: previewPage === selected.sections.length - 1 ? '#27272a' : selected.color,
                border: 'none',
                color: previewPage === selected.sections.length - 1 ? '#52525b' : 'black',
                fontSize: '14px',
                fontWeight: '600',
                cursor: previewPage === selected.sections.length - 1 ? 'default' : 'pointer',
              }}
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '16px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid #27272a',
              position: 'sticky',
              top: 0,
              background: '#18181b',
              zIndex: 10,
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Create New Template</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: '8px', borderRadius: '6px', background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Template Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Premium Sales Proposal"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of when to use this template..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Icon & Color */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Icon</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {iconOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, iconId: opt.id })}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          background: formData.iconId === opt.id ? `${formData.color}30` : '#27272a',
                          border: formData.iconId === opt.id ? `2px solid ${formData.color}` : '1px solid #3f3f46',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <opt.icon size={18} style={{ color: formData.iconId === opt.id ? formData.color : '#71717a' }} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Color</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: color,
                          border: formData.color === color ? '3px solid white' : 'none',
                          cursor: 'pointer',
                          boxShadow: formData.color === color ? `0 0 10px ${color}` : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Sections</label>
                <div style={{ 
                  background: '#0f0f11',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  {formData.sections.map((section, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      background: '#18181b',
                      borderRadius: '6px',
                      marginBottom: i < formData.sections.length - 1 ? '8px' : 0,
                    }}>
                      <GripVertical size={14} style={{ color: '#52525b' }} />
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: `${formData.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '600',
                        color: formData.color,
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ flex: 1, fontSize: '13px', color: 'white' }}>{section}</span>
                      <button
                        onClick={() => removeSection(i)}
                        style={{
                          padding: '4px',
                          borderRadius: '4px',
                          background: 'transparent',
                          border: 'none',
                          color: '#71717a',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={formData.newSection}
                    onChange={(e) => setFormData({ ...formData, newSection: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && addSection()}
                    placeholder="Add new section..."
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#27272a',
                      border: '1px solid #3f3f46',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={addSection}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: '#27272a',
                      border: '1px solid #3f3f46',
                      color: '#a1a1aa',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '20px 24px',
              borderTop: '1px solid #27272a',
              position: 'sticky',
              bottom: 0,
              background: '#18181b',
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: '1px solid #27272a',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.name}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  background: formData.name 
                    ? `linear-gradient(135deg, ${formData.color}, ${formData.color}cc)` 
                    : '#27272a',
                  border: 'none',
                  color: formData.name ? 'black' : '#52525b',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: formData.name ? 'pointer' : 'not-allowed',
                }}
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Templates</h1>
          <p style={{ color: '#71717a', fontSize: '14px', maxWidth: '500px' }}>
            Start with professionally designed templates to create sales rooms faster. Each template is optimized for conversions.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
            color: 'black',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          Create Template
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              background: selectedCategory === category ? 'rgba(34, 211, 238, 0.15)' : '#18181b',
              color: selectedCategory === category ? '#22d3ee' : '#a1a1aa',
              transition: 'all 0.2s',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedTemplate ? '1fr 400px' : '1fr', gap: '24px' }}>
        {/* Templates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredTemplates.map((template) => {
            const IconComp = getIconComponent(template.iconId)
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: '#18181b',
                  border: selectedTemplate === template.id ? `2px solid ${template.color}` : '1px solid #27272a',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                {template.isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: 'rgba(251, 191, 36, 0.15)',
                    color: '#fbbf24',
                    fontSize: '10px',
                    fontWeight: '600',
                  }}>
                    <Star size={10} fill="#fbbf24" />
                    POPULAR
                  </div>
                )}

                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${template.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <IconComp size={24} style={{ color: template.color }} />
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
                  {template.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#71717a', marginBottom: '16px', lineHeight: '1.5' }}>
                  {template.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#52525b' }}>
                    {template.sections.length} sections
                  </span>
                  <span style={{ fontSize: '12px', color: '#52525b' }}>
                    Used {template.usageCount} times
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Template Preview Panel */}
        {selected && (
          <div style={{
            background: '#18181b',
            borderRadius: '16px',
            border: '1px solid #27272a',
            overflow: 'hidden',
            position: 'sticky',
            top: '32px',
            height: 'fit-content',
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #27272a',
              background: `linear-gradient(135deg, ${selected.color}10, transparent)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${selected.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {(() => {
                    const IconComp = getIconComponent(selected.iconId)
                    return <IconComp size={20} style={{ color: selected.color }} />
                  })()}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>{selected.name}</h3>
                  <span style={{ fontSize: '12px', color: '#71717a' }}>{selected.category}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: '1.5' }}>
                {selected.description}
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Included Sections
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {selected.sections.map((section, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: `${selected.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: selected.color,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '13px', color: '#e4e4e7' }}>{section}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  onClick={() => handleUseTemplate(selected.id)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: selected.color,
                    color: 'black',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  Use Template
                  <ArrowRight size={16} />
                </button>
                <button 
                  onClick={openPreview}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'transparent',
                    color: '#a1a1aa',
                    fontWeight: '500',
                    fontSize: '14px',
                    border: '1px solid #27272a',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Eye size={16} />
                  Preview
                </button>
                {!selected.isPopular && selected.usageCount === 0 && (
                  <button 
                    onClick={() => handleDeleteTemplate(selected.id)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'transparent',
                      color: '#ef4444',
                      fontWeight: '500',
                      fontSize: '14px',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Trash2 size={16} />
                    Delete Template
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
