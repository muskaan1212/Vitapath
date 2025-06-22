"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Award, Target, Clock, Star, ArrowLeft, Search, TrendingUp, Brain, Users } from "lucide-react"
import Link from "next/link"

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Some stats - would be dynamic in real app
  const learningStats = {
    coursesCompleted: 12,
    hoursLearned: 156,
    currentStreak: 8,
    skillsAcquired: 24,
    certificatesEarned: 6,
    studyGoalProgress: 75,
  }

  // Current courses - hardcoded for now
  const currentCourses = [
    {
      id: 1,
      title: "Nutrition Science Fundamentals",
      instructor: "Dr. Sarah Johnson",
      category: "Health",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      duration: "6 weeks",
      rating: 4.8,
      nextLesson: "Micronutrients and Metabolism",
      timeLeft: "2h 30m",
    },
    {
      id: 2,
      title: "Personal Finance Mastery",
      instructor: "Raj Patel",
      category: "Finance",
      progress: 40,
      totalLessons: 18,
      completedLessons: 7,
      duration: "4 weeks",
      rating: 4.6,
      nextLesson: "Investment Strategies",
      timeLeft: "1h 45m",
    },
    {
      id: 3,
      title: "Emergency Response Training",
      instructor: "Mumbai Fire Dept.",
      category: "Safety",
      progress: 85,
      totalLessons: 12,
      completedLessons: 10,
      duration: "2 weeks",
      rating: 4.9,
      nextLesson: "Advanced First Aid",
      timeLeft: "45m",
    },
  ]

  const recommendedCourses = [
    {
      id: 4,
      title: "Ayurvedic Wellness Principles",
      instructor: "Dr. Priya Sharma",
      category: "Health",
      duration: "8 weeks",
      rating: 4.7,
      students: 2340,
      price: "₹2,999",
      level: "Beginner",
      description: "Learn traditional Indian wellness practices for modern life",
    },
    {
      id: 5,
      title: "Urban Safety & Self-Defense",
      instructor: "Security Expert Team",
      category: "Safety",
      duration: "3 weeks",
      rating: 4.8,
      students: 1890,
      price: "₹1,499",
      level: "Intermediate",
      description: "Essential safety skills for city living",
    },
    {
      id: 6,
      title: "Mindful Productivity",
      instructor: "Meditation Masters",
      category: "Productivity",
      duration: "5 weeks",
      rating: 4.6,
      students: 3200,
      price: "₹1,999",
      level: "Beginner",
      description: "Combine mindfulness with productivity techniques",
    },
    {
      id: 7,
      title: "Indian Stock Market Basics",
      instructor: "Finance Guru",
      category: "Finance",
      duration: "6 weeks",
      rating: 4.5,
      students: 4500,
      price: "₹3,499",
      level: "Beginner",
      description: "Navigate the Indian stock market with confidence",
    },
  ]

  const skillPaths = [
    {
      name: "Health & Wellness Expert",
      courses: 8,
      progress: 62,
      estimatedTime: "3 months",
      skills: ["Nutrition", "Fitness", "Mental Health", "Ayurveda"],
      icon: "🏥",
    },
    {
      name: "Personal Safety Specialist",
      courses: 5,
      progress: 80,
      estimatedTime: "1 month",
      skills: ["Emergency Response", "Self-Defense", "Risk Assessment"],
      icon: "🛡️",
    },
    {
      name: "Financial Independence",
      courses: 10,
      progress: 35,
      estimatedTime: "4 months",
      skills: ["Budgeting", "Investing", "Tax Planning", "Insurance"],
      icon: "💰",
    },
    {
      name: "Productivity Master",
      courses: 6,
      progress: 45,
      estimatedTime: "2 months",
      skills: ["Time Management", "Focus", "Habits", "Goal Setting"],
      icon: "⚡",
    },
  ]

  const achievements = [
    { name: "First Course Completed", icon: "🎓", unlocked: true, date: "2 weeks ago" },
    { name: "7-Day Learning Streak", icon: "🔥", unlocked: true, date: "1 week ago" },
    { name: "Health Expert Badge", icon: "💊", unlocked: true, date: "3 days ago" },
    { name: "Quick Learner", icon: "⚡", unlocked: false, progress: 75 },
    { name: "Knowledge Sharer", icon: "📚", unlocked: false, progress: 40 },
    { name: "Skill Master", icon: "🏆", unlocked: false, progress: 60 },
  ]

  // Weekly schedule - could be more dynamic
  const studySchedule = [
    { day: "Monday", time: "7:00 PM", course: "Nutrition Science", duration: "1h" },
    { day: "Tuesday", time: "8:00 AM", course: "Personal Finance", duration: "45m" },
    { day: "Wednesday", time: "7:00 PM", course: "Emergency Response", duration: "30m" },
    { day: "Thursday", time: "8:00 AM", course: "Nutrition Science", duration: "1h" },
    { day: "Friday", time: "6:30 PM", course: "Personal Finance", duration: "45m" },
    { day: "Saturday", time: "10:00 AM", course: "Review & Practice", duration: "2h" },
    { day: "Sunday", time: "Rest Day", course: "Light Reading", duration: "30m" },
  ]

  const categories = [
    { id: "all", name: "All", count: 150 },
    { id: "health", name: "Health", count: 45 },
    { id: "finance", name: "Finance", count: 32 },
    { id: "safety", name: "Safety", count: 28 },
    { id: "productivity", name: "Productivity", count: 25 },
    { id: "technology", name: "Technology", count: 20 },
  ]

  // Helper functions for colors
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "health":
        return "bg-green-100 text-green-700"
      case "finance":
        return "bg-blue-100 text-blue-700"
      case "safety":
        return "bg-red-100 text-red-700"
      case "productivity":
        return "bg-purple-100 text-purple-700"
      case "technology":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "advanced":
        return "bg-red-100 text-red-700"
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
          <h1 className="text-2xl font-bold">Learning Hub</h1>
          <Badge variant="secondary" className="ml-auto">
            Level {Math.floor(learningStats.coursesCompleted / 3)}
          </Badge>
        </div>

        {/* Learning Overview */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm opacity-90">Learning Progress</p>
              <p className="text-3xl font-bold">{learningStats.studyGoalProgress}%</p>
              <p className="text-sm opacity-90">Monthly Goal</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-90">Courses</p>
                <p className="font-semibold">{learningStats.coursesCompleted}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Hours</p>
                <p className="font-semibold">{learningStats.hoursLearned}h</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Streak</p>
                <p className="font-semibold">{learningStats.currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="paths">Paths</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-green-500" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">by {course.instructor}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Next: {course.nextLesson}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {course.timeLeft}
                        </div>
                        <Button size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  This Week's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {studySchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-16">{schedule.day}</span>
                      <span className="text-sm text-gray-600">{schedule.time}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{schedule.course}</p>
                      <p className="text-xs text-gray-500">{schedule.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="explore" className="space-y-4">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">by {course.instructor}</p>
                        <p className="text-sm text-gray-700 mb-2">{course.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                          <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          {course.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.students.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </div>
                      </div>
                      <p className="font-bold text-green-600">{course.price}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Enroll Now
                      </Button>
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paths" className="space-y-4">
            {/* Skill Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Learning Paths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillPaths.map((path, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{path.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold">{path.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {path.courses} courses • {path.estimatedTime}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {path.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <Button size="sm" className="w-full mt-3">
                      {path.progress > 0 ? "Continue Path" : "Start Path"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            {/* Learning Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Learning Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{learningStats.skillsAcquired}</p>
                  <p className="text-sm text-blue-700">Skills Acquired</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{learningStats.certificatesEarned}</p>
                  <p className="text-sm text-green-700">Certificates</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{learningStats.hoursLearned}</p>
                  <p className="text-sm text-purple-700">Hours Learned</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{learningStats.currentStreak}</p>
                  <p className="text-sm text-orange-700">Day Streak</p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      achievement.unlocked ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className={`font-medium ${achievement.unlocked ? "text-yellow-800" : "text-gray-600"}`}>
                          {achievement.name}
                        </p>
                        {achievement.unlocked ? (
                          <p className="text-sm text-yellow-600">Unlocked {achievement.date}</p>
                        ) : (
                          achievement.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div
                                  className="bg-blue-500 h-1 rounded-full"
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">📚 Favorite Subject</p>
                  <p className="text-sm text-blue-700">Health & Wellness - 65% of your learning time</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">⏰ Best Learning Time</p>
                  <p className="text-sm text-green-700">7:00 PM - 9:00 PM (highest completion rate)</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">🎯 Recommendation</p>
                  <p className="text-sm text-purple-700">Try shorter 15-minute sessions for better retention</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
