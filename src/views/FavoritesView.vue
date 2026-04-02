<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-b from-stone-50 to-white px-5 pt-12 pb-7">
      <p class="text-[10px] tracking-[0.2em] text-primary-400 uppercase mb-1.5">Favorites</p>
      <h1 class="text-2xl font-serif font-light text-stone-800 tracking-wide">我的收藏</h1>
    </div>

    <div class="px-4">
      <div v-if="favoriteOils.length" class="space-y-2">
        <OilCard v-for="oil in favoriteOils" :key="oil.id" :oil="oil" />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-28 text-stone-300">
        <svg class="w-10 h-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <p class="text-sm text-stone-400 font-medium">還沒有收藏的精油</p>
        <p class="text-xs text-stone-300 mt-1 mb-7 tracking-wide">瀏覽精油百科來新增收藏</p>
        <router-link to="/oils"
          class="text-xs border border-stone-800 text-stone-800 px-6 py-2.5 rounded-full tracking-wide active:scale-95 transition-transform">
          瀏覽精油
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOilsStore } from '@/stores/oils'
import { useFavoritesStore } from '@/stores/favorites'
import OilCard from '@/components/OilCard.vue'

const oilsStore = useOilsStore()
const favoritesStore = useFavoritesStore()
const favoriteOils = computed(() => favoritesStore.ids.map(id => oilsStore.getOil(id)).filter(Boolean))
</script>
