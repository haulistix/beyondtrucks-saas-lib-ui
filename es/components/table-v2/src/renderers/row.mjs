import { createVNode, mergeProps, isVNode } from 'vue';
import { rowAddSign } from '../private.mjs';
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
    rowProps,
    rowClass,
    rowKey,
    rowEventHandlers,
    onRowAdd,
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
  const kls = [ns.e("row"), rowKls, isAddRow && ns.is("add-row"), ns.is("expanded", canExpand && expandedRowKeys.includes(_rowKey)), ns.is("fixed", !depth && isFixedRow), ns.is("customized", Boolean(slots.row)), {
    [ns.e(`row-depth-${depth}`)]: canExpand && rowIndex >= 0
  }];
  const onRowHover = hasFixedColumns ? onRowHovered : void 0;
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
  return createVNode(Row$1, mergeProps(_rowProps, {
    "onClick": handlerClick,
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
