"use client"

import { BookOpen, Home, LayoutDashboard, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="h-screen w-[280px] border-r bg-gray-50 flex flex-col">
      <div className="h-14 border-b flex items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-6 w-6" />
          <span>Looker Studio</span>
        </Link>
      </div>

      <div className="flex-1 py-4 px-2 overflow-auto">
        <nav className="space-y-1">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
              pathname === "/" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            href="/report-viewer"
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
              pathname === "/report-viewer" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Reports</span>
          </Link>
        </nav>
      </div>

      <div className="border-t p-2">
        <Link
          href="/report-library"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            pathname === "/report-library" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Report Library</span>
        </Link>
      </div>
    </div>
  )
}
