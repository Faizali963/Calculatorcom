"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

export default function CalorieCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("sedentary")
  const [goal, setGoal] = useState("maintain")
  const [results, setResults] = useState<{
    bmr: number
    tdee: number
    goalCalories: number
    goalDescription: string
  } | null>(null)

  const calculateCalories = () => {
    const ageNum = Number.parseFloat(age)
    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)

    if (ageNum <= 0 || heightNum <= 0 || weightNum <= 0) return

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }

    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]

    // Goal adjustments
    let goalCalories = tdee
    let goalDescription = "Maintain current weight"

    switch (goal) {
      case "lose_slow":
        goalCalories = tdee - 250
        goalDescription = "Lose 0.5 lbs per week"
        break
      case "lose_fast":
        goalCalories = tdee - 500
        goalDescription = "Lose 1 lb per week"
        break
      case "gain_slow":
        goalCalories = tdee + 250
        goalDescription = "Gain 0.5 lbs per week"
        break
      case "gain_fast":
        goalCalories = tdee + 500
        goalDescription = "Gain 1 lb per week"
        break
    }

    setResults({
      bmr,
      tdee,
      goalCalories,
      goalDescription,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Calculator<span className="text-green-400">.net</span>
          </Link>
          <div className="text-sm">
            <Link href="/signin" className="hover:underline">
              sign in
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Calorie Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Daily Calories</CardTitle>
                <CardDescription>Find your daily caloric needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Gender</Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="age">Age (years)</Label>
                  <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="30" />
                </div>

                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                  />
                </div>

                <div>
                  <Label>Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose_fast">Lose 1 lb per week</SelectItem>
                      <SelectItem value="lose_slow">Lose 0.5 lbs per week</SelectItem>
                      <SelectItem value="maintain">Maintain weight</SelectItem>
                      <SelectItem value="gain_slow">Gain 0.5 lbs per week</SelectItem>
                      <SelectItem value="gain_fast">Gain 1 lb per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateCalories} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Calories
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Calorie Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Basal Metabolic Rate (BMR)</div>
                      <div className="text-xl font-semibold text-blue-600">{Math.round(results.bmr)} calories/day</div>
                      <div className="text-xs text-gray-500 mt-1">Calories burned at rest</div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Total Daily Energy Expenditure (TDEE)</div>
                      <div className="text-xl font-semibold text-green-600">
                        {Math.round(results.tdee)} calories/day
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Calories burned including activity</div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Goal: {results.goalDescription}</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(results.goalCalories)} calories/day
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Daily calorie target</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your details to calculate your daily calorie needs
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to All Calculators
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
