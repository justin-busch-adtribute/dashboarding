import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
