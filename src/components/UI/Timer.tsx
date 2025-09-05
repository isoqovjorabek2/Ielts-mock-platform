import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { formatTime } from '../../lib/utils'

interface TimerProps {
  timeLeft: number
  isRunning: boolean
  className?: string
}

export function Timer({ timeLeft, isRunning, className = '' }: TimerProps) {
  const isLowTime = timeLeft <= 300 // 5 minutes
  const isCriticalTime = timeLeft <= 60 // 1 minute
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (isCriticalTime && timeLeft > 0) {
      const interval = setInterval(() => {
        setIsPulsing(prev => !prev)
      }, 500)
      return () => clearInterval(interval)
    } else {
      setIsPulsing(false)
    }
  }, [isCriticalTime, timeLeft])

  return (
    <div
      className={`
        timer-display flex items-center space-x-2
        ${isLowTime ? 'bg-warning-50 border-warning-200 text-warning-800' : ''}
        ${isCriticalTime ? 'bg-error-50 border-error-200 text-error-800' : ''}
        ${isCriticalTime && isPulsing ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      <Clock className="w-5 h-5" />
      <span className="font-mono text-lg font-semibold">
        {formatTime(timeLeft)}
      </span>
      {!isRunning && timeLeft > 0 && (
        <span className="text-xs opacity-75">(Paused)</span>
      )}
    </div>
  )
}