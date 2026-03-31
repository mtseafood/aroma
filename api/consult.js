import Anthropic from '@anthropic-ai/sdk'
import oils from '../src/data/oils.json' assert { type: 'json' }

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Simple keyword-based oil pre-filter
function findRelevantOils(message) {
  const symptomsMap = {
    '頭痛': ['薄荷', '薰衣草', '迷迭香'],
    '失眠': ['薰衣草', '雪松', '甜馬鬱蘭'],
    '焦慮': ['佛手柑', '乳香', '薰衣草'],
    '壓力': ['薰衣草', '佛手柑', '快樂鼠尾草'],
    '憂鬱': ['甜橙', '佛手柑', '天竺葵'],
    '鼻塞': ['尤加利', '薄荷', '迷迭香'],
    '咳嗽': ['尤加利', '茶樹', '迷迭香'],
    '皮膚': ['茶樹', '薰衣草', '天竺葵', '乳香'],
    '痘痘': ['茶樹', '薰衣草', '佛手柑'],
    '肌肉': ['薄荷', '甜馬鬱蘭', '迷迭香'],
    '消化': ['甜橙', '薄荷', '快樂鼠尾草'],
    '月經': ['天竺葵', '快樂鼠尾草', '薰衣草'],
    '水腫': ['葡萄柚', '迷迭香', '天竺葵'],
    '冥想': ['乳香', '沒藥', '檀香'],
    '護膚': ['玫瑰', '乳香', '天竺葵'],
  }

  let relevant = []
  for (const [keyword, names] of Object.entries(symptomsMap)) {
    if (message.includes(keyword)) {
      names.forEach(name => {
        const oil = oils.find(o => o.chinese_name === name)
        if (oil && !relevant.find(o => o.id === oil.id)) relevant.push(oil)
      })
    }
  }

  // If no match, return all featured oils as context
  if (relevant.length === 0) relevant = oils.filter(o => o.is_featured)

  return relevant.slice(0, 20)
}

function formatOilContext(oils) {
  return oils.map(o =>
    `- ${o.chinese_name}（${o.english_name}）: 功效：${o.main_effects.join('、')}；用法：${o.usage_methods.map(m => m.method).join('、')}`
  ).join('\n')
}

const sessions = new Map() // In-memory session store (resets on redeploy)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message, session_id } = req.body
  if (!message?.trim()) return res.status(400).json({ error: 'Message required' })

  const sessionId = session_id || `session_${Date.now()}`
  if (!sessions.has(sessionId)) sessions.set(sessionId, [])
  const history = sessions.get(sessionId)

  const relevantOils = findRelevantOils(message)
  const oilContext = formatOilContext(relevantOils)

  const systemPrompt = `你是一位專業的芳香療法顧問，精通精油的使用方法和功效。
根據使用者描述的症狀或需求，推薦合適的精油並提供使用指導。

## 回覆規則
1. 使用繁體中文回覆
2. 每次推薦 2-3 種精油
3. 必須提醒安全注意事項
4. 聲明精油不能替代醫療
5. 語氣親切專業

## 必須以此 JSON 格式回覆（不得有其他文字）：
{
  "reply": "針對您情況的簡短說明（1-2句）",
  "recommendations": [
    {
      "oil_id": <精油ID數字>,
      "oil_name": "<精油中文名>",
      "reason": "<推薦原因，1句話>",
      "usage": "<具體使用方法>"
    }
  ],
  "precautions": "⚠️ 使用注意事項"
}

## 可用精油資料庫（請從中推薦）：
${oilContext}`

  const messages = [
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message }
  ]

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages
    })

    const raw = response.content[0].text.trim()
    const parsed = JSON.parse(raw)

    // Save to session history
    history.push({ role: 'user', content: message })
    history.push({ role: 'assistant', content: raw })
    if (history.length > 20) history.splice(0, 2) // Keep last 10 turns

    return res.status(200).json({
      session_id: sessionId,
      reply: parsed.reply,
      recommendations: parsed.recommendations || [],
      precautions: parsed.precautions,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'AI service unavailable', details: e.message })
  }
}
