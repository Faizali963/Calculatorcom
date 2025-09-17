"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0])
  const [results, setResults] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
    totalWeeks: number
    totalMonths: number
    nextBirthday: string
    daysUntilBirthday: number
  } | null>(null)

  const calculateAge = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const target = new Date(targetDate)

    if (birth > target) return

    // Calculate exact age
    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += lastMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    // Calculate totals
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= target) {
      nextBirthday.setFullYear(target.getFullYear() + 1)
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))

    setResults({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: nextBirthday.toLocaleDateString(),
      daysUntilBirthday,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Age Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Age</CardTitle>
                <CardDescription>Find your exact age and related information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="targetDate">Calculate Age On</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>

                <Button onClick={calculateAge} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Age
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Age Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Your Age</div>
                      <div className="text-3xl font-bold text-blue-600">
                        {results.years} years, {results.months} months, {results.days} days
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Days</div>
                        <div className="text-xl font-semibold text-green-600">{results.totalDays.toLocaleString()}</div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Weeks</div>
                        <div className="text-xl font-semibold text-purple-600">
                          {results.totalWeeks.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Months</div>
                        <div className="text-xl font-semibold text-orange-600">{results.totalMonths}</div>
                      </div>

                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Hours</div>
                        <div className="text-xl font-semibold text-red-600">
                          {(results.totalDays * 24).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="text-sm text-gray-600">Next Birthday</div>
                      <div className="text-lg font-semibold text-yellow-600">{results.nextBirthday}</div>
                      <div className="text-sm text-gray-500">({results.daysUntilBirthday} days to go)</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">Enter your birth date to calculate your age</div>
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
