import type React from "react"
import "@/app/globals.css"
import { ReportsProvider } from "@/context/reports-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboarding",
  description: "Dashboarding application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ReportsProvider>
          {children}
        </ReportsProvider>
      </body>
    </html>
  )
}
