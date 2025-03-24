// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/layout.css'],
  modules: ['@pinia/nuxt', '@element-plus/nuxt'],

  runtimeConfig: {
    public: {
      AWS_REGION: process.env.AWS_REGION,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
      FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
      BUCKET_URL: process.env.BUCKET_URL,
      FOTOS_COMPONENTES_URL: process.env.FOTOS_COMPONENTES_URL,
      FOTOS_EVENTOS_URL: process.env.FOTOS_EVENTOS_URL,
      PARTITURAS_URL: process.env.PARTITURAS_URL,
    },
  },


})