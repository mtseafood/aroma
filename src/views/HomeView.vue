<template>
  <div class="px-4 pt-6">
    <!-- Header -->
    <div class="mb-5">
      <h1 class="text-2xl font-bold text-primary-600">🌿 精油百科</h1>
      <p class="text-sm text-gray-400 mt-0.5">探索自然的療癒力量</p>
    </div>

    <!-- Search -->
    <SearchBar v-model="query" placeholder="搜尋精油名稱或功效..." class="mb-5"
      @keyup.enter="router.push({ path: '/oils', query: { q: query } })" />

    <!-- Featured -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-semibold text-gray-700">精選精油</h2>
        <router-link to="/oils" class="text-xs text-primary-500">查看全部 →</router-link>
      </div>
      <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        <FeaturedCard v-for="oil in featuredOils" :key="oil.id" :oil="oil" />
      </div>
    </section>

    <!-- Categories -->
    <section class="mb-6">
      <h2 class="font-semibold text-gray-700 mb-3">依類別瀏覽</h2>
      <div class="grid grid-cols-4 gap-2">
        <router-link v-for="cat in categories.slice(1)" :key="cat.value"
          :to="`/oils?cat=${cat.value}`"
          class="card flex flex-col items-center py-3 gap-1 hover:shadow-md transition-shadow active:scale-95 duration-150">
          <span class="text-2xl">{{ cat.icon }}</span>
          <span class="text-[11px] text-gray-600 font-medium">{{ cat.label }}</span>
        </router-link>
      </div>
    </section>

    <!-- Quick consult CTA -->
    <section class="mb-6">
      <div class="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-400 p-5 text-white">
        <div class="flex items-center gap-3">
          <span class="text-3xl">✨</span>
          <div>
            <div class="font-semibold text-lg">AI 精油諮詢</div>
            <div class="text-sm opacity-80 mt-0.5">描述症狀，獲得個性化推薦</div>
          </div>
        </div>
        <router-link to="/consult"
          class="mt-4 block text-center bg-white text-primary-600 font-semibold rounded-xl py-2.5 text-sm active:scale-95 transition-transform">
          立即諮詢
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOilsStore } from '@/stores/oils'
import { storeToRefs } from 'pinia'
import SearchBar from '@/components/SearchBar.vue'
import FeaturedCard from '@/components/FeaturedCard.vue'

const router = useRouter()
const store = useOilsStore()
const { featuredOils } = storeToRefs(store)
const categories = store.categories  // plain array, access directly
const query = ref('')
</script>
