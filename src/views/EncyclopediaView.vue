<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="px-4 pt-6 pb-3 bg-cream">
      <h1 class="text-xl font-bold text-gray-800 mb-3">精油百科</h1>
      <SearchBar v-model="store.searchQuery" class="mb-3" />
      <!-- Category chips -->
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button v-for="cat in categories" :key="String(cat.value)"
          @click="store.selectedCategory = cat.value"
          :class="[
            'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
            store.selectedCategory === cat.value
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          ]">
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Count -->
    <div class="px-4 py-2 text-xs text-gray-400 bg-cream">
      共 {{ filteredOils.length }} 種精油
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto px-4 pb-4">
      <div v-if="filteredOils.length" class="space-y-2">
        <OilCard v-for="oil in filteredOils" :key="oil.id" :oil="oil" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
        <span class="text-5xl mb-3">🌿</span>
        <p class="text-sm">找不到符合的精油</p>
        <p class="text-xs mt-1">請嘗試不同的搜尋條件</p>
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
