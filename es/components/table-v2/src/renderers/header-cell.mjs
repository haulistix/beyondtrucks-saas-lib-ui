import { createVNode, renderSlot, mergeProps } from 'vue';
import { oppositeOrderMap, SortOrder, Alignment } from '../constants.mjs';
import { placeholderSign, rowDeletePlaceholderMergedSign, rowDeleteColumnKey } from '../private.mjs';
import { enforceUnit, componentToSlot, tryCall } from '../utils.mjs';
import HeaderCell$1 from '../components/header-cell.mjs';
import SortIcon from '../components/sort-icon.mjs';

const HeaderCellRenderer = (props, {
  slots
}) => {
  const {
    column,
    ns,
    style,
    onColumnSorted,
    updateColumnWidth,
    visibleColumns,
    canEditTable,
    editable,
    editTable,
    ghostTable,
    showAddColumnTrigger,
    onAddColumnTriggerChange,
    onHeaderDragend
  } = props;
  const cellStyle = enforceUnit(style);
  if (column.placeholderSign === placeholderSign) {
    return createVNode("div", {
      "class": ns.em("header-row-cell", "placeholder"),
      "style": cellStyle
    }, null);
  }
  const {
    diagonalHeader,
    headerCellRenderer,
    headerClass,
    sortable
  } = column;
  const cellProps = {
    ...props,
    class: ns.e("header-cell-text")
  };
  const columnCellRenderer = componentToSlot(headerCellRenderer);
  const diagonalHeaderContent = diagonalHeader ? createVNode("div", {
    "class": [ns.e("diagonal-header"), ns.e("header-cell-text")]
  }, [createVNode("span", {
    "class": ns.e("diagonal-header-text")
  }, [diagonalHeader.from]), createVNode("span", {
    "class": ns.e("diagonal-header-text")
  }, [diagonalHeader.to])]) : null;
  const Cell = columnCellRenderer ? columnCellRenderer(cellProps) : renderSlot(slots, "default", cellProps, () => [diagonalHeaderContent != null ? diagonalHeaderContent : createVNode(HeaderCell$1, cellProps, null)]);
  const {
    sortBy,
    sortState,
    headerCellProps
  } = props;
  let sorting, sortOrder;
  if (sortState) {
    const order = sortState[column.key];
    sorting = Boolean(oppositeOrderMap[order]);
    sortOrder = sorting ? order : SortOrder.ASC;
  } else {
    sorting = column.key === sortBy.key;
    sortOrder = sorting ? sortBy.order : SortOrder.ASC;
  }
  const cellKls = [ns.e("header-cell"), diagonalHeader && ns.is("diagonal-header"), column.required && "required-column", column[rowDeletePlaceholderMergedSign] && ns.is("row-delete-placeholder-merged"), tryCall(headerClass, props, ""), column.align === Alignment.CENTER && ns.is("align-center"), column.align === Alignment.RIGHT && ns.is("align-right"), sortable && ns.is("sortable")];
  const clearAddColumnTrigger = () => {
    onAddColumnTriggerChange == null ? void 0 : onAddColumnTriggerChange(null);
  };
  const getVisibleColumnIndex = () => visibleColumns.findIndex((item) => item.key === column.key);
  const emitAddColumnTrigger = (insertIndex, left, columnIndex = getVisibleColumnIndex()) => {
    if (columnIndex < 0) {
      clearAddColumnTrigger();
      return;
    }
    onAddColumnTriggerChange == null ? void 0 : onAddColumnTriggerChange({
      column,
      columnIndex,
      insertIndex,
      left
    });
  };
  const getColumnWidth = () => Number(column.width) || 0;
  const getMinWidth = () => Number(column.minWidth) > 0 ? Number(column.minWidth) : 88;
  const getMaxWidth = () => Number(column.maxWidth) > 0 ? Number(column.maxWidth) : Number.POSITIVE_INFINITY;
  const handleResizeMouseDown = (event) => {
    if (event.button !== 0 || column.resizable === false)
      return;
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const oldWidth = getColumnWidth();
    const minWidth = getMinWidth();
    const maxWidth = getMaxWidth();
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const nextWidth = Math.min(maxWidth, Math.max(minWidth, oldWidth + deltaX));
      updateColumnWidth(column, nextWidth);
    };
    const handleMouseUp = (upEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      onHeaderDragend == null ? void 0 : onHeaderDragend(getColumnWidth(), oldWidth, column, upEvent);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleHeaderMouseMove = (event) => {
    const canUseAddColumnTrigger = ghostTable ? editTable : canEditTable && editable;
    if (!showAddColumnTrigger || !canUseAddColumnTrigger || column.placeholderSign === placeholderSign) {
      clearAddColumnTrigger();
      return;
    }
    const currentTarget = event.currentTarget;
    const root = currentTarget == null ? void 0 : currentTarget.closest(`.${ns.b()}`);
    if (!currentTarget || !root) {
      clearAddColumnTrigger();
      return;
    }
    if (column.key === rowDeleteColumnKey) {
      clearAddColumnTrigger();
      return;
    }
    const rect = currentTarget.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const columnIndex = getVisibleColumnIndex();
    if (columnIndex < 0 || rect.width <= 8) {
      clearAddColumnTrigger();
      return;
    }
    const isLeftHalf = event.clientX < rect.left + rect.width / 2;
    const disableInsertBeforeFirstColumn = columnIndex === 0 && isLeftHalf && column.allowInsertBeforeFirstColumn === false;
    if (disableInsertBeforeFirstColumn) {
      clearAddColumnTrigger();
      return;
    }
    emitAddColumnTrigger(isLeftHalf ? columnIndex : columnIndex + 1, isLeftHalf ? rect.left - rootRect.left : rect.right - rootRect.left, columnIndex);
  };
  const handleHeaderMouseOut = (event) => {
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;
    const triggerSelector = `.${ns.e("add-column-trigger")}`;
    if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    if (relatedTarget instanceof HTMLElement && relatedTarget.closest(triggerSelector)) {
      return;
    }
    clearAddColumnTrigger();
  };
  const cellWrapperProps = {
    ...tryCall(headerCellProps, props),
    onClick: column.sortable ? onColumnSorted : void 0,
    onMousemove: handleHeaderMouseMove,
    onMouseout: handleHeaderMouseOut,
    class: cellKls,
    style: cellStyle,
    ["data-key"]: column.key
  };
  return createVNode("div", mergeProps(cellWrapperProps, {
    "role": "columnheader"
  }), [Cell, sortable && createVNode(SortIcon, {
    "class": [ns.e("sort-icon"), sorting && ns.is("sorting")],
    "sortOrder": sortOrder,
    "sorting": sorting
  }, null), column.resizable !== false && createVNode("div", {
    "class": ns.e("column-resizer"),
    "onClick": (event) => event.stopPropagation(),
    "onMousedown": handleResizeMouseDown
  }, null)]);
};
var HeaderCell = HeaderCellRenderer;

export { HeaderCell as default };
//# sourceMappingURL=header-cell.mjs.map
