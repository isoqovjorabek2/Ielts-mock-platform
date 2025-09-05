import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function calculateBandScore(correctAnswers: number, totalQuestions: number): number {
  const percentage = (correctAnswers / totalQuestions) * 100
  
  if (percentage >= 90) return 9.0
  if (percentage >= 82) return 8.5
  if (percentage >= 75) return 8.0
  if (percentage >= 68) return 7.5
  if (percentage >= 60) return 7.0
  if (percentage >= 52) return 6.5
  if (percentage >= 45) return 6.0
  if (percentage >= 38) return 5.5
  if (percentage >= 30) return 5.0
  if (percentage >= 23) return 4.5
  if (percentage >= 15) return 4.0
  if (percentage >= 8) return 3.5
  return 3.0
}

export function getScoreColor(score: number): string {
  if (score >= 7.0) return 'text-success-600'
  if (score >= 6.0) return 'text-warning-600'
  return 'text-error-600'
}

export function getScoreBgColor(score: number): string {
  if (score >= 7.0) return 'bg-success-50 border-success-200'
  if (score >= 6.0) return 'bg-warning-50 border-warning-200'
  return 'bg-error-50 border-error-200'
}