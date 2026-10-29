// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig:{
    dbHost: process.env.DB_HOST || '192.168.12.240',
    dbPort: Number(process.env.DB_port || 3306),
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'asdf',
    dbName: process.env.DB_NAME || 'phumrapee',
    jwtSecret: process.env.NUXT_JWT_SECRET || 'asdf',
  },

})