"use client"

import * as React from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const lineData = [
  { time: "00:00", requests: 5 },
  { time: "01:00", requests: 9 },
  { time: "02:00", requests: 7 },
  { time: "03:00", requests: 14 },
  { time: "04:00", requests: 11 },
  { time: "05:00", requests: 18 },
]

const pieData = [
  { name: "Google", value: 45 },
  { name: "Microsoft", value: 25 },
  { name: "GitHub", value: 20 },
  { name: "Okta", value: 10 },
]

const COLORS = ["#7c3aed", "#06b6d4", "#f97316", "#10b981"]

type Props = {
  className?: string
  /**
   * 'chart' (default) renders the small Recharts examples.
   * 'image' renders an illustrative image (gif/png) from /public/images via the `image` prop.
   */
  variant?: "chart" | "image"
  /** filename under /public/images/, e.g. 'oauth-flow.png' */
  image?: string
  alt?: string
  /**
   * size for image variant. Defaults to 'large' to render larger diagrams.
   * - 'small' -> h-44 / md:h-56 (legacy)
   * - 'medium' -> h-56 / md:h-72
   * - 'large' -> h-72 / md:h-96
   */
  imageSize?: "small" | "medium" | "large"
}

export default function ConceptCharts({ className = "", variant = "chart", image, alt = "", imageSize = "large" }: Props) {
  // map imageSize -> tailwind height classes
  const sizeClass = imageSize === "small" ? "h-44 md:h-56" : imageSize === "medium" ? "h-56 md:h-72" : "h-72 md:h-96"

  if (variant === "image" && image) {
    return (
      <div className={`w-full ${className}`}>
        <div className={`${sizeClass} w-full flex items-center justify-center`}>
          {/* simple responsive image fallback — place assets in public/images/ */}
          <img
            src={`/images/${image}`}
            alt={alt || image}
            className="max-w-full h-full object-contain rounded-md shadow-sm border border-border"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div className="h-44">
        <ChartContainer id="line-tokens" config={{ requests: { color: "#7c3aed" } }}>
          <ResponsiveContainer>
            <LineChart data={lineData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-border-opacity, 1)" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip />
              <Line type="monotone" dataKey="requests" stroke="#7c3aed" strokeWidth={3} dot={{ r: 3 }} animationDuration={800} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="h-44 flex items-center justify-center">
        <ChartContainer id="pie-providers" config={{ providers: { color: "#06b6d4" } }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={28} outerRadius={48} paddingAngle={4} animationDuration={900}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
