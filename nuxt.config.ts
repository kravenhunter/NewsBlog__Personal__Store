/* eslint-disable n/prefer-global/process */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  modules: [
    // ...
    [
      "@pinia/nuxt",
      {
        // Enable certain components to auto -Imports for plugin
        autoImports: ["defineStore", "acceprtHMRUpdate"],
      },
    ],
    "@nuxt/image",
    "@sidebase/nuxt-auth",
  ],
  routeRules: {
    "https://media.cnn.com/api/v1/**": {
      cors: true,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   "Access-Control-Allow-Methods": "GET,HEAD",
      //   //  'access-Control-Allow-origin': 'http://localhost:3000',
      //   //  'access-control-allow-credentials': 'true'
      // },
    },
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
      addDefaultCallbackUrl: "/",
    },

    session: {
      enableRefreshOnWindowFocus: true, //default - true
      enableRefreshPeriodically: 1000 * 60 * 60, // Refetch user session data every 1h, // default -false , 1000 ms /1 sec
    },
  },
  css: ["~/assets/styles/global.scss", "~/assets/styles/sizeMixin.scss"],
  postcss: {
    plugins: {
      "postcss-import": true,
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      autoprefixer: {
        overrideBrowserslist: ["cover 99.5%", "not IE < 9"],
      },
    },
  },
  // register directory for auto-imports
  imports: {
    // disable auto-imports for components/ , composables/ , utils/
    //autoImport: false,

    //Specify  current folder into array for adding to auto-imports
    dirs: ["stores"],
  },

  alias: {
    "@styles": "/<rootDir>/assets/styles",
    types: "/<rootDir>/types",
    assets: "/<rootDir>/assets",
    api: "/<rootDir>/server",
  },
  app: {
    pageTransition: { name: "blog", mode: "out-in" },
    head: {
      titleTemplate: "%s | WORLD IMPULSE",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        //  { hid: "description", name: "description", content: "the whole world daily news" },
        { name: "description", content: "WORLD IMPULSE - the news blog" },
        {
          name: "keywords",
          content: "world impulse, news,blog, world news",
        },
        { name: "ogTitle", content: "WORLD IMPULSE - the news blog" },
        { name: "ogDescription", content: "WORLD IMPULSE - a blog of n world news" },
        // Запрет активации  телефона поссылке
        { name: "format-detection", content: "telephone=no" },
        //Запрет индексации  картинок и ссылок, текст контента доступен
        { name: "robots", content: "noimageindex, nofollow" },
        { name: "author", content: "Sergio Below" },
        { name: "copyright", content: "Sergio Below" },
      ],
    },
  },
});
