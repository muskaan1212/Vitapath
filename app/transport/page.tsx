"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Car,
  Train,
  Bike,
  Bus,
  MapPin,
  Clock,
  IndianRupee,
  Star,
  Users,
  Zap,
  Shield,
  Search,
  Navigation,
} from "lucide-react"
import Link from "next/link"

export default function TransportPage() {
  const [selectedTransport, setSelectedTransport] = useState("auto")
  const [fromLocation, setFromLocation] = useState("Bandra West")
  const [toLocation, setToLocation] = useState("")

  const transportOptions = [
    {
      id: "auto",
      name: "Auto Rickshaw",
      icon: Car,
      time: "12-15 min",
      cost: "₹45-60",
      rating: 4.2,
      available: 8,
      features: ["Meter", "GPS Tracking", "Safety Verified"],
      color: "bg-yellow-500",
      description: "Most convenient for short distances",
    },
    {
      id: "metro",
      name: "Mumbai Metro",
      icon: Train,
      time: "18-22 min",
      cost: "₹20-35",
      rating: 4.5,
      available: "Running",
      features: ["AC", "Women's Coach", "Disabled Friendly"],
      color: "bg-blue-500",
      description: "Fast and reliable, avoid rush hours",
    },
    {
      id: "local",
      name: "Local Train",
      icon: Train,
      time: "25-30 min",
      cost: "₹10-15",
      rating: 4.0,
      available: "Running",
      features: ["Ladies Coach", "Handicap Coach", "Fast Local"],
      color: "bg-green-500",
      description: "Cheapest option, can be crowded",
    },
    {
      id: "bus",
      name: "BEST Bus",
      icon: Bus,
      time: "35-45 min",
      cost: "₹15-25",
      rating: 3.8,
      available: 5,
      features: ["AC Available", "Low Floor", "Digital Display"],
      color: "bg-red-500",
      description: "Good for longer routes",
    },
    {
      id: "bike",
      name: "Bike Taxi",
      icon: Bike,
      time: "15-18 min",
      cost: "₹35-45",
      rating: 4.3,
      available: 12,
      features: ["Helmet Provided", "Fast", "Traffic Friendly"],
      color: "bg-purple-500",
      description: "Quick through traffic",
    },
    {
      id: "cab",
      name: "Cab (Ola/Uber)",
      icon: Car,
      time: "20-25 min",
      cost: "₹80-120",
      rating: 4.4,
      available: 6,
      features: ["AC", "GPS", "Safety Features"],
      color: "bg-indigo-500",
      description: "Comfortable but expensive",
    },
  ]

  const liveUpdates = [
    {
      type: "metro",
      message: "Metro Line 1: Normal service, next train in 3 minutes",
      time: "2 min ago",
      status: "good",
    },
    {
      type: "local",
      message: "Western Line: 10 min delay due to signal issue at Dadar",
      time: "5 min ago",
      status: "warning",
    },
    {
      type: "traffic",
      message: "Heavy traffic on SV Road, consider Metro or Local train",
      time: "8 min ago",
      status: "alert",
    },
    {
      type: "auto",
      message: "Auto rickshaw surge pricing active due to rain",
      time: "12 min ago",
      status: "info",
    },
  ]

  const safetyFeatures = [
    "Live GPS tracking for all rides",
    "Emergency SOS button",
    "Driver verification system",
    "Safe route recommendations",
    "Women-only transport options",
    "Real-time family sharing",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "alert":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Transport Hub</h1>
          <Badge variant="secondary" className="ml-auto">
            Mumbai
          </Badge>
        </div>

        {/* Location Input */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input placeholder="From: Current Location" value={fromLocation} className="pl-10" disabled />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-500" />
              <Input
                placeholder="To: Enter destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Find Routes
            </Button>
          </CardContent>
        </Card>

        {/* Live Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Live Transport Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {liveUpdates.map((update, index) => (
              <div key={index} className={`p-3 rounded-lg ${getStatusColor(update.status)}`}>
                <p className="text-sm font-medium">{update.message}</p>
                <p className="text-xs opacity-75">{update.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transport Options */}
        <div className="space-y-3">
          {transportOptions.map((transport) => (
            <Card
              key={transport.id}
              className={`cursor-pointer transition-all ${
                selectedTransport === transport.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
              }`}
              onClick={() => setSelectedTransport(transport.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`${transport.color} p-3 rounded-full`}>
                    <transport.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{transport.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{transport.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{transport.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span>{transport.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3 text-gray-500" />
                        <span>{transport.cost}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span>
                          {typeof transport.available === "number"
                            ? `${transport.available} nearby`
                            : transport.available}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {transport.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Safety Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-700">{feature}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full" size="lg">
            <Navigation className="h-4 w-4 mr-2" />
            Book Now
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <MapPin className="h-4 w-4 mr-2" />
            Share Trip
          </Button>
        </div>

        {/* Popular Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Routes from {fromLocation}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { to: "Andheri East", time: "25 min", cost: "₹35", mode: "Metro" },
              { to: "Colaba", time: "45 min", cost: "₹15", mode: "Local Train" },
              { to: "Powai", time: "30 min", cost: "₹85", mode: "Cab" },
              { to: "Juhu Beach", time: "15 min", cost: "₹40", mode: "Auto" },
            ].map((route, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{route.to}</p>
                  <p className="text-xs text-gray-600">
                    {route.time} • {route.cost} • {route.mode}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Select
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
