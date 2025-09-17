"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function PasswordGenerator() {
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [strength, setStrength] = useState<{
    score: number
    label: string
    color: string
  } | null>(null)

  const generatePassword = () => {
    let charset = ""

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }

    if (charset === "") return

    let newPassword = ""
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(newPassword)
    calculateStrength(newPassword)
  }

  const calculateStrength = (pwd: string) => {
    let score = 0

    // Length bonus
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1

    // Character variety
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1

    let label = "Very Weak"
    let color = "text-red-600"

    if (score >= 6) {
      label = "Very Strong"
      color = "text-green-600"
    } else if (score >= 5) {
      label = "Strong"
      color = "text-green-500"
    } else if (score >= 4) {
      label = "Good"
      color = "text-yellow-600"
    } else if (score >= 3) {
      label = "Fair"
      color = "text-orange-600"
    } else if (score >= 2) {
      label = "Weak"
      color = "text-red-500"
    }

    setStrength({ score, label, color })
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
    } catch (err) {
      console.error("Failed to copy password")
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Password Generator</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generator Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>Customize your password requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Password Length: {length[0]}</Label>
                  <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="mt-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={includeUppercase}
                      onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                    />
                    <Label htmlFor="uppercase">Include Uppercase Letters (A-Z)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={includeLowercase}
                      onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                    />
                    <Label htmlFor="lowercase">Include Lowercase Letters (a-z)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                    />
                    <Label htmlFor="numbers">Include Numbers (0-9)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={includeSymbols}
                      onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                    />
                    <Label htmlFor="symbols">Include Symbols (!@#$%^&*)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclude-similar"
                      checked={excludeSimilar}
                      onCheckedChange={(checked) => setExcludeSimilar(checked as boolean)}
                    />
                    <Label htmlFor="exclude-similar">Exclude Similar Characters (il1Lo0O)</Label>
                  </div>
                </div>

                <Button onClick={generatePassword} className="w-full bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Password
                </Button>
              </CardContent>
            </Card>

            {/* Generated Password */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Password</CardTitle>
              </CardHeader>
              <CardContent>
                {password ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          value={password}
                          readOnly
                          type={showPassword ? "text" : "password"}
                          className="font-mono text-lg"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {strength && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Password Strength</span>
                          <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              strength.score >= 6
                                ? "bg-green-600"
                                : strength.score >= 5
                                  ? "bg-green-500"
                                  : strength.score >= 4
                                    ? "bg-yellow-600"
                                    : strength.score >= 3
                                      ? "bg-orange-600"
                                      : strength.score >= 2
                                        ? "bg-red-500"
                                        : "bg-red-600"
                            }`}
                            style={{ width: `${(strength.score / 7) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 space-y-1">
                      <div>
                        <strong>Tips for strong passwords:</strong>
                      </div>
                      <div>• Use at least 12 characters</div>
                      <div>• Mix uppercase, lowercase, numbers, and symbols</div>
                      <div>• Avoid common words and personal information</div>
                      <div>• Use a unique password for each account</div>
                      <div>• Consider using a password manager</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Click "Generate Password" to create a secure password
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
