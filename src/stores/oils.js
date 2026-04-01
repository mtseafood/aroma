import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import oilsData from '@/data/oils.json'

export const useOilsStore = defineStore('oils', () => {
  const oils = ref(oilsData)
  const searchQuery = ref('')
  const selectedCategory = ref(null)

  const categories = [
    { value: null,     label: '全部' },
    { value: '花香類', label: '花香類' },
    { value: '木質類', label: '木質類' },
    { value: '柑橘類', label: '柑橘類' },
    { value: '草本類', label: '草本類' },
    { value: '樹脂類', label: '樹脂類' },
    { value: '辛香類', label: '辛香類' },
    { value: '樟腦類', label: '樟腦類' },
    { value: '土質類', label: '土質類' },
  ]

  const filteredOils = computed(() => {
    let result = oils.value
    if (selectedCategory.value) {
      result = result.filter(o => o.category === selectedCategory.value)
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase()
      result = result.filter(o =>
        o.chinese_name.includes(q) ||
        o.english_name.toLowerCase().includes(q) ||
        o.main_effects.some(e => e.includes(q)) ||
        o.description.includes(q)
      )
    }
    return result
  })

  const featuredOils = computed(() => oils.value.filter(o => o.is_featured))

  function getOil(id) {
    return oils.value.find(o => o.id === Number(id))
  }

  function getRelated(ids) {
    return ids.map(id => oils.value.find(o => o.id === id)).filter(Boolean)
  }

  return { oils, searchQuery, selectedCategory, categories, filteredOils, featuredOils, getOil, getRelated }
})
