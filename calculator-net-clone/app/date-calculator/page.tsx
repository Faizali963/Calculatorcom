"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DateCalculator() {
  // Add/Subtract days
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [daysToAdd, setDaysToAdd] = useState("")
  const [operation, setOperation] = useState("add")
  const [result1, setResult1] = useState<string>("")

  // Date difference
  const [date1, setDate1] = useState("")
  const [date2, setDate2] = useState("")
  const [result2, setResult2] = useState<{
    days: number
    weeks: number
    months: number
    years: number
  } | null>(null)

  const calculateDateAddSubtract = () => {
    const date = new Date(startDate)
    const days = Number.parseInt(daysToAdd)

    if (isNaN(days)) return

    if (operation === "add") {
      date.setDate(date.getDate() + days)
    } else {
      date.setDate(date.getDate() - days)
    }

    setResult1(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }

  const calculateDateDifference = () => {
    if (!date1 || !date2) return

    const d1 = new Date(date1)
    const d2 = new Date(date2)

    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffDays / 7)

    // Calculate months and years
    let years = Math.abs(d2.getFullYear() - d1.getFullYear())
    let months = Math.abs(d2.getMonth() - d1.getMonth())

    if (d2.getDate() < d1.getDate()) {
      months--
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalMonths = years * 12 + months

    setResult2({
      days: diffDays,
      weeks: diffWeeks,
      months: totalMonths,
      years,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Date Calculator</h1>

          <Tabs defaultValue="add-subtract" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-subtract">Add/Subtract Days</TabsTrigger>
              <TabsTrigger value="difference">Date Difference</TabsTrigger>
            </TabsList>

            <TabsContent value="add-subtract">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Add or Subtract Days</CardTitle>
                    <CardDescription>Calculate a future or past date</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Operation</Label>
                      <Select value={operation} onValueChange={setOperation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Add Days</SelectItem>
                          <SelectItem value="subtract">Subtract Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="daysToAdd">Number of Days</Label>
                      <Input
                        id="daysToAdd"
                        type="number"
                        value={daysToAdd}
                        onChange={(e) => setDaysToAdd(e.target.value)}
                        placeholder="30"
                      />
                    </div>

                    <Button onClick={calculateDateAddSubtract} className="w-full bg-blue-600 hover:bg-blue-700">
                      Calculate Date
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result1 ? (
                      <div className="p-6 bg-green-50 rounded-lg text-center">
                        <div className="text-sm text-gray-600 mb-2">
                          {operation === "add" ? "Date after adding" : "Date after subtracting"} {daysToAdd} days:
                        </div>
                        <div className="text-xl font-bold text-green-600">{result1}</div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">Enter values to calculate the result date</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="difference">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Calculate Date Difference</CardTitle>
                    <CardDescription>Find the difference between two dates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="date1">First Date</Label>
                      <Input id="date1" type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="date2">Second Date</Label>
                      <Input id="date2" type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
                    </div>

                    <Button onClick={calculateDateDifference} className="w-full bg-blue-600 hover:bg-blue-700">
                      Calculate Difference
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Date Difference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result2 ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">Total Days</div>
                          <div className="text-2xl font-bold text-blue-600">{result2.days.toLocaleString()} days</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-sm text-gray-600">Weeks</div>
                            <div className="text-lg font-semibold text-green-600">{result2.weeks.toLocaleString()}</div>
                          </div>

                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="text-sm text-gray-600">Months</div>
                            <div className="text-lg font-semibold text-purple-600">{result2.months}</div>
                          </div>
                        </div>

                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="text-sm text-gray-600">Years</div>
                          <div className="text-lg font-semibold text-orange-600">{result2.years} years</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">Select two dates to calculate the difference</div>
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
