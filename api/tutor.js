// Vercel serverless function: keeps the provider key on the server.
// Configure OPENAI_API_KEY and optionally OPENAI_MODEL in Vercel project settings.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'AI tutor is not configured. Set OPENAI_API_KEY on the server.' });
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'A message is required.' });
  if (message.length > 6000) return res.status(413).json({ error: 'Please keep your question under 6,000 characters.' });
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8).filter(m => ['user', 'assistant'].includes(m?.role) && typeof m?.content === 'string').map(m => ({ role: m.role, content: m.content.slice(0, 4000) })) : [];
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are CodeQuest Tutor, a patient beginner-friendly programming teacher. Explain concepts simply, ask guiding questions, prefer hints before full solutions when appropriate, help debug code safely, and encourage understanding rather than copying. If uncertain, say so. Keep answers focused.' },
          ...history,
          { role: 'user', content: message }
        ],
        temperature: 0.4,
        max_tokens: 700
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const status = response.status === 429 ? 429 : 502;
      return res.status(status).json({ error: response.status === 429 ? 'Tutor rate limit reached. Please wait and try again.' : 'The AI provider could not complete the request.' });
    }
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) return res.status(502).json({ error: 'The AI provider returned an empty response.' });
    return res.status(200).json({ reply: reply.trim(), mode: 'connected' });
  } catch (error) {
    return res.status(502).json({ error: 'Could not connect to the AI provider. Please try again later.' });
  }
}
