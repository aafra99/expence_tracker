import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { detectCurrencyFromLocale, SUPPORTED_CURRENCY_CODES } from '../utils/currencies.js'
import { STORAGE_KEYS } from '../utils/constants.js'
import { formatCurrency } from '../utils/formatters.js'
import { loadStringFromStorage, saveStringToStorage } from '../utils/storage.js'

const CurrencyContext = createContext(null)

function getInitialCurrency() {
  const saved = loadStringFromStorage(STORAGE_KEYS.currency, '')
  if (saved && SUPPORTED_CURRENCY_CODES.has(saved)) {
    return saved
  }

  return detectCurrencyFromLocale()
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(getInitialCurrency)

  useEffect(() => {
    saveStringToStorage(STORAGE_KEYS.currency, currency)
  }, [currency])

  const formatAmount = useCallback((amount) => formatCurrency(amount, currency), [currency])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrencyContext() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrencyContext must be used within CurrencyProvider')
  }
  return context
}
