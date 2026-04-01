const CATEGORY_MAP = {
  '花香類': { char: '花', bg: 'bg-rose-50',    text: 'text-rose-400' },
  '木質類': { char: '木', bg: 'bg-stone-100',   text: 'text-stone-500' },
  '柑橘類': { char: '柑', bg: 'bg-amber-50',    text: 'text-amber-500' },
  '草本類': { char: '草', bg: 'bg-primary-50',  text: 'text-primary-500' },
  '樹脂類': { char: '脂', bg: 'bg-orange-50',   text: 'text-orange-400' },
  '辛香類': { char: '辛', bg: 'bg-red-50',      text: 'text-red-400' },
  '樟腦類': { char: '樟', bg: 'bg-green-50',    text: 'text-green-500' },
  '土質類': { char: '土', bg: 'bg-yellow-50',   text: 'text-yellow-600' },
}

const DEFAULT = { char: '油', bg: 'bg-stone-100', text: 'text-stone-400' }

export function useCategoryIcon() {
  function categoryMeta(cat) {
    return CATEGORY_MAP[cat] || DEFAULT
  }
  return { categoryMeta }
}
