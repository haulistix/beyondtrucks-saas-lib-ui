'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../../icon/index.js');
var next = require('./next2.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../../hooks/use-locale/index.js');

const __default__ = vue.defineComponent({
  name: "ElPaginationNext"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: next.paginationNextProps,
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const { t } = index.useLocale();
    const internalDisabled = vue.computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", {
        type: "button",
        class: "btn-next",
        disabled: vue.unref(internalDisabled),
        "aria-label": _ctx.nextText || vue.unref(t)("el.pagination.next"),
        "aria-disabled": vue.unref(internalDisabled),
        onClick: ($event) => _ctx.$emit("click", $event)
      }, [
        _ctx.nextText ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, vue.toDisplayString(_ctx.nextText), 1)) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createElementBlock("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16"
            }, [
              vue.createElementVNode("g", { "clip-path": "url(#clip0_11356_6918)" }, [
                vue.createElementVNode("path", { d: "M5.418 16L11.756 9.65333C12.1921 9.21519 12.4369 8.62218 12.4369 8.004C12.4369 7.38582 12.1921 6.79281 11.756 6.35467L5.41067 0L4 1.414L10.3453 7.768C10.4078 7.83051 10.4429 7.91528 10.4429 8.00367C10.4429 8.09206 10.4078 8.17682 10.3453 8.23933L4.00667 14.586L5.418 16Z" })
              ]),
              vue.createElementVNode("defs", null, [
                vue.createElementVNode("clipPath", { id: "clip0_11356_6918" }, [
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
var Next = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "next.vue"]]);

exports["default"] = Next;
//# sourceMappingURL=next.js.map
