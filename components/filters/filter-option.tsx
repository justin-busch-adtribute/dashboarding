"use client"

import { Check } from "lucide-react"
import type { ReactNode } from "react"

interface FilterOptionProps {
  label: string
  description: string
  icon?: ReactNode
  isSelected: boolean
  onClick: () => void
}

export function FilterOption({ label, description, icon, isSelected, onClick }: FilterOptionProps) {
  return (
    <div
      className="flex items-start gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-0"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">{label}</div>
          {isSelected && <Check className="h-4 w-4 text-primary" />}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
      </div>
    </div>
  )
}
