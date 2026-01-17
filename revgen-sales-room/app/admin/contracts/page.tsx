'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  FileText,
  Edit2,
  Trash2,
  Copy,
  Check,
  Star,
  Eye,
} from 'lucide-react'

// Mock contract templates
const templates = [
  {
    id: '1',
    name: 'Standard Monthly',
    description: 'Default monthly service agreement for all packages',
    isDefault: true,
    lastUpdated: '2026-01-10',
    usageCount: 28,
  },
  {
    id: '2',
    name: 'Annual Commitment',
    description: 'Annual contract with 15% discount terms',
    isDefault: false,
    lastUpdated: '2026-01-05',
    usageCount: 12,
  },
  {
    id: '3',
    name: 'Enterprise Custom',
    description: 'Extended terms for enterprise clients with SLA',
    isDefault: false,
    lastUpdated: '2025-12-20',
    usageCount: 5,
  },
  {
    id: '4',
    name: 'Pilot Program',
    description: '30-day trial agreement with reduced commitment',
    isDefault: false,
    lastUpdated: '2025-12-15',
    usageCount: 8,
  },
]

export default function ContractsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Contract Templates</h1>
          <p className="text-zinc-400">Manage your agreement templates and terms</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
        >
          <Plus className="w-5 h-5" />
          New Template
        </motion.button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl border p-6 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'bg-cyan-500/10 border-cyan-500/30'
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {/* Default Badge */}
            {template.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                <Star className="w-3 h-3" />
                Default
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 flex-shrink-0">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">{template.description}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>Updated {template.lastUpdated}</span>
                  <span>•</span>
                  <span>Used {template.usageCount} times</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Template Preview */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Template Preview</h2>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-white/5 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-colors flex items-center gap-2">
                <Check className="w-4 h-4" />
                Set as Default
              </button>
            </div>
          </div>
          <div className="p-8 max-h-96 overflow-y-auto">
            <div className="prose prose-invert prose-sm max-w-none">
              <h1 className="text-2xl font-bold text-white mb-6">Service Agreement</h1>
              
              <p className="text-zinc-300">
                This Service Agreement ("Agreement") is entered into between <strong className="text-white">RevGen Labs, LLC</strong> ("Provider") 
                and <strong className="text-cyan-400">{'{{company_name}}'}</strong> ("Client"), represented by {'{{contact_name}}'}.
              </p>

              <h2 className="text-lg font-semibold text-white mt-8 mb-3">1. Services</h2>
              <p className="text-zinc-300">
                Provider agrees to provide the <strong className="text-cyan-400">{'{{package_name}}'}</strong> as described in the proposal, 
                including all features and deliverables outlined therein.
              </p>

              <h2 className="text-lg font-semibold text-white mt-8 mb-3">2. Pricing & Payment</h2>
              <p className="text-zinc-300">
                Client agrees to pay <strong className="text-cyan-400">{'{{price}}'}/month</strong>, 
                billed {'{{payment_terms}}'}. Payment is due upon signing this agreement.
              </p>

              <h2 className="text-lg font-semibold text-white mt-8 mb-3">3. Term</h2>
              <p className="text-zinc-300">
                This agreement shall commence upon payment and continue for an initial term of three (3) months, 
                after which it will continue on a month-to-month basis with 30 days written notice for cancellation.
              </p>

              <h2 className="text-lg font-semibold text-white mt-8 mb-3">4. Confidentiality</h2>
              <p className="text-zinc-300">
                Both parties agree to maintain the confidentiality of any proprietary information shared during the course of this engagement.
              </p>

              <h2 className="text-lg font-semibold text-white mt-8 mb-3">5. Limitation of Liability</h2>
              <p className="text-zinc-300">
                Provider's liability shall be limited to the amount paid by Client for services in the three months preceding any claim.
              </p>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-zinc-400 text-sm mb-4">Merge Fields Available:</p>
                <div className="flex flex-wrap gap-2">
                  {['{{company_name}}', '{{contact_name}}', '{{package_name}}', '{{price}}', '{{payment_terms}}', '{{start_date}}'].map((field) => (
                    <span key={field} className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
