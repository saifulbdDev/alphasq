export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "alphasq",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  router: {
    middleware: ['auth']
  },
 
  auth: {
    strategies: {
      local: {
        token: {
          property: 'author.api_token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: '',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/author/detail', method: 'get' }
        }
      }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/styles/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify"],
  vuetify: {
    /* module options */
    theme: {
      themes: {
        light: {
          primary: "#536DFE",
          secondary: "#FF5C93",
          error: "#FF4081",
          warning: "#FFC260",
          success: "#3CD4A0",
          info: "#9013FE",
        
        }
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-sweetalert2',
    '@nuxtjs/moment',
  ],
  moment: {
    timezone: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://blog.shoptheowlet.com/api/',
  
  },
};
