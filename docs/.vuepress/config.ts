const { path } = require("@vuepress/utils")
const fs = require('fs-extra')
// const { locales } = require("./theme/locales")
const deepmerge = require('deepmerge')

const customConfig = fs.ensureFileSync('../docgen/config.js') ? require('../docgen/config.js') : {}

const isProd = process.env.NODE_ENV === "production"

const baseConfig = {
  bundler: isProd ? "@vuepress/webpack" : "@vuepress/vite",
  bundlerConfig: {
    evergreen: !isProd,
  },
  description: "Configuration tool for Wedia DAM",
  title: 'Default title',
  // theme: path.resolve(__dirname, "./theme"),

  locales: {
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      description: "Configuration tool for Wedia DAM",
      title: 'English title',
    },
    "/fr/": {
      lang: "fr-FR",
      description: "Outil de configuration pour le DAM Wedia",
    }
  },

  themeConfig: {
    darkMode: false,
    logo: "https://vuejs.org/images/logo.png",
    navbar: [
      { text: "Styles", link: "/style/" },
      { text: "Releases notes", link: "/releases/" },
      { text: "Guide", link: "/guide/" },
      { text: "Portal", link: "/portal.html" },
      { text: "Docgen", link: "/docgen/" },
    ],
    lastUpdated: "Last Updated",
    //locales
  },

  plugins: [
    [
      "@vuepress/plugin-search",
      {
        searchMaxSuggestions: 10
      }
    ]
  ]
};

module.exports = deepmerge(baseConfig, customConfig)