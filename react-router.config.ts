import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  buildDirectory: 'dist',
  prerender: ['/', '/stats', '/about', '/404'],
} satisfies Config
