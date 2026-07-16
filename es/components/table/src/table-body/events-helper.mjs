import { inject, ref, h, nextTick } from 'vue';
import { debounce } from 'lodash-unified';
import { getCell, getColumnByCell, toggleRowClassByCell, removePopper, getPadding, isGreaterThan, createTablePopper } from '../util.mjs';
import { ghostRowSign } from '../private.mjs';
import { TABLE_INJECTION_KEY } from '../tokens.mjs';
import { isElement } from '../../../../utils/types.mjs';
import { addClass, hasClass, removeClass } from '../../../../utils/dom/style.mjs';

function useEvents(props, emit) {
  const parent = inject(TABLE_INJECTION_KEY);
  const tooltipContent = ref("");
  const tooltipTrigger = ref(h("div"));
  const clearAddRowTrigger = () => {
    emit("update-add-row-trigger", null);
  };
  const isRowEditLocked = (row) => {
    var _a;
    const editingRow = (_a = parent == null ? void 0 : parent.editingRow) == null ? void 0 : _a.value;
    return (parent == null ? void 0 : parent.props.editable) && !!editingRow && editingRow.row !== row;
  };
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
    if (isRowEditLocked(row))
      return;
    handleEvent(event, row, "dblclick");
  };
  const handleCellClick = (event, row, column, rowIndex, cellIndex) => {
    var _a, _b, _c;
    if (isRowEditLocked(row) || !(parent == null ? void 0 : parent.props.editable))
      return;
    if (((_b = (_a = parent == null ? void 0 : parent.editingRow) == null ? void 0 : _a.value) == null ? void 0 : _b.row) === row)
      return;
    const cell = getCell(event);
    const editableCell = cell == null ? void 0 : cell.querySelector(".editable-table-cell");
    if (cell && column && editableCell) {
      (_c = parent.startRowEdit) == null ? void 0 : _c.call(parent, row, column.property, rowIndex, cellIndex);
      nextTick(() => {
        editableCell.dispatchEvent(new CustomEvent("editable-cell-focus", {
          bubbles: false
        }));
      });
    }
  };
  const handleClick = (event, row) => {
    var _a;
    if (isRowEditLocked(row))
      return;
    (_a = props.store) == null ? void 0 : _a.commit("setCurrentRow", row);
    handleEvent(event, row, "click");
  };
  const handleContextMenu = (event, row) => {
    if (isRowEditLocked(row))
      return;
    handleEvent(event, row, "contextmenu");
  };
  const handleMouseEnter = debounce((index) => {
    var _a, _b, _c, _d;
    const row = (_b = (_a = props.store) == null ? void 0 : _a.states.data.value) == null ? void 0 : _b[index];
    if (row && isRowEditLocked(row)) {
      (_c = props.store) == null ? void 0 : _c.commit("setHoverRow", null);
      return;
    }
    (_d = props.store) == null ? void 0 : _d.commit("setHoverRow", index);
  }, 30);
  const handleMouseLeave = debounce(() => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", null);
  }, 30);
  const handleRowMouseMove = (event, row, rowIndex) => {
    var _a;
    if (!(parent == null ? void 0 : parent.props.showAddRowTrigger) || !(parent == null ? void 0 : parent.props.editTable) || !(parent == null ? void 0 : parent.props.border)) {
      clearAddRowTrigger();
      return;
    }
    const currentTarget = event.currentTarget;
    const tableRect = (_a = parent == null ? void 0 : parent.vnode.el) == null ? void 0 : _a.getBoundingClientRect();
    if (!currentTarget || !tableRect)
      return;
    const rect = currentTarget.getBoundingClientRect();
    const nearTop = rect.height > 12 && event.clientY - rect.top < 8;
    const nearBottom = rect.height > 12 && rect.bottom - event.clientY < 8;
    const isGhostRow = Boolean(row == null ? void 0 : row[ghostRowSign]);
    if (nearTop) {
      emit("update-add-row-trigger", {
        row,
        rowIndex,
        insertIndex: rowIndex,
        top: rect.top - tableRect.top,
        placement: "below"
      });
    } else if (nearBottom && !isGhostRow) {
      emit("update-add-row-trigger", {
        row,
        rowIndex,
        insertIndex: rowIndex + 1,
        top: rect.bottom - tableRect.top,
        placement: "above"
      });
    } else {
      clearAddRowTrigger();
    }
  };
  const handleRowMouseOut = (event) => {
    var _a, _b;
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;
    const namespace = (_b = (_a = parent == null ? void 0 : parent.vnode.el) == null ? void 0 : _a.dataset.prefix) != null ? _b : "el";
    const triggerSelector = `.${namespace}-table__add-row-trigger`;
    if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    if (isElement(relatedTarget) && relatedTarget.closest(triggerSelector)) {
      return;
    }
    clearAddRowTrigger();
  };
  const handleCellMouseEnter = (event, row, tooltipOptions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!parent)
      return;
    if (isRowEditLocked(row))
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
      addClass(event.target, "cell-hover");
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
    removeClass(event.target, "cell-hover");
    const oldHoverState = parent == null ? void 0 : parent.hoverState;
    parent == null ? void 0 : parent.emit("cell-mouse-leave", oldHoverState == null ? void 0 : oldHoverState.row, oldHoverState == null ? void 0 : oldHoverState.column, oldHoverState == null ? void 0 : oldHoverState.cell, event);
  };
  return {
    handleDoubleClick,
    handleClick,
    handleCellClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleRowMouseMove,
    handleRowMouseOut,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger
  };
}

export { useEvents as default };
//# sourceMappingURL=events-helper.mjs.map
