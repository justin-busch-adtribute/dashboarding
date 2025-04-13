"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Template } from "@/types"
import { SetupInstructionsModal } from "./setup-instructions-modal"
import { useState } from "react"

interface TemplateModalProps {
  isOpen: boolean
  template: Template | null
  onOpenChange: (open: boolean) => void
}

export function TemplateModal({ isOpen, template, onOpenChange }: TemplateModalProps) {
  const [showSetupInstructions, setShowSetupInstructions] = useState(false)

  if (!template) return null

  const handleUseTemplate = () => {
    // Close the current modal
    onOpenChange(false)

    // Show the setup instructions modal
    setShowSetupInstructions(true)
  }

  // Handle business type as either string or array
  const businessTypes = Array.isArray(template.businessType) ? template.businessType : [template.businessType]

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[67.5vw] w-[810px] p-6 pr-8 max-h-[85vh]">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl">{template.name}</DialogTitle>
            <DialogDescription className="mt-2 text-base">{template.fullDescription}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1">
            {/* Video container with controlled dimensions */}
            <div className="pb-5">
              <div className="w-full max-w-full mx-auto">
                <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src={template.videoUrl || "https://www.loom.com/embed/094f6f88413d46fe8856e4c5beace1d8"}
                    frameBorder="0"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Tags section with improved styling */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Template Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Business Type - supports multiple values */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Business Type</span>
                  <div className="flex flex-wrap gap-2">
                    {businessTypes.map((type) => (
                      <Badge key={type} variant="outline" className="bg-white border-gray-200">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Use Case */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Use Case</span>
                  <Badge variant="outline" className="bg-white border-gray-200 w-fit">
                    {template.useCase}
                  </Badge>
                </div>

                {/* Report Type */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Report Type</span>
                  <Badge variant="outline" className="bg-white border-gray-200 w-fit">
                    {template.reportType}
                  </Badge>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="mt-4">
            <Separator className="mb-4" />
            <DialogFooter className="flex justify-end">
              <div className="flex gap-3">
                <Button variant="outline">View Documentation</Button>
                <Button onClick={handleUseTemplate}>Use This Template</Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <SetupInstructionsModal
        isOpen={showSetupInstructions}
        onOpenChange={setShowSetupInstructions}
        template={template}
      />
    </>
  )
}
