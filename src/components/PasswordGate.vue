<template>
  <div class="min-h-screen bg-gradient-to-b from-stone-50 to-white flex items-center justify-center px-6">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-10">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
          <svg class="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-light text-stone-800 tracking-widest">好好療癒</h1>
        <p class="text-xs text-stone-400 mt-1 tracking-[0.2em] uppercase">Hao Hao Healing Studio</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="verify">
        <label class="block text-[10px] tracking-widest text-stone-400 uppercase mb-2">訪問密碼</label>
        <input
          v-model="password"
          type="password"
          placeholder="請輸入密碼"
          class="input mb-3"
          autofocus
          :disabled="loading"
        />

        <p v-if="error" class="text-red-400 text-xs mb-3 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </p>

        <button type="submit" class="btn-primary w-full flex items-center justify-center gap-2" :disabled="loading || !password">
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <span>{{ loading ? '驗證中...' : '進入' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['authenticated'])
const password = ref('')
const loading = ref(false)
const error = ref('')

async function verify() {
  if (!password.value) return
  loading.value = true
  error.value = ''

  try {
    const res = await fetch('https://aroma-seven-sable.vercel.app/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })

    if (res.ok) {
      localStorage.setItem('aroma_auth', '1')
      emit('authenticated')
    } else {
      error.value = '密碼錯誤，請再試一次'
      password.value = ''
    }
  } catch {
    error.value = '連線失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}
</script>
