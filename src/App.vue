<template>
  <PasswordGate v-if="!authenticated" @authenticated="authenticated = true" />

  <div v-else class="min-h-screen bg-cream">
    <TopNav class="hidden md:block" />
    <div class="pb-20 md:pb-0 md:pt-16">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <BottomNav class="md:hidden" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import TopNav from '@/components/TopNav.vue'
import PasswordGate from '@/components/PasswordGate.vue'

const authenticated = ref(localStorage.getItem('aroma_auth') === '1')
</script>

<style>
.fade-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-leave-active  { transition: opacity 0.15s ease; }
.fade-enter-from    { opacity: 0; transform: translateY(6px); }
.fade-leave-to      { opacity: 0; }
</style>
