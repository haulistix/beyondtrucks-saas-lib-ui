'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "tableText",
  props: { total: Number, updateTime: String },
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", { class: "footer-text" }, [
        vue.createElementVNode("div", { class: "count" }, vue.toDisplayString(__props.total) + " items", 1),
        __props.updateTime ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "time"
        }, "Last Updated " + vue.toDisplayString(__props.updateTime), 1)) : vue.createCommentVNode("v-if", true)
      ]);
    };
  }
});
var TableText = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "tableText.vue"]]);

exports["default"] = TableText;
//# sourceMappingURL=tableText.js.map
