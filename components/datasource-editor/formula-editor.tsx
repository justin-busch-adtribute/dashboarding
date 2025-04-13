"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calculator, ChevronDown, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DatasourceField, DataType, FunctionSuggestion } from "@/types"
import { Badge } from "@/components/ui/badge"

interface FormulaEditorProps {
  fields: DatasourceField[]
  functionSuggestions: FunctionSuggestion[]
  onCancel: () => void
  onSave: (field: DatasourceField) => void
  getDataTypeIcon: (dataType: DataType) => React.ReactNode
}

export function FormulaEditor({ fields, functionSuggestions, onCancel, onSave, getDataTypeIcon }: FormulaEditorProps) {
  const [newField, setNewField] = useState<Partial<DatasourceField>>({
    name: "",
    key: "",
    dataType: "text",
    fieldType: "dimension",
    description: "",
    isCalculated: true,
    source: "calculated",
    formula: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
  const formulaInputRef = useRef<HTMLTextAreaElement>(null)

  // Focus name input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  // Focus description input when editing starts
  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus()
    }
  }, [isEditingDescription])

  const handleChange = (key: keyof DatasourceField, value: any) => {
    setNewField({ ...newField, [key]: value })

    // Auto-generate key from name if name changes
    if (key === "name") {
      const generatedKey = value
        .toLowerCase()
        .replace(/[^a-z0-9_\s]/g, "")
        .replace(/\s+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
      setNewField((prev) => ({ ...prev, key: generatedKey }))
    }
  }

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false)
  }

  const handleSave = () => {
    if (!newField.name || !newField.formula) {
      return // Basic validation
    }

    onSave({
      id: `calc_${Date.now()}`,
      name: newField.name,
      key: newField.key || "",
      dataType: (newField.dataType as DataType) || "text",
      fieldType: (newField.fieldType as "dimension" | "metric") || "dimension",
      description: newField.description || "",
      isCalculated: true,
      source: "calculated",
      formula: newField.formula || "",
    })
  }

  const handleInsertField = (fieldToInsert: DatasourceField) => {
    if (formulaInputRef.current) {
      const cursorPosition = formulaInputRef.current.selectionStart || 0
      const currentValue = newField.formula || ""
      const newValue =
        currentValue.substring(0, cursorPosition) + fieldToInsert.key + currentValue.substring(cursorPosition)

      handleChange("formula", newValue)

      // Focus back on the formula input after insertion
      setTimeout(() => {
        if (formulaInputRef.current) {
          formulaInputRef.current.focus()
          formulaInputRef.current.selectionStart = formulaInputRef.current.selectionEnd =
            cursorPosition + fieldToInsert.key.length
        }
      }, 0)
    }
  }

  const handleInsertFunction = (func: FunctionSuggestion) => {
    if (formulaInputRef.current) {
      const cursorPosition = formulaInputRef.current.selectionStart || 0
      const currentValue = newField.formula || ""
      const functionText = `${func.name}()`
      const newValue = currentValue.substring(0, cursorPosition) + functionText + currentValue.substring(cursorPosition)

      handleChange("formula", newValue)

      // Focus back on the formula input and place cursor inside the parentheses
      setTimeout(() => {
        if (formulaInputRef.current) {
          formulaInputRef.current.focus()
          const newCursorPosition = cursorPosition + functionText.length - 1
          formulaInputRef.current.selectionStart = formulaInputRef.current.selectionEnd = newCursorPosition
        }
      }, 0)
    }
  }

  // Filter fields based on search query
  const filteredFields = fields.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.key.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter functions based on search query
  const filteredFunctions = functionSuggestions.filter(
    (func) =>
      func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group functions by category
  const groupedFunctions: Record<string, FunctionSuggestion[]> = {}
  filteredFunctions.forEach((func) => {
    if (!groupedFunctions[func.category]) {
      groupedFunctions[func.category] = []
    }
    groupedFunctions[func.category].push(func)
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-md">
            <Calculator className="h-4 w-4 text-primary" />
          </div>
        </div>

        <div className="flex-1">
          {/* Field name input */}
          <div className="flex items-center justify-between">
            <Input
              ref={nameInputRef}
              value={newField.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter field name"
              className="text-xl font-medium mb-1 border-none px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />

            {/* Data Type and Field Type selectors */}
            <div className="flex items-center gap-2">
              <Select value={newField.dataType as string} onValueChange={(value) => handleChange("dataType", value)}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Data Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      {getDataTypeIcon("text")}
                      <span>Text</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="number">
                    <div className="flex items-center gap-2">
                      {getDataTypeIcon("number")}
                      <span>Number</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="date">
                    <div className="flex items-center gap-2">
                      {getDataTypeIcon("date")}
                      <span>Date</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="boolean">
                    <div className="flex items-center gap-2">
                      {getDataTypeIcon("boolean")}
                      <span>Boolean</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="currency">
                    <div className="flex items-center gap-2">
                      {getDataTypeIcon("currency")}
                      <span>Currency</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="url">
                    <div className="flex items-center gap-2">
                      {getDataTypeIcon("url")}
                      <span>URL</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={newField.fieldType as string}
                onValueChange={(value: "dimension" | "metric") => handleChange("fieldType", value)}
              >
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Field Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dimension">Dimension</SelectItem>
                  <SelectItem value="metric">Metric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Field key (auto-generated, display only) */}
          <div className="flex items-center gap-2 mb-2">
            <div className="text-sm text-muted-foreground font-mono">({newField.key})</div>
            <Badge variant="outline" className="h-5 text-xs">
              Calculated Field
            </Badge>
          </div>

          {/* Editable description */}
          {isEditingDescription ? (
            <Textarea
              ref={descriptionInputRef}
              value={newField.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={handleDescriptionBlur}
              className="text-sm text-muted-foreground min-h-[60px]"
            />
          ) : (
            <p
              className="text-sm text-muted-foreground cursor-text hover:bg-muted/30 px-2 py-1 -ml-2 rounded"
              onClick={() => setIsEditingDescription(true)}
            >
              {newField.description || "Add a description..."}
            </p>
          )}
        </div>
      </div>

      {/* Formula section */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Formula</div>
          <div className="flex items-center gap-2">
            {/* Fields dropdown */}
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Fields
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[350px] p-0"
                align="end"
                sideOffset={5}
              >
                <div className="flex flex-col h-[400px]">
                  <div className="border-b bg-white p-2">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md border">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search fields"
                        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    {filteredFields.length === 0 ? (
                      <div className="p-3 text-center text-muted-foreground">No fields found</div>
                    ) : (
                      filteredFields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-start gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-0"
                          onClick={() => handleInsertField(field)}
                        >
                          <div className="flex-shrink-0 mt-1">{getDataTypeIcon(field.dataType)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{field.name}</div>
                            </div>
                            <div className="text-xs text-muted-foreground font-mono mt-1">{field.key}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>

            {/* Functions dropdown */}
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Functions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[350px] p-0"
                align="end"
                sideOffset={5}
              >
                <div className="flex flex-col h-[400px]">
                  <div className="border-b bg-white p-2">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md border">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search functions"
                        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    {Object.entries(groupedFunctions).length === 0 ? (
                      <div className="p-3 text-center text-muted-foreground">No functions found</div>
                    ) : (
                      Object.entries(groupedFunctions).map(([category, functions]) => (
                        <div key={category}>
                          <div className="text-xs font-medium text-muted-foreground px-3 py-1 bg-muted/50 sticky top-0 z-10">
                            {category}
                          </div>
                          {functions.map((func) => (
                            <div
                              key={func.name}
                              className="flex flex-col p-3 hover:bg-muted cursor-pointer border-b last:border-0"
                              onClick={() => handleInsertFunction(func)}
                            >
                              <div className="font-medium">{func.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{func.description}</div>
                              <div className="text-xs font-mono mt-1 text-muted-foreground">{func.syntax}</div>
                            </div>
                          ))}
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Formula textarea */}
        <Textarea
          ref={formulaInputRef}
          value={newField.formula || ""}
          onChange={(e) => handleChange("formula", e.target.value)}
          className="flex-1 min-h-[200px] font-mono text-sm"
          placeholder="Enter formula..."
        />
        <p className="text-xs text-muted-foreground mt-1">Use Looker Studio functions to create a calculated field.</p>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!newField.name || !newField.formula}>
          Save Field
        </Button>
      </div>
    </div>
  )
}
