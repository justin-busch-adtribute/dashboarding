import type { Template } from "@/types"

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

// Mapping of template IDs to dummy report IDs for the report-viewer
export const templateToReportIdMap: Record<number, string> = {
  1: "9a6e6f78-bc06-4f16-820e-3d8b61b5bed3", // E-commerce Performance Dashboard
  2: "25a1e9d1-5ea1-4593-8c34-9adc44a4ea95", // Marketing Campaign Analytics
  3: "7c8b9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e", // Financial Performance Overview
  4: "3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b", // Website Traffic Analysis
  5: "9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d", // Social Media Performance
  6: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", // SaaS Metrics Dashboard
}
