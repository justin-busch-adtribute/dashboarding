import { Hash, Calendar, Type, DollarSign, Link, ToggleLeft } from "lucide-react"
import type { DataType } from "@/types/datasource"
import type React from "react"
import { DATASOURCE_STORAGE_KEY_PREFIX } from "@/data/constants"

// Get icon for data type
export const getDataTypeIcon = (dataType: string) => {
  switch (dataType) {
    case "text":
      return "Type"
    case "number":
      return "Hash"
    case "date":
      return "Calendar"
    case "boolean":
      return "CheckSquare"
    case "formula":
      return "Function"
    default:
      return "Type"
  }
}

// Helper to generate a storage key for a specific report
export const getDatasourceStorageKey = (reportId: string): string => {
  return `${DATASOURCE_STORAGE_KEY_PREFIX}${reportId}`
}

// Function to get aggregation icon
export const getAggregationIcon = (aggregation: string) => {
  switch (aggregation) {
    case "sum":
      return "Plus"
    case "average":
      return "Divide"
    case "count":
      return "Hash"
    case "min":
      return "Minus"
    case "max":
      return "Plus"
    default:
      return "Type"
  }
}
