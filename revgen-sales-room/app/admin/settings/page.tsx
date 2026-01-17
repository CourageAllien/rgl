'use client'

import { useState } from 'react'
import {
  Settings,
  User,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Key,
  Check,
  Copy,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'company', name: 'Company', icon: Building2 },
  { id: 'billing', name: 'Billing', icon: CreditCard },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'integrations', name: 'Integrations', icon: Globe },
  { id: 'security', name: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: '#71717a', fontSize: '14px' }}>
          Manage your account settings and preferences.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                background: activeTab === tab.id ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#22d3ee' : '#a1a1aa',
                transition: 'all 0.2s',
              }}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '12px',
              padding: '32px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>
                Profile Settings
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  color: 'white',
                }}>
                  RL
                </div>
                <div>
                  <button style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: 'none',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}>
                    Change Photo
                  </button>
                  <button style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid #27272a',
                    color: '#ef4444',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}>
                    Remove
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Full Name</label>
                  <input
                    type="text"
                    defaultValue="RevGen Labs"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
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
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Email</label>
                  <input
                    type="email"
                    defaultValue="admin@revgenlabs.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#27272a',
                      border: '1px solid #3f3f46',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Role</label>
                <input
                  type="text"
                  defaultValue="Admin"
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: '#1f1f23',
                    border: '1px solid #27272a',
                    color: '#71717a',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <button 
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: saved ? '#34d399' : 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  color: saved ? 'white' : 'black',
                  fontWeight: '600',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {saved ? <><Check size={16} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && (
            <div style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '12px',
              padding: '32px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>
                Company Settings
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Company Name</label>
                  <input
                    type="text"
                    defaultValue="RevGen Labs, LLC"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
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
                    defaultValue="https://revgenlabs.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#27272a',
                      border: '1px solid #3f3f46',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Address</label>
                <input
                  type="text"
                  defaultValue="100 California Street, Suite 500, San Francisco, CA 94111"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px' }}>Company Logo</label>
                <div style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: '2px dashed #27272a',
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: '13px', color: '#71717a', marginBottom: '8px' }}>Drag and drop or click to upload</p>
                  <button style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#27272a',
                    border: 'none',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}>
                    Upload Logo
                  </button>
                </div>
              </div>

              <button 
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: saved ? '#34d399' : 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  color: saved ? 'white' : 'black',
                  fontWeight: '600',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {saved ? <><Check size={16} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '12px',
              padding: '32px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>
                Integrations
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'Stripe', desc: 'Payment processing', connected: true, color: '#635bff' },
                  { name: 'HubSpot', desc: 'CRM integration', connected: true, color: '#ff7a59' },
                  { name: 'Salesforce', desc: 'CRM integration', connected: false, color: '#00a1e0' },
                  { name: 'Slack', desc: 'Notifications', connected: true, color: '#4a154b' },
                  { name: 'Zapier', desc: 'Automation', connected: false, color: '#ff4a00' },
                ].map((integration) => (
                  <div key={integration.name} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderRadius: '10px',
                    background: '#27272a',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: integration.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: 'white',
                      }}>
                        {integration.name.substring(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '500', color: 'white' }}>{integration.name}</div>
                        <div style={{ fontSize: '13px', color: '#71717a' }}>{integration.desc}</div>
                      </div>
                    </div>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      background: integration.connected ? 'rgba(52, 211, 153, 0.15)' : 'transparent',
                      border: integration.connected ? 'none' : '1px solid #3f3f46',
                      color: integration.connected ? '#34d399' : '#a1a1aa',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}>
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {['billing', 'notifications', 'security'].includes(activeTab) && (
            <div style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '12px',
              padding: '32px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
                {tabs.find(t => t.id === activeTab)?.name} Settings
              </h2>
              <p style={{ color: '#71717a', fontSize: '14px' }}>
                This section is under development.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
