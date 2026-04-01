<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-br from-primary-50 to-amber-50 px-6 pt-10 pb-8 text-center">
      <h1 class="text-2xl font-bold text-stone-800">服務項目</h1>
      <p class="text-sm text-stone-500 mt-2">每一個療程，都是給自己的禮物</p>
    </div>

    <div class="px-4 py-6 space-y-4">

      <!-- Services -->
      <div v-for="service in services" :key="service.title" class="card overflow-hidden">
        <!-- Photo placeholder -->
        <div class="h-40 bg-gradient-to-br flex items-center justify-center text-6xl"
          :class="service.bg">
          {{ service.icon }}
        </div>
        <div class="p-5">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-bold text-stone-800">{{ service.title }}</h3>
              <p class="text-xs text-primary-500 font-medium mt-0.5">{{ service.tag }}</p>
            </div>
            <span v-if="service.badge"
              class="text-[10px] bg-amber-100 text-amber-600 font-medium px-2 py-1 rounded-full">
              {{ service.badge }}
            </span>
          </div>
          <p class="text-sm text-stone-600 mt-3 leading-relaxed">{{ service.desc }}</p>

          <!-- Includes -->
          <div class="mt-4 space-y-1.5">
            <div v-for="item in service.includes" :key="item" class="flex items-center gap-2 text-xs text-stone-500">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-300 flex-shrink-0"></span>
              {{ item }}
            </div>
          </div>

          <!-- Duration & Price placeholder -->
          <div class="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
            <div class="text-xs text-stone-400">
              <span>⏱ {{ service.duration }}</span>
            </div>
            <a href="#contact"
              class="text-xs bg-primary-500 text-white px-4 py-2 rounded-full font-medium active:scale-95 transition-transform">
              預約諮詢
            </a>
          </div>
        </div>
      </div>

      <!-- Coming soon -->
      <div class="card p-5 border-2 border-dashed border-stone-200 text-center">
        <span class="text-3xl">🌱</span>
        <h3 class="font-semibold text-stone-600 mt-2">更多療癒項目</h3>
        <p class="text-xs text-stone-400 mt-1">持續規劃中，敬請期待</p>
      </div>

      <!-- Note -->
      <div id="contact" class="card p-5">
        <h3 class="font-semibold text-stone-700 mb-2">預約方式</h3>
        <p class="text-sm text-stone-500 leading-relaxed">
          所有療程均採預約制，歡迎透過 Instagram 或 LINE 聯繫 Jacqueline 安排時間。
        </p>
        <router-link to="/about"
          class="inline-block mt-3 bg-primary-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full active:scale-95 transition-transform">
          聯絡 Jacqueline
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
const services = [
  {
    icon: '🌸',
    bg: 'from-pink-50 to-rose-50',
    title: '芳香療法療程',
    tag: '招牌服務',
    badge: 'NAHA 認證',
    duration: '60 / 90 分鐘',
    desc: '透過專業調配的精油複方，結合芳香按摩或擴香，舒緩身體緊繃、平衡情緒狀態。每一瓶配方都是根據你當下的身心需求量身打造。',
    includes: [
      '個人身心狀態評估',
      '客製化精油複方調配',
      '全身或局部芳香按摩',
      '居家保養建議',
    ],
  },
  {
    icon: '🎵',
    bg: 'from-violet-50 to-indigo-50',
    title: '頌缽聲音療癒',
    tag: '深層放鬆',
    badge: null,
    duration: '45 / 60 分鐘',
    desc: '西藏頌缽發出的純淨振動頻率，能深入滲透身體每個細胞，協助釋放長期累積的緊繃與壓力，帶來深層的放鬆與內在平靜。',
    includes: [
      '全身頌缽振動療癒',
      '呼吸引導與冥想',
      '能量場清理與平衡',
      '療程後分享與建議',
    ],
  },
  {
    icon: '🌿',
    bg: 'from-green-50 to-emerald-50',
    title: '精油諮詢配方',
    tag: '客製服務',
    badge: null,
    duration: '30 分鐘',
    desc: '針對你的具體需求（睡眠、情緒、皮膚、呼吸等），由 Jacqueline 提供專業精油選用建議，並調配適合你的個人複方精油。',
    includes: [
      '一對一深度諮詢',
      '精油知識衛教',
      '個人複方調配',
      '使用方法指導',
    ],
  },
]
</script>
