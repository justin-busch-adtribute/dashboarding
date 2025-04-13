"use client"

import { useState } from "react"
import { Header } from "@/components/report-library/header"
import { MainContent } from "@/components/report-library/main-content"
import { TemplateModal } from "@/components/report-library/template-modal"
import { filterTemplates } from "@/lib/filters"
import type { Template } from "@/types"
import { templates } from "@/data"

export function ReportLibrary() {
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([])
  const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>([])
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if any filters are active
  const hasActiveFilters =
    selectedBusinessTypes.length > 0 || selectedReportTypes.length > 0 || selectedUseCases.length > 0

  // Filter templates based on selected filters
  const filteredTemplates = filterTemplates(templates, selectedBusinessTypes, selectedReportTypes, selectedUseCases)

  // Handle business type toggle
  const handleBusinessTypeToggle = (type: string) => {
    if (selectedBusinessTypes.includes(type)) {
      setSelectedBusinessTypes(selectedBusinessTypes.filter((t) => t !== type))
    } else {
      setSelectedBusinessTypes([...selectedBusinessTypes, type])
    }
  }

  // Handle report type toggle
  const handleReportTypeToggle = (type: string) => {
    if (selectedReportTypes.includes(type)) {
      setSelectedReportTypes(selectedReportTypes.filter((t) => t !== type))
    } else {
      setSelectedReportTypes([...selectedReportTypes, type])
    }
  }

  // Handle use case toggle
  const handleUseCaseToggle = (useCase: string) => {
    if (selectedUseCases.includes(useCase)) {
      setSelectedUseCases(selectedUseCases.filter((u) => u !== useCase))
    } else {
      setSelectedUseCases([...selectedUseCases, useCase])
    }
  }

  // Handle template click
  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedBusinessTypes([])
    setSelectedReportTypes([])
    setSelectedUseCases([])
  }

  return (
    <>
      <Header
        selectedBusinessTypes={selectedBusinessTypes}
        selectedReportTypes={selectedReportTypes}
        selectedUseCases={selectedUseCases}
        onBusinessTypeToggle={handleBusinessTypeToggle}
        onReportTypeToggle={handleReportTypeToggle}
        onUseCaseToggle={handleUseCaseToggle}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
      <MainContent templates={filteredTemplates} onTemplateClick={handleTemplateClick} onClearFilters={clearFilters} />

      <TemplateModal isOpen={isModalOpen} template={selectedTemplate} onOpenChange={setIsModalOpen} />
    </>
  )
}
