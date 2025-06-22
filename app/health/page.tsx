"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Activity,
  Apple,
  Dumbbell,
  Brain,
  Calendar,
  ArrowLeft,
  Award,
  Play,
  BookOpen,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function HealthPage() {
  const [selectedPlan, setSelectedPlan] = useState("weight-loss")

  const healthProfile = {
    age: 28,
    height: "5'6\"",
    weight: "65 kg",
    bmi: 23.1,
    goal: "Weight Loss",
    activityLevel: "Moderate",
  }

  const dailyStats = {
    calories: { current: 1850, target: 2000 },
    protein: { current: 85, target: 120 },
    carbs: { current: 180, target: 200 },
    fat: { current: 65, target: 70 },
    water: { current: 6, target: 8 },
    steps: { current: 7842, target: 10000 },
  }

  const dietPlans = [
    {
      id: "weight-loss",
      name: "Weight Loss Plan",
      description: "Balanced nutrition for healthy weight loss",
      calories: "1800-2000",
      duration: "12 weeks",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "muscle-gain",
      name: "Muscle Building",
      description: "High protein diet for muscle development",
      calories: "2200-2500",
      duration: "16 weeks",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "maintenance",
      name: "Maintenance",
      description: "Balanced diet to maintain current weight",
      calories: "2000-2200",
      duration: "Ongoing",
      color: "bg-green-100 text-green-700",
    },
  ]

  const workoutPlaylists = [
    { name: "High Energy Cardio", duration: "45 min", songs: 15, genre: "Pop/Electronic" },
    { name: "Strength Training", duration: "60 min", songs: 20, genre: "Rock/Hip-Hop" },
    { name: "Yoga & Meditation", duration: "30 min", songs: 10, genre: "Ambient/Classical" },
    { name: "Morning Motivation", duration: "25 min", songs: 8, genre: "Upbeat Pop" },
  ]

  const courses = [
    { title: "Nutrition Basics", progress: 75, lessons: 12, category: "Nutrition" },
    { title: "Home Workouts", progress: 40, lessons: 8, category: "Fitness" },
    { title: "Mental Wellness", progress: 90, lessons: 15, category: "Mental Health" },
    { title: "Meal Prep Mastery", progress: 25, lessons: 10, category: "Cooking" },
  ]

  const selfWorthActivities = [
    { title: "Daily Affirmations", completed: true, streak: 7 },
    { title: "Gratitude Journal", completed: false, streak: 3 },
    { title: "Achievement Log", completed: true, streak: 5 },
    { title: "Mindfulness Practice", completed: false, streak: 2 },
  ]

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
          <h1 className="text-2xl font-bold">Health & Wellness</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
            <TabsTrigger value="fitness">Fitness</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Health Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Health Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{healthProfile.bmi}</p>
                    <p className="text-sm text-gray-600">BMI</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{healthProfile.weight}</p>
                    <p className="text-sm text-gray-600">Weight</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{healthProfile.goal}</p>
                    <p className="text-xs text-gray-600">Current Goal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{healthProfile.activityLevel}</p>
                    <p className="text-xs text-gray-600">Activity Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(dailyStats).map(([key, stat]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{key}</span>
                      <span>
                        {stat.current}/{stat.target} {key === "steps" ? "" : key === "water" ? "glasses" : "g"}
                      </span>
                    </div>
                    <Progress value={(stat.current / stat.target) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/chatbot">
                <Button className="w-full" variant="outline">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Health Chat
                </Button>
              </Link>
              <Button className="w-full" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="diet" className="space-y-4">
            {/* Diet Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-green-500" />
                  Diet Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dietPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{plan.name}</h3>
                      <Badge className={plan.color}>{plan.duration}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                    <p className="text-xs text-gray-500">{plan.calories} calories/day</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Meal Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Meal Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">Breakfast</p>
                    <p className="text-sm text-gray-600">Oatmeal with berries</p>
                    <p className="text-xs text-gray-500">320 calories</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium">Lunch</p>
                    <p className="text-sm text-gray-600">Grilled chicken salad</p>
                    <p className="text-xs text-gray-500">450 calories</p>
                  </div>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Dinner</p>
                    <p className="text-sm text-gray-600">Salmon with vegetables</p>
                    <p className="text-xs text-gray-500">520 calories</p>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fitness" className="space-y-4">
            {/* Exercise Playlists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-purple-500" />
                  Exercise Playlists
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workoutPlaylists.map((playlist, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{playlist.name}</p>
                      <p className="text-sm text-gray-600">
                        {playlist.genre} • {playlist.songs} songs
                      </p>
                      <p className="text-xs text-gray-500">{playlist.duration}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Play
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Workout Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  This Week's Workouts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                  <div key={day} className="flex items-center justify-between p-2 rounded">
                    <span className="text-sm font-medium">{day}</span>
                    <Badge variant={index < 3 ? "default" : index === 3 ? "secondary" : "outline"}>
                      {index < 3 ? "Completed" : index === 3 ? "Today" : "Planned"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-4">
            {/* Self-Worth Builder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Self-Worth Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selfWorthActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.streak} day streak</p>
                    </div>
                    <Badge variant={activity.completed ? "default" : "secondary"}>
                      {activity.completed ? "Done Today" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Curated Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  Curated Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {courses.map((course, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{course.title}</p>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-2" />
                    <p className="text-xs text-gray-500">{course.lessons} lessons</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mental Health Check */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Mental Health Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">😊</div>
                  <p className="font-medium">How are you feeling today?</p>
                  <div className="flex justify-center gap-2">
                    {["😢", "😐", "😊", "😄", "🤩"].map((emoji, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-2xl p-2">
                        {emoji}
                      </Button>
                    ))}
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
