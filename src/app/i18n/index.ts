import sv from './locales/sv.json';
import en from './locales/en.json';

export const locales = {
  sv,
  en,
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'sv';

export function getLocaleData(locale: Locale) {
  return locales[locale] || locales[defaultLocale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locale in locales;
} 