"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Login failed")
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="">
      <div className="">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
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
            <p>Log in</p>
          </button>
        </form>
        <div>
          <p>Don&apos;t have an account ? <Link href="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}