"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Search } from "lucide-react"
import { type ReactNode, useState } from "react"
import { FilterOption } from "./filter-option"
import type { FilterOption as FilterOptionType } from "@/types"

interface FilterDropdownProps {
  label: string
  icon?: ReactNode
  options: FilterOptionType[]
  selectedValues: string[]
  onToggle: (value: string) => void
}

export function FilterDropdown({ label, icon, options, selectedValues, onToggle }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button variant="outline" size="sm" className="flex items-center">
          {icon}
          {label}
          {selectedValues.length > 0 && ` (${selectedValues.length})`}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="end">
        <div className="p-2 border-b">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${label}`}
              className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredOptions.map((option) => (
            <FilterOption
              key={option.value}
              label={option.label}
              description={option.description}
              icon={option.icon}
              isSelected={selectedValues.includes(option.value)}
              onClick={() => onToggle(option.value)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
