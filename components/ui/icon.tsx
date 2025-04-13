import { Users, Briefcase, LayoutDashboard, FileText, ShoppingCart, Store, LineChart, BarChart } from "lucide-react"

interface IconProps {
  name: string
  className?: string
}

export function Icon({ name, className = "h-3 w-3" }: IconProps) {
  const icons = {
    Users,
    Briefcase,
    LayoutDashboard,
    FileText,
    ShoppingCart,
    Store,
    LineChart,
    BarChart,
  }

  const IconComponent = icons[name as keyof typeof icons]
  return IconComponent ? <IconComponent className={className} /> : null
} 