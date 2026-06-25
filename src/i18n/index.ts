import { createI18n } from 'vue-i18n'

type LocaleMessages = Record<string, any>
type I18nMessages = Record<string, LocaleMessages>

const localeModules = import.meta.glob<LocaleMessages>('./locales/*.json', {
  eager: true,
  import: 'default'
})

const messages = Object.entries(localeModules).reduce((acc, [path, module]) => {
  const locale = path.match(/\/([^/]+)\.json$/)?.[1]

  if (locale) {
    acc[locale] = module
  }

  return acc
}, {} as I18nMessages)

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})
