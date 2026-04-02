<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-b from-stone-50 to-white px-8 pt-14 pb-10 text-center">
      <div class="w-28 h-28 mx-auto rounded-lg bg-stone-200 overflow-hidden mb-6">
        <img :src="'/images/jacqueline.jpg'" alt="Jacqueline"
          class="w-full h-full object-cover"
          @error="e => e.target.style.display='none'" />
      </div>
      <p class="text-[10px] tracking-[0.2em] text-primary-400 uppercase mb-1.5">Founder</p>
      <h1 class="text-xl font-serif font-light text-stone-800 tracking-wide">羅婕華 Jacqueline</h1>
      <p class="text-xs text-stone-400 mt-1.5 tracking-wide">好好療癒工作室</p>
    </div>

    <div class="px-5 py-6 space-y-6">

      <!-- NAHA -->
      <div class="border border-stone-200 rounded-xl p-6">
        <p class="text-[10px] tracking-widest text-primary-400 uppercase mb-4">Certification</p>
        <div class="flex items-center gap-4">
          <img src="/images/naha_icon.png" alt="NAHA" class="h-10 w-auto flex-shrink-0" />
          <div>
            <p class="font-semibold text-stone-800 text-sm">NAHA 國際認證芳療師</p>
            <p class="text-xs text-stone-400 mt-1 leading-relaxed">
              National Association for Holistic Aromatherapy<br>
              美國國家整體芳療協會認證
            </p>
          </div>
        </div>
      </div>

      <!-- doTERRA -->
      <div class="border border-stone-200 rounded-xl p-6">
        <p class="text-[10px] tracking-widest text-stone-400 uppercase mb-4">指定精油品牌</p>
        <div class="flex items-center gap-4 mb-4">
          <img src="/images/doterra_icon.jpg" alt="dōTERRA" class="h-8 w-auto flex-shrink-0" />
        </div>
        <p class="text-xs text-stone-500 leading-relaxed">
          好好療癒工作室的所有精油療程，皆使用 dōTERRA 品牌精油。每一支精油均通過第三方 CPTG® 純正測試認證，品質純粹、安全可靠。
        </p>
      </div>

      <!-- Story -->
      <div class="p-6 bg-white rounded-xl border border-stone-100">
        <p class="text-[10px] tracking-widest text-stone-400 uppercase mb-5">Story</p>
        <div class="space-y-5 text-sm text-stone-600 leading-loose">
          <p>
            一切從一瓶薰衣草開始。那個香氣讓我感覺到前所未有的平靜——不是逃避，而是真正地被接住了。
          </p>
          <p>
            從那之後，我深入學習芳香療法，取得 NAHA 國際認證。我理解到療癒不是奢侈，而是每個人都值得給自己的禮物。
          </p>
          <p>
            「好好療癒」是我對每一位來訪者的承諾：好好聆聽、好好陪伴、好好療癒。
          </p>
        </div>
      </div>

      <!-- Expertise -->
      <div class="p-6 bg-white rounded-xl border border-stone-100">
        <p class="text-[10px] tracking-widest text-stone-400 uppercase mb-5">Expertise</p>
        <div class="space-y-5">
          <div v-for="item in expertise" :key="item.title" class="flex gap-4">
            <div class="w-px bg-primary-200 flex-shrink-0 ml-1"></div>
            <div>
              <p class="text-sm font-medium text-stone-700">{{ item.title }}</p>
              <p class="text-xs text-stone-400 mt-0.5">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <div class="py-10 text-center">
        <p class="text-stone-600 font-serif font-light leading-loose text-base">
          「讓自己好好停下來<br>不是懶惰，是一種勇氣」
        </p>
        <p class="text-xs text-stone-300 tracking-widest mt-5">— Jacqueline</p>
      </div>

      <!-- Contact -->
      <div class="p-6 bg-white rounded-xl border border-stone-100">
        <p class="text-[10px] tracking-widest text-stone-400 uppercase mb-4">Contact</p>
        <p class="text-sm text-stone-500 mb-5">歡迎透過以下方式聯絡，安排諮詢或療癒課程。</p>
        <div class="space-y-2">
          <a href="#" class="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-100">
            <span class="text-sm text-stone-700">Instagram</span>
            <span class="text-xs text-stone-400">@好好療癒 →</span>
          </a>
          <a href="#" class="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-100">
            <span class="text-sm text-stone-700">LINE</span>
            <span class="text-xs text-stone-400">加入好友 →</span>
          </a>
        </div>
      </div>

      <!-- Logout -->
      <button @click="logout"
        class="w-full py-3 rounded-full border border-stone-200 text-xs tracking-widest text-stone-400 uppercase active:scale-95 transition-transform">
        登出
      </button>

    </div>
  </div>
</template>

<script setup>
function logout() {
  localStorage.removeItem('aroma_auth')
  window.location.reload()
}

const expertise = [
  { title: '芳香療法', desc: 'NAHA 認證，精油調配與全身芳療護理' },
  { title: '頌缽療癒', desc: '西藏頌缽聲音療法，深層放鬆與能量平衡' },
  { title: '個人配方', desc: '依據身心狀態，客製化精油複方' },
  { title: '身心整合', desc: '結合芳療與靜心，全方位療癒體驗' },
]
</script>
