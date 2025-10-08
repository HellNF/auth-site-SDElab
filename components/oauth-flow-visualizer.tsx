"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import type { OAuthStep } from "@/lib/oauth-simulator"

interface OAuthFlowVisualizerProps {
  steps: OAuthStep[]
  isActive: boolean
}

export function OAuthFlowVisualizer({ steps, isActive }: OAuthFlowVisualizerProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Flusso OAuth 2.0</h3>
          {isActive && (
            <Badge variant="default" className="animate-pulse">
              In corso...
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                {step.status === "completed" ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : step.status === "active" ? (
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-12 mt-2 ${step.status === "completed" ? "bg-primary" : "bg-border"}`} />
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="font-medium">{step.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{step.description}</div>
                {step.status !== "pending" && (
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-2 block">{step.technical}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
