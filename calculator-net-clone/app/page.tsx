"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScientificCalculator } from "@/components/scientific-calculator"
import { Search, X, DollarSign, Heart, Calculator, Settings } from "lucide-react"
import Link from "next/link"

const calculators = [
  // Financial Calculators
  {
    name: "Mortgage Calculator",
    href: "/mortgage-calculator",
    category: "Financial",
    keywords: ["mortgage", "home", "loan", "house", "property"],
  },
  {
    name: "Loan Calculator",
    href: "/loan-calculator",
    category: "Financial",
    keywords: ["loan", "borrow", "debt", "payment"],
  },
  {
    name: "Auto Loan Calculator",
    href: "/auto-loan-calculator",
    category: "Financial",
    keywords: ["auto", "car", "vehicle", "loan"],
  },
  {
    name: "Interest Calculator",
    href: "/interest-calculator",
    category: "Financial",
    keywords: ["interest", "compound", "simple", "investment"],
  },
  {
    name: "Payment Calculator",
    href: "/payment-calculator",
    category: "Financial",
    keywords: ["payment", "monthly", "installment"],
  },
  {
    name: "Retirement Calculator",
    href: "/retirement-calculator",
    category: "Financial",
    keywords: ["retirement", "pension", "401k", "savings"],
  },
  {
    name: "Amortization Calculator",
    href: "/amortization-calculator",
    category: "Financial",
    keywords: ["amortization", "schedule", "principal"],
  },
  {
    name: "Investment Calculator",
    href: "/investment-calculator",
    category: "Financial",
    keywords: ["investment", "return", "profit", "portfolio"],
  },
  {
    name: "Inflation Calculator",
    href: "/inflation-calculator",
    category: "Financial",
    keywords: ["inflation", "purchasing", "power", "value"],
  },
  {
    name: "Finance Calculator",
    href: "/finance-calculator",
    category: "Financial",
    keywords: ["finance", "financial", "money"],
  },
  {
    name: "Income Tax Calculator",
    href: "/income-tax-calculator",
    category: "Financial",
    keywords: ["tax", "income", "federal", "state"],
  },
  {
    name: "Compound Interest Calculator",
    href: "/compound-interest-calculator",
    category: "Financial",
    keywords: ["compound", "interest", "growth"],
  },
  {
    name: "Salary Calculator",
    href: "/salary-calculator",
    category: "Financial",
    keywords: ["salary", "wage", "hourly", "annual"],
  },
  {
    name: "Interest Rate Calculator",
    href: "/interest-rate-calculator",
    category: "Financial",
    keywords: ["rate", "interest", "apr"],
  },
  {
    name: "Sales Tax Calculator",
    href: "/sales-tax-calculator",
    category: "Financial",
    keywords: ["sales", "tax", "purchase"],
  },

  // Fitness & Health Calculators
  {
    name: "BMI Calculator",
    href: "/bmi-calculator",
    category: "Fitness & Health",
    keywords: ["bmi", "body", "mass", "index", "weight", "height"],
  },
  {
    name: "Calorie Calculator",
    href: "/calorie-calculator",
    category: "Fitness & Health",
    keywords: ["calorie", "calories", "diet", "nutrition", "tdee"],
  },
  {
    name: "Body Fat Calculator",
    href: "/body-fat-calculator",
    category: "Fitness & Health",
    keywords: ["body", "fat", "percentage", "composition"],
  },
  {
    name: "BMR Calculator",
    href: "/bmr-calculator",
    category: "Fitness & Health",
    keywords: ["bmr", "basal", "metabolic", "rate"],
  },
  {
    name: "Ideal Weight Calculator",
    href: "/ideal-weight-calculator",
    category: "Fitness & Health",
    keywords: ["ideal", "weight", "healthy", "target"],
  },
  {
    name: "Pace Calculator",
    href: "/pace-calculator",
    category: "Fitness & Health",
    keywords: ["pace", "running", "speed", "marathon"],
  },
  {
    name: "Pregnancy Calculator",
    href: "/pregnancy-calculator",
    category: "Fitness & Health",
    keywords: ["pregnancy", "pregnant", "baby", "due"],
  },
  {
    name: "Pregnancy Conception Calculator",
    href: "/pregnancy-conception-calculator",
    category: "Fitness & Health",
    keywords: ["conception", "ovulation", "fertility"],
  },
  {
    name: "Due Date Calculator",
    href: "/due-date-calculator",
    category: "Fitness & Health",
    keywords: ["due", "date", "birth", "delivery"],
  },

  // Math Calculators
  {
    name: "Scientific Calculator",
    href: "/scientific-calculator",
    category: "Math",
    keywords: ["scientific", "calculator", "math", "trigonometry"],
  },
  {
    name: "Fraction Calculator",
    href: "/fraction-calculator",
    category: "Math",
    keywords: ["fraction", "fractions", "numerator", "denominator"],
  },
  {
    name: "Percentage Calculator",
    href: "/percentage-calculator",
    category: "Math",
    keywords: ["percentage", "percent", "ratio", "proportion"],
  },
  {
    name: "Random Number Generator",
    href: "/random-number-generator",
    category: "Math",
    keywords: ["random", "number", "generator", "lottery"],
  },
  {
    name: "Triangle Calculator",
    href: "/triangle-calculator",
    category: "Math",
    keywords: ["triangle", "geometry", "area", "perimeter"],
  },
  {
    name: "Standard Deviation Calculator",
    href: "/standard-deviation-calculator",
    category: "Math",
    keywords: ["standard", "deviation", "statistics", "variance"],
  },

  // Other Calculators
  { name: "Age Calculator", href: "/age-calculator", category: "Other", keywords: ["age", "birthday", "years", "old"] },
  {
    name: "Date Calculator",
    href: "/date-calculator",
    category: "Other",
    keywords: ["date", "calendar", "days", "difference"],
  },
  {
    name: "Time Calculator",
    href: "/time-calculator",
    category: "Other",
    keywords: ["time", "hours", "minutes", "duration"],
  },
  {
    name: "Hours Calculator",
    href: "/hours-calculator",
    category: "Other",
    keywords: ["hours", "work", "timesheet", "payroll"],
  },
  {
    name: "GPA Calculator",
    href: "/gpa-calculator",
    category: "Other",
    keywords: ["gpa", "grade", "point", "average", "school"],
  },
  {
    name: "Grade Calculator",
    href: "/grade-calculator",
    category: "Other",
    keywords: ["grade", "test", "exam", "score"],
  },
  {
    name: "Concrete Calculator",
    href: "/concrete-calculator",
    category: "Other",
    keywords: ["concrete", "cement", "construction", "volume"],
  },
  {
    name: "Subnet Calculator",
    href: "/subnet-calculator",
    category: "Other",
    keywords: ["subnet", "network", "ip", "cidr"],
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    category: "Other",
    keywords: ["password", "generator", "security", "random"],
  },
  {
    name: "Conversion Calculator",
    href: "/conversion-calculator",
    category: "Other",
    keywords: ["conversion", "convert", "units", "metric"],
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return calculators.filter(
      (calc) =>
        calc.name.toLowerCase().includes(query) ||
        calc.category.toLowerCase().includes(query) ||
        calc.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    )
  }, [searchQuery])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const groupedCalculators = useMemo(() => {
    const groups: { [key: string]: typeof calculators } = {}
    calculators.forEach((calc) => {
      if (!groups[calc.category]) {
        groups[calc.category] = []
      }
      groups[calc.category].push(calc)
    })
    return groups
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Financial":
        return <DollarSign className="w-8 h-8 text-green-600" />
      case "Fitness & Health":
        return <Heart className="w-8 h-8 text-red-500" />
      case "Math":
        return <Calculator className="w-8 h-8 text-blue-600" />
      default:
        return <Settings className="w-8 h-8 text-purple-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center text-justify">
          <Link href="/" className="text-2xl font-bold font-mono text-right">
            Calculator<span className="text-green-400">.com</span>
          </Link>
          <div className="text-sm">
            
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scientific Calculator */}
          <div className="lg:col-span-1">
            <ScientificCalculator />
          </div>

          {/* Search and Categories */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-blue-800 mb-4">Free Online Calculators</h1>
              <div className="relative">
                <Input
                  placeholder="Search calculators..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {showSearchResults && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Search Results for "{searchQuery}" ({filteredCalculators.length} found)
                  </h2>
                  <Button variant="outline" size="sm" onClick={clearSearch}>
                    Show All Categories
                  </Button>
                </div>

                {filteredCalculators.length > 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-2">
                        {filteredCalculators.map((calc) => (
                          <Link
                            key={calc.href}
                            href={calc.href}
                            className="block p-3 rounded-lg hover:bg-gray-50 border border-gray-200 hover:border-blue-300 transition-colors"
                          >
                            <div className="font-medium text-blue-600 hover:underline">{calc.name}</div>
                            <div className="text-sm text-gray-500">{calc.category}</div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-500 py-8">
                        <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No calculators found matching "{searchQuery}"</p>
                        <p className="text-sm mt-2">
                          Try searching for terms like "loan", "BMI", "percentage", or "age"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {!showSearchResults && (
              <>
                {/* Calculator Categories */}
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(groupedCalculators).map(([category, calcs]) => (
                    <Card key={category}>
                      <CardHeader>
                        <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                          {getCategoryIcon(category)}
                        </div>
                        <CardTitle className="text-green-600">{category} Calculators</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {calcs.map((calc) => (
                            <Link key={calc.href} href={calc.href} className="block text-blue-600 hover:underline">
                              {calc.name}
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Content */}
        <div className="mt-16 text-sm text-gray-600 space-y-4">
          <p>
            Calculator.net's sole focus is to provide fast, comprehensive, convenient, free online calculators in a
            plethora of areas. Currently, we have around 200 calculators to help you "do the math" quickly in areas such
            as finance, fitness, health, math, and others, and we are still developing more. Our goal is to become the
            one-stop, go-to site for people who need to make quick calculations. Additionally, we believe the internet
            should be a source of free information. Therefore, all of our tools and services are completely free, with
            no registration required.
          </p>
          <p>
            We coded and developed each calculator individually and put each one through strict, comprehensive testing.
            However, please inform us if you notice even the slightest error – your input is extremely valuable to us.
            While most calculators on Calculator.net are designed to be universally applicable for worldwide usage, some
            are for specific countries only. For example, the Income Tax Calculator is for United States residents only.
          </p>
          <div className="flex justify-center space-x-4 text-blue-600">
            <Link href="/about" className="hover:underline">
              about us
            </Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:underline">
              sitemap
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:underline">
              terms of use
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:underline">
              privacy policy
            </Link>
          </div>
          <p className="text-center">© 2008 - 2025 calculator.net</p>
        </div>
      </div>
    </div>
  )
}
