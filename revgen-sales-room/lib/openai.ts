import OpenAI from 'openai'

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export interface RecapResult {
  title: string
  summary: string
  keyPoints: string[]
  nextSteps: string[]
}

export async function generateMeetingRecap(notes: string): Promise<RecapResult> {
  if (!openai) {
    throw new Error('OpenAI API key not configured')
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a professional sales assistant that creates polished meeting recaps. 
Given raw meeting notes, generate a professional summary that:
- Is written in a warm, professional tone
- Highlights the key discussion points
- Identifies clear next steps
- Makes the prospect feel valued and understood

Respond with JSON in this exact format:
{
  "title": "Brief meeting title (e.g., 'Discussion on Lead Generation Strategy')",
  "summary": "2-3 paragraph professional summary of the meeting",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "nextSteps": ["Next step 1", "Next step 2"]
}`,
      },
      {
        role: 'user',
        content: `Please create a professional meeting recap from these notes:\n\n${notes}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = completion.choices[0].message.content
  if (!content) {
    throw new Error('No response from OpenAI')
  }

  return JSON.parse(content) as RecapResult
}

export default openai
