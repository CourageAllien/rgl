import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company, contactName, meetingNotes, keyPoints, industry } = body

    if (!process.env.OPENAI_API_KEY) {
      // Return a template if no API key
      return NextResponse.json({
        recap: generateTemplateRecap(company, contactName, meetingNotes)
      })
    }

    const prompt = `You are a sales professional at RevGen Labs, a B2B lead generation agency. 
Write a professional, warm, and personalized meeting recap email/document for a prospect.

Company: ${company}
Contact: ${contactName}
Industry: ${industry || 'B2B'}
Meeting Notes: ${meetingNotes || 'General discovery call about lead generation needs'}
Key Points Discussed: ${keyPoints?.join(', ') || 'Lead generation goals, current challenges, growth targets'}

Write a meeting recap that:
1. Thanks them for their time
2. Summarizes the key discussion points
3. Identifies their main pain points/challenges
4. Recommends a solution (our Growth Package)
5. Expresses enthusiasm about partnering

Use markdown formatting with ## for main headers and ### for subheaders.
Keep it professional but personable. About 300-400 words.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional sales writer for RevGen Labs, a B2B lead generation agency. Write warm, personalized content that builds trust and moves deals forward.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const recap = completion.choices[0]?.message?.content || generateTemplateRecap(company, contactName, meetingNotes)

    return NextResponse.json({ recap })
  } catch (error) {
    console.error('Error generating recap:', error)
    
    // Fallback to template
    const body = await request.json()
    return NextResponse.json({
      recap: generateTemplateRecap(body.company, body.contactName, body.meetingNotes)
    })
  }
}

function generateTemplateRecap(company: string, contactName: string, notes: string) {
  return `## Meeting Recap: ${company}

Thank you for taking the time to discuss your lead generation goals with RevGen Labs, ${contactName}!

### What We Discussed
During our conversation, we explored how ${company} is looking to scale their outbound efforts. ${notes ? `Here's a summary:\n\n${notes}` : 'We identified several opportunities to improve your prospect targeting and outreach efficiency.'}

### Your Current Challenges
Based on our discussion, your team is facing common challenges:
- Manual prospecting taking too much time
- Low response rates on cold outreach
- Difficulty identifying and reaching decision makers
- Inconsistent pipeline generation

### Your Goals
Your primary objectives are:
- Increase qualified meeting bookings
- Reduce cost per lead acquisition
- Build a repeatable, scalable outreach system

### Our Recommendation
Based on your goals and company size, we believe the **Growth Package** would be the ideal fit for your team. This package provides:
- 1,500 targeted prospects per month
- Multi-channel outreach (Email + LinkedIn)
- CRM integration
- Dedicated account manager
- Bi-weekly strategy calls

### Next Steps
1. Review this proposal at your convenience
2. Sign the agreement when ready
3. Complete payment to kick off onboarding
4. We'll schedule your strategy call within 48 hours

Looking forward to partnering with ${company}!

Best regards,
The RevGen Labs Team`
}
