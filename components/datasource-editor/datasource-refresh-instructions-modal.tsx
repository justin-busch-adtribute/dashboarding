"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { useState } from "react"

interface DatasourceRefreshInstructionsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function DatasourceRefreshInstructionsModal({ isOpen, onOpenChange }: DatasourceRefreshInstructionsModalProps) {
  const openLookerStudio = () => {
    window.open("https://lookerstudio.google.com/u/0/datasources/e2e22502-6f56-48f4-8f41-6b43d8950e61", "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Refreshing Your Datasource</DialogTitle>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
            <p className="text-sm">
              Your datasource changes will only be reflected in your report after refreshing your datasource. Follow the steps below.
            </p>
          </div>
        </DialogHeader>

        <div className="my-4">
          <Card className="p-6 border border-muted">
            <ol className="space-y-3 list-decimal pl-5 text-sm">
              <li>
                <strong>Click the button</strong> to open your report datasource in a separate window.
              </li>
              <div className="mb-4">
                <Button
                  onClick={openLookerStudio}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  Open Datasource <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <li>
                Click <strong>"Edit Connection"</strong>
              </li>
              <li>
                Click <strong>"Reconnect"</strong>
              </li>
              <li>
                Confirm your edit by clicking <strong>"Apply"</strong>
              </li>
            </ol>
          </Card>
        </div>

        <DialogFooter className="flex justify-center">
          <Button onClick={() => onOpenChange(false)} className="px-8">
            Confirm Refresh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 