"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Mic,
  ArrowLeft,
  Bot,
  User,
  Heart,
  MapPin,
  Utensils,
  Dumbbell,
  Shield,
  Sparkles,
  Globe,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: "health" | "navigation" | "food" | "fitness" | "safety" | "general" | "ayurveda" | "indian"
  language?: "en" | "hi"
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "नमस्ते! I'm your AI health and lifestyle assistant. मैं आपकी मदद कर सकता हूं with meal suggestions, navigation, safety tips, Ayurvedic remedies, and more. आप हिंदी या English में बात कर सकते हैं। What would you like to know?",
      timestamp: new Date(),
      category: "general",
      language: "en",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "hi" | "both">("both")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    { text: "Suggest healthy Indian meal", icon: Utensils, category: "food", hindi: "स्वस्थ भारतीय भोजन सुझाएं" },
    { text: "Plan workout for monsoon", icon: Dumbbell, category: "fitness", hindi: "मानसून के लिए व्यायाम योजना" },
    { text: "Safe route in Mumbai traffic", icon: MapPin, category: "navigation", hindi: "मुंबई ट्रैफिक में सुरक्षित रास्ता" },
    { text: "Ayurvedic remedy for heat", icon: Heart, category: "ayurveda", hindi: "गर्मी के लिए आयुर्वेदिक उपाय" },
    { text: "Women safety tips", icon: Shield, category: "safety", hindi: "महिला सुरक्षा सुझाव" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): { content: string; category: string; language: "en" | "hi" } => {
    const message = userMessage.toLowerCase()
    const isHindi = /[\u0900-\u097F]/.test(userMessage)

    // Indian food suggestions
    if (message.includes("meal") || message.includes("food") || message.includes("खाना") || message.includes("भोजन")) {
      return {
        content: isHindi
          ? "आपके स्वास्थ्य प्रोफाइल के अनुसार, मैं सुझाता हूं:\n\n🥗 दाल-चावल with सब्जी और दही\n🍛 क्विनोआ उपमा with नारियल चटनी\n🥙 रोटी with पालक पनीर\n🍲 सांभर with इडली\n\nये सभी प्रोटीन, फाइबर और विटामिन से भरपूर हैं। क्या आप किसी specific recipe के बारे में जानना चाहते हैं?"
          : "Based on your health profile and Indian preferences, I recommend:\n\n🥗 Dal-Rice with mixed vegetables and curd\n🍛 Quinoa upma with coconut chutney\n🥙 Roti with palak paneer\n🍲 Sambar with idli\n\nThese provide complete proteins, fiber, and essential vitamins. Would you like a specific recipe?",
        category: "food",
        language: isHindi ? "hi" : "en",
      }
    }

    // Ayurvedic remedies
    if (
      message.includes("ayurved") ||
      message.includes("आयुर्वेद") ||
      message.includes("remedy") ||
      message.includes("उपाय")
    ) {
      return {
        content: isHindi
          ? "आयुर्वेदिक सुझाव:\n\n🌿 गर्मी के लिए: नारियल पानी, आंवला जूस, पुदीना\n🍯 पाचन के लिए: अजवाइन, हींग, जीरा पानी\n🧘 तनाव के लिए: अश्वगंधा, ब्राह्मी, योग\n🌱 रोग प्रतिरोधक क्षमता: तुलसी, गिलोय, हल्दी\n\nकृपया किसी भी जड़ी-बूटी का सेवन करने से पहले आयुर्वेदिक डॉक्टर से सलाह लें।"
          : "Ayurvedic recommendations:\n\n🌿 For heat: Coconut water, amla juice, mint\n🍯 For digestion: Ajwain, hing, cumin water\n🧘 For stress: Ashwagandha, brahmi, yoga\n🌱 For immunity: Tulsi, giloy, turmeric\n\nPlease consult an Ayurvedic doctor before taking any herbs.",
        category: "ayurveda",
        language: isHindi ? "hi" : "en",
      }
    }

    // Navigation and traffic
    if (
      message.includes("route") ||
      message.includes("traffic") ||
      message.includes("रास्ता") ||
      message.includes("ट्रैफिक")
    ) {
      return {
        content: isHindi
          ? "मुंबई ट्रैफिक के लिए सुझाव:\n\n🚇 मेट्रो/लोकल ट्रेन का उपयोग करें (9-11 AM, 4-7 PM में भीड़ से बचें)\n🛣️ SV Road की बजाय Link Road का उपयोग करें\n⏰ Rush hours (8-11 AM, 6-9 PM) से बचें\n📱 Google Maps live traffic देखें\n🏍️ छोटी दूरी के लिए bike taxi\n\nकौन सा specific route चाहिए?"
          : "Mumbai traffic suggestions:\n\n🚇 Use Metro/Local trains (avoid 9-11 AM, 4-7 PM rush)\n🛣️ Take Link Road instead of SV Road\n⏰ Avoid rush hours (8-11 AM, 6-9 PM)\n📱 Check Google Maps live traffic\n🏍️ Bike taxi for short distances\n\nWhich specific route do you need?",
        category: "navigation",
        language: isHindi ? "hi" : "en",
      }
    }

    // Women safety
    if (
      message.includes("safety") ||
      message.includes("women") ||
      message.includes("सुरक्षा") ||
      message.includes("महिला")
    ) {
      return {
        content: isHindi
          ? "महिला सुरक्षा सुझाव:\n\n🚨 Emergency numbers: 100 (Police), 1091 (Women Helpline)\n📱 Location sharing family के साथ करें\n🌃 रात में well-lit areas में चलें\n👥 Crowded places prefer करें\n🚗 Trusted cab services का उपयोग करें\n📞 Fake call feature का उपयोग करें\n\nPanic button हमेशा ready रखें!"
          : "Women safety tips:\n\n🚨 Emergency numbers: 100 (Police), 1091 (Women Helpline)\n📱 Share live location with family\n🌃 Stick to well-lit areas at night\n👥 Prefer crowded places\n🚗 Use trusted cab services\n📞 Use fake call feature when needed\n\nKeep panic button always ready!",
        category: "safety",
        language: isHindi ? "hi" : "en",
      }
    }

    // Monsoon/weather specific
    if (
      message.includes("monsoon") ||
      message.includes("rain") ||
      message.includes("मानसून") ||
      message.includes("बारिश")
    ) {
      return {
        content: isHindi
          ? "मानसून स्वास्थ्य सुझाव:\n\n☔ बारिश में भीगने से बचें\n🦠 Immunity बढ़ाने के लिए हल्दी दूध पिएं\n🏠 Indoor exercises करें: yoga, stretching\n🍲 गर्म खाना खाएं, street food से बचें\n💧 Boiled water पिएं\n👕 सूखे कपड़े पहनें\n\nWaterlogging areas से बचें!"
          : "Monsoon health tips:\n\n☔ Avoid getting wet in rain\n🦠 Boost immunity with turmeric milk\n🏠 Do indoor exercises: yoga, stretching\n🍲 Eat warm food, avoid street food\n💧 Drink boiled water\n👕 Wear dry clothes\n\nAvoid waterlogged areas!",
        category: "health",
        language: isHindi ? "hi" : "en",
      }
    }

    // Default response
    return {
      content: isHindi
        ? "मैं आपकी मदद करने के लिए यहां हूं! आप मुझसे पूछ सकते हैं:\n\n🍽️ भारतीय स्वस्थ भोजन के बारे में\n🏃 व्यायाम और फिटनेस\n🗺️ मुंबई में सुरक्षित रास्ते\n🌿 आयुर्वेदिक उपचार\n👩 महिला सुरक्षा\n🌧️ मानसून स्वास्थ्य\n\nआप किस बारे में जानना चाहते हैं?"
        : "I'm here to help you with:\n\n🍽️ Healthy Indian meal suggestions\n🏃 Exercise and fitness routines\n🗺️ Safe routes in Mumbai\n🌿 Ayurvedic remedies\n👩 Women safety tips\n🌧️ Monsoon health advice\n\nWhat specific area would you like assistance with?",
      category: "general",
      language: isHindi ? "hi" : "en",
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const { content, category, language } = generateBotResponse(inputMessage)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content,
        timestamp: new Date(),
        category: category as any,
        language,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (actionText: string, hindi?: string) => {
    const text = selectedLanguage === "hi" && hindi ? hindi : actionText
    setInputMessage(text)
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "health":
      case "ayurveda":
        return Heart
      case "navigation":
        return MapPin
      case "food":
        return Utensils
      case "fitness":
        return Dumbbell
      case "safety":
        return Shield
      default:
        return Sparkles
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "health":
      case "ayurveda":
        return "text-green-500"
      case "navigation":
        return "text-blue-500"
      case "food":
        return "text-orange-500"
      case "fitness":
        return "text-purple-500"
      case "safety":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 bg-white border-b">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AI Assistant</h1>
              <p className="text-xs text-gray-600">हिंदी + English Support</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant={selectedLanguage === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedLanguage("en")}
            >
              EN
            </Button>
            <Button
              variant={selectedLanguage === "hi" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedLanguage("hi")}
            >
              हिं
            </Button>
            <Button
              variant={selectedLanguage === "both" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedLanguage("both")}
            >
              <Globe className="h-3 w-3" />
            </Button>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Online
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "bot" && (
                <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.type === "user" ? "bg-blue-500 text-white ml-auto" : "bg-white border shadow-sm"
                  }`}
                >
                  {message.type === "bot" && message.category && (
                    <div className="flex items-center gap-1 mb-2">
                      {(() => {
                        const IconComponent = getCategoryIcon(message.category)
                        return <IconComponent className={`h-3 w-3 ${getCategoryColor(message.category)}`} />
                      })()}
                      <span className={`text-xs font-medium ${getCategoryColor(message.category)}`}>
                        {message.category === "ayurveda"
                          ? "आयुर्वेद"
                          : message.category.charAt(0).toUpperCase() + message.category.slice(1)}
                      </span>
                      {message.language && (
                        <Badge variant="outline" className="text-xs ml-1">
                          {message.language === "hi" ? "हिं" : "EN"}
                        </Badge>
                      )}
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-3">
                  {message.timestamp.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                </p>
              </div>

              {message.type === "user" && (
                <div className="bg-blue-500 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border shadow-sm p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                onClick={() => handleQuickAction(action.text, action.hindi)}
              >
                <action.icon className="h-3 w-3" />
                {selectedLanguage === "hi" && action.hindi ? action.hindi : action.text}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder={
                  selectedLanguage === "hi"
                    ? "स्वास्थ्य, सुरक्षा, भोजन के बारे में पूछें..."
                    : "Ask about health, safety, food, Ayurveda..."
                }
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-10"
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-8 w-8">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
