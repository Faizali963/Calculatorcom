"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TriangleCalculator() {
  const [calculationType, setCalculationType] = useState("area")
  const [base, setBase] = useState("")
  const [height, setHeight] = useState("")
  const [sideA, setSideA] = useState("")
  const [sideB, setSideB] = useState("")
  const [sideC, setSideC] = useState("")
  const [results, setResults] = useState<{
    area?: number
    perimeter?: number
    angles?: { A: number; B: number; C: number }
    type?: string
  } | null>(null)

  const calculateTriangle = () => {
    if (calculationType === "area") {
      const b = Number.parseFloat(base)
      const h = Number.parseFloat(height)
      if (b > 0 && h > 0) {
        setResults({ area: (b * h) / 2 })
      }
    } else if (calculationType === "sides") {
      const a = Number.parseFloat(sideA)
      const b = Number.parseFloat(sideB)
      const c = Number.parseFloat(sideC)

      if (a > 0 && b > 0 && c > 0) {
        // Check if valid triangle
        if (a + b > c && b + c > a && a + c > b) {
          // Calculate area using Heron's formula
          const s = (a + b + c) / 2
          const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))

          // Calculate angles using law of cosines
          const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI)
          const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI)
          const angleC = 180 - angleA - angleB

          // Determine triangle type
          let type = "Scalene"
          if (a === b && b === c) type = "Equilateral"
          else if (a === b || b === c || a === c) type = "Isosceles"

          // Check if right triangle
          const sides = [a, b, c].sort((x, y) => x - y)
          if (Math.abs(sides[0] * sides[0] + sides[1] * sides[1] - sides[2] * sides[2]) < 0.001) {
            type += " Right"
          }

          setResults({
            area,
            perimeter: a + b + c,
            angles: { A: angleA, B: angleB, C: angleC },
            type,
          })
        }
      }
    }
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Triangle Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Triangle Properties</CardTitle>
                <CardDescription>Calculate area, perimeter, and angles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area">Area (Base & Height)</SelectItem>
                      <SelectItem value="sides">Complete Analysis (3 Sides)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "area" ? (
                  <>
                    <div>
                      <Label htmlFor="base">Base</Label>
                      <Input
                        id="base"
                        type="number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="8"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="sideA">Side A</Label>
                      <Input
                        id="sideA"
                        type="number"
                        value={sideA}
                        onChange={(e) => setSideA(e.target.value)}
                        placeholder="3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sideB">Side B</Label>
                      <Input
                        id="sideB"
                        type="number"
                        value={sideB}
                        onChange={(e) => setSideB(e.target.value)}
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sideC">Side C</Label>
                      <Input
                        id="sideC"
                        type="number"
                        value={sideC}
                        onChange={(e) => setSideC(e.target.value)}
                        placeholder="5"
                      />
                    </div>
                  </>
                )}

                <Button onClick={calculateTriangle} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Triangle Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    {results.area !== undefined && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Area</div>
                        <div className="text-2xl font-bold text-blue-600">{results.area.toFixed(2)} square units</div>
                      </div>
                    )}

                    {results.perimeter !== undefined && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Perimeter</div>
                        <div className="text-xl font-semibold text-green-600">{results.perimeter.toFixed(2)} units</div>
                      </div>
                    )}

                    {results.type && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Triangle Type</div>
                        <div className="text-lg font-semibold text-purple-600">{results.type}</div>
                      </div>
                    )}

                    {results.angles && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-2">Angles</div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="font-semibold">Angle A</div>
                            <div className="text-orange-600">{results.angles.A.toFixed(1)}°</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">Angle B</div>
                            <div className="text-orange-600">{results.angles.B.toFixed(1)}°</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">Angle C</div>
                            <div className="text-orange-600">{results.angles.C.toFixed(1)}°</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter triangle measurements to calculate properties
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
