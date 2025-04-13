"use client"

import { Button } from "@/components/ui/button"
import type { Template } from "@/types"
import { PieChart } from "lucide-react"
import { TemplateCard } from "./template-card"

interface TemplateGridProps {
  templates: Template[]
  onTemplateClick: (template: Template) => void
  onClearFilters: () => void
}

export function TemplateGrid({ templates, onTemplateClick, onClearFilters }: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No templates found</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Try adjusting your filters to find what you're looking for.
        </p>
        <Button variant="outline" className="mt-4" onClick={onClearFilters}>
          Clear all filters
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} onClick={onTemplateClick} />
      ))}
    </div>
  )
}
