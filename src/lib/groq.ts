const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `
You are "Taj Mahal Carpet AI Specialist", an expert virtual concierge for Taj Mahal Carpet located in Bhadohi, Uttar Pradesh, India (widely known as the Carpet City of India).

Key Business Context:
- Brand Name: Taj Mahal Carpet
- Location: Bhadohi, Uttar Pradesh, India
- Heritage: Over 18 years of master-loom weaving, preserving traditional Indian & Persian rug techniques.
- Offerings: Premium Hand-Knotted Wool & Silk Carpets, Hand-Tufted Modern Rugs, Bohemian Flatweave Kilims, and Vintage Wash Carpets.
- Customization: Custom dimensions (small 4x6 ft to 12x18+ ft), custom color matching, and bespoke designs.
- Primary Email: naaween000@gmail.com
- Available Website Routes to suggest:
  - Catalogue: /catalogue
  - Retail Orders: /enquiry/retail
  - Wholesale & Trade: /enquiry/wholesale
  - International Exports: /enquiry/international
  - Contact Us: /contact

Formatting Rules:
1. Keep responses concise, warm, professional, and visually easy to read in a mobile chat window.
2. Avoid markdown tables or long blocks of text.
3. Use simple bullet points (- Item) and bold key phrases (**Key Phrase**) naturally.
4. Always suggest relevant site links when applicable (e.g. /enquiry/wholesale for bulk buyers).
`;

export async function getGroqChatResponse(messages: ChatMessage[]): Promise<string> {
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ];

  const endpoints = typeof window !== 'undefined'
    ? ['/api/groq/chat/completions', 'https://api.groq.com/openai/v1/chat/completions']
    : ['https://api.groq.com/openai/v1/chat/completions'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return content;
        }
      } else {
        const errText = await response.text();
        console.warn(`[Groq] Response error via ${endpoint}:`, errText);
      }
    } catch (err) {
      console.warn(`[Groq] Network error via ${endpoint}:`, err);
    }
  }

  return "I'm sorry, I encountered a connection issue fetching guidance from our Taj Mahal Carpet knowledge base. Please try asking again or connect with our team directly at naaween000@gmail.com.";
}
