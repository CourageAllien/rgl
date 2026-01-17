'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  Edit,
  Trash2,
  FolderOpen,
  TrendingUp,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  company: string
  website: string
  industry: string
  companySize: string
  rooms: number
  totalValue: number
  status: string
  lastContact: string
  createdAt: string
}

const defaultProspects: Prospect[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@techscale.com',
    phone: '+1 (415) 555-0123',
    company: 'TechScale Inc',
    website: 'https://techscale.com',
    industry: 'B2B SaaS',
    companySize: '50-100',
    rooms: 2,
    totalValue: 9998,
    status: 'active',
    lastContact: '2 hours ago',
    createdAt: '2026-01-10',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@dataflow.io',
    phone: '+1 (628) 555-0456',
    company: 'DataFlow Systems',
    website: 'https://dataflow.io',
    industry: 'Data Analytics',
    companySize: '100-250',
    rooms: 1,
    totalValue: 2499,
    status: 'active',
    lastContact: '5 hours ago',
    createdAt: '2026-01-08',
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    email: 'marcus@elevateai.com',
    phone: '+1 (510) 555-0789',
    company: 'Elevate AI',
    website: 'https://elevateai.com',
    industry: 'AI/ML',
    companySize: '250-500',
    rooms: 3,
    totalValue: 29997,
    status: 'active',
    lastContact: '1 day ago',
    createdAt: '2026-01-05',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily@scaleupvc.com',
    phone: '+1 (408) 555-0321',
    company: 'ScaleUp Ventures',
    website: 'https://scaleupvc.com',
    industry: 'Venture Capital',
    companySize: '10-50',
    rooms: 1,
    totalValue: 4999,
    status: 'new',
    lastContact: '2 days ago',
    createdAt: '2026-01-15',
  },
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'active': return { color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)' }
    case 'new': return { color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.15)' }
    case 'inactive': return { color: '#71717a', bg: 'rgba(113, 113, 122, 0.15)' }
    default: return { color: '#71717a', bg: 'rgba(113, 113, 122, 0.15)' }
  }
}

// Validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidWebsite = (website: string): boolean => {
  if (!website) return true // Optional field
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  return urlRegex.test(website)
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProspect, setSelectedProspect] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: '',
    companySize: '',
  })

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('revgen-prospects')
    if (saved) {
      setProspects(JSON.parse(saved))
    } else {
      setProspects(defaultProspects)
      localStorage.setItem('revgen-prospects', JSON.stringify(defaultProspects))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (prospects.length > 0) {
      localStorage.setItem('revgen-prospects', JSON.stringify(prospects))
    }
  }, [prospects])

  const filteredProspects = prospects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selected = prospects.find(p => p.id === selectedProspect)

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com)'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (formData.website && !isValidWebsite(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (e.g. https://company.com)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    
    const newProspect: Prospect = {
      id: Date.now().toString(),
      ...formData,
      rooms: 0,
      totalValue: 0,
      status: 'new',
      lastContact: 'Just now',
      createdAt: new Date().toISOString().split('T')[0],
    }
    
    setProspects([newProspect, ...prospects])
    setShowModal(false)
    setShowSuccess(true)
    setFormData({ name: '', email: '', phone: '', company: '', website: '', industry: '', companySize: '' })
    setErrors({})
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDelete = (id: string) => {
    setProspects(prospects.filter(p => p.id !== id))
    if (selectedProspect === id) {
      setSelectedProspect(null)
    }
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
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Prospect added successfully!</span>
        </div>
      )}

      {/* Add Prospect Modal */}
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
            maxWidth: '500px',
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
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Add New Prospect</h2>
              <button
                onClick={() => { setShowModal(false); setErrors({}) }}
                style={{ padding: '8px', borderRadius: '6px', background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder="John Smith"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: errors.name ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.name && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  placeholder="john@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: errors.email ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Company *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateForm('company', e.target.value)}
                  placeholder="Acme Inc"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: errors.company ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.company && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.company}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
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
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateForm('website', e.target.value)}
                    placeholder="https://company.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: '#27272a',
                      border: errors.website ? '1px solid #ef4444' : '1px solid #3f3f46',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.website && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                      <AlertCircle size={12} />
                      {errors.website}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateForm('industry', e.target.value)}
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
                    <option value="">Select...</option>
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="FinTech">FinTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Venture Capital">Venture Capital</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => updateForm('companySize', e.target.value)}
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
                    <option value="">Select...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="10-50">10-50 employees</option>
                    <option value="50-100">50-100 employees</option>
                    <option value="100-250">100-250 employees</option>
                    <option value="250-500">250-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '20px 24px',
              borderTop: '1px solid #27272a',
            }}>
              <button
                onClick={() => { setShowModal(false); setErrors({}) }}
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
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  border: 'none',
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Add Prospect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Prospects</h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>Manage your prospect database and track engagement</p>
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
          Add Prospect
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Prospects', value: prospects.length.toString(), icon: Users, color: '#22d3ee' },
          { label: 'Active', value: prospects.filter(p => p.status === 'active').length.toString(), icon: TrendingUp, color: '#34d399' },
          { label: 'New This Week', value: prospects.filter(p => p.status === 'new').length.toString(), icon: FolderOpen, color: '#a78bfa' },
          { label: 'Total Value', value: `$${(prospects.reduce((acc, p) => acc + p.totalValue, 0) / 100).toLocaleString()}`, icon: Building2, color: '#fbbf24' },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '20px',
            borderRadius: '12px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, company, or email..."
          style={{
            width: '100%',
            padding: '14px 14px 14px 44px',
            borderRadius: '10px',
            background: '#18181b',
            border: '1px solid #27272a',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Prospects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedProspect ? '1fr 380px' : '1fr', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', alignContent: 'start' }}>
          {filteredProspects.map((prospect) => {
            const statusStyle = getStatusStyle(prospect.status)
            return (
              <div
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect.id)}
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  background: '#18181b',
                  border: selectedProspect === prospect.id ? '2px solid #22d3ee' : '1px solid #27272a',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                      {prospect.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: 'white' }}>{prospect.name}</div>
                      <div style={{ fontSize: '12px', color: '#71717a' }}>{prospect.company}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    color: statusStyle.color,
                    background: statusStyle.bg,
                  }}>
                    {prospect.status}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={13} style={{ color: '#52525b' }} />
                    <span style={{ fontSize: '12px', color: '#a1a1aa' }}>{prospect.email}</span>
                  </div>
                  {prospect.industry && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={13} style={{ color: '#52525b' }} />
                      <span style={{ fontSize: '12px', color: '#a1a1aa' }}>{prospect.industry}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#52525b' }}>
                  <span>{prospect.rooms} room{prospect.rooms !== 1 ? 's' : ''}</span>
                  <span>{prospect.lastContact}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Prospect Detail Panel */}
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
              padding: '24px',
              borderBottom: '1px solid #27272a',
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), transparent)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{selected.name}</h3>
                  <p style={{ fontSize: '13px', color: '#71717a' }}>{selected.company}</p>
                </div>
              </div>
              
              <div style={{ 
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
                color: getStatusStyle(selected.status).color,
                background: getStatusStyle(selected.status).bg,
              }}>
                {selected.status}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Contact Information
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} style={{ color: '#22d3ee' }} />
                  <span style={{ fontSize: '13px', color: '#e4e4e7' }}>{selected.email}</span>
                </div>
                {selected.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={16} style={{ color: '#a78bfa' }} />
                    <span style={{ fontSize: '13px', color: '#e4e4e7' }}>{selected.phone}</span>
                  </div>
                )}
                {selected.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Globe size={16} style={{ color: '#34d399' }} />
                    <a href={selected.website.startsWith('http') ? selected.website : `https://${selected.website}`} 
                       target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: '13px', color: '#22d3ee', textDecoration: 'none' }}>
                      {selected.website}
                    </a>
                  </div>
                )}
              </div>

              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Company Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: '#0f0f11', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#52525b', marginBottom: '4px' }}>INDUSTRY</div>
                  <div style={{ fontSize: '13px', color: 'white' }}>{selected.industry || 'N/A'}</div>
                </div>
                <div style={{ padding: '12px', background: '#0f0f11', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#52525b', marginBottom: '4px' }}>SIZE</div>
                  <div style={{ fontSize: '13px', color: 'white' }}>{selected.companySize || 'N/A'}</div>
                </div>
              </div>

              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Activity
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: '#0f0f11', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#52525b', marginBottom: '4px' }}>ROOMS</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22d3ee' }}>{selected.rooms}</div>
                </div>
                <div style={{ padding: '12px', background: '#0f0f11', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#52525b', marginBottom: '4px' }}>TOTAL VALUE</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#34d399' }}>${(selected.totalValue / 100).toLocaleString()}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href={`/admin/rooms/new?prospect=${selected.id}`}>
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                    color: 'black',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                  }}>
                    Create Room
                  </button>
                </Link>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    flex: 1,
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
                    gap: '6px',
                  }}>
                    <Edit size={14} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(selected.id)}
                    style={{
                      flex: 1,
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
                      gap: '6px',
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
