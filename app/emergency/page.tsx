"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  AlertTriangle,
  Phone,
  MapPin,
  Volume2,
  Mic,
  Shield,
  Users,
  ArrowLeft,
  Heart,
  Siren,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const [panicMode, setPanicMode] = useState(false)
  const [locationSharing, setLocationSharing] = useState(true)
  const [voiceActivation, setVoiceActivation] = useState(false)
  const [noiseGeneration, setNoiseGeneration] = useState(false)
  const [emergencyTimer, setEmergencyTimer] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (panicMode) {
      interval = setInterval(() => {
        setEmergencyTimer((prev) => prev + 1)
      }, 1000)
    } else {
      setEmergencyTimer(0)
    }
    return () => clearInterval(interval)
  }, [panicMode])

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", type: "emergency", icon: Phone },
    { name: "Mom", number: "+1 234-567-8901", type: "family", icon: Heart },
    { name: "Dad", number: "+1 234-567-8902", type: "family", icon: Heart },
    { name: "Best Friend", number: "+1 234-567-8903", type: "friend", icon: Users },
    { name: "Local Police", number: "911", type: "police", icon: Shield },
  ]

  const safetyFeatures = [
    {
      title: "Live Location Sharing",
      description: "Share your real-time location with emergency contacts",
      icon: MapPin,
      enabled: locationSharing,
      toggle: () => setLocationSharing(!locationSharing),
    },
    {
      title: "Voice Activation",
      description: "Activate panic mode with voice commands",
      icon: Mic,
      enabled: voiceActivation,
      toggle: () => setVoiceActivation(!voiceActivation),
    },
    {
      title: "Noise Generation",
      description: "Generate loud noise to deter threats",
      icon: Volume2,
      enabled: noiseGeneration,
      toggle: () => setNoiseGeneration(!noiseGeneration),
    },
  ]

  const handlePanicMode = () => {
    setPanicMode(!panicMode)
    if (!panicMode) {
      // Simulate panic mode activation
      setLocationSharing(true)
      setNoiseGeneration(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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
          <h1 className="text-2xl font-bold">Emergency & Safety</h1>
        </div>

        {/* Panic Mode Status */}
        {panicMode && (
          <Card className="border-red-500 bg-red-50 animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Siren className="h-6 w-6 text-red-600" />
                <div className="flex-1">
                  <p className="font-bold text-red-800">PANIC MODE ACTIVE</p>
                  <p className="text-sm text-red-600">Emergency contacts notified • {formatTime(emergencyTimer)}</p>
                </div>
                <Badge variant="destructive">ACTIVE</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Panic Button */}
        <Card>
          <CardContent className="p-6 text-center">
            <Button
              size="lg"
              className={`w-32 h-32 rounded-full text-xl font-bold ${
                panicMode ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={handlePanicMode}
            >
              {panicMode ? (
                <div className="flex flex-col items-center">
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  <span>STOP</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  <span>PANIC</span>
                </div>
              )}
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              {panicMode ? "Tap to deactivate panic mode" : "Tap to activate emergency mode"}
            </p>
          </CardContent>
        </Card>

        {/* Safety Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <feature.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <Switch checked={feature.enabled} onCheckedChange={feature.toggle} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      contact.type === "emergency"
                        ? "bg-red-100"
                        : contact.type === "police"
                          ? "bg-blue-100"
                          : contact.type === "family"
                            ? "bg-green-100"
                            : "bg-purple-100"
                    }`}
                  >
                    <contact.icon
                      className={`h-4 w-4 ${
                        contact.type === "emergency"
                          ? "text-red-600"
                          : contact.type === "police"
                            ? "text-blue-600"
                            : contact.type === "family"
                              ? "text-green-600"
                              : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.number}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Text
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full" size="lg">
            <MapPin className="h-4 w-4 mr-2" />
            Share Location
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <Volume2 className="h-4 w-4 mr-2" />
            Sound Alarm
          </Button>
        </div>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">Keep your phone charged and location services enabled</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">Test panic mode features regularly with trusted contacts</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">Use voice activation in hands-free emergency situations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
