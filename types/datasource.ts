export type DataType = "text" | "number" | "date" | "boolean" | "currency" | "url"
export type FieldType = "dimension" | "metric"

export interface DatasourceField {
  id: string
  name: string
  key: string
  dataType: DataType
  fieldType: FieldType
  description: string
  isCalculated: boolean
  source: "underlying" | "calculated"
  formula?: string
}

export interface FunctionSuggestion {
  name: string
  description: string
  syntax: string
  category: string
}