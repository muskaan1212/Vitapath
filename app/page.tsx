"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Shield,
  Heart,
  ShoppingBag,
  AlertTriangle,
  Utensils,
  Sun,
  Globe,
  Bell,
  Phone,
  Car,
  Train,
  Bike,
  Smartphone,
  RefreshCw,
  Cloud,
  CloudRain,
  Users,
  BookOpen,
  Target,
  Wallet,
  Brain,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useLocationContext } from "@/components/location-provider"

export default function Dashboard() {
  const { location, weather, loading, error, refreshLocation } = useLocationContext()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Enhanced quick actions with new features
  const quickActions = [
    {
      title: "Safe Routes",
      icon: MapPin,
      href: "/maps",
      color: "bg-green-500",
      description: "Traffic & safety aware",
      stats: "Live traffic data",
    },
    {
      title: "SOS Alert",
      icon: AlertTriangle,
      href: "/emergency",
      color: "bg-red-500",
      description: "Emergency services",
      stats: "100, 101, 102, 108",
    },
    {
      title: "Health AI",
      icon: Brain,
      href: "/chatbot",
      color: "bg-blue-500",
      description: "Hindi + English support",
      stats: "Ayurveda integrated",
    },
    {
      title: "Quick Commerce",
      icon: ShoppingBag,
      href: "/lifestyle",
      color: "bg-purple-500",
      description: "Swiggy, Zomato, Blinkit",
      stats: "10-30 min delivery",
    },
    {
      title: "Social Hub",
      icon: Users,
      href: "/social",
      color: "bg-pink-500",
      description: "Friends & challenges",
      stats: "24 friends online",
    },
    {
      title: "Learning",
      icon: BookOpen,
      href: "/learning",
      color: "bg-indigo-500",
      description: "Courses & skills",
      stats: "12 courses active",
    },
    {
      title: "Finance Hub",
      icon: Wallet,
      href: "/finance",
      color: "bg-yellow-500",
      description: "Budget & investments",
      stats: "₹45,250 balance",
    },
    {
      title: "Productivity",
      icon: Target,
      href: "/productivity",
      color: "bg-teal-500",
      description: "Tasks & focus timer",
      stats: "78% completion",
    },
  ]

  // Dynamic content based on location with actual service URLs
  const getLocationSpecificContent = () => {
    if (!location) return getDefaultContent()

    const country = location.country
    const city = location.city

    if (country === "India") {
      return getIndianContent(city)
    } else if (country === "United States") {
      return getUSContent(city)
    } else if (country === "United Kingdom") {
      return getUKContent(city)
    } else {
      return getInternationalContent(country)
    }
  }

  const getIndianContent = (city: string) => ({
    greeting: "नमस्ते! Good",
    emergencyNumbers: [
      { name: "Police", number: "100", icon: Shield },
      { name: "Fire", number: "101", icon: AlertTriangle },
      { name: "Ambulance", number: "102", icon: Heart },
      { name: "Disaster", number: "108", icon: Phone },
    ],
    transportOptions: [
      { name: "Auto Rickshaw", time: "12 min", cost: "₹45", available: true, icon: Car },
      { name: "Metro", time: "18 min", cost: "₹20", available: true, icon: Train },
      { name: "Local Train", time: "25 min", cost: "₹10", available: true, icon: Train },
      { name: "Bus", time: "35 min", cost: "₹15", available: true, icon: Car },
    ],
    localServices: [
      {
        name: "Swiggy",
        category: "Food Delivery",
        discount: "40% off first order",
        icon: Utensils,
        url: "https://www.swiggy.com",
        color: "bg-orange-500",
      },
      {
        name: "Blinkit",
        category: "Groceries",
        discount: "Free delivery on ₹199+",
        icon: ShoppingBag,
        url: "https://blinkit.com",
        color: "bg-yellow-500",
      },
      {
        name: "PharmEasy",
        category: "Medicine",
        discount: "25% off medicines",
        icon: Heart,
        url: "https://pharmeasy.in",
        color: "bg-green-500",
      },
      {
        name: "Urban Company",
        category: "Home Services",
        discount: "₹100 off first booking",
        icon: Smartphone,
        url: "https://www.urbancompany.com",
        color: "bg-purple-500",
      },
    ],
    healthGoals: {
      water: 12, // Higher for Indian climate
      steps: 8000, // Adjusted for heat
      calories: 1800,
    },
    weatherAlerts: weather?.temp > 35 ? ["Heat Wave Warning", "Stay Hydrated", "Avoid 12-4 PM outdoors"] : [],
  })

  const getUSContent = (city: string) => ({
    greeting: "Hello! Good",
    emergencyNumbers: [
      { name: "Emergency", number: "911", icon: Shield },
      { name: "Poison Control", number: "1-800-222-1222", icon: Heart },
    ],
    transportOptions: [
      { name: "Uber", time: "8 min", cost: "$12-18", available: true, icon: Car },
      { name: "Lyft", time: "10 min", cost: "$10-16", available: true, icon: Car },
      { name: "Public Transit", time: "25 min", cost: "$2.50", available: true, icon: Train },
      { name: "Bike Share", time: "15 min", cost: "$4", available: true, icon: Bike },
    ],
    localServices: [
      {
        name: "DoorDash",
        category: "Food Delivery",
        discount: "Free delivery",
        icon: Utensils,
        url: "https://www.doordash.com",
        color: "bg-red-500",
      },
      {
        name: "Instacart",
        category: "Groceries",
        discount: "$10 off first order",
        icon: ShoppingBag,
        url: "https://www.instacart.com",
        color: "bg-green-500",
      },
      {
        name: "CVS Pharmacy",
        category: "Pharmacy",
        discount: "20% off vitamins",
        icon: Heart,
        url: "https://www.cvs.com",
        color: "bg-blue-500",
      },
      {
        name: "TaskRabbit",
        category: "Home Services",
        discount: "$15 off first task",
        icon: Smartphone,
        url: "https://www.taskrabbit.com",
        color: "bg-purple-500",
      },
    ],
    healthGoals: {
      water: 8,
      steps: 10000,
      calories: 2000,
    },
    weatherAlerts: weather?.temp < 5 ? ["Cold Weather Alert", "Dress Warmly", "Check for Ice"] : [],
  })

  const getUKContent = (city: string) => ({
    greeting: "Hello! Good",
    emergencyNumbers: [
      { name: "Emergency", number: "999", icon: Shield },
      { name: "Non-Emergency", number: "101", icon: Phone },
      { name: "NHS", number: "111", icon: Heart },
    ],
    transportOptions: [
      { name: "Uber", time: "8 min", cost: "£8-12", available: true, icon: Car },
      { name: "Bus", time: "20 min", cost: "£2.50", available: true, icon: Car },
      { name: "Underground", time: "15 min", cost: "£2.80", available: true, icon: Train },
      { name: "Boris Bike", time: "18 min", cost: "£2", available: true, icon: Bike },
    ],
    localServices: [
      {
        name: "Deliveroo",
        category: "Food Delivery",
        discount: "Free delivery",
        icon: Utensils,
        url: "https://deliveroo.co.uk",
        color: "bg-teal-500",
      },
      {
        name: "Tesco",
        category: "Groceries",
        discount: "£5 off £40 spend",
        icon: ShoppingBag,
        url: "https://www.tesco.com",
        color: "bg-blue-500",
      },
      {
        name: "Boots",
        category: "Pharmacy",
        discount: "15% off health",
        icon: Heart,
        url: "https://www.boots.com",
        color: "bg-green-500",
      },
      {
        name: "Handy",
        category: "Home Services",
        discount: "£10 off first booking",
        icon: Smartphone,
        url: "https://www.handy.com",
        color: "bg-purple-500",
      },
    ],
    healthGoals: {
      water: 8,
      steps: 10000,
      calories: 2000,
    },
    weatherAlerts: weather?.condition === "Rainy" ? ["Rain Expected", "Carry Umbrella", "Slippery Roads"] : [],
  })

  const getInternationalContent = (country: string) => ({
    greeting: "Hello! Good",
    emergencyNumbers: [
      { name: "Emergency", number: "112", icon: Shield },
      { name: "Local Police", number: "Local", icon: Phone },
    ],
    transportOptions: [
      { name: "Taxi", time: "10 min", cost: "Local Rate", available: true, icon: Car },
      { name: "Public Transport", time: "20 min", cost: "Local Rate", available: true, icon: Train },
    ],
    localServices: [
      {
        name: "Local Food Delivery",
        category: "Food",
        discount: "Available",
        icon: Utensils,
        url: "#",
        color: "bg-gray-500",
      },
      {
        name: "Local Grocery",
        category: "Groceries",
        discount: "Available",
        icon: ShoppingBag,
        url: "#",
        color: "bg-gray-500",
      },
    ],
    healthGoals: {
      water: 8,
      steps: 10000,
      calories: 2000,
    },
    weatherAlerts: [],
  })

  const getDefaultContent = () => ({
    greeting: "Hello! Good",
    emergencyNumbers: [{ name: "Emergency", number: "Emergency", icon: Shield }],
    transportOptions: [],
    localServices: [],
    healthGoals: {
      water: 8,
      steps: 10000,
      calories: 2000,
    },
    weatherAlerts: [],
  })

  const content = getLocationSpecificContent()

  const formatTime = (date: Date) => {
    if (location?.timezone) {
      return date.toLocaleTimeString("en-US", {
        timeZone: location.timezone,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      })
    }
    return date.toLocaleTimeString()
  }

  const formatCurrency = (amount: number) => {
    if (location?.currency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: location.currency,
      }).format(amount)
    }
    return `$${amount}`
  }

  const getWeatherIcon = () => {
    if (!weather) return Sun
    switch (weather.condition) {
      case "Rainy":
        return CloudRain
      case "Cloudy":
        return Cloud
      default:
        return Sun
    }
  }

  const WeatherIcon = getWeatherIcon()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Enhanced Header with Location - Responsive */}
        <div className="text-center py-4 sm:py-6 relative">
          <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={refreshLocation} className="h-8 w-8 sm:h-10 sm:w-10">
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            {location?.country === "India" && <span className="text-xl sm:text-2xl">🇮🇳</span>}
            {location?.country === "United States" && <span className="text-xl sm:text-2xl">🇺🇸</span>}
            {location?.country === "United Kingdom" && <span className="text-xl sm:text-2xl">🇬🇧</span>}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vita Path
            </h1>
          </div>

          <p className="text-sm sm:text-base text-gray-600">
            {content.greeting}{" "}
            {currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 18 ? "afternoon" : "evening"}!
          </p>

          {location && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {location.area}, {location.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                <span className="text-xs sm:text-sm text-gray-500">{formatTime(currentTime)}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-2">
              <Badge variant="destructive" className="text-xs">
                Location Error: {error}
              </Badge>
            </div>
          )}
        </div>

        {/* Location-Aware Weather - Responsive */}
        {weather && (
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xl sm:text-2xl font-bold">{weather.temp}°C</p>
                  <p className="text-sm sm:text-base text-gray-600">{weather.condition}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs text-gray-500">
                    <span>AQI: {weather.airQuality}</span>
                    <span>UV: {weather.uvIndex}/11</span>
                    <span>Humidity: {weather.humidity}%</span>
                  </div>
                  {content.weatherAlerts.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {content.weatherAlerts.map((alert, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right ml-4">
                  <WeatherIcon className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-2" />
                  {location && (
                    <div>
                      <p className="text-xs text-gray-600">{location.city}</p>
                      <p className="text-xs text-gray-500">{location.state}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Quick Actions Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                <CardContent className="p-3 sm:p-4 text-center h-full flex flex-col justify-between">
                  <div>
                    <div
                      className={`${action.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{action.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {action.stats}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Daily Overview Cards - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Health Score */}
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">85%</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Health Score</p>
              <Progress value={85} className="h-1.5 sm:h-2" />
            </CardContent>
          </Card>

          {/* Productivity Score */}
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">78%</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Productivity</p>
              <Progress value={78} className="h-1.5 sm:h-2" />
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">3</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Courses Active</p>
              <Badge variant="outline" className="text-xs">
                12h this week
              </Badge>
            </CardContent>
          </Card>

          {/* Social Activity */}
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-pink-600 mb-1">24</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Friends Online</p>
              <Badge variant="outline" className="text-xs">
                5 challenges
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Layout for larger screens */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Location-Specific Transport */}
            {content.transportOptions.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Car className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    Local Transport
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {location?.city}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.transportOptions.slice(0, 3).map((transport, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
                          <transport.icon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-xs sm:text-sm">{transport.name}</p>
                          <p className="text-xs text-gray-600">
                            {transport.time} • {transport.cost}
                          </p>
                        </div>
                      </div>
                      <Badge variant={transport.available ? "default" : "secondary"} className="text-xs">
                        {transport.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  ))}
                  <Link href="/transport">
                    <Button variant="outline" className="w-full text-xs sm:text-sm">
                      View All Transport Options
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Location-Aware Health Goals */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  Health Goals
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {location?.country} Adapted
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>Daily Water Goal</span>
                    <span>6/{content.healthGoals.water} glasses</span>
                  </div>
                  <Progress value={(6 / content.healthGoals.water) * 100} className="h-1.5 sm:h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {location?.country === "India" ? "Increased for hot climate" : "Standard recommendation"}
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>Steps Goal</span>
                    <span>7842/{content.healthGoals.steps}</span>
                  </div>
                  <Progress value={(7842 / content.healthGoals.steps) * 100} className="h-1.5 sm:h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Location-Specific Services - Now Clickable */}
            {content.localServices.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    Local Services
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Available
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.localServices.map((service, index) => (
                    <a key={index} href={service.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer group-hover:shadow-md">
                        <div
                          className={`${service.color} p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <service.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <p className="font-medium text-sm">{service.name}</p>
                          <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{service.category}</p>
                        <Badge variant="outline" className="text-xs">
                          {service.discount}
                        </Badge>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Location-Specific Emergency Numbers */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-red-800">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Emergency Services
                  <Badge variant="outline" className="ml-auto text-xs">
                    {location?.country}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {content.emergencyNumbers.map((emergency, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2 bg-white text-xs sm:text-sm h-auto py-2 px-3"
                    onClick={() => window.open(`tel:${emergency.number}`, "_self")}
                  >
                    <emergency.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">
                      {emergency.name}: {emergency.number}
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
