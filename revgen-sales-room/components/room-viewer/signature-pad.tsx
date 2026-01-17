'use client'

import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Eraser, Check, PenTool } from 'lucide-react'

interface SignaturePadProps {
  onSign: (signatureData: string) => void
}

export function SignaturePad({ onSign }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const handleClear = () => {
    sigCanvas.current?.clear()
    setIsEmpty(true)
  }

  const handleEnd = () => {
    if (sigCanvas.current) {
      setIsEmpty(sigCanvas.current.isEmpty())
    }
  }

  const handleSign = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL('image/png')
      onSign(signatureData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative border-2 border-dashed border-white/10 rounded-2xl bg-black/30 overflow-hidden hover:border-cyan-500/30 transition-colors">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: 'w-full h-56 cursor-crosshair',
              style: { width: '100%', height: '224px' },
            }}
            backgroundColor="transparent"
            penColor="#00d4ff"
            dotSize={2}
            minWidth={1.5}
            maxWidth={3}
            onEnd={handleEnd}
          />
          
          {/* Signature line */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 flex flex-col items-center gap-2">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-xs text-zinc-600 flex items-center gap-1.5">
              <PenTool className="w-3 h-3" />
              Sign above
            </span>
          </div>

          {/* Empty state hint */}
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center opacity-50">
                <PenTool className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm text-zinc-600">Draw your signature</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleClear}
          disabled={isEmpty}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Eraser className="w-4 h-4" />
          Clear
        </button>

        <button
          onClick={handleSign}
          disabled={isEmpty}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-black shadow-lg shadow-cyan-500/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-cyan-500/40 transition-all"
        >
          <Check className="w-4 h-4" />
          Sign & Accept Agreement
        </button>
      </div>

      <p className="text-xs text-zinc-600 text-center">
        By signing above, you agree to the terms and conditions outlined in this service agreement.
        This constitutes a legally binding electronic signature.
      </p>
    </div>
  )
}
