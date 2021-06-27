import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: '"Inter",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif',
        mono: '"JetBrains Mono",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif',
      },
      colors: {
        primary: colors.yellow,
        gray: colors.trueGray,
      },
    },
  },

  shortcuts: {
    input: {
      '@apply':
        'border-gray-300 border rounded block w-full text-gray-600 px-4 py-2 leading-base outline-none transition focus:(border-primary-600 transition)',
      '&.has-error': 'border-red-600 placeholder:text-red-600 text-red-600',
    },
  },
})
