"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, Settings, ExternalLink, Database } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useReports, type Report } from "@/context/reports-context"
import { DatasourceEditor } from "@/components/datasource-editor"

// Group reports by use case
function groupReportsByUseCase(reports: Report[]) {
  const useCases: Record<string, Report[]> = {}

  reports.forEach((report) => {
    if (!useCases[report.useCase]) {
      useCases[report.useCase] = []
    }
    useCases[report.useCase].push(report)
  })

  return Object.entries(useCases).map(([name, reports]) => ({
    name,
    reports,
  }))
}

export default function ReportViewer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { addedReports, hasReports } = useReports()
  const [isDatasourceEditorOpen, setIsDatasourceEditorOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Group reports by use case
  const useCases = groupReportsByUseCase(addedReports)

  // Flatten all reports for easy lookup
  const allReports = addedReports

  // Get the report ID from URL or use the first available report as default
  const initialReportId = searchParams.get("id") || allReports[0]?.id

  const [currentReportId, setCurrentReportId] = useState(initialReportId)
  const [isLoading, setIsLoading] = useState(hasReports)

  // Find the current report object
  const currentReport = allReports.find((report) => report.id === currentReportId)

  // Find which use case contains the current report
  const currentUseCase = useCases.find((useCase) => useCase.reports.some((report) => report.id === currentReportId))

  // Update currentReportId if the initialReportId changes
  useEffect(() => {
    if (initialReportId) {
      setCurrentReportId(initialReportId)
    }
  }, [initialReportId])

  // Handle loading state
  useEffect(() => {
    if (hasReports) {
      setIsLoading(true)

      // Set a maximum loading time as a fallback
      const maxLoadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 5000)

      return () => {
        clearTimeout(maxLoadingTimer)
      }
    } else {
      setIsLoading(false)
    }
  }, [currentReportId, hasReports])

  // Handle iframe load event
  const handleIframeLoad = () => {
    // Give a small delay to allow the iframe content to render
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleBackToHome = () => {
    router.push("/") // Navigate back to Home
  }

  const handleReportChange = (reportId: string) => {
    setCurrentReportId(reportId)

    // Update the URL without refreshing the page
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set("id", reportId)
    window.history.pushState({}, "", newUrl.toString())
  }

  const handleAddReport = () => {
    router.push("/report-library") // Navigate to the report library
  }

  // Report settings actions
  const handleViewDocumentation = () => {
    window.open("https://intercom.help/example", "_blank")
  }

  const handleOpenInLookerStudio = () => {
    if (currentReport) {
      window.open(`https://lookerstudio.google.com/reporting/${currentReport.id}/page/p_cfho577akd`, "_blank")
    }
  }

  const handleConfigureDatasource = () => {
    setIsDatasourceEditorOpen(true)
  }

  // Empty state when no reports are added
  if (!hasReports) {
    return (
      <div className="flex flex-col h-screen w-full bg-background">
        <header className="flex items-center justify-between p-4 border-b bg-background z-10">
          <div>
            <Button variant="ghost" size="icon" onClick={handleBackToHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">Reports</h1>
          <div className="w-[140px]"></div> {/* Empty div to balance the layout */}
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">No reports added yet</h2>
            <p className="text-muted-foreground mb-8">
              You haven't added any reports to your account. Visit the Report Template Library to add your first report.
            </p>
            <Button onClick={handleAddReport} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Add Your First Report
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      {/* Header with back button and report navigation */}
      <header className="flex items-center justify-between p-4 border-b bg-background z-10">
        {/* Left: Back button */}
        <div>
          <Button variant="ghost" size="icon" onClick={handleBackToHome}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Center: Use Case Dropdown Navigation */}
        <div className="flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
          {useCases.map((useCase) => (
            <div key={useCase.name}>
              {useCase.reports.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md transition-colors ${
                        currentUseCase?.name === useCase.name
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {useCase.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {useCase.reports.map((report) => (
                      <DropdownMenuItem
                        key={report.id}
                        className={`${currentReportId === report.id ? "bg-muted font-medium" : ""} cursor-pointer`}
                        onClick={() => handleReportChange(report.id)}
                      >
                        {report.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
          ))}
        </div>

        {/* Right: Report Settings Dropdown */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Report Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleConfigureDatasource} className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Configure Datasource
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewDocumentation} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Documentation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenInLookerStudio} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Open in Looker Studio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content with iframe - taking full remaining height */}
      <main className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted-foreground">Loading your report...</p>
            </div>
          </div>
        )}
        {currentReport && (
          <iframe
            ref={iframeRef}
            src={`https://lookerstudio.google.com/embed/reporting/${currentReport.id}/page/p_cfho577akd`}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            allowFullScreen
          ></iframe>
        )}
      </main>

      {/* Datasource Editor Modal */}
      {currentReport && (
        <DatasourceEditor
          isOpen={isDatasourceEditorOpen}
          onOpenChange={setIsDatasourceEditorOpen}
          reportId={currentReport.id}
        />
      )}
    </div>
  )
}
