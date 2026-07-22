// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/image'
  ],

  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['types', 'utils'],
    presets: [
      { from: 'zod', imports: [['*', 'zod']] },
      { from: 'zod', imports: [['output', 'ZodOutput']], type: true },
      {
        from: '@vueuse/core',
        imports: ['breakpointsTailwind', 'useBreakpoints', 'useTimeout']
      }
    ]
  },

  $development: {
    hub: {
      db: {
        dialect: 'sqlite',
        // driver: 'd1-http'
      }
    }
  },

  $production: {
    hub: {
      db: {
        dialect: 'sqlite',
        driver: 'd1',
        connection: {
          databaseId: process.env.NUXT_HUB_CLOUDFLARE_DB_ID
        }
      },
      blob: {
        driver: 'cloudflare-r2',
        bucketName: process.env.NUXT_HUB_CLOUDFLARE_BUCKET_ID,
        binding: 'BLOB'
      }

    },
  },

  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },


  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  devServer: {
    port: 8080,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15'
})
