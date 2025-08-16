"use client"

import type React from "react"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Lightbox({ isOpen, onClose, children }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Content */}
      <div className="relative z-10 max-w-[95vw] max-h-[95vh] flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>

        {children}
      </div>
    </div>
  )
}
