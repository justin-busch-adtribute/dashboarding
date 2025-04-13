import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReportsProvider } from "@/context/reports-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Looker Studio Report Library",
  description: "Browse and use Looker Studio report templates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ReportsProvider>{children}</ReportsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
