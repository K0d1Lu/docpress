//import localPortal from './conf/local-portal.mjs';
//import localWediaVue from './conf/local-wedia-vue.mjs';
const { path } = require('@vuepress/utils')

// const localPortal = require(path.join(__dirname, './conf/local-portal.js'))
// const localWediaVue = require(path.join(__dirname, './conf/local-wedia-vue.js'))

const localPortal = {
  directory: '/Users/lucas/Documents/projets/portal/wedia-docgen',
  main: true,
  type: 'rd',
}
const localWediaVue = {
  name: 'wedia-vue',
  directory: '/Users/lucas/Documents/projets/wedia-vue/wedia-docgen',
  type: 'rd',
}

/*
module.exports = [
  {
    directory: '/Users/lucas/Documents/projets/portal/wedia-docgen',
    main: true,
    type: 'rd',
  }, {
    name: 'wedia-vue',
    directory: '/Users/lucas/Documents/projets/wedia-vue/wedia-docgen',
    type: 'rd',
  },
  {
    name: 'player-api',
    directory: '/Users/lucas/Documents/projets/mediacloud/player-api/wedia-docgen',
    type: 'rd',
  }
]*/
/*
module.exports = [
  {
    main: true,
    directory: '/Users/lucas/Documents/projets/documentation/portal',
    type: 'rd',
  }, {
    name: 'wedia-vue',
    directory: '/Users/lucas/Documents/projets/documentation/wedia-vue',
    type: 'rd',
  }, {
    name: 'wedia-doc',
    repository: '/Users/lucas/Documents/projets/documentation/wedia-vue',
  },
]*/

/*
module.exports = [
  {
    main: true,
    repository: 'https://github.com/K0d1Lu/docpress-doc.git',
  },
]*/
/*
module.exports = [
  {
    main: true,
    directory: '/Users/lucas/Documents/projets/documentation/docpress-doc/docpress',
  },
]*/

module.exports = [
  {
    main: true,
    directory: '/Users/lucas/Documents/projets/documentation/portal/docpress',
  },
]
