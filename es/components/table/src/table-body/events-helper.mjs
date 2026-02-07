import { inject, ref, h } from 'vue';
import { debounce } from 'lodash-unified';
import { getCell, getColumnByCell, toggleRowClassByCell, removePopper, getPadding, isGreaterThan, createTablePopper } from '../util.mjs';
import { TABLE_INJECTION_KEY } from '../tokens.mjs';
import { addClass, hasClass, removeClass } from '../../../../utils/dom/style.mjs';

function useEvents(props) {
  const parent = inject(TABLE_INJECTION_KEY);
  const tooltipContent = ref("");
  const tooltipTrigger = ref(h("div"));
  const handleEvent = (event, row, name) => {
    var _a, _b, _c;
    const table = parent;
    const cell = getCell(event);
    let column = null;
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    if (cell) {
      column = getColumnByCell({
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
  const handleMouseEnter = debounce((index) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", index);
  }, 30);
  const handleMouseLeave = debounce(() => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", null);
  }, 30);
  const handleCellMouseEnter = (event, row, tooltipOptions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!parent)
      return;
    const table = parent;
    const cell = getCell(event);
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    let column = null;
    if (cell) {
      column = getColumnByCell({
        columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
      }, cell, namespace);
      if (!column) {
        return;
      }
      if (cell.rowSpan > 1) {
        toggleRowClassByCell(cell.rowSpan, event, addClass);
      }
      const hoverState = table.hoverState = {
        cell,
        column,
        row
      };
      table == null ? void 0 : table.emit("cell-mouse-enter", hoverState.row, hoverState.column, hoverState.cell, event);
    }
    if (!tooltipOptions) {
      if (((_d = removePopper) == null ? void 0 : _d.trigger) === cell) {
        (_e = removePopper) == null ? void 0 : _e();
      }
      return;
    }
    const cellChild = event.target.querySelector(".cell");
    if (!(hasClass(cellChild, `${namespace}-tooltip`) && cellChild.childNodes.length)) {
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
    if (isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || isGreaterThan(cellChild.scrollWidth, cellChildWidth)) {
      createTablePopper(tooltipOptions, (_f = (cell == null ? void 0 : cell.innerText) || (cell == null ? void 0 : cell.textContent)) != null ? _f : "", row, column, cell, table);
    } else if (((_g = removePopper) == null ? void 0 : _g.trigger) === cell) {
      (_h = removePopper) == null ? void 0 : _h();
    }
  };
  const handleCellMouseLeave = (event) => {
    const cell = getCell(event);
    if (!cell)
      return;
    if (cell.rowSpan > 1) {
      toggleRowClassByCell(cell.rowSpan, event, removeClass);
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

export { useEvents as default };
//# sourceMappingURL=events-helper.mjs.map
