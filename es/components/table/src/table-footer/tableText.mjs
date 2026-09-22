import { defineComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createVNode, withCtx, createTextVNode, createCommentVNode } from 'vue';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tableText",
  props: { total: Number, updateTime: String },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      return openBlock(), createElementBlock("div", { class: "footer-text" }, [
        createElementVNode("div", { class: "count" }, toDisplayString(__props.total) + " items", 1),
        __props.updateTime ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "time"
        }, [
          createVNode(_component_el_icon, {
            color: "#2a3f4d",
            size: "12px"
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "12",
                height: "12",
                viewBox: "0 0 12 12"
              }, [
                createElementVNode("g", { "clip-path": "url(#clip0_8022_3776)" }, [
                  createElementVNode("path", { d: "M1.52007 6.00039C1.5157 7.04669 1.87454 8.06209 2.53535 8.87331C3.19616 9.68454 4.118 10.2413 5.14355 10.4487C6.16911 10.656 7.23484 10.501 8.15888 10.0102C9.08292 9.51938 9.80802 8.72312 10.2104 7.75729C10.6128 6.79147 10.6676 5.71593 10.3655 4.7142C10.0633 3.71248 9.4229 2.84664 8.55353 2.26445C7.68416 1.68225 6.6397 1.41977 5.59838 1.5218C4.55706 1.62382 3.58341 2.08403 2.84357 2.82389L4.02007 4.00039H1.06557C0.993914 4.00046 0.922949 3.98639 0.856736 3.959C0.790524 3.93161 0.730363 3.89143 0.679695 3.84077C0.629027 3.7901 0.588848 3.72994 0.561458 3.66372C0.534067 3.59751 0.520002 3.52655 0.520068 3.45489V0.500393L1.78457 1.76489C2.76669 0.787428 4.05732 0.180689 5.43659 0.0480311C6.81587 -0.0846262 8.19848 0.265004 9.3489 1.03736C10.4993 1.80972 11.3464 2.95704 11.7458 4.28386C12.1452 5.61069 12.0723 7.03495 11.5394 8.31404C11.0066 9.59312 10.0467 10.6479 8.82343 11.2987C7.60014 11.9495 6.18904 12.1561 4.83053 11.8832C3.47202 11.6104 2.25012 10.875 1.37299 9.8023C0.495848 8.72963 0.0177259 7.38603 0.0200682 6.00039H1.52007Z" })
                ]),
                createElementVNode("defs", null, [
                  createElementVNode("clipPath", { id: "clip0_8022_3776" }, [
                    createElementVNode("rect", {
                      width: "12",
                      height: "12",
                      fill: "white"
                    })
                  ])
                ])
              ]))
            ]),
            _: 1
          }),
          createTextVNode(" Last Updated " + toDisplayString(__props.updateTime), 1)
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var TableText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "tableText.vue"]]);

export { TableText as default };
//# sourceMappingURL=tableText.mjs.map
