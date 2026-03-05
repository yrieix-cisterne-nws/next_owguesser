"use client"

export async function saveScore(score, difficulty) {
  const token = localStorage.getItem("token")

  if (!token) {
    console.error("Not logged in")
    return false;
  }

  try {
    const response = await fetch("/api/scores/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        score: score,
        difficulty: difficulty
      })
    });

    if (!response.ok) {
      console.error("Error saving score")
      return false
    }

    return true
  } catch (error) {
    console.error("Error:", error)
    return false
  }
}