const ALLOWED_ORIGINS = [
  'https://aroma-seven-sable.vercel.app',
  'http://localhost:5173',
]

const attempts = new Map() // ip → { count, resetAt }
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function getAllowedOrigin(req) {
  const origin = req.headers.origin
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
}

export default function handler(req, res) {
  const origin = getAllowedOrigin(req)
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const record = attempts.get(ip)

  if (record) {
    if (now < record.resetAt) {
      if (record.count >= MAX_ATTEMPTS) {
        const retryAfter = Math.ceil((record.resetAt - now) / 1000)
        res.setHeader('Retry-After', retryAfter)
        return res.status(429).json({ ok: false, error: '嘗試次數過多，請稍後再試', retryAfter })
      }
    } else {
      attempts.delete(ip)
    }
  }

  const { password } = req.body
  const correct = process.env.ACCESS_PASSWORD

  if (!correct) return res.status(500).json({ ok: false, error: 'ACCESS_PASSWORD not set' })

  if (password === correct) {
    attempts.delete(ip)
    return res.status(200).json({ ok: true })
  }

  const current = attempts.get(ip) || { count: 0, resetAt: now + WINDOW_MS }
  attempts.set(ip, { count: current.count + 1, resetAt: current.resetAt })

  return res.status(401).json({ ok: false })
}
