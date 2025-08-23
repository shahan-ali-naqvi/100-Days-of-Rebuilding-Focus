"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Plus, Minus, RotateCcw } from "lucide-react"
import { useDay } from "@/contexts/DayContext"

export default function SettingsPage() {
  const { currentDay, updateDay, incrementDay, decrementDay, getProgress } = useDay()
  const [inputDay, setInputDay] = useState("")

  const setSpecificDay = () => {
    const day = parseInt(inputDay)
    if (day >= 1 && day <= 100) {
      updateDay(day)
      setInputDay("")
    }
  }

  const resetToDay1 = () => {
    updateDay(1)
  }

  const handleWeekIncrement = () => {
    updateDay(Math.min(currentDay + 7, 100))
  }

  const handleWeekDecrement = () => {
    updateDay(Math.max(currentDay - 7, 1))
  }

  const handleMonthIncrement = () => {
    updateDay(Math.min(currentDay + 30, 100))
  }

  const handleMonthDecrement = () => {
    updateDay(Math.max(currentDay - 30, 1))
  }

  const progress = getProgress()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your 100-day focus journey settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Day Counter Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Day Counter Management
            </CardTitle>
            <CardDescription>
              Update your current day in the 100-day challenge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-primary">Day {currentDay}</div>
              <p className="text-sm text-muted-foreground">of 100 days</p>
              <div className="mt-2">
                <div className="h-2 bg-muted rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Button 
                  onClick={decrementDay} 
                  variant="outline" 
                  size="sm"
                  disabled={currentDay <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={incrementDay} 
                  variant="outline" 
                  size="sm"
                  disabled={currentDay >= 100}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={resetToDay1} 
                  variant="outline" 
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter day (1-100)"
                  value={inputDay}
                  onChange={(e) => setInputDay(e.target.value)}
                  min="1"
                  max="100"
                  className="flex-1"
                />
                <Button onClick={setSpecificDay} disabled={!inputDay}>
                  Set Day
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Journey Overview</CardTitle>
            <CardDescription>
              Your progress through the 100-day challenge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{currentDay}</div>
                <p className="text-xs text-muted-foreground">Days Completed</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-500">{100 - currentDay}</div>
                <p className="text-xs text-muted-foreground">Days Remaining</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleWeekIncrement}>
                  +1 Week
                </Button>
                <Button variant="outline" size="sm" onClick={handleWeekDecrement}>
                  -1 Week
                </Button>
                <Button variant="outline" size="sm" onClick={handleMonthIncrement}>
                  +1 Month
                </Button>
                <Button variant="outline" size="sm" onClick={handleMonthDecrement}>
                  -1 Month
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings Sections */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Additional app preferences (coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>More settings options will be available in future updates</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}