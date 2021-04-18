export default {
  ssr: false,
  target: 'static',
  server: {
    port: 3000, // default: 3000
    host: "localhost" // default: localhost
    // host: '10.26.26.115' // default: localhost
  },
  head: {
    title: 'shop_Backstage',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'view-design/dist/styles/iview.css',
    '~assets/scss/index.scss',
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css',
  ],
  plugins: [
    '~plugins/iview',
    '~plugins/axios',
    '~plugins/mock',
    '~plugins/echarts.js',
    { src: '~plugins/nuxt-quill-plugin', ssr: false }
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt', 
  ],
  generate: {
    dir: `dist/${process.env.SITE}`,
    exclude: [
      /^\/main/,
    ]
  },
  build: {
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
      if (process.env.NODE_ENV === 'production') {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
    }
  },
  axios: {
    proxy: true,
    credentials: true,
  },
  env: {
    API_URL: process.env.BUILD_API_URL,
  },
  proxy: {
    '/api': {
      target: 'http:/test.local.host',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  router: {
    middleware: 'auth'
  }
}
