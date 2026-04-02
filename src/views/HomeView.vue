<template>
  <div>
    <!-- Hero -->
    <div class="relative bg-gradient-to-b from-stone-50 to-white px-8 pt-16 pb-14 text-center overflow-hidden">
      <!-- Dot texture overlay -->
      <div class="absolute inset-0 hero-texture opacity-100 pointer-events-none"></div>

      <div class="relative">
        <NahaBadge class="mb-10" />

        <!-- Title -->
        <div class="mb-9">
          <h1 class="text-5xl font-serif font-light tracking-[0.2em] text-gold leading-none mb-3">好好療癒</h1>
          <p class="text-[9px] tracking-[0.35em] text-stone-400 uppercase">Hao Hao Healing Studio</p>
        </div>
        <p class="text-sm text-stone-500 leading-[2.2] max-w-xs mx-auto">
          讓自己好好停下來<br>
          被香氣與聲音輕輕包覆<br>
          回到最真實的自己
        </p>
        <router-link to="/services"
          class="inline-block mt-9 text-[10px] tracking-widest uppercase px-10 py-3 active:scale-95 duration-150 transition-transform"
          style="border: 1px solid #c9a84c; color: #b8902a;">
          探索服務
        </router-link>
      </div>
    </div>

    <!-- Philosophy strip -->
    <div class="px-8 py-6 text-center" style="background: linear-gradient(135deg, #1a1a14, #2a2416, #1a1a14);">
      <div class="w-8 h-px divider-gold mx-auto mb-4 opacity-60"></div>
      <p class="text-xs tracking-[0.2em] leading-loose text-gold">
        「療癒不是奢侈，是每個人都值得給自己的禮物」
      </p>
      <p class="text-[10px] tracking-widest text-stone-500 mt-2 uppercase">— Jacqueline</p>
      <div class="w-8 h-px divider-gold mx-auto mt-4 opacity-60"></div>
    </div>

    <!-- Brand trust strip -->
    <div class="bg-white border-b border-stone-100 px-8 py-5">
      <div class="flex items-center justify-center gap-10">
        <div class="flex flex-col items-center gap-2">
          <img src="/images/doterra_icon.jpg" alt="dōTERRA" class="h-6 w-auto opacity-70" />
          <p class="text-[9px] tracking-widest text-stone-300 uppercase">指定精油品牌</p>
        </div>
        <div class="w-px h-8 bg-stone-100"></div>
        <div class="flex flex-col items-center gap-2">
          <img src="/images/naha_icon.png" alt="NAHA" class="h-6 w-auto opacity-70" />
          <p class="text-[9px] tracking-widest text-stone-300 uppercase">芳療師認證</p>
        </div>
      </div>
    </div>

    <div class="px-5 py-10 space-y-12">

      <!-- About -->
      <section>
        <div class="flex items-center gap-5 p-6 bg-white rounded-xl border border-stone-100">
          <div class="w-16 h-16 rounded-lg bg-stone-200 flex-shrink-0 overflow-hidden">
            <img :src="'/images/jacqueline.jpg'" alt="Jacqueline"
              class="w-full h-full object-cover"
              @error="e => e.target.style.display='none'" />
          </div>
          <div>
            <p class="text-[10px] tracking-widest text-primary-400 uppercase mb-1">Founder</p>
            <p class="font-semibold text-stone-800">羅婕華 Jacqueline</p>
            <p class="text-xs text-stone-400 mt-0.5">NAHA 國際認證芳療師</p>
          </div>
        </div>
        <router-link to="/about" class="block text-right text-xs text-stone-400 mt-2.5 pr-1">
          了解更多 →
        </router-link>
      </section>

      <!-- Divider -->
      <div class="flex items-center gap-4">
        <div class="flex-1 h-px divider-gold opacity-40"></div>
        <span class="text-[10px] tracking-widest uppercase" style="color: #c9a84c;">Services</span>
        <div class="flex-1 h-px divider-gold opacity-40"></div>
      </div>

      <!-- Services -->
      <section class="grid grid-cols-2 gap-3">
        <router-link to="/services" v-for="s in services" :key="s.title"
          class="p-5 bg-white rounded-xl border border-stone-100 active:scale-95 transition-transform">
          <div class="text-xs tracking-widest uppercase mb-2" style="color: #c9a84c;">{{ s.en }}</div>
          <div class="font-semibold text-stone-700 text-sm">{{ s.title }}</div>
          <div class="text-xs text-stone-400 mt-1.5">{{ s.sub }}</div>
        </router-link>
      </section>

      <!-- Divider -->
      <div class="flex items-center gap-4">
        <div class="flex-1 h-px divider-gold opacity-40"></div>
        <span class="text-[10px] tracking-widest uppercase" style="color: #c9a84c;">Oils</span>
        <div class="flex-1 h-px divider-gold opacity-40"></div>
      </div>

      <!-- Featured oils -->
      <section>
        <div class="flex items-center justify-between mb-5">
          <p class="text-sm font-medium text-stone-600">精選精油</p>
          <router-link to="/oils" class="text-xs text-stone-400">查看全部 →</router-link>
        </div>
        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          <FeaturedCard v-for="oil in featuredOils" :key="oil.id" :oil="oil" />
        </div>
      </section>

      <!-- AI CTA -->
      <section>
        <router-link to="/consult"
          class="block p-6 bg-stone-800 text-white rounded-xl active:scale-[0.98] transition-transform">
          <p class="text-[10px] tracking-widest uppercase text-stone-400 mb-2">AI Consultation</p>
          <p class="font-medium text-sm">精油 AI 諮詢</p>
          <p class="text-xs text-stone-400 mt-1.5">描述你的狀態，獲得個人化精油建議</p>
          <p class="text-xs text-stone-500 mt-4">開始諮詢 →</p>
        </router-link>
      </section>

      <!-- Footer -->
      <p class="text-center text-[10px] tracking-widest text-stone-300 uppercase pb-2">
        好好療癒工作室 · Jacqueline Lo
      </p>

    </div>
  </div>
</template>

<script setup>
import { useOilsStore } from '@/stores/oils'
import { storeToRefs } from 'pinia'
import FeaturedCard from '@/components/FeaturedCard.vue'
import NahaBadge from '@/components/NahaBadge.vue'

const { featuredOils } = storeToRefs(useOilsStore())

const services = [
  { en: 'Aromatherapy', title: '芳香療法', sub: '精油調配 · 全身護理' },
  { en: 'Sound Healing', title: '頌缽療癒', sub: '聲音振動 · 深層放鬆' },
  { en: 'Consultation', title: '客製諮詢', sub: '個人化配方建議' },
  { en: 'Coming Soon', title: '更多項目', sub: '持續規劃中' },
]
</script>
