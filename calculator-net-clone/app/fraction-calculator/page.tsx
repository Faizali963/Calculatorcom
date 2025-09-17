"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function FractionCalculator() {
  const [num1, setNum1] = useState("")
  const [den1, setDen1] = useState("")
  const [num2, setNum2] = useState("")
  const [den2, setDen2] = useState("")
  const [operation, setOperation] = useState("add")
  const [results, setResults] = useState<{
    result: { numerator: number; denominator: number }
    decimal: number
    simplified: { numerator: number; denominator: number }
  } | null>(null)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b)
  }

  const simplifyFraction = (num: number, den: number) => {
    const divisor = gcd(num, den)
    return {
      numerator: num / divisor,
      denominator: den / divisor,
    }
  }

  const calculateFraction = () => {
    const n1 = Number.parseInt(num1)
    const d1 = Number.parseInt(den1)
    const n2 = Number.parseInt(num2)
    const d2 = Number.parseInt(den2)

    if (d1 === 0 || d2 === 0) return

    let resultNum: number
    let resultDen: number

    switch (operation) {
      case "add":
        resultNum = n1 * d2 + n2 * d1
        resultDen = d1 * d2
        break
      case "subtract":
        resultNum = n1 * d2 - n2 * d1
        resultDen = d1 * d2
        break
      case "multiply":
        resultNum = n1 * n2
        resultDen = d1 * d2
        break
      case "divide":
        resultNum = n1 * d2
        resultDen = d1 * n2
        break
      default:
        return
    }

    const simplified = simplifyFraction(resultNum, resultDen)
    const decimal = resultNum / resultDen

    setResults({
      result: { numerator: resultNum, denominator: resultDen },
      decimal,
      simplified,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Fraction Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Fractions</CardTitle>
                <CardDescription>Add, subtract, multiply, or divide fractions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>First Fraction</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      placeholder="1"
                      className="w-20"
                    />
                    <span className="text-2xl">/</span>
                    <Input
                      type="number"
                      value={den1}
                      onChange={(e) => setDen1(e.target.value)}
                      placeholder="2"
                      className="w-20"
                    />
                  </div>
                </div>

                <div>
                  <Label>Operation</Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Addition (+)</SelectItem>
                      <SelectItem value="subtract">Subtraction (-)</SelectItem>
                      <SelectItem value="multiply">Multiplication (×)</SelectItem>
                      <SelectItem value="divide">Division (÷)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Second Fraction</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                      placeholder="1"
                      className="w-20"
                    />
                    <span className="text-2xl">/</span>
                    <Input
                      type="number"
                      value={den2}
                      onChange={(e) => setDen2(e.target.value)}
                      placeholder="3"
                      className="w-20"
                    />
                  </div>
                </div>

                <Button onClick={calculateFraction} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Result</div>
                      <div className="text-3xl font-bold text-blue-600">
                        {results.result.numerator}/{results.result.denominator}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Simplified</div>
                      <div className="text-2xl font-semibold text-green-600">
                        {results.simplified.denominator === 1
                          ? results.simplified.numerator
                          : `${results.simplified.numerator}/${results.simplified.denominator}`}
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Decimal</div>
                      <div className="text-xl font-semibold text-purple-600">{results.decimal.toFixed(6)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter fractions and select an operation to calculate
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
