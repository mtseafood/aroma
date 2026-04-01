<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="px-5 pt-10 pb-4 bg-gradient-to-b from-stone-50 to-white border-b border-stone-100 flex items-end justify-between">
      <div>
        <p class="text-[10px] tracking-[0.2em] text-primary-400 uppercase mb-1">AI Consultation</p>
        <h1 class="text-2xl font-light text-stone-800 tracking-wide">精油諮詢</h1>
      </div>
      <button @click="store.clear()"
        class="text-xs text-stone-400 px-3 py-1.5 border border-stone-200 rounded-full tracking-wide mb-1">
        清除
      </button>
    </div>

    <!-- Messages -->
    <div ref="scrollEl" class="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-stone-50/50">
      <div v-for="msg in store.messages" :key="msg.id">
        <!-- User -->
        <div v-if="msg.role === 'user'" class="flex justify-end">
          <div class="max-w-[80%] bg-stone-800 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed">
            {{ msg.content }}
          </div>
        </div>

        <!-- Assistant -->
        <div v-else class="flex gap-2.5 items-end">
          <div class="w-8 h-8 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
          <div class="max-w-[85%] space-y-2">
            <div class="bg-white rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-stone-600 leading-relaxed whitespace-pre-line border border-stone-100">
              {{ msg.content }}
            </div>

            <!-- Recommendations -->
            <div v-if="msg.recommendations?.length" class="space-y-2">
              <router-link v-for="rec in msg.recommendations" :key="rec.oil_id"
                :to="`/oils/${rec.oil_id}`"
                class="flex items-start justify-between gap-2 bg-white rounded-xl p-3 border border-stone-100 active:scale-[0.98] transition-transform block">
                <div class="flex-1">
                  <span class="font-medium text-stone-800 text-sm">{{ rec.oil_name }}</span>
                  <p class="text-xs text-stone-500 mt-0.5 leading-relaxed">{{ rec.reason }}</p>
                  <p class="text-xs text-stone-300 mt-1.5 tracking-wide">{{ rec.usage }}</p>
                </div>
                <svg class="w-4 h-4 text-stone-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>

            <!-- Precautions -->
            <div v-if="msg.precautions" class="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-600 leading-relaxed">
              {{ msg.precautions }}
            </div>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="store.isLoading" class="flex gap-2.5 items-end">
        <div class="w-8 h-8 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <div class="bg-white rounded-2xl rounded-bl-sm px-4 py-3 border border-stone-100">
          <div class="flex gap-1.5">
            <span v-for="i in 3" :key="i" class="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"
              :style="{ animationDelay: `${(i-1) * 0.15}s` }"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Suggestions -->
    <div v-if="store.messages.length <= 1 && !store.isLoading"
      class="px-4 py-3 border-t border-stone-100 bg-white">
      <p class="text-[10px] tracking-widest text-stone-300 uppercase mb-2">常見症狀</p>
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button v-for="s in store.suggestedSymptoms" :key="s"
          @click="sendSuggestion(s)"
          class="flex-shrink-0 text-xs px-3 py-1.5 border border-stone-200 text-stone-500 rounded-full tracking-wide">
          {{ s }}
        </button>
      </div>
    </div>

    <!-- Input -->
    <div class="px-4 py-3 bg-white border-t border-stone-100 flex gap-2 items-end">
      <textarea
        v-model="input"
        placeholder="請描述您的症狀或問題..."
        rows="1"
        class="flex-1 bg-stone-100 rounded-2xl px-4 py-3 text-sm resize-none outline-none focus:ring-2 focus:ring-primary-200 transition max-h-32"
        @keydown.enter.exact.prevent="send"
        @input="autoResize"
        ref="textareaEl"
      />
      <button @click="send"
        :disabled="!input.trim() || store.isLoading"
        class="w-11 h-11 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        :class="input.trim() ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-300'">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useConsultationStore } from '@/stores/consultation'

const store = useConsultationStore()
const input = ref('')
const scrollEl = ref(null)
const textareaEl = ref(null)

async function send() {
  if (!input.value.trim() || store.isLoading) return
  const text = input.value.trim()
  input.value = ''
  await store.send(text)
}

function sendSuggestion(s) {
  input.value = `我有${s}的問題，有哪些精油可以幫助？`
  send()
}

function autoResize(e) {
  e.target.style.height = 'auto'
  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px'
}

watch(() => store.messages.length, async () => {
  await nextTick()
  scrollEl.value?.scrollTo({ top: scrollEl.value.scrollHeight, behavior: 'smooth' })
})
</script>
