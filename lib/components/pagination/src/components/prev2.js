'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../../icon/index.js');
var prev = require('./prev.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../../hooks/use-locale/index.js');

const __default__ = vue.defineComponent({
  name: "ElPaginationPrev"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: prev.paginationPrevProps,
  emits: prev.paginationPrevEmits,
  setup(__props) {
    const props = __props;
    const { t } = index.useLocale();
    const internalDisabled = vue.computed(() => props.disabled || props.currentPage <= 1);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", {
        type: "button",
        class: "btn-prev",
        disabled: vue.unref(internalDisabled),
        "aria-label": _ctx.prevText || vue.unref(t)("el.pagination.prev"),
        "aria-disabled": vue.unref(internalDisabled),
        onClick: ($event) => _ctx.$emit("click", $event)
      }, [
        _ctx.prevText ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, vue.toDisplayString(_ctx.prevText), 1)) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createElementBlock("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16"
            }, [
              vue.createElementVNode("g", { "clip-path": "url(#clip0_11356_6847)" }, [
                vue.createElementVNode("path", { d: "M10.694 16L4.35603 9.65333C3.91994 9.21519 3.67512 8.62218 3.67512 8.004C3.67512 7.38582 3.91994 6.79281 4.35603 6.35467L10.7014 0L12.1134 1.414L5.76803 7.768C5.70554 7.83051 5.67044 7.91528 5.67044 8.00367C5.67044 8.09206 5.70554 8.17682 5.76803 8.23933L12.1054 14.586L10.694 16Z" })
              ]),
              vue.createElementVNode("defs", null, [
                vue.createElementVNode("clipPath", { id: "clip0_11356_6847" }, [
                  vue.createElementVNode("rect", {
                    width: "16",
                    height: "16",
                    fill: "white"
                  })
                ])
              ])
            ]))
          ]),
          _: 1
        }))
      ], 8, ["disabled", "aria-label", "aria-disabled", "onClick"]);
    };
  }
});
var Prev = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "prev.vue"]]);

exports["default"] = Prev;
//# sourceMappingURL=prev2.js.map
