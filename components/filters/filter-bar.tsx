"use client"

import { Briefcase, FileText, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterDropdown } from "./filter-dropdown"
import { businessTypeOptions, reportTypeOptions, useCaseOptions } from "@/data/mock/filter-options"

interface FilterBarProps {
  selectedBusinessTypes: string[]
  selectedReportTypes: string[]
  selectedUseCases: string[]
  onBusinessTypeToggle: (type: string) => void
  onReportTypeToggle: (type: string) => void
  onUseCaseToggle: (useCase: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function FilterBar({
  selectedBusinessTypes,
  selectedReportTypes,
  selectedUseCases,
  onBusinessTypeToggle,
  onReportTypeToggle,
  onUseCaseToggle,
  onClearFilters,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="flex gap-2">
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}

      <FilterDropdown
        label="Business Type"
        icon={<Briefcase className="h-4 w-4 mr-2" />}
        options={businessTypeOptions}
        selectedValues={selectedBusinessTypes}
        onToggle={onBusinessTypeToggle}
      />

      <FilterDropdown
        label="Use Case"
        icon={<BarChart className="h-4 w-4 mr-2" />}
        options={useCaseOptions}
        selectedValues={selectedUseCases}
        onToggle={onUseCaseToggle}
      />

      <FilterDropdown
        label="Report Type"
        icon={<FileText className="h-4 w-4 mr-2" />}
        options={reportTypeOptions}
        selectedValues={selectedReportTypes}
        onToggle={onReportTypeToggle}
      />
    </div>
  )
}
