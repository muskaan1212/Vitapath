"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, TrendingUp, Target, AlertCircle, CheckCircle } from "lucide-react"

interface AIInsight {
  id: string
  category: "health" | "safety" | "lifestyle" | "optimization"
  title: string
  description: string
  confidence: number
  actionable: boolean
  implemented?: boolean
}

interface AIRecommendation {
  id: string
  type: "route" | "meal" | "exercise" | "safety" | "shopping"
  title: string
  description: string
  priority: "low" | "medium" | "high"
  estimatedBenefit: string
}

export function AIIntegration() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    generateInsights()
    generateRecommendations()

    // Update insights periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        generateInsights()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const generateInsights = () => {
    const newInsights: AIInsight[] = [
      {
        id: "1",
        category: "health",
        title: "Sleep Pattern Optimization",
        description: "Your sleep quality improved 15% when you went to bed before 10 PM",
        confidence: 87,
        actionable: true,
      },
      {
        id: "2",
        category: "safety",
        title: "Route Safety Analysis",
        description: "Your usual evening route has 23% higher safety rating than morning route",
        confidence: 92,
        actionable: true,
      },
      {
        id: "3",
        category: "lifestyle",
        title: "Shopping Pattern",
        description: "You save 18% more when shopping between 2-4 PM on weekdays",
        confidence: 78,
        actionable: true,
      },
      {
        id: "4",
        category: "optimization",
        title: "Workout Timing",
        description: "Your performance is 12% better during afternoon workouts",
        confidence: 85,
        actionable: true,
      },
    ]

    setInsights(newInsights)
  }

  const generateRecommendations = () => {
    const newRecommendations: AIRecommendation[] = [
      {
        id: "1",
        type: "route",
        title: "Alternative Safe Route",
        description: "New route discovered with 8% better safety rating and 3 minutes faster",
        priority: "high",
        estimatedBenefit: "Safer & Faster",
      },
      {
        id: "2",
        type: "meal",
        title: "Protein Optimization",
        description: "Add 15g protein to breakfast to meet daily goals more efficiently",
        priority: "medium",
        estimatedBenefit: "Better Nutrition",
      },
      {
        id: "3",
        type: "exercise",
        title: "Recovery Day Suggestion",
        description: "Based on your activity, consider light yoga instead of cardio today",
        priority: "medium",
        estimatedBenefit: "Better Recovery",
      },
      {
        id: "4",
        type: "shopping",
        title: "Smart Reorder",
        description: "Your multivitamins will run out in 3 days. Best price available now",
        priority: "low",
        estimatedBenefit: "Cost Savings",
      },
    ]

    setRecommendations(newRecommendations)
  }

  const implementRecommendation = (id: string) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, priority: "low" as const } : rec)))

    // Add to insights as implemented
    const recommendation = recommendations.find((r) => r.id === id)
    if (recommendation) {
      const newInsight: AIInsight = {
        id: Date.now().toString(),
        category: "optimization",
        title: `Implemented: ${recommendation.title}`,
        description: `You successfully implemented the AI recommendation for ${recommendation.type}`,
        confidence: 100,
        actionable: false,
        implemented: true,
      }
      setInsights((prev) => [newInsight, ...prev.slice(0, 3)])
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "health":
        return TrendingUp
      case "safety":
        return AlertCircle
      case "lifestyle":
        return Target
      case "optimization":
        return CheckCircle
      default:
        return Brain
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health":
        return "text-green-600 bg-green-50"
      case "safety":
        return "text-red-600 bg-red-50"
      case "lifestyle":
        return "text-purple-600 bg-purple-50"
      case "optimization":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Insights
            <Badge variant="secondary" className="ml-auto">
              Powered by Gemini
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight) => {
            const Icon = getCategoryIcon(insight.category)
            const colorClass = getCategoryColor(insight.category)

            return (
              <div key={insight.id} className={`p-3 rounded-lg ${colorClass}`}>
                <div className="flex items-start gap-3">
                  <Icon className="h-4 w-4 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{insight.title}</p>
                      {insight.implemented && (
                        <Badge variant="default" className="text-xs">
                          Implemented
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-current rounded-full"></div>
                        <span className="text-xs">{insight.confidence}% confidence</span>
                      </div>
                      {insight.actionable && !insight.implemented && (
                        <Button size="sm" variant="outline" className="text-xs h-6">
                          Apply
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{recommendation.title}</p>
                    <Badge className={getPriorityColor(recommendation.priority)}>{recommendation.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {recommendation.estimatedBenefit}
                    </Badge>
                    <span className="text-xs text-gray-500 capitalize">{recommendation.type}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full mt-2" onClick={() => implementRecommendation(recommendation.id)}>
                Implement Suggestion
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
