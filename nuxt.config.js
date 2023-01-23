// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
  ],
  // css: ['~/assets/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
            additionalData: '@import "@/assets/main.scss";',
        },
    },
    }
  },
  devServerHandlers: [],
  googleFonts: {
    families: {
      Roboto: [300, 500],
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
    }
  }
})
