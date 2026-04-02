<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-stone-100">
    <div class="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-4">
        <span class="text-lg font-light text-stone-800 tracking-widest">好好療癒</span>
        <span class="hidden lg:inline text-[10px] tracking-[0.2em] text-stone-300 uppercase">Hao Hao Healing Studio</span>
      </router-link>
      <div class="flex items-center gap-8">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to"
          class="text-[11px] tracking-widest uppercase transition-colors"
          :class="isActive(item.to) ? 'text-stone-800' : 'text-stone-400 hover:text-stone-700'">
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}
const navItems = [
  { to: '/',         label: '首頁' },
  { to: '/about',    label: '關於我' },
  { to: '/services', label: '服務' },
  { to: '/oils',     label: '精油' },
  { to: '/consult',  label: 'AI 諮詢' },
]
</script>
