<template>
  <div v-if="oil" class="max-w-6xl mx-auto">
    <!-- Hero -->
    <div class="relative pt-12 pb-8 px-4 text-center md:pt-16 md:pb-12 md:px-8"
      :style="{ background: `linear-gradient(to bottom, rgb(${oilMeta.heroRgb}), white)` }">
      <div class="md:max-w-xl md:mx-auto">
        <button @click="router.back()" class="absolute top-4 left-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm md:top-6 md:left-8">
          <svg class="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button @click="toggleFavorite"
          class="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm md:top-6 md:right-8">
          <svg class="w-5 h-5 transition-colors"
            :class="[favorites.isFavorited(oil.id) ? 'text-red-400 fill-red-400' : 'text-stone-300', heartbeating ? 'animate-heartbeat' : '']"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        <div :class="[oilMeta.bg, 'w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-5 shadow-sm md:w-24 md:h-24']">
          <span :class="[oilMeta.text, 'text-3xl font-light tracking-wide md:text-4xl']">{{ oilMeta.char }}</span>
        </div>
        <h1 class="text-2xl font-semibold text-stone-800 tracking-wide md:text-3xl">{{ oil.chinese_name }}</h1>
        <p class="text-stone-400 text-sm mt-1 md:text-base">{{ oil.english_name }}</p>
        <p v-if="oil.latin_name" class="text-stone-300 text-xs mt-0.5 italic">{{ oil.latin_name }}</p>
        <div class="flex justify-center gap-2 mt-3 flex-wrap">
          <span class="pill">{{ oil.category }}</span>
          <span v-if="oil.extraction_method" class="pill">{{ oil.extraction_method }}</span>
          <span v-if="oil.origin" class="pill">{{ oil.origin }}</span>
        </div>
      </div>
    </div>

    <!-- Content: 2-col on lg -->
    <div class="px-4 py-5 md:px-8 lg:px-12 md:py-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start space-y-4 lg:space-y-0">

      <!-- Left column -->
      <div class="space-y-4">
        <div class="card p-4">
          <p class="text-sm text-stone-600 leading-relaxed">{{ oil.description }}</p>
        </div>

        <div v-if="oil.intensity" class="card p-4">
          <h3 class="text-[10px] tracking-widest text-stone-400 uppercase mb-3">香氣強度</h3>
          <div class="flex gap-1">
            <div v-for="i in 10" :key="i"
              :class="['h-3 flex-1 rounded-sm transition-colors', i <= oil.intensity ? 'bg-primary-300' : 'bg-stone-100']"/>
          </div>
          <p class="text-xs text-stone-400 mt-2">{{ oil.aroma_profile }}</p>
        </div>

        <div class="card p-4">
          <h3 class="text-[10px] tracking-widest text-stone-400 uppercase mb-3">主要功效</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="effect in oil.main_effects" :key="effect" class="pill">{{ effect }}</span>
          </div>
        </div>

        <div v-if="related.length" class="card p-4">
          <h3 class="text-[10px] tracking-widest text-stone-400 uppercase mb-4">調香搭配</h3>
          <div class="flex gap-3 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible">
            <router-link v-for="r in related" :key="r.id" :to="`/oils/${r.id}`"
              class="flex-shrink-0 flex flex-col items-center gap-1.5 md:flex-shrink">
              <div :class="[relatedMeta(r.category).bg, 'w-14 h-14 rounded-xl flex items-center justify-center']">
                <span :class="[relatedMeta(r.category).text, 'text-lg font-medium']">{{ relatedMeta(r.category).char }}</span>
              </div>
              <span class="text-xs text-stone-500">{{ r.chinese_name }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-4">
        <div class="card p-4">
          <h3 class="text-[10px] tracking-widest text-stone-400 uppercase mb-3">使用方法</h3>
          <div class="space-y-2">
            <div v-for="method in oil.usage_methods" :key="method.method" class="bg-stone-50 rounded-xl p-3">
              <button class="w-full flex items-center justify-between" @click="toggleMethod(method.method)">
                <span class="text-sm font-medium text-primary-600">{{ method.method }}</span>
                <svg class="w-4 h-4 text-stone-300 transition-transform"
                  :class="{ 'rotate-180': expanded.has(method.method) }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <p v-if="expanded.has(method.method)" class="text-xs text-stone-500 mt-2 leading-relaxed">
                {{ method.instruction }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="oil.precautions" class="card p-4 border-l-2 border-amber-300">
          <div class="flex gap-3">
            <svg class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
            <div>
              <h3 class="text-[10px] tracking-widests text-stone-400 uppercase mb-1">注意事項</h3>
              <p class="text-xs text-stone-500 leading-relaxed">{{ oil.precautions }}</p>
            </div>
          </div>
        </div>

        <router-link to="/consult"
          class="block p-5 bg-stone-800 text-white rounded-2xl active:scale-[0.98] transition-transform hover:bg-stone-700 duration-150">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <div class="flex-1">
              <div class="text-sm font-medium">詢問 AI 如何使用{{ oil.chinese_name }}</div>
              <div class="text-xs text-stone-400 mt-0.5">獲得個性化使用建議</div>
            </div>
            <svg class="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </router-link>

        <div class="h-2" />
      </div>
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-64 text-stone-400 text-sm">
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
const { categoryMeta } = useCategoryIcon()

const oil = computed(() => oilsStore.getOil(route.params.id))
const related = computed(() => oil.value ? oilsStore.getRelated(oil.value.blends_well) : [])
const oilMeta = computed(() => categoryMeta(oil.value?.category))
function relatedMeta(cat) { return categoryMeta(cat) }

const heartbeating = ref(false)
function toggleFavorite() {
  favorites.toggle(oil.value.id)
  if (favorites.isFavorited(oil.value.id)) {
    heartbeating.value = true
    setTimeout(() => { heartbeating.value = false }, 600)
  }
}

const expanded = ref(new Set())
function toggleMethod(name) {
  if (expanded.value.has(name)) expanded.value.delete(name)
  else expanded.value.add(name)
}
</script>
