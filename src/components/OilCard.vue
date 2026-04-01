<template>
  <router-link :to="`/oils/${oil.id}`"
    class="card block overflow-hidden active:scale-[0.98] duration-150 transition-transform">
    <div class="flex items-stretch">
      <!-- Category accent bar -->
      <div class="w-[3px] flex-shrink-0" :style="{ backgroundColor: meta.accent }"></div>

      <!-- Content -->
      <div class="flex items-center gap-3 p-4 flex-1 min-w-0">
        <div :class="[meta.bg, 'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0']">
          <span :class="[meta.text, 'text-sm font-medium']">{{ meta.char }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2">
            <span class="font-semibold text-stone-800">{{ oil.chinese_name }}</span>
            <span class="text-xs text-stone-400 truncate">{{ oil.english_name }}</span>
          </div>
          <div class="flex flex-wrap gap-1 mt-1">
            <span v-for="effect in oil.main_effects.slice(0,3)" :key="effect" class="pill">{{ effect }}</span>
          </div>
          <div class="text-xs text-stone-300 mt-1 tracking-wide">{{ oil.category }} · {{ oil.origin }}</div>
        </div>
        <svg class="w-4 h-4 text-stone-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useCategoryIcon } from '@/composables/useCategory'
const { categoryMeta } = useCategoryIcon()
const props = defineProps({ oil: Object })
const meta = computed(() => categoryMeta(props.oil.category))
</script>
