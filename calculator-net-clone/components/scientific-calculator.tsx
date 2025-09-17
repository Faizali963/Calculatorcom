"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [isRadians, setIsRadians] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performFunction = (func: string) => {
    const value = Number.parseFloat(display)
    let result: number

    switch (func) {
      case "sin":
        result = Math.sin(isRadians ? value : (value * Math.PI) / 180)
        break
      case "cos":
        result = Math.cos(isRadians ? value : (value * Math.PI) / 180)
        break
      case "tan":
        result = Math.tan(isRadians ? value : (value * Math.PI) / 180)
        break
      case "sin⁻¹":
        result = isRadians ? Math.asin(value) : (Math.asin(value) * 180) / Math.PI
        break
      case "cos⁻¹":
        result = isRadians ? Math.acos(value) : (Math.acos(value) * 180) / Math.PI
        break
      case "tan⁻¹":
        result = isRadians ? Math.atan(value) : (Math.atan(value) * 180) / Math.PI
        break
      case "ln":
        result = Math.log(value)
        break
      case "log":
        result = Math.log10(value)
        break
      case "x²":
        result = value * value
        break
      case "x³":
        result = value * value * value
        break
      case "√":
        result = Math.sqrt(value)
        break
      case "∛":
        result = Math.cbrt(value)
        break
      case "x!":
        result = factorial(value)
        break
      case "1/x":
        result = 1 / value
        break
      case "e^x":
        result = Math.exp(value)
        break
      case "10^x":
        result = Math.pow(10, value)
        break
      case "%":
        result = value / 100
        break
      case "π":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      default:
        return
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n: number): number => {
    if (n < 0) return Number.NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        {/* Display */}
        <div className="bg-blue-800 text-white p-6 rounded-lg mb-6 text-right text-3xl font-mono min-h-[80px] flex items-center justify-end shadow-inner">
          {display}
        </div>

        {/* Scientific Functions Row */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => performFunction("sin")} className="text-xs">
            sin
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("cos")} className="text-xs">
            cos
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("tan")} className="text-xs">
            tan
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("ln")} className="text-xs">
            ln
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("log")} className="text-xs">
            log
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsRadians(!isRadians)} className="text-xs">
            {isRadians ? "Rad" : "Deg"}
          </Button>
        </div>

        {/* Advanced Functions Row */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => performFunction("x²")} className="text-xs">
            x²
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("√")} className="text-xs">
            √
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("x!")} className="text-xs">
            n!
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("π")} className="text-xs">
            π
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("e")} className="text-xs">
            e
          </Button>
          <Button variant="outline" size="sm" onClick={() => performFunction("%")} className="text-xs">
            %
          </Button>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Button variant="destructive" size="sm" onClick={clear} className="font-semibold">
            AC
          </Button>
          <Button variant="outline" size="sm" onClick={clearEntry}>
            CE
          </Button>
          <Button variant="outline" size="sm">
            ←
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputOperation("÷")}
            className="bg-blue-100 hover:bg-blue-200 font-semibold"
          >
            ÷
          </Button>
        </div>

        {/* Main Calculator Grid - Traditional Layout */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button variant="outline" size="sm" onClick={() => inputNumber("7")} className="h-12 text-lg font-semibold">
            7
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("8")} className="h-12 text-lg font-semibold">
            8
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("9")} className="h-12 text-lg font-semibold">
            9
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputOperation("×")}
            className="h-12 bg-blue-100 hover:bg-blue-200 font-semibold"
          >
            ×
          </Button>

          {/* Row 2 */}
          <Button variant="outline" size="sm" onClick={() => inputNumber("4")} className="h-12 text-lg font-semibold">
            4
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("5")} className="h-12 text-lg font-semibold">
            5
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("6")} className="h-12 text-lg font-semibold">
            6
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputOperation("-")}
            className="h-12 bg-blue-100 hover:bg-blue-200 font-semibold"
          >
            -
          </Button>

          {/* Row 3 */}
          <Button variant="outline" size="sm" onClick={() => inputNumber("1")} className="h-12 text-lg font-semibold">
            1
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("2")} className="h-12 text-lg font-semibold">
            2
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber("3")} className="h-12 text-lg font-semibold">
            3
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputOperation("+")}
            className="h-12 bg-blue-100 hover:bg-blue-200 font-semibold"
          >
            +
          </Button>

          {/* Row 4 */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputNumber("0")}
            className="h-12 text-lg font-semibold col-span-2"
          >
            0
          </Button>
          <Button variant="outline" size="sm" onClick={() => inputNumber(".")} className="h-12 text-lg font-semibold">
            .
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => inputOperation("=")}
            className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
