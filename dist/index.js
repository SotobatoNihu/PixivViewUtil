import Vue from 'vue';
import Vuex from 'vuex';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

/* script */
            const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hello"},[_c('h1',[_vm._v(_vm._s(_vm.msg))]),_vm._v(" "),_c('h2',[_vm._v("Essential Links")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('h2',[_vm._v("Ecosystem")]),_vm._v(" "),_vm._m(1)])};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',[_c('a',{attrs:{"href":"https://vuejs.org","target":"_blank"}},[_vm._v("\n        Core Docs\n      ")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://forum.vuejs.org","target":"_blank"}},[_vm._v("\n        Forum\n      ")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://chat.vuejs.org","target":"_blank"}},[_vm._v("\n        Community Chat\n      ")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://twitter.com/vuejs","target":"_blank"}},[_vm._v("\n        Twitter\n      ")])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"http://vuejs-templates.github.io/webpack/","target":"_blank"}},[_vm._v("\n        Docs for This Template\n      ")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',[_c('a',{attrs:{"href":"http://router.vuejs.org/","target":"_blank"}},[_vm._v("\n        vue-router\n      ")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"http://vuex.vuejs.org/","target":"_blank"}},[_vm._v("\n        vuex\n      ")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"http://vue-loader.vuejs.org/","target":"_blank"}},[_vm._v("\n        vue-loader\n      ")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://github.com/vuejs/awesome-vue","target":"_blank"}},[_vm._v("\n        awesome-vue\n      ")])])])}];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-51e379af";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "HelloWorld.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/buefy';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */



  var HelloWorld = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

//

  var script$1 = {

    name: 'MainContainer',
    /*
    data: function() {
      return {
        illusID: 0,
        popupCaption: false,
        popupComment: false,
        scale: 0.7,
      };
    },
*/

    components: {
      HelloWorld,
    },

    data() {
      return {
        scale: 0.8,
        myHeight: window.innerHeight,
        myWidth: window.innerWidth,
        myDisplay: 'none',
        styleObj:{
          top:'0px',
          left:'100px',
          width:'100px',
          height:'100px',
          position:'absolute',
          display:'none',
        },
      };
    },
    created() {
      const app = this;
      document.querySelectorAll('a[href*="member_illust.php?mode=medium&illust_id="]').forEach(link => {
        link.addEventListener('mouseover', function() {
          const clickElem = this.querySelector('.non-trim-thumb') || this;
          clickElem.setAttribute('onclick', 'console.log();return false;');
          const url = this.getAttribute('href');
          const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/);
          const illustID = Number(matches[2]);
          //app.data().illusID = illustID;
          clickElem.addEventListener('click', function() {
            console.log('click!');
            console.log(illustID);
            app.myStyle();
          });

        });
      });
    },
    methods: {
      myStyle: function() {
        this.styleObj.display = 'block';
      },
    },


  };

/* script */
            const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:(_vm.styleObj),attrs:{"id":"popup-outer-container"}},[_c('HelloWorld')],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = "data-v-2b181ac2";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "App.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/buefy';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */



  var App = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__$1,
    undefined
  );

Vue.config.productionTip = true;

const outerContainerID = 'popup-outer-container';
if (document.getElementById(outerContainerID) === null) {
  const container = document.createElement('div');
  container.id = outerContainerID;
  document.body.appendChild(container);
}
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: `#${outerContainerID}`,
  components: { App },
  data: {
    scale:0.7,
    styleObject: {
      width: window.innerWidth,
      height: window.innerHeight,
      display:'none',
    },
  },
  template: '<App/>',
});

/*

const artwork = new Vuex.Store({
  state: {
    // 単純なテキストデータ
    illustID: 0,
  },
  mutations: {
    // メッセージの書き換え
    setMessage(state, id) {
      state.illustID = id;
    },
  },
  getters: {
    // message をそのまま使用
    message(state) {
      return state.illustID;
    },
  },
});
*/
import '../src/pixiv.override.css';
