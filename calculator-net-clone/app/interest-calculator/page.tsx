"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [compoundFrequency, setCompoundFrequency] = useState("annually")
  const [results, setResults] = useState<{
    simpleInterest: number
    compoundInterest: number
    totalAmountSimple: number
    totalAmountCompound: number
  } | null>(null)

  const calculateInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)

    if (p <= 0 || r <= 0 || t <= 0) return

    // Simple Interest
    const simpleInterest = p * r * t
    const totalAmountSimple = p + simpleInterest

    // Compound Interest
    let n = 1 // annually
    if (compoundFrequency === "monthly") n = 12
    if (compoundFrequency === "quarterly") n = 4
    if (compoundFrequency === "daily") n = 365

    const totalAmountCompound = p * Math.pow(1 + r / n, n * t)
    const compoundInterest = totalAmountCompound - p

    setResults({
      simpleInterest,
      compoundInterest,
      totalAmountSimple,
      totalAmountCompound,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Interest Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Interest</CardTitle>
                <CardDescription>Calculate both simple and compound interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="principal">Principal Amount ($)</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="10000"
                  />
                </div>

                <div>
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="5.5"
                  />
                </div>

                <div>
                  <Label htmlFor="time">Time Period (years)</Label>
                  <Input
                    id="time"
                    type="number"
                    step="0.1"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="3"
                  />
                </div>

                <div>
                  <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateInterest} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Interest
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Interest Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <Tabs defaultValue="simple" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="simple">Simple Interest</TabsTrigger>
                      <TabsTrigger value="compound">Compound Interest</TabsTrigger>
                    </TabsList>

                    <TabsContent value="simple" className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Interest Earned</div>
                        <div className="text-2xl font-bold text-blue-600">
                          $
                          {results.simpleInterest.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Amount</div>
                        <div className="text-xl font-semibold text-green-600">
                          $
                          {results.totalAmountSimple.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="compound" className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Interest Earned</div>
                        <div className="text-2xl font-bold text-purple-600">
                          $
                          {results.compoundInterest.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Amount</div>
                        <div className="text-xl font-semibold text-green-600">
                          $
                          {results.totalAmountCompound.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">Additional Earnings vs Simple</div>
                        <div className="text-lg font-semibold text-orange-600">
                          $
                          {(results.compoundInterest - results.simpleInterest).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your investment details and click calculate to see results
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
