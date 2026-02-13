import { defineComponent, inject, ref, resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, withModifiers, renderSlot, createElementVNode, createVNode, withCtx, toDisplayString, withDirectives, vShow } from 'vue';
import { getPadding, isGreaterThan } from '../../table/src/util.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import { useOption } from './useOption.mjs';
import { useProps } from './useProps.mjs';
import { optionV2Props, optionV2Emits } from './defaults.mjs';
import { selectV2InjectionKey } from './token.mjs';
import { ElIcon } from '../../icon/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  components: { ElIcon, ElTooltip },
  props: optionV2Props,
  emits: optionV2Emits,
  setup(props, { emit }) {
    const select = inject(selectV2InjectionKey);
    const showTip = ref(true);
    const ns = useNamespace("select");
    const { hoverItem, selectOptionClick } = useOption(props, { emit });
    const { getLabel } = useProps(select.props);
    const contentId = select.contentId;
    const handleCellMouseEnter = (event) => {
      const cellChild = event.target.querySelector(".option-wrap-content");
      if (!cellChild)
        return;
      if (cellChild && !(cellChild == null ? void 0 : cellChild.childNodes.length)) {
        showTip.value = false;
        return;
      }
      const range = document.createRange();
      range.setStart(cellChild, 0);
      range.setEnd(cellChild, cellChild.childNodes.length);
      const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
      const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
      const { top, left, right, bottom } = getPadding(cellChild);
      const horizontalPadding = left + right;
      const verticalPadding = top + bottom;
      showTip.value = !(isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || isGreaterThan(cellChild.scrollWidth, cellChildWidth));
    };
    return {
      ns,
      contentId,
      showTip,
      hoverItem,
      selectOptionClick,
      getLabel,
      handleCellMouseEnter
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock("li", {
    id: `${_ctx.contentId}-${_ctx.index}`,
    role: "option",
    "aria-selected": _ctx.selected,
    "aria-disabled": _ctx.disabled || void 0,
    style: normalizeStyle(_ctx.style),
    class: normalizeClass([
      _ctx.ns.be("dropdown", "item"),
      _ctx.ns.is("selected", _ctx.selected),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("created", _ctx.created),
      _ctx.ns.is("hovering", _ctx.hovering)
    ]),
    onMousemove: _ctx.hoverItem,
    onClick: withModifiers(_ctx.selectOptionClick, ["stop"]),
    onMouseenter: _ctx.handleCellMouseEnter
  }, [
    renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      disabled: _ctx.disabled
    }, () => [
      createElementVNode("div", { class: "option-wrap" }, [
        createVNode(_component_el_tooltip, {
          ref: "tooltipRef",
          effect: "light",
          disabled: _ctx.disabled || _ctx.showTip,
          content: _ctx.getLabel(_ctx.item),
          placement: "right",
          "popper-class": "optionPopperClass"
        }, {
          default: withCtx(() => {
            var _a;
            return [
              createElementVNode("div", { class: "option-wrap-content" }, [
                renderSlot(_ctx.$slots, "optionIcon"),
                createElementVNode("span", {
                  class: normalizeClass(["select-label", { "select-margin": (_a = _ctx.$slots) == null ? void 0 : _a.optionIcon }])
                }, toDisplayString(_ctx.getLabel(_ctx.item)), 3)
              ])
            ];
          }),
          _: 3
        }, 8, ["disabled", "content"]),
        withDirectives(createElementVNode("div", { class: "option-wrap-icon" }, [
          createVNode(_component_el_icon, {
            size: "16px",
            color: "#2A3F4D"
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16"
              }, [
                createElementVNode("path", { d: "M5.20006 14.2833C4.97716 14.2834 4.75643 14.2395 4.55052 14.1542C4.3446 14.0688 4.15754 13.9437 4.00006 13.786L0.292725 10.0807L1.70739 8.66665L5.20006 12.1593L14.2927 3.06665L15.7074 4.48065L6.40006 13.786C6.24257 13.9437 6.05552 14.0688 5.8496 14.1542C5.64369 14.2395 5.42296 14.2834 5.20006 14.2833Z" })
              ]))
            ]),
            _: 1
          })
        ], 512), [
          [vShow, _ctx.selected]
        ])
      ])
    ])
  ], 46, ["id", "aria-selected", "aria-disabled", "onMousemove", "onClick", "onMouseenter"]);
}
var OptionItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "option-item.vue"]]);

export { OptionItem as default };
//# sourceMappingURL=option-item.mjs.map
