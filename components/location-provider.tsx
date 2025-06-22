"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useLocation } from "@/hooks/use-location"

interface LocationContextType {
  location: any
  weather: any
  loading: boolean
  error: string | null
  refreshLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const locationData = useLocation()

  return <LocationContext.Provider value={locationData}>{children}</LocationContext.Provider>
}

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider")
  }
  return context
}
