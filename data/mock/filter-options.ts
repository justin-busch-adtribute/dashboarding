import type { BusinessTypeOption, ReportTypeOption, UseCaseOption } from "@/types"

// Use Case options
export const useCaseOptions: UseCaseOption[] = [
  {
    value: "Business Analysis",
    label: "Business Analysis",
    description: "Reports focused on overall business performance, revenue, and profitability metrics.",
    technicalId: "use_case_business_analysis",
  },
  {
    value: "Acquisition Analysis",
    label: "Acquisition Analysis",
    description: "Reports analyzing customer acquisition channels, costs, and conversion rates.",
    technicalId: "use_case_acquisition_analysis",
  },
  {
    value: "Retention Analysis",
    label: "Retention Analysis",
    description: "Reports measuring customer retention, churn rates, and lifetime value.",
    technicalId: "use_case_retention_analysis",
  },
  {
    value: "User Journey Analysis",
    label: "User Journey Analysis",
    description: "Reports tracking user behavior, engagement, and conversion paths.",
    technicalId: "use_case_user_journey_analysis",
  },
]

// Report type options
export const reportTypeOptions: ReportTypeOption[] = [
  {
    value: "Ready-Made",
    label: "Ready-Made",
    description: "Guided setup with pre-defined options. Quick & Easy.",
    technicalId: "report_type_ready_made",
  },
  {
    value: "Custom",
    label: "Custom",
    description: "Allows full flexibility. Usually requires manual report configuration.",
    technicalId: "report_type_custom",
  },
]

// Business type options
export const businessTypeOptions: BusinessTypeOption[] = [
  {
    value: "eCommerce",
    label: "eCommerce",
    description: "For online stores and digital marketplaces. Focuses on sales, conversions, and customer journeys.",
    technicalId: "business_type_ecommerce",
  },
  {
    value: "Leadgen",
    label: "Leadgen",
    description: "For lead generation businesses. Focuses on acquisition, conversion rates, and pipeline metrics.",
    technicalId: "business_type_leadgen",
  },
]
