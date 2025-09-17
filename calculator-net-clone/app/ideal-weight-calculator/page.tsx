"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState("male")
  const [height, setHeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [unit, setUnit] = useState("metric")
  const [results, setResults] = useState<{
    robinson: number
    miller: number
    devine: number
    hamwi: number
    healthy: { min: number; max: number }
  } | null>(null)

  const calculateIdealWeight = () => {
    let heightInCm: number

    if (unit === "metric") {
      heightInCm = Number.parseFloat(height)
    } else {
      const totalInches = Number.parseFloat(heightFeet) * 12 + Number.parseFloat(heightInches)
      heightInCm = totalInches * 2.54
    }

    if (heightInCm <= 0) return

    const heightInInches = heightInCm / 2.54

    // Robinson Formula (1983)
    let robinson: number
    if (gender === "male") {
      robinson = 52 + 1.9 * (heightInInches - 60)
    } else {
      robinson = 49 + 1.7 * (heightInInches - 60)
    }

    // Miller Formula (1983)
    let miller: number
    if (gender === "male") {
      miller = 56.2 + 1.41 * (heightInInches - 60)
    } else {
      miller = 53.1 + 1.36 * (heightInInches - 60)
    }

    // Devine Formula (1974)
    let devine: number
    if (gender === "male") {
      devine = 50 + 2.3 * (heightInInches - 60)
    } else {
      devine = 45.5 + 2.3 * (heightInInches - 60)
    }

    // Hamwi Formula (1964)
    let hamwi: number
    if (gender === "male") {
      hamwi = 48 + 2.7 * (heightInInches - 60)
    } else {
      hamwi = 45.5 + 2.2 * (heightInInches - 60)
    }

    // Healthy BMI Range (18.5-24.9)
    const heightInMeters = heightInCm / 100
    const minHealthy = 18.5 * heightInMeters * heightInMeters
    const maxHealthy = 24.9 * heightInMeters * heightInMeters

    setResults({
      robinson,
      miller,
      devine,
      hamwi,
      healthy: { min: minHealthy, max: maxHealthy },
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Ideal Weight Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Ideal Weight</CardTitle>
                <CardDescription>Using multiple scientific formulas</CardDescription>
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
                  <Label>Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (ft, in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {unit === "metric" ? (
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
                ) : (
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
                )}

                <Button onClick={calculateIdealWeight} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Ideal Weight
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Ideal Weight Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Healthy BMI Range</div>
                      <div className="text-xl font-semibold text-green-600">
                        {results.healthy.min.toFixed(1)} - {results.healthy.max.toFixed(1)} kg
                      </div>
                      <div className="text-xs text-gray-500 mt-1">BMI 18.5 - 24.9</div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-700">Scientific Formulas:</h3>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Robinson Formula (1983)</div>
                        <div className="text-lg font-semibold text-blue-600">{results.robinson.toFixed(1)} kg</div>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Miller Formula (1983)</div>
                        <div className="text-lg font-semibold text-purple-600">{results.miller.toFixed(1)} kg</div>
                      </div>

                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">Devine Formula (1974)</div>
                        <div className="text-lg font-semibold text-orange-600">{results.devine.toFixed(1)} kg</div>
                      </div>

                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="text-sm text-gray-600">Hamwi Formula (1964)</div>
                        <div className="text-lg font-semibold text-red-600">{results.hamwi.toFixed(1)} kg</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-4">
                      Note: These are estimates. Consult with a healthcare professional for personalized advice.
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your height to calculate your ideal weight range
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
