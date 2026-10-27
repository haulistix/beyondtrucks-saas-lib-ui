import { defineComponent, computed, openBlock, createElementBlock, unref, toDisplayString, createBlock, withCtx, createElementVNode } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { paginationNextProps } from './next.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const __default__ = defineComponent({
  name: "ElPaginationNext"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: paginationNextProps,
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const internalDisabled = computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: "btn-next",
        disabled: unref(internalDisabled),
        "aria-label": _ctx.nextText || unref(t)("el.pagination.next"),
        "aria-disabled": unref(internalDisabled),
        onClick: ($event) => _ctx.$emit("click", $event)
      }, [
        _ctx.nextText ? (openBlock(), createElementBlock("span", { key: 0 }, toDisplayString(_ctx.nextText), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
          default: withCtx(() => [
            (openBlock(), createElementBlock("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16"
            }, [
              createElementVNode("g", { "clip-path": "url(#clip0_11356_6918)" }, [
                createElementVNode("path", { d: "M5.418 16L11.756 9.65333C12.1921 9.21519 12.4369 8.62218 12.4369 8.004C12.4369 7.38582 12.1921 6.79281 11.756 6.35467L5.41067 0L4 1.414L10.3453 7.768C10.4078 7.83051 10.4429 7.91528 10.4429 8.00367C10.4429 8.09206 10.4078 8.17682 10.3453 8.23933L4.00667 14.586L5.418 16Z" })
              ]),
              createElementVNode("defs", null, [
                createElementVNode("clipPath", { id: "clip0_11356_6918" }, [
                  createElementVNode("rect", {
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
var Next = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "next.vue"]]);

export { Next as default };
//# sourceMappingURL=next2.mjs.map
