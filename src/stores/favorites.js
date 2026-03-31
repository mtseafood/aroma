import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref(JSON.parse(localStorage.getItem('aroma_favorites') || '[]'))

  watch(ids, val => localStorage.setItem('aroma_favorites', JSON.stringify(val)), { deep: true })

  function isFavorited(oilId) { return ids.value.includes(oilId) }

  function toggle(oilId) {
    if (isFavorited(oilId)) ids.value = ids.value.filter(i => i !== oilId)
    else ids.value.push(oilId)
  }

  return { ids, isFavorited, toggle }
})
