const EMOJI_BY_CATEGORY = {
  Necklaces: '✦',
  Earrings: '◈',
  Rings: '✿',
  Bangles: '◯',
  Bracelets: '∞',
  Anklets: '〜',
};

const GRADIENTS = [
  'linear-gradient(135deg, #1a1508, #2a2010)',
  'linear-gradient(135deg, #0e1218, #151c28)',
  'linear-gradient(135deg, #180e0e, #281515)',
  'linear-gradient(135deg, #0e1808, #152810)',
  'linear-gradient(135deg, #0e0e18, #151528)',
  'linear-gradient(135deg, #181208, #281e10)',
  'linear-gradient(135deg, #180e18, #281528)',
  'linear-gradient(135deg, #0e1818, #152828)',
  'linear-gradient(135deg, #181808, #282810)',
  'linear-gradient(135deg, #1a1208, #2a1e10)',
];

export function getProductVisual(product) {
  return {
    emoji: EMOJI_BY_CATEGORY[product.category_name] || '✦',
    gradient: GRADIENTS[product.id % GRADIENTS.length],
    image: product.image || null,
  };
}
