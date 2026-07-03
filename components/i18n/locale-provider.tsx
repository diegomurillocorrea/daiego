'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getDictionary, type Dictionary } from '@/lib/i18n/dictionaries'
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from '@/lib/i18n/types'

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function resolveStoredLocale(): Locale {
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && isLocale(stored)) {
    return stored
  }

  const browserLanguage = window.navigator.language.toLowerCase()
  if (browserLanguage.startsWith('es')) {
    return 'es'
  }

  return DEFAULT_LOCALE
}

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const initialLocale = resolveStoredLocale()
    setLocaleState(initialLocale)
    document.documentElement.lang = initialLocale
  }, [])

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    document.documentElement.lang = nextLocale
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }, [locale, setLocale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dictionary: getDictionary(locale),
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}

export function useDictionary() {
  return useLocale().dictionary
}
