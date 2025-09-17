"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Shuffle } from "lucide-react"
import Link from "next/link"

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("1")
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [results, setResults] = useState<number[]>([])
  const [history, setHistory] = useState<number[][]>([])

  const generateNumbers = () => {
    const minNum = Number.parseInt(min)
    const maxNum = Number.parseInt(max)
    const countNum = Number.parseInt(count)

    if (minNum >= maxNum || countNum <= 0) return

    const range = maxNum - minNum + 1
    if (!allowDuplicates && countNum > range) return

    const newNumbers: number[] = []
    const usedNumbers = new Set<number>()

    for (let i = 0; i < countNum; i++) {
      let randomNum: number

      if (allowDuplicates) {
        randomNum = Math.floor(Math.random() * range) + minNum
      } else {
        do {
          randomNum = Math.floor(Math.random() * range) + minNum
        } while (usedNumbers.has(randomNum))
        usedNumbers.add(randomNum)
      }

      newNumbers.push(randomNum)
    }

    setResults(newNumbers)
    setHistory((prev) => [newNumbers, ...prev.slice(0, 9)]) // Keep last 10 generations
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Random Number Generator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Random Numbers</CardTitle>
                <CardDescription>Customize your random number generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min">Minimum</Label>
                    <Input
                      id="min"
                      type="number"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max">Maximum</Label>
                    <Input
                      id="max"
                      type="number"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="count">How many numbers?</Label>
                  <Input
                    id="count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="1"
                    min="1"
                    max="1000"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="duplicates"
                    checked={allowDuplicates}
                    onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)}
                  />
                  <Label htmlFor="duplicates">Allow duplicate numbers</Label>
                </div>

                <Button onClick={generateNumbers} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Generate Numbers
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-3">Your Random Numbers:</div>
                      <div className="flex flex-wrap gap-2">
                        {results.map((num, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold text-lg"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>

                    {results.length > 1 && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-gray-600">Sum</div>
                          <div className="font-semibold text-blue-600">{results.reduce((a, b) => a + b, 0)}</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-gray-600">Average</div>
                          <div className="font-semibold text-purple-600">
                            {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Click "Generate Numbers" to create random numbers
                  </div>
                )}

                {history.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Recent Generations:</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {history.map((generation, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                          {generation.join(", ")}
                        </div>
                      ))}
                    </div>
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
