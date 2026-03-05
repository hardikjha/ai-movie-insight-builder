import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  try {
    const { plot } = await req.json()

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Analyze audience sentiment for this movie plot.

You MUST return ONLY valid JSON.

Example format:
{
  "summary": "Audience enjoyed the action and visuals.",
  "classification": "Positive"
}

Plot:
${plot}
`
        }
      ]
    })

    const text = completion.choices[0].message.content || ""

    console.log("AI RAW RESPONSE:", text)

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const parsed = JSON.parse(cleaned)

    return Response.json(parsed)

  } catch (error) {
    console.error(error)

    return Response.json({
      summary: "Unable to analyze sentiment.",
      classification: "Mixed"
    })
  }
}