import type { BusinessTypeOption, ReportTypeOption, UseCaseOption, Template } from "@/types"

// Report types
export const reportTypes = ["Ready-Made", "Custom"]

// Business types
export const businessTypes = ["eCommerce", "Leadgen"]

// Use Cases
export const useCases = ["Business Analysis", "Acquisition Analysis", "Retention Analysis", "User Journey Analysis"]

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

// Template data
export const templates: Template[] = [
  {
    id: 1,
    name: "E-commerce Performance Dashboard",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "E-commerce",
    status: "Popular",
    businessType: "eCommerce",
    reportType: "Ready-Made",
    useCase: "Business Analysis",
    createdAt: "2023-10-15",
    screenshots: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    fullDescription:
      "This comprehensive e-commerce dashboard provides a complete view of your online store's performance. Track key metrics like revenue, average order value, conversion rates, and customer acquisition costs. The dashboard includes visualizations for sales trends, product performance, and customer segments.",
    assets: [
      {
        type: "image",
        url: "https://plus.unsplash.com/premium_photo-1739226531311-a684a10ac16e?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      { type: "image", url: "https://cdn.loom.com/sessions/thumbnails/094f6f88413d46fe8856e4c5beace1d8-with-play.gif" },
      {
        type: "video",
        url: "https://www.loom.com/embed/094f6f88413d46fe8856e4c5beace1d8?sid=df5addc4-e7d8-4bea-b5a6-d4f8b810c05a",
      },
    ],
    videoUrl: "https://www.loom.com/embed/094f6f88413d46fe8856e4c5beace1d8?sid=df5addc4-e7d8-4bea-b5a6-d4f8b810c05a",
  },
  {
    id: 2,
    name: "Marketing Campaign Analytics",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Marketing",
    status: "New",
    businessType: "Leadgen",
    reportType: "Custom",
    useCase: "Acquisition Analysis",
    createdAt: "2024-02-20",
    screenshots: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    fullDescription:
      "Gain insights into your marketing campaign performance with this comprehensive analytics template. Track campaign ROI, channel effectiveness, and audience engagement metrics. Compare performance across different campaigns and identify your most effective marketing strategies.",
    assets: [
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "video", url: "https://www.loom.com/embed/1234567890" },
    ],
    videoUrl: "https://www.loom.com/embed/1234567890",
  },
  {
    id: 3,
    name: "Financial Performance Overview",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Finance",
    status: "Featured",
    businessType: "eCommerce",
    reportType: "Ready-Made",
    useCase: "Business Analysis",
    createdAt: "2023-12-05",
    screenshots: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    fullDescription:
      "Get a comprehensive view of your organization's financial health with this executive dashboard. Track revenue streams, expense categories, and profitability metrics over time. The dashboard includes visualizations for budget variance, cash flow, and financial forecasting.",
    assets: [
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "video", url: "https://www.loom.com/embed/1234567890" },
    ],
    videoUrl: "https://www.loom.com/embed/1234567890",
  },
  {
    id: 4,
    name: "Website Traffic Analysis",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Web Analytics",
    status: "Popular",
    // Updated to have both business types
    businessType: ["eCommerce", "Leadgen"],
    reportType: "Ready-Made",
    useCase: "User Journey Analysis",
    createdAt: "2023-11-10",
    screenshots: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    fullDescription:
      "Understand how users interact with your website using this comprehensive traffic analysis dashboard. Track traffic sources, user journeys, and conversion paths. Identify your most effective content and optimize your site for better user engagement and conversion rates.",
    assets: [
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "video", url: "https://www.loom.com/embed/1234567890" },
    ],
    videoUrl: "https://www.loom.com/embed/1234567890",
  },
  {
    id: 5,
    name: "Social Media Performance",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Social Media",
    status: "New",
    businessType: "eCommerce",
    reportType: "Custom",
    useCase: "Acquisition Analysis",
    createdAt: "2024-01-15",
    screenshots: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    fullDescription:
      "Monitor your social media performance across all platforms with this comprehensive dashboard. Track engagement metrics, audience growth, and content performance. Compare results across different platforms and identify your most effective social media strategies.",
    assets: [
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "video", url: "https://www.loom.com/embed/1234567890" },
    ],
    videoUrl: "https://www.loom.com/embed/1234567890",
  },
  {
    id: 6,
    name: "SaaS Metrics Dashboard",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "SaaS",
    status: "Featured",
    businessType: "Leadgen",
    reportType: "Custom",
    useCase: "Retention Analysis",
    createdAt: "2023-09-25",
    screenshots: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    fullDescription:
      "Track all the essential metrics for your SaaS business with this comprehensive dashboard. Monitor monthly recurring revenue (MRR), customer acquisition cost (CAC), churn rate, and customer lifetime value (CLV). The dashboard includes visualizations for growth trends, cohort analysis, and revenue forecasting.",
    assets: [
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "image", url: "/placeholder.svg?height=600&width=800" },
      { type: "video", url: "https://www.loom.com/embed/1234567890" },
    ],
    videoUrl: "https://www.loom.com/embed/1234567890",
  },
]

// Re-export all data from specific files
export * from "./constants"
export * from "./mock/templates"
export * from "./mock/datasource-fields"
export * from "./mock/filter-options"
