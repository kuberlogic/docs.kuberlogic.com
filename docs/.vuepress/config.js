
// set your global autometa options
const autoMetaOptions = {
  site: {
    name : 'KuberLogic Documentation',
  },
  canonical_base: 'https://docs.kuberlogic.com/',
};

module.exports = {
  plugins: [
    ['container', {
      type: 'warning',
      before: info => `<div class="warning custom-block"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    }],
    ['container', {
      type: 'tip',
      before: info => `<div class="tip custom-block"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    }],
    ['container', {
      type: 'danger',
      before: info => `<div class="danger custom-block"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    }],
    /*['@vuepress/google-analytics',
      {
        'ga': 'UA-12711721-12'
      }
    ],*/
    [ 'autometa', autoMetaOptions ],
    [ 'separate-pages', { alwaysVisibleBlocks: ['#disqus_thread'] } ]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  ],


  //theme: "cloudlinux",
  theme: 'F:/job/cloudlinux/imunify/cloudlinux-docs-theme/cloudlinux-doc-theme', // local path


  themeConfig: {
    repo: "cloudlinux/kuberlogic-doc",
    editLinks: true,
    docsBranch: "dev",
    docsDir: "docs",
    displayAllHeaders: true,
    defaultURL: "/functionality/",
    sidebarDepth: 2,
    try_free: "https://kuberlogic.com/",
    cloudlinuxSite: "https://kuberlogic.com/",
    logo: "/logo.png",
    footerCustomLogo: "/logo-color.png",
    footerCustomAltText: "KuberLogic",
    sidebar: [
          {
            title: "Contents",
            collapsable: false,
            children: [
              "/functionality/",
              "/keycloak/",
              "/monitoring/",
              "/operator/",
              "/website/"
            ]
          }
        ],
    locales: {
      // The key is the path for the locale to be nested under.
      // As a special case, the default locale can use '/' as its path.
      "/": {
        tryFree: "Install"
      }
    }
  },
};
