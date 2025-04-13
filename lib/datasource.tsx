import { Hash, Calendar, Type, DollarSign, Link, ToggleLeft, CheckSquare, Plus, Minus, Divide } from "lucide-react"
import { DataType } from "@/types/datasource"
import React from "react"
import { DATASOURCE_STORAGE_KEY_PREFIX } from "@/data/constants"

// Get icon for data type
export const getDataTypeIcon = (dataType: string): JSX.Element => {
  switch (dataType) {
    case "text":
      return <Type className="h-4 w-4" />
    case "number":
      return <Hash className="h-4 w-4" />
    case "date":
      return <Calendar className="h-4 w-4" />
    case "boolean":
      return <CheckSquare className="h-4 w-4" />
    case "formula":
      return <Hash className="h-4 w-4" /> // Using Hash instead of Function since it's not available
    case "currency":
      return <DollarSign className="h-4 w-4" />
    case "url":
      return <Link className="h-4 w-4" />
    default:
      return <Type className="h-4 w-4" />
  }
}

// Helper to generate a storage key for a specific report
export const getDatasourceStorageKey = (reportId: string): string => {
  return `${DATASOURCE_STORAGE_KEY_PREFIX}${reportId}`
}

// Function to get aggregation icon
export const getAggregationIcon = (aggregation: string): JSX.Element => {
  switch (aggregation) {
    case "sum":
      return <Plus className="h-4 w-4" />
    case "average":
      return <Divide className="h-4 w-4" />
    case "count":
      return <Hash className="h-4 w-4" />
    case "min":
      return <Minus className="h-4 w-4" />
    case "max":
      return <Plus className="h-4 w-4" />
    default:
      return <Type className="h-4 w-4" />
  }
} 