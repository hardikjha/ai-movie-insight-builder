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
        body: JSON.stringify({ plot }),
      })

      const result = await res.json()
      setData(result)
    }

    fetchSentiment()
  }, [plot])

  if (!data) return <p className="mt-6">Analyzing sentiment...</p>

  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">AI Audience Sentiment</h2>

      <p>{data.summary}</p>

      <p className="mt-3 font-bold text-purple-400">
        Overall Sentiment: {data.classification}
      </p>
    </div>
  )
}