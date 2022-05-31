import { path } from '@vuepress/utils'
import fs  from 'fs-extra'
import deepmerge from 'deepmerge'

const isProd = process.env.NODE_ENV === "production"

const docs = require(path.join(__dirname, '../../scripts/docs.js'))

const baseConfig = {
  bundler: "@vuepress/vite",
  bundlerConfig: {
    evergreen: !isProd,
  },
  description: "Tool to build awesome meta documentations",
  title: 'Docpress',

  locales: {
    "/": {
      lang: "en-US",
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
    ],
  ]
};

  const customConfig = fs.existsSync(path.join(__dirname, '../docpress/config.js')) ? require(path.join(__dirname, '../docpress/config.js')) : {}
  const configTomerge = [baseConfig, customConfig]

  docs.forEach(doc => {
    if (doc.name) {
      const subcustomConfig = fs.existsSync(path.join(__dirname, `../docpress/${doc.name}/subconfig.js`)) ? require(path.join(__dirname, `../docpress/${doc.name}/subconfig.js`)) : {}
      configTomerge.push(subcustomConfig);
    }
  });

module.exports = deepmerge.all(configTomerge)
