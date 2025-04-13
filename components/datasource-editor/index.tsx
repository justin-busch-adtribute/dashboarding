"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { datasourceFields, functionSuggestions } from "@/data"
import type { DatasourceField } from "@/types"
import { FieldList } from "./field-list"
import { FieldEditor } from "./field-editor"
import { FormulaEditor } from "./formula-editor"
import { getDataTypeIcon, getDatasourceStorageKey } from "@/lib/datasource"

interface DatasourceEditorProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  reportId: string
}

export function DatasourceEditor({ isOpen, onOpenChange, reportId }: DatasourceEditorProps) {
  // Original fields from the datasource
  const [draftFields, setDraftFields] = useState<DatasourceField[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedField, setSelectedField] = useState<DatasourceField | null>(null)
  const [isAddingField, setIsAddingField] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [initialized, setInitialized] = useState(false)

  // Load fields on mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      // Try to load saved fields from localStorage
      const storageKey = getDatasourceStorageKey(reportId)

      // Use a try-catch block directly here as a fallback
      let fieldsToUse: DatasourceField[]
      try {
        const savedFields = localStorage.getItem(storageKey)
        fieldsToUse = savedFields ? JSON.parse(savedFields) : [...datasourceFields]
      } catch (error) {
        console.error("Failed to parse saved fields:", error)
        fieldsToUse = [...datasourceFields]
      }

      // Set the draft fields
      setDraftFields(fieldsToUse)

      // Reset other state
      setSelectedField(null)
      setIsAddingField(false)
      setSearchQuery("")
      setInitialized(true)
    }
  }, [isOpen, reportId])

  // Reset search focus when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Explicitly blur the search input when the modal opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.blur()
        }
      }, 0)
    }
  }, [isOpen])

  // Filter fields based on search query
  const filteredFields = draftFields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.key.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle field selection - only for calculated fields
  const handleFieldSelect = (field: DatasourceField) => {
    // Only open the editor for calculated fields
    if (field.isCalculated) {
      setSelectedField(field)
      setIsAddingField(false)
    }
  }

  // Handle field update in draft
  const handleFieldUpdate = (updatedField: DatasourceField) => {
    setDraftFields(draftFields.map((field) => (field.id === updatedField.id ? updatedField : field)))
  }

  // Handle adding a new field to draft
  const handleAddField = () => {
    setSelectedField(null)
    setIsAddingField(true)
  }

  // Handle creating a new field in draft
  const handleCreateField = (newField: DatasourceField) => {
    setDraftFields([...draftFields, newField])
    setIsAddingField(false)
  }

  // Handle deleting a field from draft
  const handleDeleteField = useCallback(
    (fieldId: string) => {
      setDraftFields(draftFields.filter((field) => field.id !== fieldId))
      setSelectedField(null)
    },
    [draftFields],
  )

  // Handle saving all changes
  const handleSaveDatasource = () => {
    // Save to localStorage
    const storageKey = getDatasourceStorageKey(reportId)
    try {
      localStorage.setItem(storageKey, JSON.stringify(draftFields))
    } catch (error) {
      console.error("Failed to save fields to localStorage:", error)
    }
    onOpenChange(false)
  }

  // Handle canceling changes
  const handleCancelChanges = () => {
    // Discard all changes by not saving draftFields
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancelChanges}>
      <DialogContent className="max-w-[1200px] w-[95vw] max-h-[85vh] overflow-hidden flex flex-col">
        {!selectedField && !isAddingField && (
          <>
            <DialogHeader className="mb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">Configure Datasource</DialogTitle>
                <div className="flex items-center gap-3 mr-8">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      placeholder="Search fields..."
                      className="pl-8 w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus={false}
                    />
                  </div>
                  <Button onClick={handleAddField} className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add Field
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-auto">
              <FieldList
                fields={filteredFields}
                onFieldSelect={handleFieldSelect}
                onFieldUpdate={handleFieldUpdate}
                getDataTypeIcon={getDataTypeIcon}
              />
            </div>

            <DialogFooter className="flex justify-end items-center mt-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancelChanges}>
                  Cancel
                </Button>
                <Button onClick={handleSaveDatasource}>Save Datasource</Button>
              </div>
            </DialogFooter>
          </>
        )}

        {(selectedField || isAddingField) && (
          <div className="flex-1 overflow-auto p-6">
            {isAddingField ? (
              <FormulaEditor
                fields={draftFields}
                functionSuggestions={functionSuggestions}
                onCancel={() => {
                  setIsAddingField(false)
                }}
                onSave={handleCreateField}
                getDataTypeIcon={getDataTypeIcon}
              />
            ) : selectedField ? (
              <FieldEditor
                field={selectedField}
                allFields={draftFields}
                onCancel={() => {
                  setSelectedField(null)
                }}
                onSave={(updatedField) => {
                  handleFieldUpdate(updatedField)
                  setSelectedField(null)
                }}
                onDelete={handleDeleteField}
                getDataTypeIcon={getDataTypeIcon}
              />
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
