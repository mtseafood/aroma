<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="px-5 pt-12 pb-4 bg-gradient-to-b from-stone-50 to-cream">
      <p class="text-[10px] tracking-[0.2em] text-primary-400 uppercase mb-1">Encyclopedia</p>
      <div class="flex items-end justify-between mb-5">
        <h1 class="text-2xl font-serif font-light text-stone-800 tracking-wide">精油百科</h1>
        <button @click="showFilter = !showFilter"
          class="flex items-center gap-1.5 text-xs tracking-wide px-3 py-1.5 rounded-full border transition-colors"
          :class="store.selectedCategory
            ? 'border-stone-800 text-stone-800 bg-stone-50'
            : 'border-stone-200 text-stone-400'">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M3 4h18M7 8h10M11 12h2M9 16h6"/>
          </svg>
          {{ store.selectedCategory || '分類' }}
        </button>
      </div>
      <SearchBar v-model="store.searchQuery" />
    </div>

    <!-- Filter panel -->
    <transition name="slide-down">
      <div v-if="showFilter" class="bg-white border-b border-stone-100 px-5 py-4">
        <p class="text-[10px] tracking-widest text-stone-300 uppercase mb-3">選擇分類</p>
        <div class="grid grid-cols-3 gap-2">
          <!-- All -->
          <button @click="select(null)"
            :class="[
              'flex flex-col items-center gap-1.5 py-3 rounded-lg border transition-all',
              store.selectedCategory === null
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-100 bg-stone-50 text-stone-500'
            ]">
            <span class="text-base font-medium">全</span>
            <span class="text-[10px] tracking-wide">{{ store.oils.length }}</span>
          </button>
          <!-- Categories -->
          <button v-for="cat in categoryList" :key="cat.value"
            @click="select(cat.value)"
            :class="[
              'flex flex-col items-center gap-1.5 py-3 rounded-lg border transition-all',
              store.selectedCategory === cat.value
                ? [cat.meta.bg, cat.meta.text, 'border-transparent']
                : 'border-stone-100 bg-stone-50 text-stone-500'
            ]">
            <span class="text-base font-medium"
              :class="store.selectedCategory === cat.value ? cat.meta.text : 'text-stone-600'">
              {{ cat.meta.char }}
            </span>
            <span class="text-[10px] tracking-wide">{{ cat.count }}</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Count + active filter indicator -->
    <div class="px-5 py-2.5 bg-cream flex items-center justify-between">
      <span class="text-xs text-stone-300 tracking-wide">共 {{ filteredOils.length }} 種精油</span>
      <button v-if="store.selectedCategory" @click="select(null)"
        class="flex items-center gap-1 text-xs text-stone-400 tracking-wide">
        <span>{{ store.selectedCategory }}</span>
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto px-4 pb-4">
      <div v-if="filteredOils.length" class="space-y-2 pt-2">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOilsStore } from '@/stores/oils'
import { storeToRefs } from 'pinia'
import { useCategoryIcon } from '@/composables/useCategory'
import SearchBar from '@/components/SearchBar.vue'
import OilCard from '@/components/OilCard.vue'

const store = useOilsStore()
const { filteredOils } = storeToRefs(store)
const { categoryMeta } = useCategoryIcon()
const route = useRoute()
const showFilter = ref(false)

const categoryList = computed(() =>
  store.categories
    .filter(c => c.value !== null)
    .map(c => ({
      value: c.value,
      meta: categoryMeta(c.value),
      count: store.oils.filter(o => o.category === c.value).length,
    }))
)

function select(value) {
  store.selectedCategory = value
  showFilter.value = false
}

onMounted(() => {
  if (route.query.q) store.searchQuery = route.query.q
  if (route.query.cat) store.selectedCategory = route.query.cat
})
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
