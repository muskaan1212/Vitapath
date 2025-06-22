"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckSquare,
  Clock,
  Target,
  Brain,
  Zap,
  ArrowLeft,
  Plus,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Award,
  Focus,
  Coffee,
} from "lucide-react"
import Link from "next/link"

export default function ProductivityPage() {
  const [activeTimer, setActiveTimer] = useState<"pomodoro" | "break" | null>(null)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes
  const [currentTask, setCurrentTask] = useState("")
  const [newTask, setNewTask] = useState("")

  // Mock task data - would come from database in real app
  const tasks = [
    {
      id: 1,
      title: "Complete health checkup report",
      category: "Health",
      priority: "high",
      completed: false,
      estimatedTime: 45,
      dueDate: "Today",
    },
    {
      id: 2,
      title: "Plan weekly meal prep",
      category: "Health",
      priority: "medium",
      completed: false,
      estimatedTime: 30,
      dueDate: "Tomorrow",
    },
    {
      id: 3,
      title: "Update emergency contacts",
      category: "Safety",
      priority: "high",
      completed: true,
      estimatedTime: 15,
      dueDate: "Completed",
    },
    {
      id: 4,
      title: "Review monthly budget",
      category: "Finance",
      priority: "medium",
      completed: false,
      estimatedTime: 60,
      dueDate: "This week",
    },
    {
      id: 5,
      title: "Book gym session",
      category: "Fitness",
      priority: "low",
      completed: false,
      estimatedTime: 10,
      dueDate: "This week",
    },
  ]

  const habits = [
    {
      name: "Morning Meditation",
      streak: 12,
      target: 30,
      completed: true,
      category: "Wellness",
      icon: "🧘",
    },
    {
      name: "Drink 8 glasses of water",
      streak: 8,
      target: 21,
      completed: false,
      category: "Health",
      icon: "💧",
    },
    {
      name: "10,000 steps daily",
      streak: 15,
      target: 30,
      completed: true,
      category: "Fitness",
      icon: "👟",
    },
    {
      name: "Read for 30 minutes",
      streak: 5,
      target: 21,
      completed: false,
      category: "Learning",
      icon: "📚",
    },
    {
      name: "No phone after 10 PM",
      streak: 3,
      target: 14,
      completed: false,
      category: "Digital Wellness",
      icon: "📱",
    },
  ]

  // Some fake session data
  const focusSessions = [
    { date: "Today", sessions: 4, totalTime: 120, efficiency: 85 },
    { date: "Yesterday", sessions: 6, totalTime: 180, efficiency: 92 },
    { date: "2 days ago", sessions: 3, totalTime: 90, efficiency: 78 },
    { date: "3 days ago", sessions: 5, totalTime: 150, efficiency: 88 },
  ]

  const productivityInsights = {
    weeklyFocusTime: 720, // minutes
    averageSessionLength: 28,
    mostProductiveTime: "10:00 AM - 12:00 PM",
    completionRate: 78,
    streakDays: 12,
    totalTasksCompleted: 156,
  }

  // AI suggestions - could be more sophisticated
  const aiSuggestions = [
    {
      type: "schedule",
      title: "Optimize Your Peak Hours",
      description: "Schedule important tasks between 10 AM - 12 PM when you're most focused",
      impact: "25% productivity boost",
    },
    {
      type: "break",
      title: "Take More Micro-breaks",
      description: "5-minute breaks every 25 minutes can improve focus by 15%",
      impact: "Better concentration",
    },
    {
      type: "batch",
      title: "Batch Similar Tasks",
      description: "Group health-related tasks together to reduce context switching",
      impact: "Save 30 minutes daily",
    },
  ]

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setActiveTimer(null)
      // TODO: Add notification when timer completes
    }
    return () => clearInterval(interval)
  }, [activeTimer, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startPomodoro = () => {
    setActiveTimer("pomodoro")
    setTimeLeft(25 * 60)
  }

  const startBreak = () => {
    setActiveTimer("break")
    setTimeLeft(5 * 60)
  }

  const pauseTimer = () => {
    setActiveTimer(null)
  }

  const resetTimer = () => {
    setActiveTimer(null)
    setTimeLeft(25 * 60)
  }

  // Helper functions for styling
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Health":
        return "bg-green-100 text-green-700"
      case "Safety":
        return "bg-red-100 text-red-700"
      case "Finance":
        return "bg-blue-100 text-blue-700"
      case "Fitness":
        return "bg-purple-100 text-purple-700"
      case "Wellness":
        return "bg-pink-100 text-pink-700"
      case "Learning":
        return "bg-orange-100 text-orange-700"
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
          <h1 className="text-2xl font-bold">Productivity Hub</h1>
          <Badge variant="secondary" className="ml-auto">
            Level {Math.floor(productivityInsights.totalTasksCompleted / 20)}
          </Badge>
        </div>

        {/* Productivity Overview */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm opacity-90">Today's Focus Score</p>
              <p className="text-3xl font-bold">{productivityInsights.completionRate}%</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-90">Focus Time</p>
                <p className="font-semibold">
                  {Math.floor(productivityInsights.weeklyFocusTime / 60)}h {productivityInsights.weeklyFocusTime % 60}m
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Tasks Done</p>
                <p className="font-semibold">{productivityInsights.totalTasksCompleted}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Streak</p>
                <p className="font-semibold">{productivityInsights.streakDays} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="focus" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="habits">Habits</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="focus" className="space-y-4">
            {/* Pomodoro Timer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Focus className="h-5 w-5 text-red-500" />
                  Focus Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative">
                  <div className="text-6xl font-bold text-gray-800 mb-2">{formatTime(timeLeft)}</div>
                  <p className="text-sm text-gray-600">
                    {activeTimer === "pomodoro"
                      ? "Focus Session"
                      : activeTimer === "break"
                        ? "Break Time"
                        : "Ready to Focus"}
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {!activeTimer ? (
                    <>
                      <Button onClick={startPomodoro} className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Start Focus (25m)
                      </Button>
                      <Button onClick={startBreak} variant="outline" className="flex items-center gap-2">
                        <Coffee className="h-4 w-4" />
                        Break (5m)
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={pauseTimer} variant="outline">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button onClick={resetTimer} variant="outline">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                {currentTask && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">Current Task:</p>
                    <p className="font-medium text-blue-900">{currentTask}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Focus Sessions History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {focusSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{session.date}</p>
                      <p className="text-xs text-gray-600">
                        {session.sessions} sessions • {session.totalTime} minutes
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.efficiency}% efficient
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Productivity Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI Productivity Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h3 className="font-medium text-sm mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    <Badge className="bg-purple-100 text-purple-700">💡 {suggestion.impact}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {/* Add New Task */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Input placeholder="Add a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                  <Button>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-blue-500" />
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className={`p-3 border rounded-lg ${task.completed ? "opacity-60" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 mt-0.5 ${
                          task.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`}
                      >
                        {task.completed && <CheckSquare className="h-3 w-3 text-white m-0.5" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${task.completed ? "line-through" : ""}`}>{task.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {task.estimatedTime}m
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={() => setCurrentTask(task.title)}
                      >
                        Start Focus Session
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Task Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Task Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{tasks.filter((t) => t.completed).length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{tasks.filter((t) => !t.completed).length}</p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="habits" className="space-y-4">
            {/* Daily Habits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Daily Habits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {habits.map((habit, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{habit.icon}</span>
                        <div>
                          <p className="font-medium">{habit.name}</p>
                          <p className="text-sm text-gray-600">
                            {habit.streak} day streak • Target: {habit.target} days
                          </p>
                        </div>
                      </div>
                      <Badge className={habit.completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {habit.completed ? "Done" : "Pending"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to target</span>
                        <span>
                          {habit.streak}/{habit.target} days
                        </span>
                      </div>
                      <Progress value={(habit.streak / habit.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Habit Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Habit Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">🎯 Best Streak</p>
                  <p className="text-sm text-green-700">10,000 steps daily - 15 days in a row!</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">📈 Improvement Area</p>
                  <p className="text-sm text-blue-700">Try setting a consistent bedtime for better digital wellness</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">💡 Suggestion</p>
                  <p className="text-sm text-purple-700">Stack habits: Meditate right after your morning coffee</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            {/* Productivity Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Productivity Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{productivityInsights.averageSessionLength}m</p>
                    <p className="text-sm text-blue-700">Avg Session</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{productivityInsights.completionRate}%</p>
                    <p className="text-sm text-green-700">Completion Rate</p>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">⏰ Peak Performance</p>
                  <p className="text-sm text-yellow-700">{productivityInsights.mostProductiveTime}</p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{day}</span>
                    <div className="flex-1 mx-3">
                      <Progress value={Math.random() * 100} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{Math.floor(Math.random() * 8)}h</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium text-sm mb-1">🌅 Morning Routine Optimization</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Start your day with the most important task when your energy is highest
                  </p>
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                  </Button>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium text-sm mb-1">🎯 Focus Block Scheduling</h3>
                  <p className="text-sm text-gray-600 mb-2">Block 2-hour periods for deep work without interruptions</p>
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                  </Button>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium text-sm mb-1">🌙 Evening Wind-down</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Create a 30-minute routine to improve sleep quality and next-day performance
                  </p>
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
