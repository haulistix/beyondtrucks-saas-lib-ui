import { defineComponent, computed, openBlock, createElementBlock, unref, toDisplayString, createBlock, withCtx, createElementVNode } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { paginationPrevProps, paginationPrevEmits } from './prev2.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const __default__ = defineComponent({
  name: "ElPaginationPrev"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: paginationPrevProps,
  emits: paginationPrevEmits,
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const internalDisabled = computed(() => props.disabled || props.currentPage <= 1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: "btn-prev",
        disabled: unref(internalDisabled),
        "aria-label": _ctx.prevText || unref(t)("el.pagination.prev"),
        "aria-disabled": unref(internalDisabled),
        onClick: ($event) => _ctx.$emit("click", $event)
      }, [
        _ctx.prevText ? (openBlock(), createElementBlock("span", { key: 0 }, toDisplayString(_ctx.prevText), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
          default: withCtx(() => [
            (openBlock(), createElementBlock("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16"
            }, [
              createElementVNode("g", { "clip-path": "url(#clip0_11356_6847)" }, [
                createElementVNode("path", { d: "M10.694 16L4.35603 9.65333C3.91994 9.21519 3.67512 8.62218 3.67512 8.004C3.67512 7.38582 3.91994 6.79281 4.35603 6.35467L10.7014 0L12.1134 1.414L5.76803 7.768C5.70554 7.83051 5.67044 7.91528 5.67044 8.00367C5.67044 8.09206 5.70554 8.17682 5.76803 8.23933L12.1054 14.586L10.694 16Z" })
              ]),
              createElementVNode("defs", null, [
                createElementVNode("clipPath", { id: "clip0_11356_6847" }, [
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
var Prev = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "prev.vue"]]);

export { Prev as default };
//# sourceMappingURL=prev.mjs.map
