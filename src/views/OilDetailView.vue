<template>
  <div v-if="oil">
    <!-- Hero -->
    <div class="relative bg-gradient-to-br from-primary-50 to-amber-50 pt-12 pb-8 px-4 text-center">
      <button @click="router.back()" class="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button @click="favorites.toggle(oil.id)"
        class="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
        <svg class="w-5 h-5 transition-colors" :class="favorites.isFavorited(oil.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
      <div class="text-7xl mb-4">{{ categoryIcon(oil.category) }}</div>
      <h1 class="text-2xl font-bold text-gray-800">{{ oil.chinese_name }}</h1>
      <p class="text-gray-500 text-sm mt-0.5">{{ oil.english_name }}</p>
      <p v-if="oil.latin_name" class="text-gray-400 text-xs mt-0.5 italic">{{ oil.latin_name }}</p>
      <div class="flex justify-center gap-2 mt-3 flex-wrap">
        <span class="pill">{{ oil.category }}</span>
        <span v-if="oil.extraction_method" class="pill">{{ oil.extraction_method }}</span>
        <span v-if="oil.origin" class="pill">{{ oil.origin }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 py-5 space-y-4">

      <!-- Description -->
      <div class="card p-4">
        <p class="text-sm text-gray-700 leading-relaxed">{{ oil.description }}</p>
      </div>

      <!-- Intensity -->
      <div v-if="oil.intensity" class="card p-4">
        <h3 class="font-semibold text-gray-700 text-sm mb-2">香氣強度</h3>
        <div class="flex gap-1">
          <div v-for="i in 10" :key="i"
            :class="['h-4 w-6 rounded-sm transition-colors', i <= oil.intensity ? 'bg-amber-400' : 'bg-gray-100']"/>
        </div>
        <p class="text-xs text-gray-400 mt-1">{{ oil.aroma_profile }}</p>
      </div>

      <!-- Effects -->
      <div class="card p-4">
        <h3 class="font-semibold text-gray-700 text-sm mb-3">主要功效</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="effect in oil.main_effects" :key="effect" class="pill">{{ effect }}</span>
        </div>
      </div>

      <!-- Usage methods -->
      <div class="card p-4">
        <h3 class="font-semibold text-gray-700 text-sm mb-3">使用方法</h3>
        <div class="space-y-2">
          <div v-for="method in oil.usage_methods" :key="method.method"
            class="bg-gray-50 rounded-xl p-3">
            <button class="w-full flex items-center justify-between" @click="toggleMethod(method.method)">
              <span class="text-sm font-medium text-primary-600">{{ method.method }}</span>
              <svg class="w-4 h-4 text-gray-400 transition-transform"
                :class="{ 'rotate-180': expanded.has(method.method) }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <p v-if="expanded.has(method.method)" class="text-xs text-gray-600 mt-2 leading-relaxed">
              {{ method.instruction }}
            </p>
          </div>
        </div>
      </div>

      <!-- Precautions -->
      <div v-if="oil.precautions" class="card p-4 border-l-4 border-amber-400">
        <div class="flex gap-2">
          <span class="text-lg">⚠️</span>
          <div>
            <h3 class="font-semibold text-gray-700 text-sm mb-1">注意事項</h3>
            <p class="text-xs text-gray-600 leading-relaxed">{{ oil.precautions }}</p>
          </div>
        </div>
      </div>

      <!-- Blends well -->
      <div v-if="related.length" class="card p-4">
        <h3 class="font-semibold text-gray-700 text-sm mb-3">調香搭配</h3>
        <div class="flex gap-3 overflow-x-auto no-scrollbar">
          <router-link v-for="r in related" :key="r.id" :to="`/oils/${r.id}`"
            class="flex-shrink-0 flex flex-col items-center gap-1">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-amber-50 flex items-center justify-center text-2xl">
              {{ categoryIcon(r.category) }}
            </div>
            <span class="text-xs text-gray-600">{{ r.chinese_name }}</span>
          </router-link>
        </div>
      </div>

      <!-- AI consult CTA -->
      <router-link to="/consult"
        class="card p-4 flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white active:scale-[0.98] transition-transform block">
        <span class="text-2xl">✨</span>
        <div>
          <div class="font-semibold text-sm">詢問 AI 如何使用{{ oil.chinese_name }}</div>
          <div class="text-xs opacity-80 mt-0.5">獲得個性化使用建議</div>
        </div>
        <svg class="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </router-link>

      <div class="h-2" />
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-64 text-gray-400">
    找不到精油資料
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOilsStore } from '@/stores/oils'
import { useFavoritesStore } from '@/stores/favorites'
import { useCategoryIcon } from '@/composables/useCategory'

const route = useRoute()
const router = useRouter()
const oilsStore = useOilsStore()
const favorites = useFavoritesStore()
const { categoryIcon } = useCategoryIcon()

const oil = computed(() => oilsStore.getOil(route.params.id))
const related = computed(() => oil.value ? oilsStore.getRelated(oil.value.blends_well) : [])

const expanded = ref(new Set())
function toggleMethod(name) {
  if (expanded.value.has(name)) expanded.value.delete(name)
  else expanded.value.add(name)
}
</script>
