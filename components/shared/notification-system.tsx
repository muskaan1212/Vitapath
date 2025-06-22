"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Bell, Shield, Heart, MapPin, ShoppingBag, MessageCircle } from "lucide-react"

interface Notification {
  id: string
  type: "safety" | "health" | "navigation" | "social" | "shopping" | "emergency"
  title: string
  message: string
  timestamp: Date
  urgent: boolean
  actionable: boolean
  action?: () => void
  actionText?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        addNotification(generateRandomNotification())
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const generateRandomNotification = (): Notification => {
    const types = ["safety", "health", "navigation", "social", "shopping"] as const
    const type = types[Math.floor(Math.random() * types.length)]

    const notifications = {
      safety: [
        {
          title: "Safe Route Alert",
          message: "Construction detected on your usual route. Safer alternative suggested.",
        },
        { title: "Emergency Contact Update", message: "Mom shared her location with you." },
        { title: "Safety Zone", message: "You're entering a well-monitored area." },
      ],
      health: [
        { title: "Hydration Reminder", message: "You haven't logged water intake in 2 hours." },
        { title: "Step Goal", message: "You're 500 steps away from your daily goal!" },
        { title: "Sleep Schedule", message: "Consider winding down in 30 minutes for optimal sleep." },
      ],
      navigation: [
        { title: "Traffic Update", message: "Light traffic on your route to the gym." },
        { title: "New Restaurant", message: "Healthy option discovered near your location." },
        { title: "Route Optimization", message: "Faster route available with same safety rating." },
      ],
      social: [
        { title: "Friend Activity", message: "Sarah completed her morning workout." },
        { title: "Community Challenge", message: "Join the weekly step challenge!" },
        { title: "Achievement Shared", message: "Mike reached his weight loss goal." },
      ],
      shopping: [
        { title: "Smart Suggestion", message: "Your protein powder is running low. Reorder?" },
        { title: "Healthy Deal", message: "20% off organic vegetables at nearby store." },
        { title: "Meal Prep", message: "Ingredients for this week's meal plan are available." },
      ],
    }

    const typeNotifications = notifications[type]
    const randomNotification = typeNotifications[Math.floor(Math.random() * typeNotifications.length)]

    return {
      id: Date.now().toString(),
      type,
      title: randomNotification.title,
      message: randomNotification.message,
      timestamp: new Date(),
      urgent: Math.random() > 0.8,
      actionable: Math.random() > 0.5,
      actionText: type === "shopping" ? "View Deal" : type === "navigation" ? "Show Route" : "View Details",
    }
  }

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev.slice(0, 4)])
    setIsVisible(true)

    // Auto-hide non-urgent notifications
    if (!notification.urgent) {
      setTimeout(() => {
        removeNotification(notification.id)
      }, 8000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "safety":
        return Shield
      case "health":
        return Heart
      case "navigation":
        return MapPin
      case "shopping":
        return ShoppingBag
      case "social":
        return MessageCircle
      default:
        return Bell
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "safety":
        return "text-red-500 bg-red-50"
      case "health":
        return "text-green-500 bg-green-50"
      case "navigation":
        return "text-blue-500 bg-blue-50"
      case "shopping":
        return "text-purple-500 bg-purple-50"
      case "social":
        return "text-orange-500 bg-orange-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const Icon = getIcon(notification.type)
        const colorClass = getColor(notification.type)

        return (
          <Card key={notification.id} className={`${colorClass} border shadow-lg animate-slide-in`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    {notification.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.timestamp.toLocaleTimeString()}</p>

                  {notification.actionable && (
                    <Button size="sm" variant="outline" className="mt-2 text-xs">
                      {notification.actionText}
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
