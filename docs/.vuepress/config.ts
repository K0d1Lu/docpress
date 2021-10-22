const { path } = require("@vuepress/utils")
const fs = require('fs-extra')
const deepmerge = require('deepmerge')

const customConfig = fs.existsSync(path.join(__dirname, '../docgen/config.js')) ? require(path.join(__dirname, '../docgen/config.js')) : {}
const isProd = process.env.NODE_ENV === "production"

const baseConfig = {
  bundler: isProd ? "@vuepress/webpack" : "@vuepress/vite",
  bundlerConfig: {
    evergreen: !isProd,
  },
  description: "Configuration tool for Wedia DAM",
  title: 'Default title',

  locales: {
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: 'English title',
    }
  },

  themeConfig: {
    logo: "./images/wedia-logo-filled.png",
    lastUpdated: "Last Updated",
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
