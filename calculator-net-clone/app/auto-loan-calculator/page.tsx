"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [tradeInValue, setTradeInValue] = useState("")
  const [loanTerm, setLoanTerm] = useState("60")
  const [interestRate, setInterestRate] = useState("")
  const [salesTax, setSalesTax] = useState("")
  const [results, setResults] = useState<{
    loanAmount: number
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
  } | null>(null)

  const calculateAutoLoan = () => {
    const price = Number.parseFloat(vehiclePrice) || 0
    const down = Number.parseFloat(downPayment) || 0
    const trade = Number.parseFloat(tradeInValue) || 0
    const tax = Number.parseFloat(salesTax) || 0
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const months = Number.parseInt(loanTerm)

    const taxAmount = (price * tax) / 100
    const loanAmount = price + taxAmount - down - trade

    if (loanAmount <= 0 || rate <= 0 || months <= 0) return

    const monthlyPayment = (loanAmount * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1)

    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - loanAmount

    setResults({
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Auto Loan Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Auto Loan</CardTitle>
                <CardDescription>Enter your vehicle and loan details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="vehiclePrice">Vehicle Price ($)</Label>
                  <Input
                    id="vehiclePrice"
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(e.target.value)}
                    placeholder="35000"
                  />
                </div>

                <div>
                  <Label htmlFor="downPayment">Down Payment ($)</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    placeholder="5000"
                  />
                </div>

                <div>
                  <Label htmlFor="tradeInValue">Trade-in Value ($)</Label>
                  <Input
                    id="tradeInValue"
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="salesTax">Sales Tax (%)</Label>
                  <Input
                    id="salesTax"
                    type="number"
                    step="0.01"
                    value={salesTax}
                    onChange={(e) => setSalesTax(e.target.value)}
                    placeholder="8.5"
                  />
                </div>

                <div>
                  <Label htmlFor="loanTerm">Loan Term</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="72">72 months</SelectItem>
                      <SelectItem value="84">84 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="4.5"
                  />
                </div>

                <Button onClick={calculateAutoLoan} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Auto Loan
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Auto Loan Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Loan Amount</div>
                      <div className="text-xl font-semibold text-blue-600">
                        $
                        {results.loanAmount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Monthly Payment</div>
                      <div className="text-2xl font-bold text-green-600">
                        $
                        {results.monthlyPayment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Payment</div>
                        <div className="text-lg font-semibold text-purple-600">
                          $
                          {results.totalPayment.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Interest</div>
                        <div className="text-lg font-semibold text-orange-600">
                          $
                          {results.totalInterest.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your auto loan details and click calculate to see results
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
