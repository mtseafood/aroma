<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-b from-stone-50 to-white px-8 pt-12 pb-8 text-center">
      <p class="text-[10px] tracking-[0.2em] text-primary-400 uppercase mb-3">Services</p>
      <h1 class="text-2xl font-light text-stone-800 tracking-wide">服務項目</h1>
      <p class="text-xs text-stone-400 mt-2">每一個療程，都是給自己的禮物</p>
    </div>

    <div class="px-5 py-6 space-y-4">

      <div v-for="service in services" :key="service.title" class="bg-stone-50 rounded-2xl overflow-hidden">
        <!-- Photo placeholder -->
        <div class="h-44 bg-stone-200 overflow-hidden">
          <img :src="service.image" :alt="service.title"
            class="w-full h-full object-cover"
            @error="e => e.target.style.display='none'" />
        </div>

        <div class="p-5">
          <div class="flex items-start justify-between mb-3">
            <div>
              <p class="text-[10px] tracking-widest text-primary-400 uppercase mb-1">{{ service.en }}</p>
              <h3 class="font-semibold text-stone-800">{{ service.title }}</h3>
            </div>
            <span v-if="service.badge"
              class="text-[10px] tracking-wide border border-primary-300 text-primary-500 px-2 py-1 rounded-full">
              {{ service.badge }}
            </span>
          </div>

          <p class="text-sm text-stone-500 leading-relaxed">{{ service.desc }}</p>

          <div class="mt-4 space-y-1.5">
            <div v-for="item in service.includes" :key="item"
              class="flex items-center gap-2 text-xs text-stone-400">
              <div class="w-1 h-1 rounded-full bg-primary-300 flex-shrink-0"></div>
              {{ item }}
            </div>
          </div>

          <div class="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between">
            <p class="text-xs text-stone-400">{{ service.duration }}</p>
            <router-link to="/about"
              class="text-xs border border-stone-800 text-stone-800 px-5 py-2 rounded-full tracking-wide active:scale-95 transition-transform">
              預約諮詢
            </router-link>
          </div>
        </div>
      </div>

      <!-- Coming soon -->
      <div class="border border-dashed border-stone-200 rounded-2xl p-8 text-center">
        <p class="text-sm font-medium text-stone-500">更多療癒項目</p>
        <p class="text-xs text-stone-300 mt-1 tracking-wide">持續規劃中 · Coming Soon</p>
      </div>

    </div>
  </div>
</template>

<script setup>
const services = [
  {
    en: 'Aromatherapy',
    title: '芳香療法療程',
    badge: 'NAHA 認證',
    duration: '60 / 90 分鐘',
    image: '/images/aromatherapy.jpg',
    desc: '透過專業調配的精油複方，結合芳香按摩或擴香，舒緩身體緊繃、平衡情緒狀態。每一瓶配方都根據你當下的身心需求量身打造。',
    includes: [
      '個人身心狀態評估',
      '客製化精油複方調配',
      '全身或局部芳香按摩',
      '居家保養建議',
    ],
  },
  {
    en: 'Sound Healing',
    title: '頌缽聲音療癒',
    badge: null,
    duration: '45 / 60 分鐘',
    image: '/images/singing-bowl.jpg',
    desc: '西藏頌缽發出的純淨振動頻率，深入身體每個細胞，協助釋放長期累積的緊繃與壓力，帶來深層放鬆與內在平靜。',
    includes: [
      '全身頌缽振動療癒',
      '呼吸引導與靜心',
      '能量場清理與平衡',
      '療程後分享與建議',
    ],
  },
  {
    en: 'Consultation',
    title: '精油配方諮詢',
    badge: null,
    duration: '30 分鐘',
    image: '/images/consultation.jpg',
    desc: '針對你的具體需求，由 Jacqueline 提供專業精油選用建議，並調配適合你的個人複方精油。',
    includes: [
      '一對一深度諮詢',
      '精油知識與使用方式',
      '個人複方調配',
    ],
  },
]
</script>
