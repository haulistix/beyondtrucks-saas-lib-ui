import { defineComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createCommentVNode } from 'vue';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tableText",
  props: { total: Number, updateTime: String },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { class: "footer-text" }, [
        createElementVNode("div", { class: "count" }, toDisplayString(__props.total) + " items", 1),
        __props.updateTime ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "time"
        }, "Last Updated " + toDisplayString(__props.updateTime), 1)) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var TableText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "tableText.vue"]]);

export { TableText as default };
//# sourceMappingURL=tableText.mjs.map
