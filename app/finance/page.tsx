"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  PiggyBank,
  Target,
  ArrowLeft,
  Plus,
  Receipt,
  Shield,
  Zap,
  IndianRupee,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useLocationContext } from "@/components/location-provider"

export default function FinancePage() {
  const { location } = useLocationContext()
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get currency based on location - fallback to INR for India
  const currency = location?.currency || "INR"
  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "£"

  // Mock data - in real app this would come from API
  const financialOverview = {
    balance: 45250,
    income: 75000,
    expenses: 29750,
    savings: 15500,
    investments: 12000,
    monthlyBudget: 35000,
    spentThisMonth: 29750,
  }

  const recentTransactions = [
    {
      id: 1,
      type: "expense",
      category: "Food",
      description: "Swiggy Order - Healthy Bowl",
      amount: 450,
      date: "Today, 2:30 PM",
      merchant: "Swiggy",
      healthRelated: true,
    },
    {
      id: 2,
      type: "expense",
      category: "Transport",
      description: "Auto Rickshaw - Bandra to Andheri",
      amount: 85,
      date: "Today, 10:15 AM",
      merchant: "Auto",
      healthRelated: false,
    },
    {
      id: 3,
      type: "income",
      category: "Salary",
      description: "Monthly Salary Credit",
      amount: 75000,
      date: "Yesterday",
      merchant: "Company",
      healthRelated: false,
    },
    {
      id: 4,
      type: "expense",
      category: "Health",
      description: "Gym Membership",
      amount: 2500,
      date: "2 days ago",
      merchant: "Fitness First",
      healthRelated: true,
    },
    {
      id: 5,
      type: "expense",
      category: "Health",
      description: "Pharmacy - Vitamins",
      amount: 850,
      date: "3 days ago",
      merchant: "PharmEasy",
      healthRelated: true,
    },
  ]

  // Budget categories with some realistic overspending
  const budgetCategories = [
    { name: "Food & Dining", budgeted: 8000, spent: 6500, color: "bg-orange-500", icon: "🍽️" },
    { name: "Transportation", budgeted: 4000, spent: 3200, color: "bg-blue-500", icon: "🚗" },
    { name: "Health & Fitness", budgeted: 5000, spent: 4100, color: "bg-green-500", icon: "💪" },
    { name: "Shopping", budgeted: 6000, spent: 7200, color: "bg-purple-500", icon: "🛍️" }, // Over budget!
    { name: "Entertainment", budgeted: 3000, spent: 2100, color: "bg-pink-500", icon: "🎬" },
    { name: "Utilities", budgeted: 4000, spent: 3800, color: "bg-yellow-500", icon: "⚡" },
  ]

  const savingsGoals = [
    {
      name: "Emergency Fund",
      target: 150000,
      current: 85000,
      deadline: "Dec 2024",
      priority: "high",
      icon: "🛡️",
    },
    {
      name: "Health Insurance",
      target: 25000,
      current: 18000,
      deadline: "Mar 2024",
      priority: "high",
      icon: "🏥",
    },
    {
      name: "Vacation Fund",
      target: 50000,
      current: 22000,
      deadline: "Jun 2024",
      priority: "medium",
      icon: "✈️",
    },
    {
      name: "Fitness Equipment",
      target: 15000,
      current: 8500,
      deadline: "Apr 2024",
      priority: "low",
      icon: "🏋️",
    },
  ]

  // Indian payment methods - very specific to Indian market
  const indianPaymentMethods = [
    { name: "UPI", icon: "📱", balance: "Linked to Bank", status: "active" },
    { name: "Paytm", icon: "💳", balance: "₹2,450", status: "active" },
    { name: "PhonePe", icon: "📞", balance: "₹1,200", status: "active" },
    { name: "Google Pay", icon: "🔍", balance: "Linked to Bank", status: "active" },
    { name: "HDFC Bank", icon: "🏦", balance: "₹45,250", status: "primary" },
    { name: "Credit Card", icon: "💳", balance: "₹8,500 due", status: "warning" },
  ]

  const healthSpendingInsights = {
    monthlyHealthSpending: 7450,
    healthBudget: 8000,
    topHealthCategories: [
      { name: "Gym & Fitness", amount: 2500, percentage: 34 },
      { name: "Healthy Food", amount: 2200, percentage: 30 },
      { name: "Supplements", amount: 1200, percentage: 16 },
      { name: "Medical", amount: 850, percentage: 11 },
      { name: "Wellness Apps", amount: 700, percentage: 9 },
    ],
    healthROI: "Your health investments saved ₹12,000 in medical bills this year!",
  }

  // AI suggestions - could be more personalized
  const smartSuggestions = [
    {
      type: "save",
      title: "Switch to Home Cooking",
      description: "You can save ₹3,200/month by cooking 60% of meals at home",
      impact: "₹38,400/year",
      difficulty: "Medium",
    },
    {
      type: "earn",
      title: "Cashback on Health Purchases",
      description: "Use HDFC card for health purchases to get 5% cashback",
      impact: "₹2,400/year",
      difficulty: "Easy",
    },
    {
      type: "invest",
      title: "Health Insurance Top-up",
      description: "Increase coverage by ₹5L for just ₹200/month",
      impact: "Better Protection",
      difficulty: "Easy",
    },
  ]

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString()}`
  }

  // Simple helper functions
  const getTransactionIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Food: "🍽️",
      Transport: "🚗",
      Health: "💊",
      Shopping: "🛍️",
      Entertainment: "🎬",
      Salary: "💰",
      Utilities: "⚡",
    }
    return icons[category] || "💳"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
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
          <h1 className="text-2xl font-bold">Finance Hub</h1>
          <Badge variant="secondary" className="ml-auto">
            {location?.country || "Global"}
          </Badge>
        </div>

        {/* Financial Overview Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm opacity-90">Total Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(financialOverview.balance)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-90">Income</p>
                <p className="font-semibold">{formatCurrency(financialOverview.income)}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Expenses</p>
                <p className="font-semibold">{formatCurrency(financialOverview.expenses)}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Savings</p>
                <p className="font-semibold">{formatCurrency(financialOverview.savings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Health Spending Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Health Investment Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Monthly Health Spending</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(healthSpendingInsights.monthlyHealthSpending)} /{" "}
                    {formatCurrency(healthSpendingInsights.healthBudget)}
                  </span>
                </div>
                <Progress
                  value={(healthSpendingInsights.monthlyHealthSpending / healthSpendingInsights.healthBudget) * 100}
                  className="h-2"
                />

                <div className="space-y-2">
                  {healthSpendingInsights.topHealthCategories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{category.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{formatCurrency(category.amount)}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">💡 Health ROI Insight</p>
                  <p className="text-sm text-green-700">{healthSpendingInsights.healthROI}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getTransactionIcon(transaction.category)}</div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-600">{transaction.date}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                          {transaction.healthRelated && (
                            <Badge className="bg-green-100 text-green-700 text-xs">Health</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Smart Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Smart Money Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {smartSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{suggestion.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700">💰 {suggestion.impact}</Badge>
                      <Button size="sm" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Monthly Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Spent this month</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(financialOverview.spentThisMonth)} /{" "}
                    {formatCurrency(financialOverview.monthlyBudget)}
                  </p>
                  <Progress
                    value={(financialOverview.spentThisMonth / financialOverview.monthlyBudget) * 100}
                    className="h-2 mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgetCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                        </p>
                        <p
                          className={`text-xs ${
                            category.spent > category.budgeted ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {category.spent > category.budgeted ? "Over budget" : "On track"}
                        </p>
                      </div>
                    </div>
                    <Progress value={(category.spent / category.budgeted) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            {/* Savings Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-pink-500" />
                  Savings Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savingsGoals.map((goal, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{goal.icon}</span>
                        <div>
                          <h3 className="font-semibold">{goal.name}</h3>
                          <p className="text-sm text-gray-600">Due: {goal.deadline}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                        </span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      <p className="text-xs text-gray-600">
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add New Goal */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Savings Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            {/* Payment Methods - Very India specific */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                  Payment Methods
                  <Badge variant="secondary" className="ml-auto">
                    India
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {indianPaymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs text-gray-600">{method.balance}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        method.status === "primary"
                          ? "default"
                          : method.status === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {method.status === "primary" ? "Primary" : method.status === "warning" ? "Due" : "Active"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex-col">
                  <IndianRupee className="h-6 w-6 mb-1" />
                  <span className="text-sm">Send Money</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CreditCard className="h-6 w-6 mb-1" />
                  <span className="text-sm">Pay Bills</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Smartphone className="h-6 w-6 mb-1" />
                  <span className="text-sm">Recharge</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Receipt className="h-6 w-6 mb-1" />
                  <span className="text-sm">Scan QR</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
