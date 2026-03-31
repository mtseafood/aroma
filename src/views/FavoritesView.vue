<template>
  <div class="px-4 pt-6">
    <h1 class="text-xl font-bold text-gray-800 mb-4">我的收藏 ❤️</h1>

    <div v-if="favoriteOils.length" class="space-y-2">
      <OilCard v-for="oil in favoriteOils" :key="oil.id" :oil="oil" />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-24 text-gray-400">
      <span class="text-6xl mb-4">🌸</span>
      <p class="text-sm font-medium">還沒有收藏的精油</p>
      <p class="text-xs mt-1 mb-6">瀏覽精油百科來新增收藏</p>
      <router-link to="/oils" class="btn-primary text-sm px-6 py-2.5">瀏覽精油</router-link>
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
