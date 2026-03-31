import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultationStore = defineStore('consultation', () => {
  const messages = ref([
    {
      id: 1,
      role: 'assistant',
      content: '您好！我是您的精油諮詢助理 🌿\n\n請描述您的症狀或需求，我將為您推薦合適的精油和使用方式。\n\n⚠️ 精油建議僅供參考，嚴重症狀請就醫。',
      recommendations: [],
    }
  ])
  const isLoading = ref(false)
  const sessionId = ref(null)

  const suggestedSymptoms = ['頭痛', '失眠', '焦慮', '壓力大', '肌肉酸痛', '鼻塞', '皮膚問題', '消化不良', '憂鬱', '水腫']

  async function send(text) {
    if (!text.trim() || isLoading.value) return

    messages.value.push({ id: Date.now(), role: 'user', content: text, recommendations: [] })
    isLoading.value = true

    try {
      const res = await fetch('https://aroma-seven-sable.vercel.app/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId.value })
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      sessionId.value = data.session_id

      messages.value.push({
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply,
        recommendations: data.recommendations || [],
        precautions: data.precautions,
      })
    } catch {
      // Fallback mock response when API is not available
      await new Promise(r => setTimeout(r, 1200))
      messages.value.push(mockResponse(text))
    } finally {
      isLoading.value = false
    }
  }

  function clear() {
    messages.value = [messages.value[0]]
    sessionId.value = null
  }

  return { messages, isLoading, suggestedSymptoms, send, clear }
})

function mockResponse(input) {
  const map = {
    '頭痛': { reply: '針對頭痛，以下精油有顯著效果：', recs: [
      { oil_id: 4, oil_name: '薄荷', reason: '薄荷腦帶來清涼感，有效緩解緊張性頭痛', usage: '稀釋後塗抹太陽穴' },
      { oil_id: 1, oil_name: '薰衣草', reason: '舒緩壓力性頭痛，放鬆頸部肌肉', usage: '擴香或按摩後頸' }
    ]},
    '失眠': { reply: '改善睡眠品質，這些精油最有效：', recs: [
      { oil_id: 1, oil_name: '薰衣草', reason: '最著名的助眠精油，降低焦慮助入眠', usage: '睡前擴香或滴枕頭' },
      { oil_id: 8, oil_name: '雪松', reason: '木質香氣帶來安全感，深化睡眠品質', usage: '與薰衣草混合擴香' }
    ]},
    '焦慮': { reply: '緩解焦慮和壓力的推薦精油：', recs: [
      { oil_id: 11, oil_name: '佛手柑', reason: '研究證實能有效降低焦慮指數', usage: '擴香或塗抹脈搏處' },
      { oil_id: 7, oil_name: '乳香', reason: '深沉氣味助平靜心緒，緩解過度思慮', usage: '冥想時擴香' }
    ]},
  }

  const found = Object.entries(map).find(([key]) => input.includes(key))
  const item = found ? found[1] : {
    reply: '以下是幾款萬用的日常精油推薦：',
    recs: [
      { oil_id: 1, oil_name: '薰衣草', reason: '最多功能的精油，適合大多數情況', usage: '擴香或局部塗抹' },
      { oil_id: 2, oil_name: '甜橙', reason: '提振心情，安全易用適合日常', usage: '早晨擴香' }
    ]
  }

  return {
    id: Date.now() + 1,
    role: 'assistant',
    content: item.reply,
    recommendations: item.recs,
    precautions: '⚠️ 使用前請稀釋，建議先做皮膚過敏測試。'
  }
}
