<template>
  <PasswordGate v-if="!authenticated" @authenticated="authenticated = true" />

  <div v-else class="max-w-lg mx-auto min-h-screen pb-20">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import PasswordGate from '@/components/PasswordGate.vue'

const authenticated = ref(localStorage.getItem('aroma_auth') === '1')
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
