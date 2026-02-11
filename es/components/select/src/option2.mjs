import { defineComponent, ref, computed, unref, reactive, toRefs, getCurrentInstance, onBeforeUnmount, nextTick, resolveComponent, withDirectives, openBlock, createElementBlock, normalizeClass, withModifiers, renderSlot, createElementVNode, createVNode, withCtx, toDisplayString, vShow } from 'vue';
import { useOption } from './useOption.mjs';
import { COMPONENT_NAME, optionProps } from './option.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';

const _sfc_main = defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElIcon,
    ElTooltip
  },
  props: optionProps,
  setup(props) {
    const ns = useNamespace("select");
    const id = useId();
    const disabled = ref(false);
    const containerKls = computed(() => [
      ns.be("dropdown", "item"),
      ns.is("disabled", unref(isDisabled)),
      ns.is("selected", unref(itemSelected)),
      ns.is("hovering", unref(hover))
    ]);
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hover: false
    });
    const {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      updateOption
    } = useOption(props, states);
    const { visible, hover } = toRefs(states);
    const vm = getCurrentInstance().proxy;
    select.onOptionCreate(vm);
    onBeforeUnmount(() => {
      const key = vm.value;
      nextTick(() => {
        const { selected: selectedOptions } = select.states;
        const doesSelected = selectedOptions.some((item) => {
          return item.value === vm.value;
        });
        if (select.states.cachedOptions.get(key) === vm && !doesSelected) {
          select.states.cachedOptions.delete(key);
        }
      });
      select.onOptionDestroy(key, vm);
    });
    function selectOptionClick() {
      if (!isDisabled.value) {
        select.handleOptionSelect(vm);
      }
    }
    function isGreaterThan(a, b, epsilon = 0.03) {
      return a - b > epsilon;
    }
    const getPadding = (el) => {
      const style = window.getComputedStyle(el, null);
      const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
      const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
      return {
        left: paddingLeft,
        right: paddingRight,
        top: paddingTop,
        bottom: paddingBottom
      };
    };
    const handleCellMouseEnter = (event) => {
      const cellChild = event.target.querySelector(".option-wrap-content");
      if (!cellChild)
        return;
      if (cellChild && !(cellChild == null ? void 0 : cellChild.childNodes.length)) {
        disabled.value = false;
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
      disabled.value = !(isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || isGreaterThan(cellChild.scrollWidth, cellChildWidth));
    };
    return {
      ns,
      id,
      containerKls,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      visible,
      hover,
      states,
      disabled,
      showTip: props.showTip,
      placement: props.placement,
      handleCellMouseEnter,
      hoverItem,
      updateOption,
      selectOptionClick
    };
  }
});
function _sfc_render(_ctx, _cache) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_icon = resolveComponent("el-icon");
  return withDirectives((openBlock(), createElementBlock("li", {
    id: _ctx.id,
    class: normalizeClass(_ctx.containerKls),
    role: "option",
    "aria-disabled": _ctx.isDisabled || void 0,
    "aria-selected": _ctx.itemSelected,
    onMousemove: _ctx.hoverItem,
    onClick: withModifiers(_ctx.selectOptionClick, ["stop"]),
    onMouseenter: _ctx.handleCellMouseEnter
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createElementVNode("div", { class: "option-wrap" }, [
        createVNode(_component_el_tooltip, {
          ref: "tooltipRef",
          effect: "light",
          disabled: !_ctx.showTip || _ctx.disabled,
          content: _ctx.currentLabel,
          placement: _ctx.placement,
          "popper-class": "optionPopperClass"
        }, {
          default: withCtx(() => {
            var _a;
            return [
              createElementVNode("div", { class: "option-wrap-content" }, [
                renderSlot(_ctx.$slots, "optionIcon"),
                createElementVNode("span", {
                  class: normalizeClass(["select-label", { "select-margin": (_a = _ctx.$slots) == null ? void 0 : _a.optionIcon }])
                }, toDisplayString(_ctx.currentLabel), 3)
              ])
            ];
          }),
          _: 3
        }, 8, ["disabled", "content", "placement"]),
        withDirectives(createElementVNode("div", { class: "option-wrap-icon" }, [
          createVNode(_component_el_icon, { size: "16px" }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none"
              }, [
                createElementVNode("path", {
                  d: "M5.20006 14.2833C4.97716 14.2834 4.75643 14.2395 4.55052 14.1542C4.3446 14.0688 4.15754 13.9437 4.00006 13.786L0.292725 10.0807L1.70739 8.66665L5.20006 12.1593L14.2927 3.06665L15.7074 4.48065L6.40006 13.786C6.24257 13.9437 6.05552 14.0688 5.8496 14.1542C5.64369 14.2395 5.42296 14.2834 5.20006 14.2833Z",
                  fill: "#2A3F4D"
                })
              ]))
            ]),
            _: 1
          })
        ], 512), [
          [vShow, _ctx.itemSelected]
        ])
      ])
    ])
  ], 42, ["id", "aria-disabled", "aria-selected", "onMousemove", "onClick", "onMouseenter"])), [
    [vShow, _ctx.visible]
  ]);
}
var Option = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "option.vue"]]);

export { Option as default };
//# sourceMappingURL=option2.mjs.map
