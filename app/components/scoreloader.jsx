"use client"
import { useState } from 'react'

export function useScores() {
  const [scores, setScores] = useState([])
  const [bestStreak, setBestStreak] = useState(0)

  const loadScores = async () => {
    const token = localStorage.getItem("token")

    if (!token) return false

    try {
      const response = await fetch("/api/scores/my-score", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json()
      setScores(data)

      if (data.length > 0) {
        const maxScore = Math.max(...data.map(s => s.score))
        setBestStreak(maxScore)
      }

      return true
    } catch (error) {
      console.error("Error loading scores:", error)
      return false
    }
  }

  return { scores, bestStreak, loadScores }
}