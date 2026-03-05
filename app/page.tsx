"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [movieId, setMovieId] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (!movieId.startsWith("tt")) {
      alert("Invalid IMDb ID")
      return
    }

    router.push(`/movie/${movieId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          AI Movie Insight Builder
        </h1>

        <input
          type="text"
          placeholder="Enter IMDb ID (e.g., tt0133093)"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        <button
          onClick={handleSearch}
          className="w-full mt-4 bg-purple-600 p-2 rounded hover:bg-purple-700"
        >
          Analyze Movie
        </button>
      </div>
    </div>
  )
}