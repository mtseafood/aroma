<template>
  <router-link :to="`/oils/${oil.id}`"
    class="card flex-shrink-0 w-40 p-4 hover:shadow-md transition-shadow active:scale-95 duration-150">
    <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-50 to-amber-50 flex items-center justify-center text-4xl mb-3">
      {{ categoryIcon(oil.category) }}
    </div>
    <div class="text-center">
      <div class="font-semibold text-gray-800 text-sm">{{ oil.chinese_name }}</div>
      <div class="text-xs text-gray-400 mt-0.5">{{ oil.english_name }}</div>
      <div class="text-xs text-primary-500 mt-1">{{ oil.category }}</div>
    </div>
  </router-link>
</template>

<script setup>
import { useCategoryIcon } from '@/composables/useCategory'
const { categoryIcon } = useCategoryIcon()
defineProps({ oil: Object })
</script>
