import { useState, useEffect, useRef } from 'react'

export function useTimer(initialTime: number, onTimeUp?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            onTimeUp?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, onTimeUp])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = (newTime?: number) => {
    setIsRunning(false)
    setTimeLeft(newTime ?? initialTime)
  }

  const getTimeSpent = () => initialTime - timeLeft

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    getTimeSpent
  }
}