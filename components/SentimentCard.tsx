"use client"

import { useEffect, useState } from "react"

interface Sentiment {
  summary: string
  classification: string
}

export default function SentimentCard({ plot }: { plot: string }) {
  const [data, setData] = useState<Sentiment | null>(null)

  useEffect(() => {
    async function fetchSentiment() {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
    },
  body: JSON.stringify({ plot }),
})

      const result = await res.json()
      setData(result)
    }

    fetchSentiment()
  }, [plot])

  if (!data) {
  return (
    <div className="mt-6 animate-pulse bg-gray-800 p-4 rounded">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  )
}

  return (
  <div className="mt-6 bg-gray-900 p-4 rounded-lg">
    <h2 className="text-xl font-semibold mb-2">AI Audience Sentiment</h2>

    <p>{data?.summary}</p>

    <p className="mt-3 font-bold text-purple-400">
      Overall Sentiment: {data?.classification || "Unknown"}
    </p>
  </div>
  )
}