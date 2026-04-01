<template>
  <div>
    <!-- Hero -->
    <div class="relative bg-gradient-to-br from-primary-50 via-amber-50 to-stone-50 px-6 pt-12 pb-10 text-center overflow-hidden">
      <div class="absolute top-4 right-4 text-xs text-primary-400 font-medium border border-primary-200 rounded-full px-3 py-1">
        NAHA 認證芳療師
      </div>
      <div class="text-5xl mb-4">🌿</div>
      <h1 class="text-3xl font-bold text-stone-800 tracking-wide">好好療癒</h1>
      <p class="text-stone-500 mt-1 text-sm">Hao Hao Healing Studio</p>
      <p class="text-stone-600 mt-4 leading-relaxed text-sm max-w-xs mx-auto">
        讓自己好好停下來<br>被香氣與聲音輕輕包覆<br>回到最真實的自己
      </p>
      <router-link to="/services"
        class="inline-block mt-6 bg-primary-500 text-white text-sm font-semibold px-8 py-3 rounded-full active:scale-95 transition-transform">
        探索服務
      </router-link>
    </div>

    <div class="px-4 py-6 space-y-8">

      <!-- About Jacqueline -->
      <section>
        <div class="card p-5">
          <div class="flex items-center gap-4">
            <!-- Photo placeholder -->
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-amber-100 flex flex-col items-center justify-center flex-shrink-0">
              <span class="text-3xl">👩‍⚕️</span>
            </div>
            <div>
              <p class="text-xs text-primary-500 font-medium mb-0.5">創辦人</p>
              <h2 class="text-lg font-bold text-stone-800">羅婕華 Jacqueline</h2>
              <p class="text-xs text-stone-500 mt-1 leading-relaxed">NAHA 認證芳療師<br>多年身心靈整合療癒經驗</p>
            </div>
          </div>
          <p class="text-sm text-stone-600 mt-4 leading-relaxed">
            相信每個人都值得被好好對待。透過精油的香氣與頌缽的頻率，陪你找回內在的平靜與力量。
          </p>
          <router-link to="/about" class="inline-block mt-3 text-xs text-primary-500 font-medium">
            了解更多 →
          </router-link>
        </div>
      </section>

      <!-- Services -->
      <section>
        <h2 class="font-semibold text-stone-700 mb-3">服務項目</h2>
        <div class="grid grid-cols-2 gap-3">
          <router-link to="/services" v-for="service in services" :key="service.title"
            class="card p-4 text-center active:scale-95 transition-transform">
            <span class="text-3xl">{{ service.icon }}</span>
            <div class="font-semibold text-sm text-stone-700 mt-2">{{ service.title }}</div>
            <div class="text-xs text-stone-400 mt-1">{{ service.subtitle }}</div>
          </router-link>
        </div>
      </section>

      <!-- Featured oils -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold text-stone-700">精油百科</h2>
          <router-link to="/oils" class="text-xs text-primary-500">查看全部 →</router-link>
        </div>
        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <FeaturedCard v-for="oil in featuredOils" :key="oil.id" :oil="oil" />
        </div>
      </section>

      <!-- AI CTA -->
      <section>
        <router-link to="/consult"
          class="card p-5 flex items-center gap-4 bg-gradient-to-r from-primary-500 to-primary-400 text-white block active:scale-[0.98] transition-transform">
          <span class="text-3xl">✨</span>
          <div class="flex-1">
            <div class="font-semibold">AI 精油諮詢</div>
            <div class="text-xs opacity-80 mt-0.5">描述你的狀態，獲得個人化精油建議</div>
          </div>
          <span class="text-white opacity-60">→</span>
        </router-link>
      </section>

      <!-- Disclaimer -->
      <p class="text-center text-xs text-stone-400 pb-2">
        好好療癒工作室 · 羅婕華 Jacqueline<br>
        NAHA 認證芳療師
      </p>

    </div>
  </div>
</template>

<script setup>
import { useOilsStore } from '@/stores/oils'
import { storeToRefs } from 'pinia'
import FeaturedCard from '@/components/FeaturedCard.vue'

const store = useOilsStore()
const { featuredOils } = storeToRefs(store)

const services = [
  { icon: '🌸', title: '芳香療法', subtitle: '精油調配 · 全身護理' },
  { icon: '🎵', title: '頌缽療癒', subtitle: '聲音振動 · 深層放鬆' },
  { icon: '🌿', title: '客製諮詢', subtitle: '個人化配方建議' },
  { icon: '✨', title: '更多項目', subtitle: '持續規劃中...' },
]
</script>
