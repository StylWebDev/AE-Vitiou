// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@pinia/nuxt'
  ],

  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['types', 'utils'],
    presets: [
      { from: 'zod', imports: [['*', 'zod']] },
      { from: 'zod', imports: [['output', 'ZodOutput']], type: true }
    ]
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15'
})
