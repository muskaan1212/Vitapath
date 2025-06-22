"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Search,
  Route,
  Cloud,
  Sun,
  CloudRain,
  Utensils,
  ArrowLeft,
  Shield,
  Clock,
  Star,
  Crosshair,
  Layers,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useLocationContext } from "@/components/location-provider"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function MapsPage() {
  const { location, weather, loading } = useLocationContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("safe")
  const [map, setMap] = useState<any>(null)
  const [directionsService, setDirectionsService] = useState<any>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([])
  const mapRef = useRef<HTMLDivElement>(null)

  const routes = [
    {
      id: "safe",
      name: "Safest Route",
      duration: "15 min",
      distance: "2.3 km",
      safety: 95,
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "fast",
      name: "Fastest Route",
      duration: "12 min",
      distance: "2.1 km",
      safety: 78,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "scenic",
      name: "Scenic Route",
      duration: "18 min",
      distance: "2.8 km",
      safety: 88,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const weatherIcons = {
    Sunny: Sun,
    Cloudy: Cloud,
    Rainy: CloudRain,
  }

  const WeatherIcon = weather ? weatherIcons[weather.condition as keyof typeof weatherIcons] || Sun : Sun

  useEffect(() => {
    if (location && !loading) {
      initializeMap()
    }
  }, [location, loading])

  const initializeMap = () => {
    if (!mapRef.current || !location) return

    loadGoogleMaps().then(() => {
      createMap(location)
    })
  }

  const loadGoogleMaps = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4hf0txfcMc5A_RNmRZX5LyqRO2WAHyIc&libraries=places,geometry&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = () => resolve()

      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Google Maps"))

      document.head.appendChild(script)
    })
  }

  const createMap = (center: { lat: number; lng: number }) => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 15,
      center: center,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: getMapStyles(),
    })

    // Add current location marker
    new window.google.maps.Marker({
      position: center,
      map: mapInstance,
      title: "Your Location",
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(24, 24),
      },
    })

    // Initialize directions service and renderer
    const directionsServiceInstance = new window.google.maps.DirectionsService()
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      draggable: true,
      panel: null,
    })

    directionsRendererInstance.setMap(mapInstance)

    // Find nearby places based on location
    findNearbyPlaces(mapInstance, center)

    setMap(mapInstance)
    setDirectionsService(directionsServiceInstance)
    setDirectionsRenderer(directionsRendererInstance)
    setIsMapLoaded(true)
  }

  const getMapStyles = () => {
    // Different map styles based on location/country
    if (location?.country === "India") {
      return [
        {
          featureType: "poi.business",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ]
    }
    return []
  }

  const findNearbyPlaces = (mapInstance: any, center: { lat: number; lng: number }) => {
    const service = new window.google.maps.places.PlacesService(mapInstance)

    // Search for different types based on location
    const searchTypes = getLocationSpecificSearchTypes()

    searchTypes.forEach((type) => {
      const request = {
        location: center,
        radius: 1000,
        type: type,
      }

      service.nearbySearch(request, (results: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.slice(0, 5).forEach((place: any) => {
            createPlaceMarker(place, mapInstance, type)
          })
          setNearbyPlaces((prev) => [...prev, ...results.slice(0, 3)])
        }
      })
    })
  }

  const getLocationSpecificSearchTypes = () => {
    if (location?.country === "India") {
      return ["restaurant", "hospital", "pharmacy", "atm", "gas_station"]
    } else if (location?.country === "United States") {
      return ["restaurant", "hospital", "pharmacy", "bank", "gas_station"]
    } else {
      return ["restaurant", "hospital", "pharmacy"]
    }
  }

  const createPlaceMarker = (place: any, mapInstance: any, type: string) => {
    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      map: mapInstance,
      title: place.name,
      icon: getMarkerIcon(type),
    })

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${place.name}</h3>
          <p style="margin: 0 0 4px 0; color: #666;">${place.vicinity}</p>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="color: #F59E0B;">★ ${place.rating || "N/A"}</span>
            <span style="color: #666;">${type}</span>
          </div>
          <button style="background: #3B82F6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; margin-top: 8px;">
            Get Directions
          </button>
        </div>
      `,
    })

    marker.addListener("click", () => {
      infoWindow.open(mapInstance, marker)
    })
  }

  const getMarkerIcon = (type: string) => {
    const colors = {
      restaurant: "#F97316",
      hospital: "#EF4444",
      pharmacy: "#10B981",
      atm: "#8B5CF6",
      bank: "#8B5CF6",
      gas_station: "#F59E0B",
    }

    const color = colors[type as keyof typeof colors] || "#6B7280"

    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="${color}" stroke="#FFFFFF" strokeWidth="2"/>
          <circle cx="16" cy="16" r="4" fill="#FFFFFF"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 32),
    }
  }

  const calculateRoute = (destination: string) => {
    if (!directionsService || !directionsRenderer || !location) return

    const request = {
      origin: location,
      destination: destination,
      travelMode: window.google.maps.TravelMode.WALKING,
      avoidHighways: selectedRoute === "safe",
      avoidTolls: selectedRoute === "safe",
    }

    directionsService.route(request, (result: any, status: any) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result)
      }
    })
  }

  const centerOnCurrentLocation = () => {
    if (location && map) {
      map.setCenter(location)
      map.setZoom(16)
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim() || !map) return

    const service = new window.google.maps.places.PlacesService(map)
    const request = {
      query: searchQuery,
      fields: ["name", "geometry"],
    }

    service.findPlaceFromQuery(request, (results: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
        map.setCenter(results[0].geometry.location)
        map.setZoom(16)

        new window.google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: results[0].name,
        })
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your location...</p>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold">Maps & Navigation</h1>
          {location && (
            <Badge variant="secondary" className="ml-auto">
              {location.city}
            </Badge>
          )}
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alert */}
        {weather && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <WeatherIcon className="h-6 w-6 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Weather Update</p>
                  <p className="text-sm text-orange-600">
                    {weather.condition} - {weather.temp}°C, UV Index: {weather.uvIndex}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Google Map */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <div ref={mapRef} className="h-64 w-full rounded-lg" style={{ minHeight: "256px" }} />
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2 animate-pulse" />
                    <p className="text-gray-600 font-medium">Loading Google Maps...</p>
                    {location && (
                      <p className="text-sm text-gray-500">
                        {location.city}, {location.country}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Map Controls */}
              {isMapLoaded && (
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white shadow-md"
                    onClick={centerOnCurrentLocation}
                  >
                    <Crosshair className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white shadow-md"
                    onClick={() => {
                      if (map) {
                        const currentType = map.getMapTypeId()
                        const newType = currentType === "roadmap" ? "satellite" : "roadmap"
                        map.setMapTypeId(newType)
                      }
                    }}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Route Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routes.map((route) => (
              <div
                key={route.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRoute === route.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${route.bgColor}`}>
                      <route.icon className={`h-4 w-4 ${route.color}`} />
                    </div>
                    <div>
                      <p className="font-medium">{route.name}</p>
                      <p className="text-sm text-gray-500">
                        {route.duration} • {route.distance}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={route.safety > 90 ? "default" : route.safety > 80 ? "secondary" : "outline"}>
                      {route.safety}% Safe
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nearby Places */}
        {nearbyPlaces.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Nearby Places
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nearbyPlaces.slice(0, 3).map((place, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{place.name}</p>
                    </div>
                    <p className="text-sm text-gray-600">{place.vicinity}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{place.rating || "N/A"}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => calculateRoute(place.name)}>
                    Navigate
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full" size="lg" onClick={() => calculateRoute(searchQuery || "nearby restaurant")}>
            <Navigation className="h-4 w-4 mr-2" />
            Start Navigation
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <MapPin className="h-4 w-4 mr-2" />
            Share Location
          </Button>
        </div>
      </div>
    </div>
  )
}
