"use client"

import type React from "react"
import type { DatasourceField, DataType } from "@/types"
import { Calculator } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FieldListProps {
  fields: DatasourceField[]
  onFieldSelect: (field: DatasourceField) => void
  onFieldUpdate: (updatedField: DatasourceField) => void
  getDataTypeIcon: (dataType: DataType) => React.ReactNode
}

export function FieldList({ fields, onFieldSelect, onFieldUpdate, getDataTypeIcon }: FieldListProps) {
  // Group fields into four categories
  const regularDimensions = fields.filter((field) => field.fieldType === "dimension" && !field.isCalculated)
  const calculatedDimensions = fields.filter((field) => field.fieldType === "dimension" && field.isCalculated)
  const regularMetrics = fields.filter((field) => field.fieldType === "metric" && !field.isCalculated)
  const calculatedMetrics = fields.filter((field) => field.fieldType === "metric" && field.isCalculated)

  // Handle data type change
  const handleDataTypeChange = (field: DatasourceField, dataType: DataType) => {
    onFieldUpdate({
      ...field,
      dataType,
    })
  }

  // Handle field type change
  const handleFieldTypeChange = (field: DatasourceField, fieldType: "dimension" | "metric") => {
    onFieldUpdate({
      ...field,
      fieldType,
    })
  }

  // Render a field row
  const renderFieldRow = (field: DatasourceField) => {
    const isCalculated = field.isCalculated

    return (
      <div key={field.id} className="flex items-center gap-3 py-3 px-4 hover:bg-muted border-b border-gray-100">
        {/* Field information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1.5">
            <div className="font-medium text-base">{field.name}</div>
            <div className="text-xs text-muted-foreground font-mono">({field.key})</div>
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">{field.description}</div>
        </div>

        {/* Calculator icon for calculated fields */}
        <div className="flex-shrink-0 w-10 flex justify-center">
          {isCalculated && (
            <div
              className="w-7 h-7 flex items-center justify-center bg-muted rounded-md cursor-pointer hover:bg-primary/10"
              onClick={() => onFieldSelect(field)}
            >
              <Calculator className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>

        {/* Inline Data Type Select */}
        <div className="w-[140px]">
          <Select value={field.dataType} onValueChange={(value) => handleDataTypeChange(field, value as DataType)}>
            <SelectTrigger className="h-8">
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
        </div>

        {/* Inline Field Type Select */}
        <div className="w-[140px]">
          <Select
            value={field.fieldType}
            onValueChange={(value) => handleFieldTypeChange(field, value as "dimension" | "metric")}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Field Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dimension">Dimension</SelectItem>
              <SelectItem value="metric">Metric</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  // Render a section with title and fields
  const renderSection = (title: string, sectionFields: DatasourceField[]) => {
    if (sectionFields.length === 0) return null

    return (
      <div className="mb-6 bg-white rounded-md overflow-hidden">
        <h3 className="text-sm font-medium text-muted-foreground px-3 py-2 bg-muted/50 border-b">
          {title} ({sectionFields.length})
        </h3>
        <div>{sectionFields.map(renderFieldRow)}</div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto space-y-6 p-1">
      {/* Regular Dimensions section */}
      {renderSection("Dimensions", regularDimensions)}

      {/* Calculated Dimensions section */}
      {renderSection("Calculated Dimensions", calculatedDimensions)}

      {/* Regular Metrics section */}
      {renderSection("Metrics", regularMetrics)}

      {/* Calculated Metrics section */}
      {renderSection("Calculated Metrics", calculatedMetrics)}
    </div>
  )
}
