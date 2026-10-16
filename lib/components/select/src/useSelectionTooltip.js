'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var index = require('../../../hooks/use-namespace/index.js');

const useSelectionTooltip = (selectionRef, collapseItemRef, multiple, hasModelValue) => {
  const ns = index.useNamespace("select");
  const tooltip = vue.reactive({
    visible: false,
    content: "",
    reference: void 0
  });
  let hoveredTarget;
  const hide = () => {
    hoveredTarget = void 0;
    tooltip.visible = false;
  };
  const update = () => {
    var _a, _b;
    const selection = selectionRef.value;
    if (!hasModelValue.value || !selection || !hoveredTarget || !selection.contains(hoveredTarget)) {
      hide();
      return;
    }
    let item = null;
    if (multiple.value) {
      item = hoveredTarget;
      while (item !== selection && item.parentElement !== selection) {
        item = item.parentElement;
      }
      if (item === selection || item === collapseItemRef.value || item.classList.contains(ns.e("input-wrapper"))) {
        tooltip.visible = false;
        return;
      }
    } else {
      item = selection.querySelector(`.${ns.e("placeholder")}`);
    }
    if (!item) {
      tooltip.visible = false;
      return;
    }
    const overflowing = [item, ...item.querySelectorAll("*")].some((element) => {
      const style = getComputedStyle(element);
      return element.clientWidth > 0 && element.scrollWidth > element.clientWidth && style.overflowX !== "visible" || element.clientHeight > 0 && element.scrollHeight > element.clientHeight && style.overflowY !== "visible";
    });
    const itemRect = item.getBoundingClientRect();
    const selectionRect = selection.getBoundingClientRect();
    const selectionStyle = getComputedStyle(selection);
    const clipped = selectionStyle.overflowX !== "visible" && (itemRect.left < selectionRect.left - 1 || itemRect.right > selectionRect.right + 1) || selectionStyle.overflowY !== "visible" && (itemRect.top < selectionRect.top - 1 || itemRect.bottom > selectionRect.bottom + 1);
    tooltip.content = (_b = (_a = item.textContent) == null ? void 0 : _a.trim()) != null ? _b : "";
    tooltip.reference = item;
    tooltip.visible = !!tooltip.content && (overflowing || clipped);
  };
  const handleMouseMove = (event) => {
    hoveredTarget = event.target;
    update();
  };
  core.useResizeObserver(selectionRef, update);
  vue.onUpdated(update);
  return { tooltip, handleMouseMove, hide };
};

exports.useSelectionTooltip = useSelectionTooltip;
//# sourceMappingURL=useSelectionTooltip.js.map
