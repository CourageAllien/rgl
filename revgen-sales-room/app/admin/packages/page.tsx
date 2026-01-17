'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Package,
  Edit,
  Trash2,
  Check,
  Star,
  DollarSign,
  Users,
  Zap,
  Crown,
  X,
  CheckCircle2,
  AlertCircle,
  Target,
} from 'lucide-react'

interface PackageData {
  id: string
  name: string
  description: string
  price: number
  billingCycle: string
  isPopular: boolean
  color: string
  features: string[]
  activeRooms: number
  totalRevenue: number
}

const colorOptions = ['#22d3ee', '#a78bfa', '#fbbf24', '#34d399', '#ec4899', '#f97316']

const defaultPackages: PackageData[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    description: 'Perfect for companies just getting started with outbound.',
    price: 2499,
    billingCycle: 'monthly',
    isPopular: false,
    color: '#22d3ee',
    features: [
      '500 prospects/month',
      'Email outreach only',
      'Monthly strategy call',
      'Shared account manager',
      'Basic reporting',
    ],
    activeRooms: 3,
    totalRevenue: 7497,
  },
  {
    id: 'growth',
    name: 'Growth Package',
    description: 'Our most popular option for scaling teams.',
    price: 4999,
    billingCycle: 'monthly',
    isPopular: true,
    color: '#a78bfa',
    features: [
      '1,500 prospects/month',
      'Email + LinkedIn outreach',
      'Bi-weekly strategy calls',
      'Dedicated account manager',
      'Advanced reporting',
      'CRM integration',
      'A/B testing',
    ],
    activeRooms: 8,
    totalRevenue: 39992,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    description: 'Full-service solution for high-growth companies.',
    price: 9999,
    billingCycle: 'monthly',
    isPopular: false,
    color: '#fbbf24',
    features: [
      '3,000+ prospects/month',
      'Email + LinkedIn + Phone',
      'Weekly strategy calls',
      'Dedicated team',
      'Custom reporting',
      'Full CRM integration',
      'Custom playbooks',
      'Priority support',
    ],
    activeRooms: 2,
    totalRevenue: 19998,
  },
  {
    id: 'pilot',
    name: 'Pilot Program',
    description: '30-day trial for risk-averse prospects.',
    price: 1999,
    billingCycle: 'one-time',
    isPopular: false,
    color: '#34d399',
    features: [
      '250 prospects',
      'Email outreach',
      '2 strategy calls',
      'Performance report',
      'Conversion path to Growth',
    ],
    activeRooms: 4,
    totalRevenue: 7996,
  },
]

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    billingCycle: 'monthly',
    isPopular: false,
    color: '#22d3ee',
    features: [''],
  })

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('revgen-packages')
    if (saved) {
      setPackages(JSON.parse(saved))
    } else {
      setPackages(defaultPackages)
      localStorage.setItem('revgen-packages', JSON.stringify(defaultPackages))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (packages.length > 0) {
      localStorage.setItem('revgen-packages', JSON.stringify(packages))
    }
  }, [packages])

  const selected = packages.find(p => p.id === selectedPackage)

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Package name is required'
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price'
    }
    
    const validFeatures = formData.features.filter(f => f.trim())
    if (validFeatures.length === 0) {
      newErrors.features = 'At least one feature is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    
    const newPackage: PackageData = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Math.round(parseFloat(formData.price) * 100), // Convert to cents
      billingCycle: formData.billingCycle,
      isPopular: formData.isPopular,
      color: formData.color,
      features: formData.features.filter(f => f.trim()),
      activeRooms: 0,
      totalRevenue: 0,
    }
    
    setPackages([...packages, newPackage])
    setShowModal(false)
    setShowSuccess(true)
    setFormData({
      name: '',
      description: '',
      price: '',
      billingCycle: 'monthly',
      isPopular: false,
      color: '#22d3ee',
      features: [''],
    })
    setErrors({})
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDelete = (id: string) => {
    setPackages(packages.filter(p => p.id !== id))
    if (selectedPackage === id) {
      setSelectedPackage(null)
    }
  }

  const totalRevenue = packages.reduce((acc, p) => acc + p.totalRevenue, 0)
  const totalRooms = packages.reduce((acc, p) => acc + p.activeRooms, 0)

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
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Package created successfully!</span>
        </div>
      )}

      {/* Add Package Modal */}
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
            maxWidth: '550px',
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
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Add New Package</h2>
              <button
                onClick={() => { setShowModal(false); setErrors({}) }}
                style={{ padding: '8px', borderRadius: '6px', background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Package Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder="e.g. Pro Package"
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
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  placeholder="Brief description of this package..."
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Price (USD) *</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateForm('price', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 36px',
                        borderRadius: '8px',
                        background: '#27272a',
                        border: errors.price ? '1px solid #ef4444' : '1px solid #3f3f46',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {errors.price && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                      <AlertCircle size={12} />
                      {errors.price}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Billing Cycle</label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => updateForm('billingCycle', e.target.value)}
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
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Color</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateForm('color', color)}
                      style={{
                        width: '36px',
                        height: '36px',
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

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', color: '#a1a1aa' }}>Features *</label>
                  <button
                    onClick={addFeature}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      background: '#27272a',
                      border: 'none',
                      color: '#22d3ee',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    + Add Feature
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {formData.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        placeholder={`Feature ${i + 1}`}
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: '#27272a',
                          border: '1px solid #3f3f46',
                          color: 'white',
                          fontSize: '14px',
                          outline: 'none',
                        }}
                      />
                      {formData.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(i)}
                          style={{
                            padding: '10px',
                            borderRadius: '6px',
                            background: 'transparent',
                            border: '1px solid #3f3f46',
                            color: '#71717a',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.features && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#ef4444', fontSize: '12px' }}>
                    <AlertCircle size={12} />
                    {errors.features}
                  </div>
                )}
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                background: '#0f0f11',
                borderRadius: '8px',
              }}>
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => updateForm('isPopular', e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#22d3ee' }}
                />
                <div>
                  <div style={{ fontSize: '14px', color: 'white' }}>Mark as Popular</div>
                  <div style={{ fontSize: '12px', color: '#71717a' }}>Highlights this package with a badge</div>
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
                  background: `linear-gradient(135deg, ${formData.color}, ${formData.color}cc)`,
                  border: 'none',
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Create Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Packages</h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>Manage your pricing packages and offerings</p>
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
          Add Package
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Packages', value: packages.length.toString(), icon: Package, color: '#22d3ee' },
          { label: 'Active Rooms', value: totalRooms.toString(), icon: Users, color: '#a78bfa' },
          { label: 'Total Revenue', value: `$${(totalRevenue / 100).toLocaleString()}`, icon: DollarSign, color: '#34d399' },
          { label: 'Popular Package', value: packages.find(p => p.isPopular)?.name || 'None', icon: Star, color: '#fbbf24' },
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
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Packages Grid - Horizontal Pricing Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        alignItems: 'stretch',
      }}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            style={{
              padding: '28px',
              borderRadius: '20px',
              background: pkg.isPopular 
                ? `linear-gradient(135deg, ${pkg.color}08, ${pkg.color}03)`
                : '#18181b',
              border: pkg.isPopular 
                ? `2px solid ${pkg.color}` 
                : selectedPackage === pkg.id 
                  ? `2px solid ${pkg.color}` 
                  : '1px solid #27272a',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              transform: pkg.isPopular ? 'scale(1.02)' : 'scale(1)',
            }}
          >
              {pkg.isPopular && (
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
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: `${pkg.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Package size={22} style={{ color: pkg.color }} />
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{pkg.name}</h3>
              <p style={{ fontSize: '13px', color: '#71717a', marginBottom: '16px' }}>{pkg.description}</p>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>${(pkg.price / 100).toLocaleString()}</span>
                <span style={{ fontSize: '13px', color: '#71717a' }}>/{pkg.billingCycle === 'one-time' ? 'once' : pkg.billingCycle.replace('ly', '')}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {pkg.features.slice(0, 4).map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={14} style={{ color: pkg.color }} />
                    <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{feature}</span>
                  </div>
                ))}
                {pkg.features.length > 4 && (
                  <span style={{ fontSize: '12px', color: '#52525b', marginLeft: '22px' }}>
                    +{pkg.features.length - 4} more features
                  </span>
                )}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #27272a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#52525b' }}>
                  <span>{pkg.activeRooms} active rooms</span>
                  <span>${(pkg.totalRevenue / 100).toLocaleString()} revenue</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Package Detail Modal */}
      {selected && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40,
          padding: '20px',
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedPackage(null) }}
        >
          <div style={{
            background: '#18181b',
            borderRadius: '20px',
            border: '1px solid #27272a',
            overflow: 'hidden',
            maxWidth: '440px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #27272a',
              background: `linear-gradient(135deg, ${selected.color}15, transparent)`,
              position: 'relative',
            }}>
              <button
                onClick={() => setSelectedPackage(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  border: 'none',
                  color: '#a1a1aa',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `${selected.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Package size={28} style={{ color: selected.color }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>{selected.name}</h3>
                  <span style={{ 
                    fontSize: '12px', 
                    color: selected.isPopular ? '#fbbf24' : '#71717a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    {selected.isPopular && <Star size={12} fill="#fbbf24" />}
                    {selected.isPopular ? 'Popular Package' : selected.billingCycle}
                  </span>
                </div>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>${(selected.price / 100).toLocaleString()}</span>
                <span style={{ fontSize: '14px', color: '#71717a' }}>/{selected.billingCycle === 'one-time' ? 'once' : selected.billingCycle.replace('ly', '')}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#a1a1aa' }}>{selected.description}</p>
            </div>

            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Included Features
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {selected.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} style={{ color: selected.color }} />
                    <span style={{ fontSize: '13px', color: '#e4e4e7' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Performance
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '14px', background: '#0f0f11', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#52525b', marginBottom: '4px' }}>ACTIVE ROOMS</div>
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#22d3ee' }}>{selected.activeRooms}</div>
                </div>
                <div style={{ padding: '14px', background: '#0f0f11', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#52525b', marginBottom: '4px' }}>TOTAL REVENUE</div>
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399' }}>${(selected.totalRevenue / 100).toLocaleString()}</div>
                </div>
              </div>

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
  )
}
