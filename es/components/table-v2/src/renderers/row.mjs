import { createVNode, mergeProps, isVNode } from 'vue';
import { rowAddSign, ghostRowSign } from '../private.mjs';
import { tryCall } from '../utils.mjs';
import Row$1 from '../components/row.mjs';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const RowRenderer = (props, {
  slots
}) => {
  const {
    columns,
    columnsStyles,
    depthMap,
    expandColumnKey,
    expandedRowKeys,
    estimatedRowHeight,
    hasFixedColumns,
    rowData,
    rowIndex,
    style,
    isScrolling,
    canEditTable,
    editable,
    editTable,
    ghostTable,
    rowProps,
    rowClass,
    rowKey,
    rowEventHandlers,
    onRowAdd,
    onAddRowTriggerChange,
    showAddRowTrigger,
    ns,
    onRowHovered,
    onRowExpanded
  } = props;
  const rowKls = tryCall(rowClass, {
    columns,
    rowData,
    rowIndex
  }, "");
  const additionalProps = tryCall(rowProps, {
    columns,
    rowData,
    rowIndex
  });
  const _rowKey = rowData[rowKey];
  const depth = depthMap[_rowKey] || 0;
  const canExpand = Boolean(expandColumnKey);
  const isFixedRow = rowIndex < 0;
  const isAddRow = Boolean(rowData[rowAddSign]);
  const isGhostRow = Boolean(rowData[ghostRowSign]);
  const kls = [ns.e("row"), rowKls, isAddRow && ns.is("add-row"), isGhostRow && ns.is("ghost-row"), ns.is("expanded", canExpand && expandedRowKeys.includes(_rowKey)), ns.is("fixed", !depth && isFixedRow), ns.is("customized", Boolean(slots.row)), {
    [ns.e(`row-depth-${depth}`)]: canExpand && rowIndex >= 0
  }];
  const onRowHover = hasFixedColumns ? onRowHovered : void 0;
  const clearAddRowTrigger = () => {
    onAddRowTriggerChange == null ? void 0 : onAddRowTriggerChange(null);
  };
  const _rowProps = {
    ...additionalProps,
    columns,
    columnsStyles,
    class: kls,
    depth,
    expandColumnKey,
    estimatedRowHeight: isFixedRow ? void 0 : estimatedRowHeight,
    isScrolling,
    rowIndex,
    rowData,
    rowKey: _rowKey,
    rowEventHandlers,
    style
  };
  const handlerMouseEnter = (e) => {
    onRowHover == null ? void 0 : onRowHover({
      hovered: true,
      rowKey: _rowKey,
      event: e,
      rowData,
      rowIndex
    });
  };
  const handlerMouseLeave = (e) => {
    onRowHover == null ? void 0 : onRowHover({
      hovered: false,
      rowKey: _rowKey,
      event: e,
      rowData,
      rowIndex
    });
  };
  const handlerClick = (e) => {
    if (!isAddRow)
      return;
    onRowAdd == null ? void 0 : onRowAdd({
      event: e,
      rowData,
      rowIndex,
      rowKey: _rowKey
    });
  };
  const handlerMouseMove = (e) => {
    const canUseAddRowTrigger = ghostTable ? editTable : canEditTable && editable;
    if (!showAddRowTrigger || !canUseAddRowTrigger) {
      clearAddRowTrigger();
      return;
    }
    const currentTarget = e.currentTarget;
    const root = currentTarget == null ? void 0 : currentTarget.closest(`.${ns.b()}`);
    if (!currentTarget || !root || rowIndex < 0) {
      clearAddRowTrigger();
      return;
    }
    const rect = currentTarget.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const nearTop = rect.height > 12 && e.clientY - rect.top < 8;
    const nearBottom = rect.height > 12 && rect.bottom - e.clientY < 8;
    if (nearTop) {
      onAddRowTriggerChange == null ? void 0 : onAddRowTriggerChange({
        row: rowData,
        rowIndex,
        insertIndex: rowIndex,
        top: rect.top - rootRect.top,
        placement: "below"
      });
      return;
    }
    if (nearBottom && !isAddRow && !isGhostRow) {
      onAddRowTriggerChange == null ? void 0 : onAddRowTriggerChange({
        row: rowData,
        rowIndex,
        insertIndex: rowIndex + 1,
        top: rect.bottom - rootRect.top,
        placement: "above"
      });
      return;
    }
    clearAddRowTrigger();
  };
  const handlerMouseOut = (e) => {
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget;
    const triggerSelector = `.${ns.e("add-row-trigger")}`;
    if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    if (relatedTarget instanceof HTMLElement && relatedTarget.closest(triggerSelector)) {
      return;
    }
    clearAddRowTrigger();
  };
  return createVNode(Row$1, mergeProps(_rowProps, {
    "onClick": handlerClick,
    "onMousemove": handlerMouseMove,
    "onMouseout": handlerMouseOut,
    "onRowExpand": onRowExpanded,
    "onMouseenter": handlerMouseEnter,
    "onMouseleave": handlerMouseLeave,
    "rowkey": _rowKey
  }), _isSlot(slots) ? slots : {
    default: () => [slots]
  });
};
var Row = RowRenderer;

export { Row as default };
//# sourceMappingURL=row.mjs.map
