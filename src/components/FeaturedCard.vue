<template>
  <router-link :to="`/oils/${oil.id}`"
    class="card flex-shrink-0 w-40 p-4 hover:shadow-md transition-shadow active:scale-95 duration-150">
    <div :class="[meta.bg, 'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3']">
      <span :class="[meta.text, 'text-xl font-medium tracking-wide']">{{ meta.char }}</span>
    </div>
    <div class="text-center">
      <div class="font-semibold text-stone-800 text-sm">{{ oil.chinese_name }}</div>
      <div class="text-xs text-stone-400 mt-0.5">{{ oil.english_name }}</div>
      <div class="text-xs text-primary-500 mt-1 tracking-wide">{{ oil.category }}</div>
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
