"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Target,
  MapPin,
  Camera,
  Plus,
  ArrowLeft,
  Crown,
  Gift,
  Star,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPost, setNewPost] = useState("")

  // TODO: Move this to a proper API call later
  const socialFeed = [
    {
      id: 1,
      user: { name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40", verified: true },
      content: "Just completed my 10K steps challenge! 🚶‍♀️ The morning walk in Juhu Beach was amazing!",
      image: "/placeholder.svg?height=200&width=300",
      location: "Juhu Beach, Mumbai",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      category: "fitness",
      achievement: "10K Steps Master",
    },
    {
      id: 2,
      user: { name: "Rahul Patel", avatar: "/placeholder.svg?height=40&width=40", verified: false },
      content: "Found this amazing healthy restaurant in Bandra! Their quinoa bowl is incredible 🥗",
      image: "/placeholder.svg?height=200&width=300",
      location: "Bandra West, Mumbai",
      timestamp: "4 hours ago",
      likes: 18,
      comments: 12,
      category: "food",
      achievement: null,
    },
    {
      id: 3,
      user: { name: "Anita Singh", avatar: "/placeholder.svg?height=40&width=40", verified: true },
      content: "Emergency drill completed successfully! Always good to be prepared 🚨 #SafetyFirst",
      location: "Powai, Mumbai",
      timestamp: "6 hours ago",
      likes: 31,
      comments: 5,
      category: "safety",
      achievement: "Safety Champion",
    },
  ]

  // This could be optimized but works for now
  const friends = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      activity: "Walking in Juhu",
      healthScore: 92,
      streak: 15,
    },
    {
      id: 2,
      name: "Rahul Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      activity: "Yoga session",
      healthScore: 88,
      streak: 8,
    },
    {
      id: 3,
      name: "Anita Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      activity: "Last seen 2h ago",
      healthScore: 95,
      streak: 22,
    },
    {
      id: 4,
      name: "Vikram Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      activity: "Cycling in Bandra",
      healthScore: 90,
      streak: 12,
    },
  ]

  const challenges = [
    {
      id: 1,
      title: "Mumbai Monsoon Fitness",
      description: "Stay active during monsoon season",
      participants: 156,
      duration: "30 days",
      reward: "₹500 voucher",
      progress: 65,
      category: "fitness",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Healthy Eating Challenge",
      description: "Log 5 healthy meals daily",
      participants: 89,
      duration: "21 days",
      reward: "Premium features",
      progress: 40,
      category: "nutrition",
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Safety Awareness Week",
      description: "Complete safety training modules",
      participants: 234,
      duration: "7 days",
      reward: "Safety badge",
      progress: 85,
      category: "safety",
      difficulty: "Easy",
    },
  ]

  const achievements = [
    { name: "Early Bird", icon: "🌅", description: "Wake up before 6 AM for 7 days", unlocked: true },
    { name: "Hydration Hero", icon: "💧", description: "Drink 8+ glasses daily for 14 days", unlocked: true },
    { name: "Step Master", icon: "👟", description: "Complete 10K steps for 30 days", unlocked: false, progress: 75 },
    { name: "Safety First", icon: "🛡️", description: "Complete all safety modules", unlocked: true },
    { name: "Social Butterfly", icon: "🦋", description: "Connect with 10 friends", unlocked: false, progress: 60 },
    {
      name: "Wellness Warrior",
      icon: "⚡",
      description: "Maintain 90+ health score for 30 days",
      unlocked: false,
      progress: 45,
    },
  ]

  // Hardcoded for now - should come from API
  const leaderboard = [
    { rank: 1, name: "Anita Singh", score: 2450, avatar: "/placeholder.svg?height=32&width=32", badge: "👑" },
    { rank: 2, name: "You", score: 2380, avatar: "/placeholder.svg?height=32&width=32", badge: "🥈" },
    { rank: 3, name: "Priya Sharma", score: 2290, avatar: "/placeholder.svg?height=32&width=32", badge: "🥉" },
    { rank: 4, name: "Rahul Patel", score: 2150, avatar: "/placeholder.svg?height=32&width=32", badge: "" },
    { rank: 5, name: "Vikram Kumar", score: 2080, avatar: "/placeholder.svg?height=32&width=32", badge: "" },
  ]

  // Helper function - probably should move to utils
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fitness":
        return "bg-green-100 text-green-700"
      case "food":
        return "bg-orange-100 text-orange-700"
      case "safety":
        return "bg-red-100 text-red-700"
      case "nutrition":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    // Simple status colors
    if (status === "online") return "bg-green-500"
    if (status === "active") return "bg-yellow-500"
    return "bg-gray-400"
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
          <h1 className="text-2xl font-bold">Social Hub</h1>
          <Badge variant="secondary" className="ml-auto">
            Level 12
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="achievements">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            {/* Create Post */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Share your health journey..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Camera className="h-3 w-3 mr-1" />
                          Photo
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          Location
                        </Button>
                      </div>
                      <Button size="sm">Post</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Feed */}
            {socialFeed.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{post.user.name}</p>
                        {post.user.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                        {post.achievement && (
                          <Badge className={getCategoryColor(post.category)}>
                            <Trophy className="h-3 w-3 mr-1" />
                            {post.achievement}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                      {post.location && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{post.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm mb-3">{post.content}</p>

                  {post.image && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            {/* Friend Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Network
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-sm text-gray-600">Friends</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">156</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">89</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
              </CardContent>
            </Card>

            {/* Friends List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Friends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                            friend.status,
                          )}`}
                        ></div>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{friend.name}</p>
                        <p className="text-xs text-gray-600">{friend.activity}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Score: {friend.healthScore}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            🔥 {friend.streak}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-2 rounded ${
                      user.name === "You" ? "bg-blue-50 border border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{user.badge || `#${user.rank}`}</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="font-medium text-sm">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="font-bold text-sm">{user.score}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            {/* Active Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(challenge.category)}>{challenge.category}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{challenge.duration}</p>
                        <p className="text-xs text-gray-500">{challenge.participants} joined</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Gift className="h-3 w-3 text-purple-500" />
                          <span className="text-xs text-purple-600">{challenge.reward}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Create Challenge */}
            <Card>
              <CardHeader>
                <CardTitle>Create Your Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Challenge
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {/* Achievement Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                  <p className="text-sm text-gray-600">Unlocked</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">25</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
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
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        {!achievement.unlocked && achievement.progress && (
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
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
