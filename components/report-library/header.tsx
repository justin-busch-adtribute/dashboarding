import { FilterBar } from "@/components/filters/filter-bar"

interface HeaderProps {
  selectedBusinessTypes: string[]
  selectedReportTypes: string[]
  selectedUseCases: string[]
  onBusinessTypeToggle: (type: string) => void
  onReportTypeToggle: (type: string) => void
  onUseCaseToggle: (useCase: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function Header({
  selectedBusinessTypes,
  selectedReportTypes,
  selectedUseCases,
  onBusinessTypeToggle,
  onReportTypeToggle,
  onUseCaseToggle,
  onClearFilters,
  hasActiveFilters,
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b bg-background px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Report Template Library</h1>
        <FilterBar
          selectedBusinessTypes={selectedBusinessTypes}
          selectedReportTypes={selectedReportTypes}
          selectedUseCases={selectedUseCases}
          onBusinessTypeToggle={onBusinessTypeToggle}
          onReportTypeToggle={onReportTypeToggle}
          onUseCaseToggle={onUseCaseToggle}
          onClearFilters={onClearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </header>
  )
}
