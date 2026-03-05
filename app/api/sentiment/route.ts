import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  const { plot } = await req.json()

  if (!plot) {
    return Response.json({ error: "Plot required" }, { status: 400 })
  }

  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "user",
        content: `
Analyze audience sentiment for this movie plot.

Return JSON format:
{
  "summary": "short summary",
  "classification": "Positive | Mixed | Negative"
}

Plot:
${plot}
`
      }
    ]
  })

  const result = completion.choices[0].message.content

  return Response.json(JSON.parse(result!))
}