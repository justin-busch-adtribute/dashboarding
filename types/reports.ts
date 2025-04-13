export interface Report {
  id: string
  name: string
  useCase: string
}

export interface ReportsContextType {
  addedReports: Report[]
  addReport: (report: Report) => void
  removeReport: (reportId: string) => void
  hasReports: boolean
}
