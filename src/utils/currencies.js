export const SUPPORTED_CURRENCIES = [
  { code: 'INR', label: 'INR — Indian Rupee' },
  { code: 'USD', label: 'USD — United States Dollar' },
  { code: 'EUR', label: 'EUR — Euro' },
  { code: 'GBP', label: 'GBP — British Pound' },
  { code: 'AED', label: 'AED — UAE Dirham' },
  { code: 'JPY', label: 'JPY — Japanese Yen' },
  { code: 'AUD', label: 'AUD — Australian Dollar' },
  { code: 'CAD', label: 'CAD — Canadian Dollar' },
  { code: 'SGD', label: 'SGD — Singapore Dollar' },
]

export const SUPPORTED_CURRENCY_CODES = new Set(SUPPORTED_CURRENCIES.map((item) => item.code))

const REGION_TO_CURRENCY = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  AE: 'AED',
  JP: 'JPY',
  AU: 'AUD',
  CA: 'CAD',
  SG: 'SGD',
  AT: 'EUR',
  BE: 'EUR',
  CY: 'EUR',
  EE: 'EUR',
  FI: 'EUR',
  FR: 'EUR',
  DE: 'EUR',
  GR: 'EUR',
  IE: 'EUR',
  IT: 'EUR',
  LV: 'EUR',
  LT: 'EUR',
  LU: 'EUR',
  MT: 'EUR',
  NL: 'EUR',
  PT: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  ES: 'EUR',
}

export function detectCurrencyFromLocale() {
  const locales = [navigator.language, ...(navigator.languages ?? [])]

  for (const locale of locales) {
    const region = locale.split('-')[1]?.toUpperCase()
    if (!region) continue

    const currency = REGION_TO_CURRENCY[region]
    if (currency && SUPPORTED_CURRENCY_CODES.has(currency)) {
      return currency
    }
  }

  return 'USD'
}

export function getCurrencyLabel(code) {
  return SUPPORTED_CURRENCIES.find((item) => item.code === code)?.label ?? code
}
