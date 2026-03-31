<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-50">
    <div class="flex max-w-lg mx-auto">
      <router-link v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex-1 flex flex-col items-center py-2 gap-0.5 text-gray-400 transition-colors"
        :class="{ 'text-primary-500': isActive(item.to) }">
        <component :is="item.icon" class="w-6 h-6" />
        <span class="text-[10px] font-medium">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, h } from 'vue'

const route = useRoute()
function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

const HomeIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])
const BookIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])
const SparkleIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' })
])
const HeartIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
])

const navItems = [
  { to: '/',          label: '首頁',    icon: HomeIcon },
  { to: '/oils',      label: '精油百科', icon: BookIcon },
  { to: '/consult',   label: 'AI 諮詢', icon: SparkleIcon },
  { to: '/favorites', label: '收藏',    icon: HeartIcon },
]
</script>
