// ./src/i18n/index.ts

import { createI18n } from 'vue-i18n'
import tw from '@/assets/i18n/zh-TW.json'
import cn from '@/assets/i18n/zh-CN.json'
import us from '@/assets/i18n/en-US.json'
import jp from '@/assets/i18n/ja-JP.json'

const i18n = createI18n({
  locale: 'zh-TW',
  messages: {
    'zh-TW': tw,
    'zh-CN': cn,
    'en-US': us,
    'ja-JP.': jp,
  },
  fallbackLocale: 'zh-TW',
})

export { i18n }
