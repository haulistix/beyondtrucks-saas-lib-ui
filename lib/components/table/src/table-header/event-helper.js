'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../util.js');
var lodashUnified = require('lodash-unified');
var tokens = require('../tokens.js');
var style = require('../../../../utils/dom/style.js');
var core = require('@vueuse/core');
var types = require('../../../../utils/types.js');

function useEvent(props, emit) {
  const instance = vue.getCurrentInstance();
  const parent = vue.inject(tokens.TABLE_INJECTION_KEY);
  const handleCellMouseEnter = (event, row) => {
    var _a, _b, _c, _d, _e, _f;
    if (!parent)
      return;
    const table = parent;
    const cell = util.getThCell(event);
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    let column = null;
    if (cell) {
      column = util.getColumnByCell({
        columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
      }, cell, namespace);
      if (!column)
        return;
      if (cell.rowSpan > 1) {
        util.toggleRowClassByCell(cell.rowSpan, event, style.addClass);
      }
    }
    const cellChild = event.target.querySelector((column == null ? void 0 : column.sortable) ? ".cell-span" : ".cell");
    if (!cellChild.childNodes.length)
      return;
    const range = document.createRange();
    range.setStart(cellChild, 0);
    range.setEnd(cellChild, cellChild.childNodes.length);
    const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
    const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
    const { top, left, right, bottom } = util.getPadding(cellChild);
    const horizontalPadding = left + right;
    const verticalPadding = top + bottom;
    const limitWidth = rangeWidth + horizontalPadding;
    if (util.isGreaterThan(limitWidth, cellChildWidth) || util.isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || util.isGreaterThan(cellChild.scrollWidth, cellChildWidth)) {
      util.createTablePopper({ effect: "light" }, (_d = (cell == null ? void 0 : cell.innerText) || (cell == null ? void 0 : cell.textContent)) != null ? _d : "", row, column, cell, table);
    } else if (((_e = util.removePopper) == null ? void 0 : _e.trigger) === cell) {
      (_f = util.removePopper) == null ? void 0 : _f();
    }
  };
  const handleFilterClick = (event) => {
    event.stopPropagation();
    return;
  };
  const handleHeaderClick = (event, column) => {
    if (!column.filters && column.sortable) ; else if (column.filterable && !column.sortable) {
      handleFilterClick(event);
    }
    parent == null ? void 0 : parent.emit("header-click", column, event);
  };
  const handleHeaderContextMenu = (event, column) => {
    parent == null ? void 0 : parent.emit("header-contextmenu", column, event);
  };
  const draggingColumn = vue.ref(null);
  const dragging = vue.ref(false);
  const dragState = vue.ref();
  const clearAddColumnTrigger = () => {
    emit("update-add-column-trigger", null);
  };
  const isColumnBeforeLastRightFixedColumn = (column) => {
    const rightFixedLeafColumnsLength = props.store.states.rightFixedLeafColumnsLength.value;
    if (rightFixedLeafColumnsLength <= 0) {
      return false;
    }
    const columns = props.store.states.columns.value;
    const columnIndex = columns.findIndex((item) => item.id === column.id);
    if (columnIndex < 0) {
      return false;
    }
    let lastRightFixedIndex = -1;
    for (let index = columns.length - 1; index >= 0; index--) {
      if (columns[index].fixed === "right") {
        lastRightFixedIndex = index;
        break;
      }
    }
    if (lastRightFixedIndex <= 0) {
      return false;
    }
    return columnIndex === lastRightFixedIndex - 1;
  };
  const handleMouseDown = (event, column) => {
    var _a, _b;
    if (!core.isClient || !column.resizable)
      return;
    if (column.children && column.children.length > 0)
      return;
    if (isColumnBeforeLastRightFixedColumn(column))
      return;
    if (draggingColumn.value && props.border) {
      clearAddColumnTrigger();
      dragging.value = true;
      const table = parent;
      emit("set-drag-visible", true);
      const tableEl = table == null ? void 0 : table.vnode.el;
      const tableLeft = tableEl == null ? void 0 : tableEl.getBoundingClientRect().left;
      const columnEl = (_b = (_a = instance == null ? void 0 : instance.vnode) == null ? void 0 : _a.el) == null ? void 0 : _b.querySelector(`th.${column.id}`);
      const columnRect = columnEl.getBoundingClientRect();
      const minLeft = columnRect.left - tableLeft + 88;
      style.addClass(columnEl, "noclick");
      dragState.value = {
        startMouseLeft: event.clientX,
        startLeft: columnRect.right - tableLeft,
        startColumnLeft: columnRect.left - tableLeft,
        tableLeft
      };
      const resizeProxy = table == null ? void 0 : table.refs.resizeProxy;
      resizeProxy.style.left = `${dragState.value.startLeft}px`;
      document.onselectstart = function() {
        return false;
      };
      document.ondragstart = function() {
        return false;
      };
      const handleMouseMove2 = (event2) => {
        const deltaLeft = event2.clientX - dragState.value.startMouseLeft;
        const proxyLeft = dragState.value.startLeft + deltaLeft;
        resizeProxy.style.left = `${Math.max(minLeft, proxyLeft)}px`;
      };
      const handleMouseUp = () => {
        if (dragging.value) {
          const { startColumnLeft, startLeft } = dragState.value;
          const finalLeft = Number.parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - startColumnLeft;
          column.width = column.realWidth = columnWidth;
          table == null ? void 0 : table.emit("header-dragend", column.width, startLeft - startColumnLeft, column, event);
          requestAnimationFrame(() => {
            props.store.scheduleLayout(false, true);
          });
          document.body.style.cursor = "";
          dragging.value = false;
          draggingColumn.value = null;
          dragState.value = void 0;
          emit("set-drag-visible", false);
        }
        document.removeEventListener("mousemove", handleMouseMove2);
        document.removeEventListener("mouseup", handleMouseUp);
        document.onselectstart = null;
        document.ondragstart = null;
        setTimeout(() => {
          style.removeClass(columnEl, "noclick");
        }, 0);
      };
      document.addEventListener("mousemove", handleMouseMove2);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };
  const handleMouseMove = (event, column) => {
    var _a, _b;
    if (column.children && column.children.length > 0)
      return;
    const el = event.target;
    if (!types.isElement(el)) {
      return;
    }
    const target = el == null ? void 0 : el.closest("th");
    if (!column || !column.resizable || !target)
      return;
    if (!dragging.value && props.border) {
      const rect = target.getBoundingClientRect();
      const tableRect = (_a = parent == null ? void 0 : parent.vnode.el) == null ? void 0 : _a.getBoundingClientRect();
      const bodyStyle = document.body.style;
      const isLastTh = ((_b = target.parentNode) == null ? void 0 : _b.lastElementChild) === target;
      const allowDarg = !isColumnBeforeLastRightFixedColumn(column) && (props.allowDragLastColumn || !isLastTh);
      const canShowAddColumnTrigger = props.showAddColumnTrigger && tableRect && rect.width > 12;
      const columnIndex = props.store.states.columns.value.findIndex((item) => item.id === column.id);
      const isNearRightEdge = rect.right - event.clientX < 4 && allowDarg;
      if (rect.width > 12 && isNearRightEdge) {
        bodyStyle.cursor = "col-resize";
        if (style.hasClass(target, "is-sortable")) {
          target.style.cursor = "col-resize";
        }
        draggingColumn.value = column;
        if (canShowAddColumnTrigger && columnIndex > -1) {
          emit("update-add-column-trigger", {
            column,
            columnIndex,
            insertIndex: columnIndex + 1,
            left: rect.right - tableRect.left,
            top: rect.top - tableRect.top + rect.height / 2
          });
        } else {
          clearAddColumnTrigger();
        }
      } else if (canShowAddColumnTrigger && columnIndex > -1) {
        bodyStyle.cursor = "";
        if (style.hasClass(target, "is-sortable")) {
          target.style.cursor = "pointer";
        }
        draggingColumn.value = null;
        const isLeftHalf = event.clientX < rect.left + rect.width / 2;
        const disableInsertBeforeFirstColumn = columnIndex === 0 && isLeftHalf && column.allowInsertBeforeFirstColumn === false;
        if (disableInsertBeforeFirstColumn) {
          clearAddColumnTrigger();
          return;
        }
        const insertBefore = isLeftHalf;
        emit("update-add-column-trigger", {
          column,
          columnIndex,
          insertIndex: insertBefore ? columnIndex : columnIndex + 1,
          left: insertBefore ? rect.left - tableRect.left : rect.right - tableRect.left,
          top: rect.top - tableRect.top + rect.height / 2
        });
      } else {
        bodyStyle.cursor = "";
        if (style.hasClass(target, "is-sortable")) {
          target.style.cursor = "pointer";
        } else {
          target.style.cursor = "";
        }
        draggingColumn.value = null;
        clearAddColumnTrigger();
      }
    }
  };
  const handleMouseOut = (event) => {
    var _a, _b;
    if (!core.isClient)
      return;
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;
    const namespace = (_b = (_a = parent == null ? void 0 : parent.vnode.el) == null ? void 0 : _a.dataset.prefix) != null ? _b : "el";
    const triggerSelector = `.${namespace}-table__add-column-trigger`;
    if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    if (types.isElement(relatedTarget) && relatedTarget.closest(triggerSelector)) {
      return;
    }
    document.body.style.cursor = "";
    clearAddColumnTrigger();
  };
  const toggleOrder = ({ order, sortOrders }) => {
    if (order === "")
      return sortOrders[0];
    const index = sortOrders.indexOf(order || null);
    return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
  };
  const handleSortClick = (event, column, givenOrder) => {
    var _a;
    event.stopPropagation();
    const order = column.order === givenOrder ? null : givenOrder || toggleOrder(column);
    const target = (_a = event.target) == null ? void 0 : _a.closest("th");
    if (target) {
      if (style.hasClass(target, "noclick")) {
        style.removeClass(target, "noclick");
        return;
      }
    }
    if (!column.sortable)
      return;
    const clickTarget = event.currentTarget;
    if (["ascending", "descending"].some((str) => style.hasClass(clickTarget, str) && !column.sortOrders.includes(str))) {
      return;
    }
    const states = props.store.states;
    let sortProp = states.sortProp.value;
    let sortOrder;
    const sortingColumn = states.sortingColumn.value;
    if (sortingColumn !== column || sortingColumn === column && lodashUnified.isNull(sortingColumn.order)) {
      if (sortingColumn) {
        sortingColumn.order = null;
      }
      states.sortingColumn.value = column;
      sortProp = column.property;
    }
    if (!order) {
      sortOrder = column.order = null;
    } else {
      sortOrder = column.order = order;
    }
    states.sortProp.value = sortProp;
    states.sortOrder.value = sortOrder;
    parent == null ? void 0 : parent.store.commit("changeSortCondition");
  };
  return {
    handleCellMouseEnter,
    handleHeaderClick,
    handleHeaderContextMenu,
    handleMouseDown,
    handleMouseMove,
    handleMouseOut,
    handleSortClick,
    handleFilterClick
  };
}

exports["default"] = useEvent;
//# sourceMappingURL=event-helper.js.map
