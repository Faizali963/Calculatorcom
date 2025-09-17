"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function BMICalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [unit, setUnit] = useState("metric")
  const [results, setResults] = useState<{
    bmi: number
    category: string
    categoryColor: string
  } | null>(null)

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" }
    if (bmi < 25) return { category: "Normal weight", color: "text-green-600" }
    if (bmi < 30) return { category: "Overweight", color: "text-orange-600" }
    return { category: "Obese", color: "text-red-600" }
  }

  const calculateBMI = () => {
    let heightInMeters: number
    let weightInKg: number

    if (unit === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
      weightInKg = Number.parseFloat(weight)
    } else {
      const totalInches = Number.parseFloat(heightFeet) * 12 + Number.parseFloat(heightInches)
      heightInMeters = totalInches * 0.0254
      weightInKg = Number.parseFloat(weight) * 0.453592
    }

    if (heightInMeters <= 0 || weightInKg <= 0) return

    const bmi = weightInKg / (heightInMeters * heightInMeters)
    const { category, color } = getBMICategory(bmi)

    setResults({
      bmi,
      category,
      categoryColor: color,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">BMI Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your BMI</CardTitle>
                <CardDescription>Body Mass Index calculation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (ft, in, lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {unit === "metric" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="heightFeet">Height (feet)</Label>
                        <Input
                          id="heightFeet"
                          type="number"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(e.target.value)}
                          placeholder="5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="heightInches">Height (inches)</Label>
                        <Input
                          id="heightInches"
                          type="number"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value)}
                          placeholder="9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (lbs)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="154"
                      />
                    </div>
                  </>
                )}

                <Button onClick={calculateBMI} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>BMI Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Your BMI</div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{results.bmi.toFixed(1)}</div>
                      <div className={`text-lg font-semibold ${results.categoryColor}`}>{results.category}</div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">BMI Categories:</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Underweight</span>
                          <span className="text-blue-600">Below 18.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Normal weight</span>
                          <span className="text-green-600">18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Overweight</span>
                          <span className="text-orange-600">25.0 - 29.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obese</span>
                          <span className="text-red-600">30.0 and above</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your height and weight to calculate your BMI
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
