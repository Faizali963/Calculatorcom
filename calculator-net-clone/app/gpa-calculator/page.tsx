"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus } from "lucide-react"
import Link from "next/link"

interface Course {
  id: number
  name: string
  grade: string
  credits: string
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([{ id: 1, name: "", grade: "", credits: "" }])
  const [gradeScale, setGradeScale] = useState("4.0")
  const [results, setResults] = useState<{
    gpa: number
    totalCredits: number
    totalPoints: number
  } | null>(null)

  const gradePoints = {
    "4.0": {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    },
    "5.0": {
      "A+": 5.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    },
  }

  const addCourse = () => {
    const newId = Math.max(...courses.map((c) => c.id)) + 1
    setCourses([...courses, { id: newId, name: "", grade: "", credits: "" }])
  }

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  const calculateGPA = () => {
    let totalPoints = 0
    let totalCredits = 0

    for (const course of courses) {
      if (course.grade && course.credits) {
        const credits = Number.parseFloat(course.credits)
        const points =
          gradePoints[gradeScale as keyof typeof gradePoints][course.grade as keyof (typeof gradePoints)["4.0"]]

        if (!isNaN(credits) && points !== undefined) {
          totalPoints += points * credits
          totalCredits += credits
        }
      }
    }

    if (totalCredits > 0) {
      const gpa = totalPoints / totalCredits
      setResults({ gpa, totalCredits, totalPoints })
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
          <h1 className="text-3xl font-bold text-blue-800 mb-8">GPA Calculator</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Input */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Courses</CardTitle>
                  <CardDescription>Add your courses with grades and credit hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Grade Scale</Label>
                    <Select value={gradeScale} onValueChange={setGradeScale}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.0">4.0 Scale</SelectItem>
                        <SelectItem value="5.0">5.0 Scale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    {courses.map((course, index) => (
                      <div key={course.id} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-5">
                          {index === 0 && <Label className="text-xs">Course Name</Label>}
                          <Input
                            placeholder="Course name (optional)"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                          />
                        </div>

                        <div className="col-span-3">
                          {index === 0 && <Label className="text-xs">Grade</Label>}
                          <Select
                            value={course.grade}
                            onValueChange={(value) => updateCourse(course.id, "grade", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="C+">C+</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="C-">C-</SelectItem>
                              <SelectItem value="D+">D+</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                              <SelectItem value="D-">D-</SelectItem>
                              <SelectItem value="F">F</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-3">
                          {index === 0 && <Label className="text-xs">Credits</Label>}
                          <Input
                            type="number"
                            placeholder="Credits"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                          />
                        </div>

                        <div className="col-span-1">
                          {index === 0 && <div className="h-4"></div>}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCourse(course.id)}
                            disabled={courses.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={addCourse} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Course
                    </Button>
                    <Button onClick={calculateGPA} className="bg-blue-600 hover:bg-blue-700">
                      Calculate GPA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>GPA Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Your GPA</div>
                      <div className="text-4xl font-bold text-blue-600">{results.gpa.toFixed(2)}</div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Total Credits</div>
                        <div className="text-lg font-semibold text-green-600">{results.totalCredits}</div>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Quality Points</div>
                        <div className="text-lg font-semibold text-purple-600">{results.totalPoints.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <div>
                        <strong>GPA Scale:</strong> {gradeScale}
                      </div>
                      <div>
                        <strong>Excellent:</strong> 3.5-4.0
                      </div>
                      <div>
                        <strong>Good:</strong> 3.0-3.49
                      </div>
                      <div>
                        <strong>Average:</strong> 2.0-2.99
                      </div>
                      <div>
                        <strong>Below Average:</strong> Below 2.0
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your courses and grades to calculate your GPA
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
