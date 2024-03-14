/* eslint-disable n/prefer-global/process */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: process.env.FIREBASE_API_KEY,

    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: "AIzaSyCJIaOhWIxa0PlXHRizLdAn6lcXpA4_Lqo",
      apiKey: "AIzaSyC7c8wxfGdwSR8T_IfJAvixOchxD-lOoOA",
      authDomain: "newsblog-bbdd6.firebaseapp.com",
      projectId: "newsblog-bbdd6",
      storageBucket: "newsblog-bbdd6.appspot.com",
      messagingSenderId: "525045867429",
      appId: "1:525045867429:web:00fe761247d4887ed7be4c",
    },
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
  ],

  css: ["~/assets/styles/global.scss", "~/assets/styles/sizeMixin.scss"],
  postcss: {
    plugins: {
      "postcss-import": true,
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      autoprefixer: {},
    },
  },
  // register directory for auto-imports
  imports: {
    // disable auto-imports for components/ , composables/ , utils/
    //autoImport: false,

    //Specify  current folder into array for adding to auto-imports
    dirs: ["stores"],
  },
  // Or can disable  imports  for currents dirctories in folder
  // components: {
  //   //global: true,  // ~
  //   dirs: ['~/components/ui']
  // }
  alias: {
    "@styles": "/<rootDir>/assets/styles",
    types: "/<rootDir>/types",
    assets: "/<rootDir>/assets",
    api: "/<rootDir>/server",
  },
});
