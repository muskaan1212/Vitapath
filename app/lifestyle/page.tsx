"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingBag,
  Search,
  Star,
  Clock,
  Truck,
  Utensils,
  ArrowLeft,
  Plus,
  Minus,
  Calendar,
  Target,
  Zap,
  Coffee,
  Apple,
  Milk,
  Percent,
} from "lucide-react"
import Link from "next/link"

export default function LifestylePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({})

  const indianRestaurants = [
    {
      id: 1,
      name: "Swiggy",
      cuisine: "Multi-cuisine",
      rating: 4.3,
      deliveryTime: "25-30 min",
      deliveryFee: "₹29",
      discount: "50% OFF up to ₹100",
      image: "/placeholder.svg?height=120&width=200",
      featured: true,
      popular: ["Biryani", "Pizza", "Burger"],
    },
    {
      id: 2,
      name: "Zomato",
      cuisine: "Food Delivery",
      rating: 4.2,
      deliveryTime: "30-35 min",
      deliveryFee: "₹25",
      discount: "40% OFF up to ₹80",
      image: "/placeholder.svg?height=120&width=200",
      featured: true,
      popular: ["North Indian", "Chinese", "South Indian"],
    },
    {
      id: 3,
      name: "Local Tiffin Service",
      cuisine: "Home-style",
      rating: 4.6,
      deliveryTime: "20-25 min",
      deliveryFee: "₹15",
      discount: "₹50 OFF on first order",
      image: "/placeholder.svg?height=120&width=200",
      featured: false,
      popular: ["Dal-Chawal", "Sabzi-Roti", "Curd Rice"],
    },
  ]

  const groceryCategories = [
    { name: "Fruits & Vegetables", icon: Apple, color: "bg-green-100 text-green-600", hindi: "फल और सब्जी" },
    { name: "Dairy & Eggs", icon: Milk, color: "bg-blue-100 text-blue-600", hindi: "दूध और अंडे" },
    { name: "Tea & Coffee", icon: Coffee, color: "bg-orange-100 text-orange-600", hindi: "चाय और कॉफी" },
    { name: "Snacks & Namkeen", icon: Zap, color: "bg-purple-100 text-purple-600", hindi: "स्नैक्स और नमकीन" },
  ]

  const indianGroceryItems = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 60,
      unit: "per dozen",
      category: "fruits",
      discount: 15,
      brand: "Fresh & Pure",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Amul Fresh Milk",
      price: 28,
      unit: "per 500ml",
      category: "dairy",
      discount: 0,
      brand: "Amul",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Tata Tea Gold",
      price: 185,
      unit: "per 250g",
      category: "beverages",
      discount: 10,
      brand: "Tata",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Basmati Rice",
      price: 120,
      unit: "per kg",
      category: "grains",
      discount: 5,
      brand: "India Gate",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Haldiram's Bhujia",
      price: 45,
      unit: "per 200g",
      category: "snacks",
      discount: 20,
      brand: "Haldiram's",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Organic Turmeric",
      price: 85,
      unit: "per 100g",
      category: "spices",
      discount: 0,
      brand: "Organic India",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const quickCommerceServices = [
    {
      name: "Blinkit",
      deliveryTime: "10-15 min",
      minOrder: "₹99",
      deliveryFee: "₹25",
      speciality: "Groceries & Essentials",
    },
    {
      name: "Swiggy Instamart",
      deliveryTime: "15-25 min",
      minOrder: "₹149",
      deliveryFee: "₹29",
      speciality: "Groceries & Food",
    },
    {
      name: "Zepto",
      deliveryTime: "10 min",
      minOrder: "₹199",
      deliveryFee: "₹35",
      speciality: "Ultra-fast Delivery",
    },
    {
      name: "BigBasket Now",
      deliveryTime: "15-30 min",
      minOrder: "₹200",
      deliveryFee: "Free",
      speciality: "Fresh Produce",
    },
  ]

  const indianRoutineOptimizer = {
    currentRoutine: [
      { time: "5:30 AM", activity: "Wake up & Morning Prayer", completed: true, hindi: "उठना और प्रार्थना" },
      { time: "6:00 AM", activity: "Yoga/Exercise", completed: true, hindi: "योग/व्यायाम" },
      { time: "7:00 AM", activity: "Tea & Light Breakfast", completed: false, hindi: "चाय और नाश्ता" },
      { time: "9:00 AM", activity: "Work/Study", completed: false, hindi: "काम/पढ़ाई" },
      { time: "1:00 PM", activity: "Lunch Break", completed: false, hindi: "दोपहर का खाना" },
      { time: "4:00 PM", activity: "Evening Tea", completed: false, hindi: "शाम की चाय" },
      { time: "7:00 PM", activity: "Dinner", completed: false, hindi: "रात का खाना" },
      { time: "9:00 PM", activity: "Family Time", completed: false, hindi: "पारिवारिक समय" },
      { time: "10:30 PM", activity: "Sleep", completed: false, hindi: "सोना" },
    ],
    suggestions: [
      "Add 10-minute meditation after morning prayer",
      "Schedule grocery shopping during off-peak hours (2-4 PM)",
      "Include evening walk during cooler hours (6-7 PM)",
      "Plan weekly meal prep on Sundays",
    ],
  }

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))
  }

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0)
  }

  const getTotalAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, count]) => {
      const item = indianGroceryItems.find((i) => i.id === Number.parseInt(itemId))
      if (item) {
        const discountedPrice = item.price * (1 - item.discount / 100)
        return total + discountedPrice * count
      }
      return total
    }, 0)
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
          <h1 className="text-2xl font-bold">Lifestyle & Commerce</h1>
          <Badge variant="secondary" className="ml-auto">
            Mumbai
          </Badge>
        </div>

        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="routine">Routine</TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="space-y-4">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for restaurants, cuisines, dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Commerce Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Quick Commerce
                  <Badge variant="secondary" className="ml-auto text-xs">
                    10-30 min
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {quickCommerceServices.map((service, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="font-medium text-sm mb-1">{service.name}</p>
                    <p className="text-xs text-gray-600 mb-1">{service.deliveryTime}</p>
                    <p className="text-xs text-gray-500">{service.speciality}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      Min: {service.minOrder}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Featured Restaurants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-500" />
                  Food Delivery Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {indianRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{restaurant.name}</h3>
                          {restaurant.featured && (
                            <Badge variant="secondary" className="text-xs">
                              Partner
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{restaurant.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            <span>{restaurant.deliveryFee}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="destructive" className="text-xs">
                            <Percent className="h-2 w-2 mr-1" />
                            {restaurant.discount}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {restaurant.popular.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Utensils className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Order Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Indian Dishes */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Indian Dishes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  { name: "Biryani", price: "₹180-250", emoji: "🍛" },
                  { name: "Butter Chicken", price: "₹220-280", emoji: "🍗" },
                  { name: "Masala Dosa", price: "₹80-120", emoji: "🥞" },
                  { name: "Chole Bhature", price: "₹100-150", emoji: "🍞" },
                  { name: "Paneer Tikka", price: "₹160-200", emoji: "🧀" },
                  { name: "Vada Pav", price: "₹15-25", emoji: "🍔" },
                ].map((dish, index) => (
                  <Button key={index} variant="outline" className="h-20 flex-col">
                    <span className="text-2xl mb-1">{dish.emoji}</span>
                    <span className="text-xs font-medium">{dish.name}</span>
                    <span className="text-xs text-gray-500">{dish.price}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-4">
            {/* Cart Summary */}
            {getTotalItems() > 0 && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">Cart Summary</p>
                      <p className="text-sm text-green-600">
                        {getTotalItems()} items • ₹{Math.round(getTotalAmount())}
                      </p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  Shop by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {groceryCategories.map((category, index) => (
                  <Button key={index} variant="outline" className="h-20 flex-col">
                    <div className={`p-2 rounded-full ${category.color} mb-2`}>
                      <category.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.hindi}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Popular Indian Items */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Indian Essentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {indianGroceryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.brand}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            ₹{Math.round(item.price * (1 - item.discount / 100))}
                          </span>
                          {item.discount > 0 && (
                            <>
                              <span className="text-xs text-gray-500 line-through">₹{item.price}</span>
                              <Badge variant="destructive" className="text-xs">
                                {item.discount}% OFF
                              </Badge>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{item.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cartItems[item.id] > 0 && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">{cartItems[item.id]}</span>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => addToCart(item.id)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routine" className="space-y-4">
            {/* Indian Daily Routine Optimizer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Indian Daily Routine (दैनिक दिनचर्या)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-purple-800">Today's Optimization Score</p>
                  <p className="text-2xl font-bold text-purple-600">82%</p>
                  <p className="text-sm text-purple-600">Great progress! Following Indian lifestyle patterns</p>
                </div>

                {/* Current Routine */}
                <div>
                  <h3 className="font-medium mb-3">Today's Schedule (आज का कार्यक्रम)</h3>
                  <div className="space-y-2">
                    {indianRoutineOptimizer.currentRoutine.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded ${
                          item.completed ? "bg-green-50 text-green-700" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-300"}`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium">{item.time}</p>
                            <p className="text-xs text-gray-600">{item.activity}</p>
                            <p className="text-xs text-gray-500">{item.hindi}</p>
                          </div>
                        </div>
                        <Badge variant={item.completed ? "default" : "secondary"}>
                          {item.completed ? "Done" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Indian Lifestyle Suggestions */}
                <div>
                  <h3 className="font-medium mb-3">AI Suggestions (सुझाव)</h3>
                  <div className="space-y-2">
                    {indianRoutineOptimizer.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
                        <p className="text-sm text-blue-800">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Optimize My Indian Routine
                </Button>
              </CardContent>
            </Card>

            {/* Indian Festival & Seasonal Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Seasonal & Festival Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monsoon Health Prep</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-xs text-gray-600">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Festival Season Fitness</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <span className="text-xs text-gray-600">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Summer Hydration Goal</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <span className="text-xs text-gray-600">90%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
