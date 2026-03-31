<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-amber-50 flex items-center justify-center px-6">
    <div class="bg-white rounded-3xl shadow-lg p-8 w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="text-6xl mb-3">🌿</div>
        <h1 class="text-2xl font-bold text-primary-600">精油百科</h1>
        <p class="text-sm text-gray-400 mt-1">探索自然的療癒力量</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="verify">
        <label class="block text-sm font-medium text-gray-600 mb-2">訪問密碼</label>
        <input
          v-model="password"
          type="password"
          placeholder="請輸入密碼"
          class="input mb-3"
          autofocus
          :disabled="loading"
        />

        <p v-if="error" class="text-red-500 text-xs mb-3 flex items-center gap-1">
          <span>⚠️</span> {{ error }}
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
