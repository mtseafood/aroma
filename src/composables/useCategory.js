const ICONS = {
  '花香類': '🌸', '木質類': '🌲', '柑橘類': '🍊',
  '草本類': '🌿', '樹脂類': '💧', '辛香類': '🌶️',
  '樟腦類': '🍃', '土質類': '🌍',
}

export function useCategoryIcon() {
  return { categoryIcon: (cat) => ICONS[cat] || '🌿' }
}
