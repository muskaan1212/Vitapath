import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NotificationSystem } from "@/components/shared/notification-system"
import { LocationProvider } from "@/components/location-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vita Path - Your Complete Life Companion",
  description:
    "A comprehensive lifestyle and safety application with mapping, emergency features, health tracking, and AI assistance.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocationProvider>
          {children}
          <NotificationSystem />
        </LocationProvider>
      </body>
    </html>
  )
}
