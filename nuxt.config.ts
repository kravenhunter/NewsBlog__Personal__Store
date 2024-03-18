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
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
      addDefaultCallbackUrl: "/auth/login",
    },

    session: {
      enableRefreshOnWindowFocus: true, //default - true
      enableRefreshPeriodically: false, // default -false , 1000 ms /1 sec
    },
  },
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
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
});
