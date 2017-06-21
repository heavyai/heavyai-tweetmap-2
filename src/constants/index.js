export const LANG_DOMAIN = ['en', 'pt', 'es', 'in', 'und', 'ja', 'tr', 'fr', 'tl', 'ru', 'ar', 'th', 'it', 'nl', 'sv', 'ht', 'de', 'et', 'pl', 'sl', 'ko', 'fi', 'lv', 'sk', 'uk', 'da', 'zh', 'ro', 'no', 'cy', 'iw', 'hu', 'bg', 'lt', 'bs', 'vi', 'el', 'is', 'hi', 'hr'];
export const COLORS = ["#27aeef", "#ea5545", "#87bc45", "#b33dc6", "#f46a9b", "#ede15b", "#bdcf32", "#ef9b20", "#4db6ac", "#edbf33", "#7c4dff"]

export let LANG_COLORS = []
export let COLOR_MAP = {}
for (let i = 0; i < LANG_DOMAIN.length; i++) {
  LANG_COLORS.push(COLORS[i % COLORS.length])
  COLOR_MAP[LANG_DOMAIN[i]] = COLORS[i % COLORS.length]
}

export const TABLE_NAME = 'tweets_nov_feb'
