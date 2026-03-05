"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          username
        })
      });

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Sign up failed")
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/");
    } catch (err) {
        setError("An error occurred. Please try again.")
    }
  };  // ← AJOUTER CETTE ACCOLADE

  return (
    <div className="">
      <div className="">
        <h1>Sign up</h1>
        
        {error && <p style={{color: "red"}}>{error}</p>}
        
        <form onSubmit={handleRegister} className="flex flex-col gap-2">
          <input type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 rounded-md p-1 border-[#34495e]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-md p-1 border-[#34495e]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded-md p-1 border-[#34495e]"
            required
          />
          <button type="submit" className="rounded-md bg-white hover:bg-[#9f9f9f]">
            <p>Create account</p>
          </button>
        </form>
        <div>
          <p>{"Already have an account? "}<Link href="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}