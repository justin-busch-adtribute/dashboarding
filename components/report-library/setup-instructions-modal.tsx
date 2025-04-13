"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import type { Template } from "@/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useReports } from "@/context/reports-context"
import { templateToReportIdMap } from "@/data"

interface SetupInstructionsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  template: Template | null
}

export function SetupInstructionsModal({ isOpen, onOpenChange, template }: SetupInstructionsModalProps) {
  const router = useRouter()
  const { addReport } = useReports()
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [validationSuccess, setValidationSuccess] = useState<boolean>(false)
  const [clickCount, setClickCount] = useState(0)

  if (!template) return null

  const handleValidate = () => {
    setIsValidating(true)
    setValidationError(null)
    setValidationSuccess(false)
    setClickCount((prevCount) => prevCount + 1)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsValidating(false)

      // Toggle between failure and success based on click count
      // First click (odd counts) shows failure, even counts show success
      if (clickCount % 2 === 0) {
        setValidationError(
          "Validation failed: We couldn't find a shared report with the correct permissions. Please make sure you've completed all the steps above and try again.",
        )
      } else {
        setValidationSuccess(true)

        // Get the report ID for this template
        const reportId = templateToReportIdMap[template.id] || "default-report-id"

        // Add the report to our context
        addReport({
          id: reportId,
          name: template.name,
          useCase: template.useCase,
        })

        // Redirect to report viewer page after a short delay
        setTimeout(() => {
          onOpenChange(false) // Close the modal

          // Navigate to the report viewer with the template's report ID
          router.push(`/report-viewer?id=${reportId}`)
        }, 1500)
      }
    }, 1500)
  }

  const openLookerStudio = () => {
    window.open("https://lookerstudio.google.com", "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Completing Your Report Setup</DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <Card className="p-6 border border-muted">
            <ol className="space-y-3 list-decimal pl-5 text-sm">
              <li>
                <strong>Click the button</strong> to open the report in a separate window.
              </li>
              <div className="mb-4">
                <Button
                  onClick={openLookerStudio}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  Open Looker Studio <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <li>
                If prompted, <strong>log into your Google Account.</strong>
              </li>
              <li>
                <strong>Authorize</strong> the 'adtribute Data Connector' when asked.
              </li>
              <li>
                Click the <strong>"Edit and share"</strong> button in Looker Studio to save your report copy.
              </li>
              <li>
                Click the <strong>"Share"</strong> button (top right).
              </li>
              <li>
                Enter <code className="bg-muted px-1.5 py-0.5 rounded text-xs">business@example.com</code> and set
                permission to <strong>"Editor"</strong>. Click "Save".
              </li>
              <li>
                Once you have shared the report click the <strong>"Validate Report Setup"</strong> button below.
              </li>
            </ol>
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>Note:</strong> The report won't show data until it is successfully validated using the button
              below. Initial loading of data may take up to 10 minutes.
            </div>
          </Card>
        </div>

        {validationError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            <p className="font-medium">Error</p>
            <p>{validationError}</p>
          </div>
        )}

        {validationSuccess && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            <p className="font-medium">Success!</p>
            <p>
              Your report has been successfully validated and connected. You will be redirected to your report in a
              moment...
            </p>
          </div>
        )}

        <DialogFooter className="flex justify-center">
          <Button onClick={handleValidate} className="px-8" disabled={isValidating || validationSuccess}>
            {isValidating ? "Validating..." : "Validate Report Setup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
