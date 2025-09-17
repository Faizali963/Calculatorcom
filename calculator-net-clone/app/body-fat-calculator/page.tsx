"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [results, setResults] = useState<{
    bodyFatPercentage: number
    category: string
    categoryColor: string
    leanBodyMass: number
    fatMass: number
  } | null>(null)

  const getBodyFatCategory = (bodyFat: number, gender: string) => {
    if (gender === "male") {
      if (bodyFat < 6) return { category: "Essential Fat", color: "text-blue-600" }
      if (bodyFat < 14) return { category: "Athletes", color: "text-green-600" }
      if (bodyFat < 18) return { category: "Fitness", color: "text-green-500" }
      if (bodyFat < 25) return { category: "Average", color: "text-yellow-600" }
      return { category: "Obese", color: "text-red-600" }
    } else {
      if (bodyFat < 14) return { category: "Essential Fat", color: "text-blue-600" }
      if (bodyFat < 21) return { category: "Athletes", color: "text-green-600" }
      if (bodyFat < 25) return { category: "Fitness", color: "text-green-500" }
      if (bodyFat < 32) return { category: "Average", color: "text-yellow-600" }
      return { category: "Obese", color: "text-red-600" }
    }
  }

  const calculateBodyFat = () => {
    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)
    const neckNum = Number.parseFloat(neck)
    const waistNum = Number.parseFloat(waist)
    const hipNum = Number.parseFloat(hip)

    if (heightNum <= 0 || weightNum <= 0 || neckNum <= 0 || waistNum <= 0) return
    if (gender === "female" && hipNum <= 0) return

    // US Navy Method
    let bodyFatPercentage: number

    if (gender === "male") {
      bodyFatPercentage =
        495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450
    } else {
      bodyFatPercentage =
        495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.221 * Math.log10(heightNum)) - 450
    }

    const { category, color } = getBodyFatCategory(bodyFatPercentage, gender)
    const fatMass = (bodyFatPercentage / 100) * weightNum
    const leanBodyMass = weightNum - fatMass

    setResults({
      bodyFatPercentage,
      category,
      categoryColor: color,
      leanBodyMass,
      fatMass,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Body Fat Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Body Fat</CardTitle>
                <CardDescription>Using the US Navy method with body measurements</CardDescription>
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
                  <Label htmlFor="neck">Neck Circumference (cm)</Label>
                  <Input
                    id="neck"
                    type="number"
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                    placeholder="37"
                  />
                </div>

                <div>
                  <Label htmlFor="waist">Waist Circumference (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    placeholder="85"
                  />
                </div>

                {gender === "female" && (
                  <div>
                    <Label htmlFor="hip">Hip Circumference (cm)</Label>
                    <Input
                      id="hip"
                      type="number"
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                      placeholder="95"
                    />
                  </div>
                )}

                <Button onClick={calculateBodyFat} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Body Fat
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Body Fat Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Body Fat Percentage</div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {results.bodyFatPercentage.toFixed(1)}%
                      </div>
                      <div className={`text-lg font-semibold ${results.categoryColor}`}>{results.category}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Lean Body Mass</div>
                        <div className="text-lg font-semibold text-green-600">{results.leanBodyMass.toFixed(1)} kg</div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">Fat Mass</div>
                        <div className="text-lg font-semibold text-orange-600">{results.fatMass.toFixed(1)} kg</div>
                      </div>
                    </div>

                    <Tabs defaultValue="male" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="male">Male Categories</TabsTrigger>
                        <TabsTrigger value="female">Female Categories</TabsTrigger>
                      </TabsList>

                      <TabsContent value="male" className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Essential Fat</span>
                          <span className="text-blue-600">2-5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Athletes</span>
                          <span className="text-green-600">6-13%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fitness</span>
                          <span className="text-green-500">14-17%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average</span>
                          <span className="text-yellow-600">18-24%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obese</span>
                          <span className="text-red-600">25%+</span>
                        </div>
                      </TabsContent>

                      <TabsContent value="female" className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Essential Fat</span>
                          <span className="text-blue-600">10-13%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Athletes</span>
                          <span className="text-green-600">14-20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fitness</span>
                          <span className="text-green-500">21-24%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average</span>
                          <span className="text-yellow-600">25-31%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obese</span>
                          <span className="text-red-600">32%+</span>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your measurements to calculate your body fat percentage
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
