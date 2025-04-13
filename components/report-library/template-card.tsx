"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Template } from "@/types"
import Image from "next/image"

interface TemplateCardProps {
  template: Template
  onClick: (template: Template) => void
}

export function TemplateCard({ template, onClick }: TemplateCardProps) {
  // Handle business type as either string or array
  const businessTypes = Array.isArray(template.businessType) ? template.businessType : [template.businessType]

  return (
    <Card
      key={template.id}
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
      onClick={() => onClick(template)}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image src={template.thumbnail || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
      </div>

      <CardContent className="p-4">
        {/* Template name */}
        <h3 className="font-semibold text-base mb-1.5 line-clamp-1">{template.name}</h3>

        {/* Template description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{template.fullDescription}</p>

        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {/* Business Types - show all of them */}
          {businessTypes.map((type) => (
            <Badge key={type} variant="outline" className="bg-gray-50 hover:bg-gray-50 border-0 text-xs">
              {type}
            </Badge>
          ))}

          {/* Use Case */}
          <Badge variant="outline" className="bg-gray-50 hover:bg-gray-50 border-0 text-xs">
            {template.useCase}
          </Badge>

          {/* Report Type */}
          <Badge variant="outline" className="bg-gray-50 hover:bg-gray-50 border-0 text-xs">
            {template.reportType}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
