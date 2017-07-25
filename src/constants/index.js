export {langCodes} from "./langCodes"
export const TABLE_NAME = "tweets_nov_feb"
export const LANG_DOMAIN = [
  "en",
  "pt",
  "es",
  "in",
  "und",
  "ja",
  "tr",
  "fr",
  "tl",
  "ru",
  "ar",
  "th",
  "it",
  "nl",
  "sv",
  "ht",
  "de",
  "et",
  "pl",
  "sl",
  "ko",
  "fi",
  "lv",
  "sk",
  "uk",
  "da",
  "zh",
  "ro",
  "no",
  "cy",
  "iw",
  "hu",
  "bg",
  "lt",
  "bs",
  "vi",
  "el",
  "is",
  "hi",
  "hr"
]

export const COLORS = [
  "#27aeef",
  "#ea5545",
  "#87bc45",
  "#b33dc6",
  "#f46a9b",
  "#ede15b",
  "#bdcf32",
  "#ef9b20",
  "#4db6ac",
  "#edbf33",
  "#7c4dff"
]

export const LANG_COLORS = []
export const COLOR_MAP = {}
for (let i = 0; i < LANG_DOMAIN.length; i = i + 1) {
  LANG_COLORS.push(COLORS[i % COLORS.length])
  COLOR_MAP[LANG_DOMAIN[i]] = COLORS[i % COLORS.length]
}

export const HASHTAG_EXCLUDE = [
  "#jobs",
  "#job",
  "#",
  "#tweetmyjobs",
  "#job:",
  "#healthcare",
  "#nursing",
  "#hospitality",
  "#veteranjob",
  "#retail",
  "#sales",
  "#transportation",
  "#skilledtrade",
  "#it",
  "#customerservice",
  "#businessmgmt",
  "#manufacturing",
  "#education",
  "#clerical",
  "#accounting",
  "#engineering",
  "#pharmaceutical",
  "#1",
  "#hiring",
  "#careerarc",
  "#veterans",
  "#cosmetology"
]

export const HASHTAG_FETCH_SIZE = 60
export const TWEET_FETCH_SIZE = 25
export const PERCENTAGE_MAX = 100
const MOBILE_WIDTH = 992
export const IS_MOBILE = screen.width < MOBILE_WIDTH
