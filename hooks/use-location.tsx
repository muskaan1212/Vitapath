"use client"

import { useState, useEffect } from "react"

interface LocationData {
  lat: number
  lng: number
  city: string
  area: string
  state: string
  country: string
  pincode: string
  timezone: string
  currency: string
  language: string
}

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  airQuality: string
  uvIndex: number
  windSpeed: number
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        await getLocationDetails(latitude, longitude)
        await getWeatherData(latitude, longitude)
        setLoading(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        setError("Unable to get your location")
        // Fallback to default location (Mumbai)
        setDefaultLocation()
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  const getLocationDetails = async (lat: number, lng: number) => {
    try {
      if (!window.google) {
        // Load Google Maps if not already loaded
        await loadGoogleMaps()
      }

      const geocoder = new window.google.maps.Geocoder()
      const latlng = { lat, lng }

      geocoder.geocode({ location: latlng }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const addressComponents = results[0].address_components
          const locationData = parseAddressComponents(addressComponents, lat, lng)
          setLocation(locationData)
        } else {
          setDefaultLocation()
        }
      })
    } catch (error) {
      console.error("Error getting location details:", error)
      setDefaultLocation()
    }
  }

  const parseAddressComponents = (components: any[], lat: number, lng: number): LocationData => {
    let city = ""
    let area = ""
    let state = ""
    let country = ""
    let pincode = ""

    components.forEach((component) => {
      const types = component.types

      if (types.includes("locality") || types.includes("administrative_area_level_2")) {
        city = component.long_name
      }
      if (types.includes("sublocality") || types.includes("neighborhood")) {
        area = component.long_name
      }
      if (types.includes("administrative_area_level_1")) {
        state = component.long_name
      }
      if (types.includes("country")) {
        country = component.long_name
      }
      if (types.includes("postal_code")) {
        pincode = component.long_name
      }
    })

    // Determine timezone, currency, and language based on country
    const { timezone, currency, language } = getLocationSettings(country, state)

    return {
      lat,
      lng,
      city: city || "Unknown City",
      area: area || "Unknown Area",
      state: state || "Unknown State",
      country: country || "Unknown Country",
      pincode: pincode || "000000",
      timezone,
      currency,
      language,
    }
  }

  const getLocationSettings = (country: string, state: string) => {
    // Default settings for different countries
    const countrySettings: { [key: string]: { timezone: string; currency: string; language: string } } = {
      India: { timezone: "Asia/Kolkata", currency: "INR", language: "hi" },
      "United States": { timezone: "America/New_York", currency: "USD", language: "en" },
      "United Kingdom": { timezone: "Europe/London", currency: "GBP", language: "en" },
      Canada: { timezone: "America/Toronto", currency: "CAD", language: "en" },
      Australia: { timezone: "Australia/Sydney", currency: "AUD", language: "en" },
      Germany: { timezone: "Europe/Berlin", currency: "EUR", language: "de" },
      France: { timezone: "Europe/Paris", currency: "EUR", language: "fr" },
      Japan: { timezone: "Asia/Tokyo", currency: "JPY", language: "ja" },
      China: { timezone: "Asia/Shanghai", currency: "CNY", language: "zh" },
      Brazil: { timezone: "America/Sao_Paulo", currency: "BRL", language: "pt" },
    }

    return countrySettings[country] || { timezone: "UTC", currency: "USD", language: "en" }
  }

  const getWeatherData = async (lat: number, lng: number) => {
    try {
      // Simulate weather API call (replace with actual weather API)
      const weatherData: WeatherData = {
        temp: Math.round(20 + Math.random() * 20), // Random temp between 20-40°C
        condition: ["Sunny", "Cloudy", "Rainy", "Hot", "Pleasant"][Math.floor(Math.random() * 5)],
        humidity: Math.round(40 + Math.random() * 40), // 40-80%
        airQuality: ["Good", "Moderate", "Poor", "Very Poor"][Math.floor(Math.random() * 4)],
        uvIndex: Math.round(1 + Math.random() * 10), // 1-11
        windSpeed: Math.round(5 + Math.random() * 15), // 5-20 km/h
      }

      setWeather(weatherData)
    } catch (error) {
      console.error("Error getting weather data:", error)
    }
  }

  const setDefaultLocation = () => {
    setLocation({
      lat: 19.076,
      lng: 72.8777,
      city: "Mumbai",
      area: "Bandra West",
      state: "Maharashtra",
      country: "India",
      pincode: "400050",
      timezone: "Asia/Kolkata",
      currency: "INR",
      language: "hi",
    })
  }

  const loadGoogleMaps = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4hf0txfcMc5A_RNmRZX5LyqRO2WAHyIc&libraries=places,geometry`
      script.async = true
      script.defer = true

      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Google Maps"))

      document.head.appendChild(script)
    })
  }

  const refreshLocation = () => {
    setLoading(true)
    setError(null)
    getCurrentLocation()
  }

  return {
    location,
    weather,
    loading,
    error,
    refreshLocation,
  }
}
