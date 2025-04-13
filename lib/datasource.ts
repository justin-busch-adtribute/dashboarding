import { Hash, Calendar, Type, DollarSign, Link, ToggleLeft } from "lucide-react"
import type { DataType } from "@/types/datasource"
import type React from "react"
import { DATASOURCE_STORAGE_KEY_PREFIX } from "@/data/constants"

// Get icon for data type
export const getDataTypeIcon = (dataType: DataType): React.ReactNode => {
  switch (dataType) {
    case "text":
      return <Type className="h-4 w-4" />
    case "number":
      return <Hash className="h-4 w-4" />
    case "date":
      return <Calendar className="h-4 w-4" />
    case "boolean":
      return <ToggleLeft className="h-4 w-4" />
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
