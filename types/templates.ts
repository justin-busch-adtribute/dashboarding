import type { ReactNode } from "react"

export type Asset = {
  type: "image" | "video"
  url: string
}

export type ReportTypeOption = {
  value: string
  label: string
  icon?: ReactNode
  description: string
  technicalId: string
}

export type BusinessTypeOption = {
  value: string
  label: string
  icon?: ReactNode
  description: string
  technicalId: string
}

export type UseCaseOption = {
  value: string
  label: string
  description: string
  technicalId: string
}

export type FilterOption = {
  value: string
  label: string
  icon?: ReactNode
  description: string
}

export type Template = {
  id: number
  name: string
  thumbnail: string
  category: string
  status: string
  businessType: string | string[] // Allow for single string or array of strings
  reportType: string
  useCase: string
  createdAt: string
  screenshots: string[]
  fullDescription: string
  assets: Asset[]
  videoUrl?: string
}
