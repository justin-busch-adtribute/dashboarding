import type { Template } from "@/types"
import { TemplateGrid } from "./template-grid"

interface MainContentProps {
  templates: Template[]
  onTemplateClick: (template: Template) => void
  onClearFilters: () => void
}

export function MainContent({ templates, onTemplateClick, onClearFilters }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="h-full flex flex-col">
        <div className="p-6 overflow-auto flex-1">
          <TemplateGrid templates={templates} onTemplateClick={onTemplateClick} onClearFilters={onClearFilters} />
        </div>
      </div>
    </main>
  )
}
