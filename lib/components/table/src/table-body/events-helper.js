'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var util = require('../util.js');
var tokens = require('../tokens.js');
var style = require('../../../../utils/dom/style.js');

function useEvents(props) {
  const parent = vue.inject(tokens.TABLE_INJECTION_KEY);
  const tooltipContent = vue.ref("");
  const tooltipTrigger = vue.ref(vue.h("div"));
  const handleEvent = (event, row, name) => {
    var _a, _b, _c;
    const table = parent;
    const cell = util.getCell(event);
    let column = null;
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    if (cell) {
      column = util.getColumnByCell({
        columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
      }, cell, namespace);
      if (column) {
        table == null ? void 0 : table.emit(`cell-${name}`, row, column, cell, event);
      }
    }
    table == null ? void 0 : table.emit(`row-${name}`, row, column, event);
  };
  const handleDoubleClick = (event, row) => {
    handleEvent(event, row, "dblclick");
  };
  const handleClick = (event, row) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setCurrentRow", row);
    handleEvent(event, row, "click");
  };
  const handleContextMenu = (event, row) => {
    handleEvent(event, row, "contextmenu");
  };
  const handleMouseEnter = lodashUnified.debounce((index) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", index);
  }, 30);
  const handleMouseLeave = lodashUnified.debounce(() => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", null);
  }, 30);
  const handleCellMouseEnter = (event, row, tooltipOptions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!parent)
      return;
    const table = parent;
    const cell = util.getCell(event);
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    let column = null;
    if (cell) {
      column = util.getColumnByCell({
        columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
      }, cell, namespace);
      if (!column) {
        return;
      }
      if (cell.rowSpan > 1) {
        util.toggleRowClassByCell(cell.rowSpan, event, style.addClass);
      }
      const hoverState = table.hoverState = {
        cell,
        column,
        row
      };
      table == null ? void 0 : table.emit("cell-mouse-enter", hoverState.row, hoverState.column, hoverState.cell, event);
    }
    if (!tooltipOptions) {
      if (((_d = util.removePopper) == null ? void 0 : _d.trigger) === cell) {
        (_e = util.removePopper) == null ? void 0 : _e();
      }
      return;
    }
    const cellChild = event.target.querySelector(".cell");
    if (!(style.hasClass(cellChild, `${namespace}-tooltip`) && cellChild.childNodes.length)) {
      return;
    }
    const range = document.createRange();
    range.setStart(cellChild, 0);
    range.setEnd(cellChild, cellChild.childNodes.length);
    const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
    const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
    const { top, left, right, bottom } = util.getPadding(cellChild);
    const horizontalPadding = left + right;
    const verticalPadding = top + bottom;
    if (util.isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || util.isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || util.isGreaterThan(cellChild.scrollWidth, cellChildWidth)) {
      util.createTablePopper(tooltipOptions, (_f = (cell == null ? void 0 : cell.innerText) || (cell == null ? void 0 : cell.textContent)) != null ? _f : "", row, column, cell, table);
    } else if (((_g = util.removePopper) == null ? void 0 : _g.trigger) === cell) {
      (_h = util.removePopper) == null ? void 0 : _h();
    }
  };
  const handleCellMouseLeave = (event) => {
    const cell = util.getCell(event);
    if (!cell)
      return;
    if (cell.rowSpan > 1) {
      util.toggleRowClassByCell(cell.rowSpan, event, style.removeClass);
    }
    const oldHoverState = parent == null ? void 0 : parent.hoverState;
    parent == null ? void 0 : parent.emit("cell-mouse-leave", oldHoverState == null ? void 0 : oldHoverState.row, oldHoverState == null ? void 0 : oldHoverState.column, oldHoverState == null ? void 0 : oldHoverState.cell, event);
  };
  return {
    handleDoubleClick,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger
  };
}

exports["default"] = useEvents;
//# sourceMappingURL=events-helper.js.map
