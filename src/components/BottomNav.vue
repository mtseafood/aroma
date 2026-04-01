<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 safe-bottom z-50">
    <div class="flex max-w-lg mx-auto">
      <router-link v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex-1 flex flex-col items-center py-2 gap-0.5 text-stone-400 transition-colors"
        :class="{ 'text-primary-500': isActive(item.to) }">
        <span class="text-xl">{{ item.icon }}</span>
        <span class="text-[10px] font-medium">{{ item.label }}</span>
      </router-link>
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
  { to: '/',         label: '首頁',   icon: '🏡' },
  { to: '/about',    label: '關於我', icon: '🌿' },
  { to: '/services', label: '服務',   icon: '✨' },
  { to: '/oils',     label: '精油',   icon: '💧' },
  { to: '/consult',  label: 'AI諮詢', icon: '🤖' },
]
</script>
