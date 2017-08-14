export {langCodes} from "./langCodes"
export const TABLE_NAME = "tweets_nov_feb"
export const HASHTAG_FETCH_SIZE = 60
export const TWEET_FETCH_SIZE = 25
export const PERCENTAGE_MAX = 100

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

export const SOURCE_DOMAIN = [
  "android",
  "ios",
  "instagram",
  "foursquare",
  "path",
  "other",
  "blackberry",
  "windows"
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

export const LANG_COLORS = LANG_DOMAIN.map((lang, i) => COLORS[i % COLORS.length])
export const LANG_COLOR_MAP = LANG_DOMAIN.reduce((acc, lang, i) => ({
  ...acc,
  [lang]: COLORS[i % COLORS.length]
}), {})

export const SOURCE_COLORS = COLORS.slice(0, SOURCE_DOMAIN.length)
export const SOURCE_COLOR_MAP = SOURCE_DOMAIN.reduce((acc, source, i) => ({
  ...acc,
  [source]: COLORS[i % COLORS.length]
}), {})

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

export const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]
