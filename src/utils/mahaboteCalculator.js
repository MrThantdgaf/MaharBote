const HOUSE_ORDER = ['binga', 'marana', 'atun', 'thike', 'yaza', 'puti', 'adipati']

const SEQUENCES = {
  1: ['aung', 'lan', 'htu', 'sit', 'thu', 'gyi', 'pwe'],
  2: ['gyi', 'pwe', 'aung', 'lan', 'htu', 'sit', 'thu'],
  3: ['sit', 'thu', 'gyi', 'pwe', 'aung', 'lan', 'htu'],
  4: ['lan', 'htu', 'sit', 'thu', 'gyi', 'pwe', 'aung'],
  5: ['pwe', 'aung', 'lan', 'htu', 'sit', 'thu', 'gyi'],
  6: ['thu', 'gyi', 'pwe', 'aung', 'lan', 'htu', 'sit'],
  0: ['htu', 'sit', 'thu', 'gyi', 'pwe', 'aung', 'lan'],
}

const DIGITS = {
  aung: 1,
  gyi: 2,
  sit: 3,
  lan: 4,
  pwe: 5,
  thu: 6,
  htu: 0,
}

const WEEKDAY_TO_TOKEN = ['aung', 'gyi', 'sit', 'lan', 'pwe', 'thu', 'htu']
const MYANMAR_SOLAR_YEAR = 1577917828 / 4320000
const MYANMAR_EPOCH = 1954168.050623

export const houseLayout = {
  adipati: { row: 1, col: 2 },
  atun: { row: 2, col: 1 },
  thike: { row: 2, col: 2 },
  yaza: { row: 2, col: 3 },
  marana: { row: 3, col: 1 },
  binga: { row: 3, col: 2 },
  puti: { row: 3, col: 3 },
}

export const weekdayOptions = WEEKDAY_TO_TOKEN.map((token, index) => ({
  value: index,
  token,
  digit: DIGITS[token],
}))

export function getMyanmarYearFromGregorian(dateString) {
  if (!dateString) return null

  const [year, month, day] = dateString.split('-').map(Number)
  if (!isValidGregorianDate(year, month, day)) return null

  const julianDayNumber = gregorianToJulianDayNumber(year, month, day)
  return Math.floor((julianDayNumber - 0.5 - MYANMAR_EPOCH) / MYANMAR_SOLAR_YEAR)
}

export function getWeekdayFromGregorian(dateString) {
  if (!dateString) return 0

  const [year, month, day] = dateString.split('-').map(Number)
  if (!isValidGregorianDate(year, month, day)) return 0

  const date = new Date(year, month - 1, day)
  return date.getDay()
}

export function calculateMahabote({ myanmarYear, weekday }) {
  const year = Number(myanmarYear)
  const day = Number(weekday)

  if (!Number.isFinite(year) || year <= 0) return null

  const remainder = ((year % 7) + 7) % 7
  const sequence = SEQUENCES[remainder]
  const houses = {}

  HOUSE_ORDER.forEach((house, index) => {
    const token = sequence[index]
    houses[house] = {
      house,
      token,
      digit: DIGITS[token],
    }
  })

  const birthToken = WEEKDAY_TO_TOKEN[day] ?? 'aung'
  const birthDigit = DIGITS[birthToken]
  const birthHouse = Object.values(houses).find(
    (item) => item.digit === birthDigit,
  )?.house

  return {
    remainder,
    sequence,
    houses,
    birthToken,
    birthDigit,
    birthHouse,
  }
}

function isValidGregorianDate(year, month, day) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false
  }

  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function gregorianToJulianDayNumber(year, month, day) {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3

  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  )
}
