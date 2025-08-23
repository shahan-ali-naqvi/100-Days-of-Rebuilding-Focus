"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Calendar, CheckSquare, TrendingUp, Plus, Clock } from "lucide-react"
import { useDay } from "@/contexts/DayContext"

export default function DashboardPage() {
  const { currentDay, getProgress } = useDay()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to Focus!
        </h1>
        <p className="text-muted-foreground mt-2">
          Day {currentDay} of your 100-day focus journey. Let us build better habits together.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Day</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentDay}</div>
            <p className="text-xs text-muted-foreground">of 100 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">goals to achieve</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habits</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">habits tracked</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0h</div>
            <p className="text-xs text-muted-foreground">today</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with your focus journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Goal
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CheckSquare className="mr-2 h-4 w-4" />
              Set Up Daily Habits
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Start Focus Session
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>
              Your 100-day journey visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{getProgress()}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full transition-all duration-300" style={{ width: `${getProgress()}%` }} />
                </div>
              </div>
              
              <div className="text-center py-4">
                <div className="text-2xl font-bold text-primary">Day {currentDay}</div>
                <p className="text-sm text-muted-foreground">
                  Every journey begins with a single step
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Features Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Features that will help you on your focus journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg bg-muted/50">
              <Target className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-medium">Goal Setting</h3>
              <p className="text-sm text-muted-foreground">Set and track your long-term objectives</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-muted/50">
              <CheckSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-medium">Habit Tracking</h3>
              <p className="text-sm text-muted-foreground">Build consistent daily habits</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-muted/50">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-medium">AI Coach</h3>
              <p className="text-sm text-muted-foreground">Get personalized guidance and insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}