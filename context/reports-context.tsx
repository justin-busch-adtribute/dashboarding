"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Report, ReportsContextType } from "@/types/reports"
import { REPORTS_STORAGE_KEY } from "@/data/constants"

// Create context with default values
const ReportsContext = createContext<ReportsContextType>({
  addedReports: [],
  addReport: () => {},
  removeReport: () => {},
  hasReports: false,
})

// Custom hook to use the reports context
export const useReports = () => useContext(ReportsContext)

// Provider component
export function ReportsProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [addedReports, setAddedReports] = useState<Report[]>([])
  const [initialized, setInitialized] = useState(false)

  // Load reports from localStorage on mount
  useEffect(() => {
    const storedReports = localStorage.getItem(REPORTS_STORAGE_KEY)
    if (storedReports) {
      try {
        setAddedReports(JSON.parse(storedReports))
      } catch (error) {
        console.error("Failed to parse stored reports:", error)
      }
    }
    setInitialized(true)
  }, [])

  // Save reports to localStorage whenever they change
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(addedReports))
    }
  }, [addedReports, initialized])

  // Add a new report
  const addReport = (report: Report) => {
    setAddedReports((prevReports) => {
      // Check if report already exists
      if (prevReports.some((r) => r.id === report.id)) {
        return prevReports
      }
      return [...prevReports, report]
    })
  }

  // Remove a report
  const removeReport = (reportId: string) => {
    setAddedReports((prevReports) => prevReports.filter((report) => report.id !== reportId))
  }

  return (
    <ReportsContext.Provider
      value={{
        addedReports,
        addReport,
        removeReport,
        hasReports: addedReports.length > 0,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}
