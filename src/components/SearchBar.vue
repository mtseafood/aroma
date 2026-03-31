<template>
  <div class="relative">
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="search"
      :placeholder="placeholder"
      class="input pl-9 pr-4"
    />
    <button v-if="modelValue" @click="$emit('update:modelValue', '')"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({ modelValue: String, placeholder: { type: String, default: '搜尋精油名稱或功效...' } })
defineEmits(['update:modelValue'])
</script>
