(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{287:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",function(){return n})},321:function(e,t,r){"use strict";r(139),r(89),r(35),r(80);var n=r(287);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}t.a={methods:{checkRedirect:function(){return!!this.newUrl&&(this.$router.replace(this.newUrl),!0)}},computed:{redirectionMapping:function(){var e=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){Object(n.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},this.$site.themeConfig.redirectionMapping);return e["/"]=this.$site.themeConfig.defaultURL,e},path:function(){var e=this.$route.fullPath;return!!this.redirectionMapping[e]||"/?"!==e.substr(0,2)||(e=[e.slice(0,1),"index.html",e.slice(1)].join("")),e},newUrl:function(){return this.redirectionMapping[this.path]}}}},359:function(e,t,r){"use strict";r.r(t);var n=r(321),o=["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."],i={mixins:[n.a],data:function(){return{showNotFound:!1}},mounted:function(){this.showNotFound=!this.checkRedirect()},methods:{getMsg:function(){return o[Math.floor(Math.random()*o.length)]}}},c=r(34),s=Object(c.a)(i,function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showNotFound?r("div",{staticClass:"theme-container"},[r("div",{staticClass:"content"},[r("h1",[e._v("404")]),e._v(" "),r("blockquote",[e._v(e._s(e.getMsg()))]),e._v(" "),r("router-link",{attrs:{to:"/"}},[e._v("Take me home.")])],1)]):e._e()},[],!1,null,null,null);t.default=s.exports}}]);