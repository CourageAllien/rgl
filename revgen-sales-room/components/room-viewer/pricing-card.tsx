'use client'

import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  isPopular?: boolean
  ctaText?: string
}

interface PricingCardProps {
  tier: PricingTier
  isSelected: boolean
  onSelect: () => void
}

export function PricingCard({ tier, isSelected, onSelect }: PricingCardProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100)
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 transition-all duration-300 cursor-pointer group',
        tier.isPopular
          ? 'bg-gradient-to-b from-blue-500/10 to-blue-500/5 border-2 border-blue-500/50 shadow-xl shadow-blue-500/10'
          : 'glass border border-zinc-800 hover:border-zinc-700',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950'
      )}
      onClick={onSelect}
    >
      {/* Popular Badge */}
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium shadow-lg">
          <Sparkles className="w-3 h-3" />
          Most Popular
        </div>
      )}

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
        <p className="text-zinc-400 text-sm">{tier.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{formatPrice(tier.price)}</span>
          <span className="text-zinc-500">/month</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <Check className={cn(
              'w-5 h-5 shrink-0 mt-0.5',
              tier.isPopular ? 'text-blue-400' : 'text-emerald-400'
            )} />
            <span className="text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier.isPopular ? 'default' : 'outline'}
        className="w-full"
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        {isSelected ? 'Selected' : tier.ctaText || 'Select Plan'}
      </Button>
    </div>
  )
}
