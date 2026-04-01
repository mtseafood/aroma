<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="px-5 pt-10 pb-3 bg-gradient-to-b from-stone-50 to-cream">
      <p class="text-[10px] tracking-[0.2em] text-primary-400 uppercase mb-1">Encyclopedia</p>
      <h1 class="text-2xl font-light text-stone-800 tracking-wide mb-4">精油百科</h1>
      <SearchBar v-model="store.searchQuery" class="mb-3" />
      <!-- Category chips -->
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button v-for="cat in categories" :key="String(cat.value)"
          @click="store.selectedCategory = cat.value"
          :class="[
            'flex-shrink-0 px-3 py-1.5 rounded-full text-xs tracking-wide transition-colors',
            store.selectedCategory === cat.value
              ? 'bg-stone-800 text-white'
              : 'bg-white text-stone-500 border border-stone-200'
          ]">
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Count -->
    <div class="px-5 py-2 text-xs text-stone-300 tracking-wide bg-cream">
      共 {{ filteredOils.length }} 種精油
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto px-4 pb-4">
      <div v-if="filteredOils.length" class="space-y-2">
        <OilCard v-for="oil in filteredOils" :key="oil.id" :oil="oil" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-20 text-stone-300">
        <svg class="w-10 h-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
        </svg>
        <p class="text-sm text-stone-400">找不到符合的精油</p>
        <p class="text-xs mt-1 text-stone-300 tracking-wide">請嘗試不同的搜尋條件</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOilsStore } from '@/stores/oils'
import { storeToRefs } from 'pinia'
import SearchBar from '@/components/SearchBar.vue'
import OilCard from '@/components/OilCard.vue'

const store = useOilsStore()
const { filteredOils, categories } = storeToRefs(store)
const route = useRoute()

onMounted(() => {
  if (route.query.q) store.searchQuery = route.query.q
  if (route.query.cat) store.selectedCategory = route.query.cat
})
</script>
