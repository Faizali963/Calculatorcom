"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [paymentFrequency, setPaymentFrequency] = useState("monthly")
  const [results, setResults] = useState<{
    payment: number
    totalPayment: number
    totalInterest: number
  } | null>(null)

  const calculateLoan = () => {
    const principal = Number.parseFloat(loanAmount)
    const annualRate = Number.parseFloat(interestRate) / 100
    const years = Number.parseFloat(loanTerm)

    let paymentsPerYear = 12
    if (paymentFrequency === "weekly") paymentsPerYear = 52
    if (paymentFrequency === "biweekly") paymentsPerYear = 26
    if (paymentFrequency === "quarterly") paymentsPerYear = 4
    if (paymentFrequency === "annually") paymentsPerYear = 1

    const periodicRate = annualRate / paymentsPerYear
    const numberOfPayments = years * paymentsPerYear

    if (principal <= 0 || periodicRate <= 0 || numberOfPayments <= 0) return

    const payment =
      (principal * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments))) /
      (Math.pow(1 + periodicRate, numberOfPayments) - 1)

    const totalPayment = payment * numberOfPayments
    const totalInterest = totalPayment - principal

    setResults({
      payment,
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Loan Calculator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Loan</CardTitle>
                <CardDescription>Enter your loan details to calculate payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="25000"
                  />
                </div>

                <div>
                  <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="7.5"
                  />
                </div>

                <div>
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="5"
                  />
                </div>

                <div>
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateLoan} className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Loan
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">
                        {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        $
                        {results.payment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Payment</div>
                        <div className="text-lg font-semibold text-blue-600">
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
                    Enter your loan details and click calculate to see results
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
