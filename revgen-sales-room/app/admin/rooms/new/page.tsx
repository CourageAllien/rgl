'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  Package,
  FileText,
  Sparkles,
  Loader2,
  Copy,
  ExternalLink,
  CheckCircle2,
  Users,
  Target,
  Zap,
  Crown,
  AlertCircle,
} from 'lucide-react'

const steps = [
  { id: 1, name: 'Prospect', icon: User },
  { id: 2, name: 'Package', icon: Package },
  { id: 3, name: 'Content', icon: FileText },
  { id: 4, name: 'Review', icon: Check },
]

const packages = [
  { 
    id: 'starter', 
    name: 'Starter Package', 
    price: 2499, 
    icon: Zap,
    color: '#22d3ee',
    features: ['500 prospects/month', 'Email outreach', 'Monthly strategy call', 'Basic reporting'],
  },
  { 
    id: 'growth', 
    name: 'Growth Package', 
    price: 4999, 
    icon: Target,
    color: '#a78bfa',
    popular: true,
    features: ['1,500 prospects/month', 'Email + LinkedIn', 'Bi-weekly calls', 'Dedicated manager', 'CRM integration'],
  },
  { 
    id: 'enterprise', 
    name: 'Enterprise Package', 
    price: 9999, 
    icon: Crown,
    color: '#fbbf24',
    features: ['3,000+ prospects/month', 'Multi-channel outreach', 'Weekly calls', 'Dedicated team', 'Custom playbooks'],
  },
]

const defaultTemplates = [
  { id: 'default', name: 'Standard Proposal', desc: 'Complete proposal with all sections' },
  { id: 'quick', name: 'Quick Quote', desc: 'Simplified pricing-focused proposal' },
  { id: 'enterprise', name: 'Enterprise Proposal', desc: 'Detailed proposal for large deals' },
]

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

interface Room {
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

export default function CreateRoomPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [createdSlug, setCreatedSlug] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedTemplateName, setSelectedTemplateName] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    // Prospect
    prospectName: '',
    prospectEmail: '',
    prospectPhone: '',
    prospectCompany: '',
    prospectWebsite: '',
    prospectIndustry: '',
    prospectSize: '',
    // Package
    selectedPackage: 'growth',
    // Content
    selectedTemplate: 'default',
    meetingNotes: '',
    customMessage: '',
  })

  // Load template if specified
  useEffect(() => {
    if (templateId) {
      // First try to load from the selected-template localStorage
      const selectedTemplate = localStorage.getItem('revgen-selected-template')
      if (selectedTemplate) {
        const template = JSON.parse(selectedTemplate)
        setSelectedTemplateName(template.name)
        setFormData(prev => ({ ...prev, selectedTemplate: templateId }))
        // Clear the selected template after loading
        localStorage.removeItem('revgen-selected-template')
        return
      }
      
      // Fallback: load from templates list
      const savedTemplates = localStorage.getItem('revgen-templates')
      if (savedTemplates) {
        const templates = JSON.parse(savedTemplates)
        const template = templates.find((t: any) => t.id === templateId)
        if (template) {
          setSelectedTemplateName(template.name)
          setFormData(prev => ({ ...prev, selectedTemplate: templateId }))
        }
      }
    }
  }, [templateId])

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.prospectName.trim()) {
      newErrors.prospectName = 'Name is required'
    }
    
    if (!formData.prospectEmail.trim()) {
      newErrors.prospectEmail = 'Email is required'
    } else if (!isValidEmail(formData.prospectEmail)) {
      newErrors.prospectEmail = 'Please enter a valid email address'
    }
    
    if (!formData.prospectCompany.trim()) {
      newErrors.prospectCompany = 'Company name is required'
    }
    
    if (formData.prospectWebsite && !isValidWebsite(formData.prospectWebsite)) {
      newErrors.prospectWebsite = 'Please enter a valid website URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.prospectName && formData.prospectEmail && formData.prospectCompany
    }
    return true
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return
    }
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateAllFields = (): boolean => {
    // Validate all required fields before creating
    const newErrors: Record<string, string> = {}
    
    if (!formData.prospectName.trim()) {
      newErrors.prospectName = 'Name is required'
    }
    
    if (!formData.prospectEmail.trim()) {
      newErrors.prospectEmail = 'Email is required'
    } else if (!isValidEmail(formData.prospectEmail)) {
      newErrors.prospectEmail = 'Please enter a valid email address'
    }
    
    if (!formData.prospectCompany.trim()) {
      newErrors.prospectCompany = 'Company name is required'
    }
    
    if (formData.prospectWebsite && !isValidWebsite(formData.prospectWebsite)) {
      newErrors.prospectWebsite = 'Please enter a valid website URL'
    }
    
    if (!formData.selectedPackage) {
      newErrors.selectedPackage = 'Please select a package'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async () => {
    // Final validation check before creating
    if (!validateAllFields()) {
      // Go back to step 1 if there are validation errors
      setCurrentStep(1)
      return
    }
    
    setIsCreating(true)
    
    // Generate slug from company name
    const slug = `${formData.prospectCompany.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`
    
    // Get selected package details
    const selectedPkg = packages.find(p => p.id === formData.selectedPackage)!
    
    // Create room object
    const newRoom: Room = {
      id: Date.now().toString(),
      slug,
      status: 'SENT',
      createdAt: new Date().toISOString(),
      prospect: {
        name: formData.prospectName,
        email: formData.prospectEmail,
        phone: formData.prospectPhone,
        company: formData.prospectCompany,
        website: formData.prospectWebsite,
        industry: formData.prospectIndustry,
        companySize: formData.prospectSize,
      },
      package: {
        id: selectedPkg.id,
        name: selectedPkg.name,
        price: selectedPkg.price,
        color: selectedPkg.color,
      },
      template: formData.selectedTemplate,
      meetingNotes: formData.meetingNotes,
      customMessage: formData.customMessage,
    }
    
    // Save to localStorage
    const existingRooms = JSON.parse(localStorage.getItem('revgen-rooms') || '[]')
    localStorage.setItem('revgen-rooms', JSON.stringify([newRoom, ...existingRooms]))
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 1500))
    
    setCreatedSlug(slug)
    setIsCreated(true)
    setIsCreating(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${createdSlug}`)
  }

  const selectedPkg = packages.find(p => p.id === formData.selectedPackage)!

  if (isCreated) {
    return (
      <div style={{ padding: '32px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          maxWidth: '500px', 
          width: '100%', 
          textAlign: 'center',
          padding: '48px',
          borderRadius: '20px',
          background: '#18181b',
          border: '1px solid #27272a',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: 'rgba(52, 211, 153, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckCircle2 size={40} style={{ color: '#34d399' }} />
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Sales Room Created!
          </h1>
          <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '32px' }}>
            Your sales room for <span style={{ color: '#22d3ee' }}>{formData.prospectCompany}</span> is ready to share with <span style={{ color: 'white' }}>{formData.prospectName}</span>.
          </p>

          <div style={{
            padding: '16px',
            borderRadius: '10px',
            background: '#27272a',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {typeof window !== 'undefined' ? window.location.origin : ''}/r/{createdSlug}
            </span>
            <button
              onClick={copyLink}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                background: '#3f3f46',
                border: 'none',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href={`/r/${createdSlug}`} target="_blank" style={{ flex: 1 }}>
              <button style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                color: 'black',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <ExternalLink size={16} />
                View Room
              </button>
            </Link>
            <Link href="/admin/rooms" style={{ flex: 1 }}>
              <button style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid #27272a',
                color: '#a1a1aa',
                fontWeight: '500',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                Back to Rooms
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link href="/admin/rooms">
          <button style={{
            padding: '10px',
            borderRadius: '8px',
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#a1a1aa',
            cursor: 'pointer',
          }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Create Sales Room</h1>
          <p style={{ fontSize: '13px', color: '#71717a' }}>
            {selectedTemplateName ? `Using template: ${selectedTemplateName}` : 'Set up a new sales room for your prospect'}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        marginBottom: '40px',
        padding: '0 60px',
      }}>
        {steps.map((step, i) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: currentStep >= step.id ? '#22d3ee' : '#27272a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {currentStep > step.id ? (
                  <Check size={18} style={{ color: 'black' }} />
                ) : (
                  <step.icon size={18} style={{ color: currentStep >= step.id ? 'black' : '#71717a' }} />
                )}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: currentStep >= step.id ? 'white' : '#71717a' }}>
                  {step.name}
                </div>
                <div style={{ fontSize: '11px', color: '#52525b' }}>Step {step.id}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ 
                flex: 1, 
                height: '2px', 
                background: currentStep > step.id ? '#22d3ee' : '#27272a',
                margin: '0 16px',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Step 1: Prospect */}
        {currentStep === 1 && (
          <div style={{
            padding: '32px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(34, 211, 238, 0.15)' }}>
                <User size={20} style={{ color: '#22d3ee' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Prospect Information</h2>
                <p style={{ fontSize: '13px', color: '#71717a' }}>Enter details about your prospect</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.prospectName}
                  onChange={(e) => updateForm('prospectName', e.target.value)}
                  placeholder="John Smith"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#27272a',
                    border: errors.prospectName ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.prospectName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.prospectName}
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.prospectEmail}
                  onChange={(e) => updateForm('prospectEmail', e.target.value)}
                  placeholder="john@company.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#27272a',
                    border: errors.prospectEmail ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.prospectEmail && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.prospectEmail}
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.prospectCompany}
                  onChange={(e) => updateForm('prospectCompany', e.target.value)}
                  placeholder="Acme Inc"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#27272a',
                    border: errors.prospectCompany ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.prospectCompany && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.prospectCompany}
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.prospectPhone}
                  onChange={(e) => updateForm('prospectPhone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                  Website
                </label>
                <input
                  type="url"
                  value={formData.prospectWebsite}
                  onChange={(e) => updateForm('prospectWebsite', e.target.value)}
                  placeholder="https://company.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#27272a',
                    border: errors.prospectWebsite ? '1px solid #ef4444' : '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {errors.prospectWebsite && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.prospectWebsite}
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                  Industry
                </label>
                <select
                  value={formData.prospectIndustry}
                  onChange={(e) => updateForm('prospectIndustry', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  <option value="">Select industry</option>
                  <option value="B2B SaaS">B2B SaaS</option>
                  <option value="FinTech">FinTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="MarTech">MarTech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Package */}
        {currentStep === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Select a Package</h2>
              <p style={{ fontSize: '14px', color: '#71717a' }}>Choose the right package for {formData.prospectCompany}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => updateForm('selectedPackage', pkg.id)}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: '#18181b',
                    border: formData.selectedPackage === pkg.id ? `2px solid ${pkg.color}` : '1px solid #27272a',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s',
                  }}
                >
                  {pkg.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '16px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: pkg.color,
                      color: 'black',
                      fontSize: '10px',
                      fontWeight: '700',
                    }}>
                      POPULAR
                    </div>
                  )}
                  
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${pkg.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}>
                    <pkg.icon size={22} style={{ color: pkg.color }} />
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>{pkg.name}</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>${(pkg.price / 100).toFixed(0)}</span>
                    <span style={{ fontSize: '13px', color: '#71717a' }}>/mo</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pkg.features.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={14} style={{ color: pkg.color }} />
                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Content */}
        {currentStep === 3 && (
          <div style={{
            padding: '32px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(167, 139, 250, 0.15)' }}>
                <FileText size={20} style={{ color: '#a78bfa' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Room Content</h2>
                <p style={{ fontSize: '13px', color: '#71717a' }}>Customize the content for {formData.prospectName}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '12px' }}>
                Template
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {defaultTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => updateForm('selectedTemplate', template.id)}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '10px',
                      background: '#27272a',
                      border: formData.selectedTemplate === template.id ? '2px solid #22d3ee' : '1px solid #3f3f46',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'white', marginBottom: '4px' }}>{template.name}</div>
                    <div style={{ fontSize: '12px', color: '#71717a' }}>{template.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                Meeting Notes (for AI recap generation)
              </label>
              <textarea
                value={formData.meetingNotes}
                onChange={(e) => updateForm('meetingNotes', e.target.value)}
                placeholder={`Notes from your call with ${formData.prospectName} at ${formData.prospectCompany}...`}
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                <Sparkles size={14} style={{ color: '#a78bfa' }} />
                <span style={{ fontSize: '12px', color: '#71717a' }}>AI will generate a professional meeting recap</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>
                Custom Welcome Message (optional)
              </label>
              <textarea
                value={formData.customMessage}
                onChange={(e) => updateForm('customMessage', e.target.value)}
                placeholder={`Hi ${formData.prospectName}, thank you for taking the time to speak with us...`}
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div style={{
            padding: '32px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Review & Create</h2>
              <p style={{ fontSize: '14px', color: '#71717a' }}>Review the details before creating the sales room for {formData.prospectName}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Prospect Summary */}
              <div style={{ padding: '20px', borderRadius: '12px', background: '#27272a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <User size={16} style={{ color: '#22d3ee' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#22d3ee' }}>PROSPECT</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#52525b' }}>Name</div>
                    <div style={{ fontSize: '14px', color: 'white' }}>{formData.prospectName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#52525b' }}>Company</div>
                    <div style={{ fontSize: '14px', color: 'white' }}>{formData.prospectCompany}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#52525b' }}>Email</div>
                    <div style={{ fontSize: '14px', color: 'white' }}>{formData.prospectEmail}</div>
                  </div>
                  {formData.prospectIndustry && (
                    <div>
                      <div style={{ fontSize: '11px', color: '#52525b' }}>Industry</div>
                      <div style={{ fontSize: '14px', color: 'white' }}>{formData.prospectIndustry}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Package Summary */}
              <div style={{ padding: '20px', borderRadius: '12px', background: '#27272a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Package size={16} style={{ color: '#a78bfa' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#a78bfa' }}>PACKAGE</span>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{selectedPkg.name}</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: selectedPkg.color }}>
                    ${(selectedPkg.price / 100).toFixed(0)}<span style={{ fontSize: '14px', color: '#71717a' }}>/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template */}
            <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: '#27272a' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#52525b' }}>Template</div>
                  <div style={{ fontSize: '14px', color: 'white' }}>
                    {defaultTemplates.find(t => t.id === formData.selectedTemplate)?.name || selectedTemplateName || 'Standard Proposal'}
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(52, 211, 153, 0.15)',
                  color: '#34d399',
                  fontSize: '12px',
                  fontWeight: '500',
                }}>
                  Ready to create
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '10px',
              background: 'transparent',
              border: '1px solid #27272a',
              color: currentStep === 1 ? '#52525b' : '#a1a1aa',
              fontSize: '14px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                color: 'black',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              disabled={isCreating}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                color: 'black',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: isCreating ? 'not-allowed' : 'pointer',
              }}
            >
              {isCreating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Create Sales Room
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
