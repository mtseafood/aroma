<template>
  <router-link :to="`/oils/${oil.id}`" class="card block p-4 hover:shadow-md transition-shadow active:scale-[0.98] duration-150">
    <div class="flex items-center gap-3">
      <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-50 to-amber-50 flex items-center justify-center flex-shrink-0 text-3xl">
        {{ categoryIcon(oil.category) }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-baseline gap-2">
          <span class="font-semibold text-gray-800">{{ oil.chinese_name }}</span>
          <span class="text-xs text-gray-400">{{ oil.english_name }}</span>
        </div>
        <div class="flex flex-wrap gap-1 mt-1">
          <span v-for="effect in oil.main_effects.slice(0,3)" :key="effect" class="pill">{{ effect }}</span>
        </div>
        <div class="text-xs text-gray-400 mt-1">{{ oil.category }} · {{ oil.origin }}</div>
      </div>
      <svg class="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
  </router-link>
</template>

<script setup>
import { useCategoryIcon } from '@/composables/useCategory'
const { categoryIcon } = useCategoryIcon()
defineProps({ oil: Object })
</script>
