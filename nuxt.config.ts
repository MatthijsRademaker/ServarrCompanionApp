import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: false,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Servarr companion app',
    },
  },

  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZid2x3c3VrYnRlanhjcnpybWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NjE1NzUsImV4cCI6MjAzMzUzNzU3NX0.jJd744ZSlyrrPqcMusBCg3VBUXEOMagYVI-N8pmhlh4',
    redirect: false,
  },

  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@hebilicious/vue-query-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  routeRules: {
    '*': { ssr: false },
  },
});
