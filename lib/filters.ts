import { Briefcase, Sparkles, Users, Wrench } from "lucide-react"
import type { Template } from "@/types"

// Function to get business type icon
export const getBusinessTypeIcon = (type: string) => {
  return type === "Leadgen" ? "Users" : "Briefcase"
}

// Function to get report type icon
export const getReportTypeIcon = (type: string) => {
  return type === "Dashboard" ? "LayoutDashboard" : "FileText"
}

// Function to get industry icon
export const getIndustryIcon = (industry: string) => {
  return industry === "E-commerce" ? "ShoppingCart" : "Store"
}

// Function to get platform icon
export const getPlatformIcon = (platform: string) => {
  return platform === "Google Analytics" ? "LineChart" : "BarChart"
}

// Function to filter templates based on selected filters
export const filterTemplates = (
  templates: Template[],
  selectedBusinessTypes: string[],
  selectedReportTypes: string[],
  selectedUseCases: string[],
) => {
  return templates.filter((template) => {
    // Business type filter - only filter if there are selected business types
    if (selectedBusinessTypes.length > 0) {
      // Handle template.businessType as either string or array
      const templateBusinessTypes = Array.isArray(template.businessType)
        ? template.businessType
        : [template.businessType]

      // Check if any of the template's business types match any of the selected business types
      if (!templateBusinessTypes.some((type) => selectedBusinessTypes.includes(type))) {
        return false
      }
    }

    // Report type filter - only filter if there are selected report types
    if (selectedReportTypes.length > 0 && !selectedReportTypes.includes(template.reportType)) {
      return false
    }

    // Use Case filter - only filter if there are selected use cases
    if (selectedUseCases.length > 0 && !selectedUseCases.includes(template.useCase)) {
      return false
    }

    return true
  })
}
