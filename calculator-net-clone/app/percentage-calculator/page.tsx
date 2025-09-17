"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function PercentageCalculator() {
  // What is X% of Y?
  const [percentage1, setPercentage1] = useState("")
  const [value1, setValue1] = useState("")
  const [result1, setResult1] = useState<number | null>(null)

  // X is what percent of Y?
  const [value2, setValue2] = useState("")
  const [total2, setTotal2] = useState("")
  const [result2, setResult2] = useState<number | null>(null)

  // Percentage change
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")
  const [result3, setResult3] = useState<{ change: number; increase: boolean } | null>(null)

  const calculatePercentageOf = () => {
    const percent = Number.parseFloat(percentage1)
    const value = Number.parseFloat(value1)
    if (!isNaN(percent) && !isNaN(value)) {
      setResult1((percent / 100) * value)
    }
  }

  const calculateWhatPercent = () => {
    const value = Number.parseFloat(value2)
    const total = Number.parseFloat(total2)
    if (!isNaN(value) && !isNaN(total) && total !== 0) {
      setResult2((value / total) * 100)
    }
  }

  const calculatePercentageChange = () => {
    const oldVal = Number.parseFloat(oldValue)
    const newVal = Number.parseFloat(newValue)
    if (!isNaN(oldVal) && !isNaN(newVal) && oldVal !== 0) {
      const change = ((newVal - oldVal) / oldVal) * 100
      setResult3({
        change: Math.abs(change),
        increase: change >= 0,
      })
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Percentage Calculator</h1>

          <Tabs defaultValue="percentage-of" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="percentage-of">% of Value</TabsTrigger>
              <TabsTrigger value="what-percent">What %</TabsTrigger>
              <TabsTrigger value="percent-change">% Change</TabsTrigger>
            </TabsList>

            <TabsContent value="percentage-of">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>What is X% of Y?</CardTitle>
                    <CardDescription>Calculate a percentage of a value</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="percentage1">Percentage (%)</Label>
                      <Input
                        id="percentage1"
                        type="number"
                        value={percentage1}
                        onChange={(e) => setPercentage1(e.target.value)}
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value1">Value</Label>
                      <Input
                        id="value1"
                        type="number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="200"
                      />
                    </div>
                    <Button onClick={calculatePercentageOf} className="w-full bg-blue-600 hover:bg-blue-700">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result1 !== null ? (
                      <div className="p-6 bg-green-50 rounded-lg text-center">
                        <div className="text-sm text-gray-600 mb-2">
                          {percentage1}% of {value1} is:
                        </div>
                        <div className="text-3xl font-bold text-green-600">{result1.toLocaleString()}</div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">Enter values to calculate</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="what-percent">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>X is what percent of Y?</CardTitle>
                    <CardDescription>Find what percentage one value is of another</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="value2">Value</Label>
                      <Input
                        id="value2"
                        type="number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="total2">Total</Label>
                      <Input
                        id="total2"
                        type="number"
                        value={total2}
                        onChange={(e) => setTotal2(e.target.value)}
                        placeholder="200"
                      />
                    </div>
                    <Button onClick={calculateWhatPercent} className="w-full bg-blue-600 hover:bg-blue-700">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result2 !== null ? (
                      <div className="p-6 bg-blue-50 rounded-lg text-center">
                        <div className="text-sm text-gray-600 mb-2">
                          {value2} is {result2.toFixed(2)}% of {total2}
                        </div>
                        <div className="text-3xl font-bold text-blue-600">{result2.toFixed(2)}%</div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">Enter values to calculate</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="percent-change">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Percentage Change</CardTitle>
                    <CardDescription>Calculate percentage increase or decrease</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="oldValue">Original Value</Label>
                      <Input
                        id="oldValue"
                        type="number"
                        value={oldValue}
                        onChange={(e) => setOldValue(e.target.value)}
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newValue">New Value</Label>
                      <Input
                        id="newValue"
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="120"
                      />
                    </div>
                    <Button onClick={calculatePercentageChange} className="w-full bg-blue-600 hover:bg-blue-700">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result3 !== null ? (
                      <div className={`p-6 rounded-lg text-center ${result3.increase ? "bg-green-50" : "bg-red-50"}`}>
                        <div className="text-sm text-gray-600 mb-2">
                          Percentage {result3.increase ? "Increase" : "Decrease"}
                        </div>
                        <div className={`text-3xl font-bold ${result3.increase ? "text-green-600" : "text-red-600"}`}>
                          {result3.change.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          From {oldValue} to {newValue}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">Enter values to calculate</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

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
