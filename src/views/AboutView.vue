<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-br from-primary-50 to-amber-50 px-6 pt-10 pb-8 text-center">
      <!-- Photo placeholder -->
      <div class="w-28 h-28 mx-auto rounded-3xl bg-white shadow-sm flex flex-col items-center justify-center mb-4">
        <span class="text-5xl">👩‍⚕️</span>
        <span class="text-[10px] text-stone-400 mt-1">照片即將上線</span>
      </div>
      <h1 class="text-xl font-bold text-stone-800">羅婕華 Jacqueline</h1>
      <p class="text-sm text-primary-500 font-medium mt-1">好好療癒工作室 創辦人</p>
    </div>

    <div class="px-4 py-6 space-y-4">

      <!-- NAHA Badge -->
      <div class="card p-4 flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
          <span class="text-3xl">🏅</span>
        </div>
        <div>
          <div class="font-semibold text-stone-800 text-sm">NAHA 國際認證芳療師</div>
          <div class="text-xs text-stone-500 mt-0.5 leading-relaxed">
            National Association for Holistic Aromatherapy<br>
            美國國家整體芳療協會認證
          </div>
        </div>
      </div>

      <!-- Story -->
      <div class="card p-5">
        <h2 class="font-semibold text-stone-700 mb-3">關於 Jacqueline</h2>
        <div class="space-y-3 text-sm text-stone-600 leading-relaxed">
          <p>
            一切從一瓶薰衣草開始。第一次接觸精油時，那個香氣讓我感覺到前所未有的平靜——不是逃避，而是真正地被接住了。
          </p>
          <p>
            從那之後，我開始深入學習芳香療法，並取得 NAHA 國際認證。在這條路上，我理解到療癒不是一件奢侈的事，而是每個人都值得給自己的禮物。
          </p>
          <p>
            「好好療癒」是我對每一位來訪者的承諾：好好聆聽、好好陪伴、好好療癒。
          </p>
        </div>
      </div>

      <!-- Expertise -->
      <div class="card p-5">
        <h2 class="font-semibold text-stone-700 mb-3">專業領域</h2>
        <div class="space-y-2">
          <div v-for="item in expertise" :key="item.title" class="flex items-start gap-3">
            <span class="text-xl mt-0.5">{{ item.icon }}</span>
            <div>
              <div class="text-sm font-medium text-stone-700">{{ item.title }}</div>
              <div class="text-xs text-stone-400 mt-0.5">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Philosophy -->
      <div class="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 p-6 text-white text-center">
        <p class="text-lg font-light leading-relaxed">
          「讓自己好好停下來<br>不是懶惰<br>是一種勇氣」
        </p>
        <p class="text-xs opacity-70 mt-3">— Jacqueline</p>
      </div>

      <!-- Contact -->
      <div class="card p-5">
        <h2 class="font-semibold text-stone-700 mb-3">預約諮詢</h2>
        <p class="text-sm text-stone-500 mb-4">歡迎透過以下方式聯絡 Jacqueline，安排一對一諮詢或療癒課程。</p>
        <div class="space-y-2">
          <a href="https://www.instagram.com" target="_blank"
            class="flex items-center gap-3 p-3 bg-stone-50 rounded-xl active:scale-95 transition-transform">
            <span class="text-xl">📱</span>
            <div>
              <div class="text-sm font-medium text-stone-700">Instagram</div>
              <div class="text-xs text-stone-400">@好好療癒</div>
            </div>
          </a>
          <a href="https://line.me" target="_blank"
            class="flex items-center gap-3 p-3 bg-stone-50 rounded-xl active:scale-95 transition-transform">
            <span class="text-xl">💬</span>
            <div>
              <div class="text-sm font-medium text-stone-700">LINE</div>
              <div class="text-xs text-stone-400">點此加入好友</div>
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const expertise = [
  { icon: '🌸', title: '芳香療法', desc: 'NAHA 認證，精油調配與全身芳療護理' },
  { icon: '🎵', title: '頌缽療癒', desc: '西藏頌缽聲音療法，深層放鬆與能量平衡' },
  { icon: '🌿', title: '個人配方', desc: '依據個人身心狀態，客製化精油複方' },
  { icon: '💆', title: '身心整合', desc: '結合芳療與靜心，全方位療癒體驗' },
]
</script>
