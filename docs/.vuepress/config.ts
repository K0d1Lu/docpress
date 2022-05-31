import { path } from '@vuepress/utils'
import fs  from 'fs-extra'
import deepmerge from 'deepmerge'
//const docs = require(path.join(__dirname, '../../scripts/wedia-doc.js'))
//import docs from '../../scripts/wedia-doc.js';
//import docs from '../../scripts/wedia-doc.js';
// const docs = import(path.join(__dirname, '../../scripts/wedia-doc.mjs'))
//const docs = []
//console.log('docs are ::: ', docs)
// const subcustomConfig = fs.existsSync(path.join(__dirname, '../docgen/docs/wedia-vue/subconfig.js')) ? require(path.join(__dirname, '../docgen/docs/wedia-vue/subconfig.js')) : {}
const isProd = process.env.NODE_ENV === "production"

const docs = require(path.join(__dirname, '../../scripts/wedia-doc.js'))
console.log('docs :::: ', docs)

const baseConfig = {
  bundler: "@vuepress/vite",
  bundlerConfig: {
    evergreen: !isProd,
    build: {
      target: "node14"
    },
    esbuild: {
      build: {
        target: "node14"
      }
    },
    viteOptions: {
      build: {
        target: "node14"
      },
    }
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




// const subcustomConfig = fs.existsSync(path.join(__dirname, '../docgen/docs/wedia-vue/subconfig.js')) ? require(path.join(__dirname, '../docgen/docs/wedia-vue/subconfig.js')) : {}


//const merged = deepmerge(customConfig, subcustomConfig)

// console.log(deepmerge(baseConfig, merged))

module.exports = deepmerge.all(configTomerge)
