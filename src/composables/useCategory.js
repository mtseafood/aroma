const CATEGORY_MAP = {
  '花香類': { char: '花', bg: 'bg-rose-50',    text: 'text-rose-400',    heroRgb: '255 241 242', accent: '#fca5a5' },
  '木質類': { char: '木', bg: 'bg-stone-100',   text: 'text-stone-500',   heroRgb: '245 245 244', accent: '#a8a29e' },
  '柑橘類': { char: '柑', bg: 'bg-amber-50',    text: 'text-amber-500',   heroRgb: '255 251 235', accent: '#fcd34d' },
  '草本類': { char: '草', bg: 'bg-primary-50',  text: 'text-primary-500', heroRgb: '240 247 242', accent: '#86efac' },
  '樹脂類': { char: '脂', bg: 'bg-orange-50',   text: 'text-orange-400',  heroRgb: '255 247 237', accent: '#fdba74' },
  '辛香類': { char: '辛', bg: 'bg-red-50',      text: 'text-red-400',     heroRgb: '254 242 242', accent: '#fca5a5' },
  '樟腦類': { char: '樟', bg: 'bg-green-50',    text: 'text-green-500',   heroRgb: '240 253 244', accent: '#86efac' },
  '土質類': { char: '土', bg: 'bg-yellow-50',   text: 'text-yellow-600',  heroRgb: '254 252 232', accent: '#fde68a' },
}

const DEFAULT = { char: '油', bg: 'bg-stone-100', text: 'text-stone-400', heroRgb: '250 250 249', accent: '#d6d3d1' }

export function useCategoryIcon() {
  function categoryMeta(cat) {
    return CATEGORY_MAP[cat] || DEFAULT
  }
  return { categoryMeta }
}
