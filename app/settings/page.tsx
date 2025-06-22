"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Globe,
  Bell,
  Shield,
  User,
  Database,
  ArrowLeft,
  Moon,
  Sun,
  Volume2,
  MapPin,
  Heart,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [language, setLanguage] = useState("en")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [locationSharing, setLocationSharing] = useState(true)
  const [healthDataSync, setHealthDataSync] = useState(true)
  const [emergencyAlerts, setEmergencyAlerts] = useState(true)
  const [voiceCommands, setVoiceCommands] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ]

  const settingsGroups = [
    {
      title: "Language & Region",
      icon: Globe,
      settings: [
        {
          label: "App Language",
          description: "Choose your preferred language",
          type: "select",
          value: language,
          onChange: setLanguage,
          options: languages,
        },
      ],
    },
    {
      title: "Appearance",
      icon: darkMode ? Moon : Sun,
      settings: [
        {
          label: "Dark Mode",
          description: "Switch between light and dark themes",
          type: "switch",
          value: darkMode,
          onChange: setDarkMode,
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        {
          label: "Push Notifications",
          description: "Receive app notifications",
          type: "switch",
          value: notifications,
          onChange: setNotifications,
        },
        {
          label: "Emergency Alerts",
          description: "Critical safety notifications",
          type: "switch",
          value: emergencyAlerts,
          onChange: setEmergencyAlerts,
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      settings: [
        {
          label: "Location Sharing",
          description: "Share location with emergency contacts",
          type: "switch",
          value: locationSharing,
          onChange: setLocationSharing,
        },
        {
          label: "Health Data Sync",
          description: "Sync with Firestore database",
          type: "switch",
          value: healthDataSync,
          onChange: setHealthDataSync,
        },
      ],
    },
    {
      title: "Accessibility",
      icon: Volume2,
      settings: [
        {
          label: "Voice Commands",
          description: "Control app with voice",
          type: "switch",
          value: voiceCommands,
          onChange: setVoiceCommands,
        },
      ],
    },
  ]

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0]
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
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Profile Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Your Profile</p>
                <p className="text-sm text-gray-600">Manage your Vita Path experience</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{getCurrentLanguage().flag}</p>
                <p className="text-xs text-gray-500">{getCurrentLanguage().name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <group.icon className="h-5 w-5" />
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <div className="ml-4">
                    {setting.type === "switch" ? (
                      <Switch
                        checked={setting.value as boolean}
                        onCheckedChange={setting.onChange as (value: boolean) => void}
                      />
                    ) : setting.type === "select" ? (
                      <Select
                        value={setting.value as string}
                        onValueChange={setting.onChange as (value: string) => void}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              <span>{getCurrentLanguage().flag}</span>
                              <span className="text-sm">{getCurrentLanguage().name}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {(setting.options as typeof languages).map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              <div className="flex items-center gap-2">
                                <span>{option.flag}</span>
                                <span>{option.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Data & Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data & Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Heart className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium">Health Data</p>
                <p className="text-xs text-gray-600">2.3 MB</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium">Location Data</p>
                <p className="text-xs text-gray-600">1.8 MB</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Smartphone className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <p className="text-sm font-medium">App Cache</p>
                <p className="text-xs text-gray-600">5.2 MB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Export Data
              </Button>
              <Button variant="outline" className="flex-1">
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Build</span>
              <span className="text-sm font-medium">2024.1.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium">Firestore</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">AI Model</span>
              <span className="text-sm font-medium">Gemini Pro</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Help & Support
          </Button>
          <Button variant="outline" className="w-full">
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full">
            Terms of Service
          </Button>
          <Button variant="destructive" className="w-full">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
