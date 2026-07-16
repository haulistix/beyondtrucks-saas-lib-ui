import { createVNode, renderSlot, mergeProps } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { ElButton } from '../../../button/index.mjs';
import { get, set } from 'lodash-unified';
import { Alignment } from '../constants.mjs';
import { placeholderSign, rowAddSign, rowDeleteColumnKey, ghostRowKey, rowDeletePlaceholderMergedSign, ghostRowFieldKey, ghostRowSign, ghostRowTouchedSign } from '../private.mjs';
import { isGhostTableRow, isEmptyRequiredValue, applyRequiredInputState } from '../ghost-table.mjs';
import { enforceUnit, tryCall, componentToSlot } from '../utils.mjs';
import TableCell from '../components/cell.mjs';
import ExpandIcon from '../components/expand-icon.mjs';
import { isObject, isFunction } from '@vue/shared';

const CellRenderer = ({
  columns,
  column,
  columnIndex,
  depth,
  expandIconProps,
  isScrolling,
  rowData,
  rowIndex,
  style,
  expandedRowKeys,
  visibleColumns,
  ns,
  canEditTable,
  cellProps: _cellProps,
  editable,
  editTable,
  expandColumnKey,
  ghostTable,
  indentSize,
  iconSize,
  onAddGhostRow,
  onRowAdd,
  onRowDelete,
  rowActionRenderer,
  rowKey
}, {
  slots
}) => {
  const cellStyle = enforceUnit(style);
  if (column.placeholderSign === placeholderSign) {
    return createVNode("div", {
      "class": ns.em("row-cell", "placeholder"),
      "style": cellStyle
    }, null);
  }
  const {
    cellRenderer,
    dataKey,
    dataGetter,
    editCellRenderer
  } = column;
  const getCellData = () => isFunction(dataGetter) ? dataGetter({
    columns,
    column,
    columnIndex,
    rowData,
    rowIndex
  }) : get(rowData, dataKey != null ? dataKey : "");
  const markGhostRowTouched = (key, value) => {
    if (!isGhostTableRow(rowData) || key == null)
      return;
    const rowField = rowData == null ? void 0 : rowData[ghostRowFieldKey];
    if (key === ghostRowSign || key === ghostRowKey || key === ghostRowFieldKey || key === ghostRowTouchedSign || key === rowField) {
      return;
    }
    const currentValue = typeof key === "symbol" ? rowData[key] : get(rowData, String(key));
    if (currentValue !== value) {
      rowData[ghostRowTouchedSign] = true;
    }
  };
  const setCellData = (value) => {
    if (!rowData || dataKey == null)
      return;
    markGhostRowTouched(dataKey, value);
    if (typeof dataKey === "symbol") {
      rowData[dataKey] = value;
      return;
    }
    set(rowData, dataKey, value);
  };
  const renderRowData = isGhostTableRow(rowData) ? new Proxy(rowData, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      markGhostRowTouched(key, value);
      return Reflect.set(target, key, value);
    }
  }) : rowData;
  const baseCellProps = {
    class: ns.e("cell-text"),
    columns,
    column,
    columnIndex,
    isScrolling,
    rowData: renderRowData,
    rowIndex
  };
  const cellProps = Object.defineProperty(baseCellProps, "cellData", {
    enumerable: true,
    configurable: true,
    get: getCellData,
    set: setCellData
  });
  const extraCellProps = tryCall(_cellProps, cellProps);
  const isAddRow = Boolean(rowData[rowAddSign]);
  const isGhostRow = isGhostTableRow(rowData);
  const isRowDeleteColumn = column.key === rowDeleteColumnKey;
  const columnCellRenderer = componentToSlot(cellRenderer);
  const editColumnCellRenderer = componentToSlot(editCellRenderer);
  const shouldRenderEditor = canEditTable ? editable : true;
  const actualColumns = visibleColumns.filter((item) => item.placeholderSign !== placeholderSign);
  const shouldRenderGhostAddButton = ghostTable && editTable && isGhostRow && isRowDeleteColumn;
  const shouldRenderGhostEditCell = ghostTable && editTable && Boolean(editColumnCellRenderer) && !isRowDeleteColumn && !shouldRenderGhostAddButton;
  const requiredColumns = actualColumns.filter((item) => item.required && item.dataKey != null && item.key !== rowDeleteColumnKey);
  const isGhostRowAddDisabled = requiredColumns.some((item) => {
    var _a;
    return isEmptyRequiredValue(get(rowData, (_a = item.dataKey) != null ? _a : ""));
  });
  const Cell = isRowDeleteColumn ? shouldRenderGhostAddButton ? createVNode(ElButton, {
    "text": true,
    "class": "icon-button",
    "disabled": isGhostRowAddDisabled,
    "onClick": (event) => {
      var _a;
      event.stopPropagation();
      if (isGhostRowAddDisabled)
        return;
      onAddGhostRow == null ? void 0 : onAddGhostRow({
        event,
        row: rowData,
        rowIndex,
        rowKey: (_a = rowData[ghostRowKey]) != null ? _a : rowData[rowKey]
      });
    }
  }, {
    default: () => [createVNode(ElIcon, {
      "size": 12
    }, {
      default: () => [createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 0 12 12"
      }, [createVNode("path", {
        "d": "M3.82026 11.0062C3.64674 11.0063 3.4749 10.9711 3.3146 10.9026C3.1543 10.8341 3.00868 10.7337 2.88608 10.6072L0 7.6341L1.10129 6.49954L3.82026 9.30198L10.8987 2.00623L12 3.14079L4.75443 10.6072C4.63183 10.7337 4.48621 10.8341 4.32591 10.9026C4.16561 10.9711 3.99378 11.0063 3.82026 11.0062Z"
      }, null)])]
    })]
  }) : isAddRow ? createVNode(ElButton, {
    "text": true,
    "class": [ns.e("row-add-button"), "icon-button"],
    "onClick": (event) => {
      event.stopPropagation();
      onRowAdd == null ? void 0 : onRowAdd({
        event,
        rowData,
        rowIndex,
        rowKey: rowData[rowKey]
      });
    }
  }, {
    default: () => [createVNode(ElIcon, {
      "size": 12
    }, {
      default: () => [createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 0 12 12"
      }, [createVNode("path", {
        "d": "M3.82026 11.0062C3.64674 11.0063 3.4749 10.9711 3.3146 10.9026C3.1543 10.8341 3.00868 10.7337 2.88608 10.6072L0 7.6341L1.10129 6.49954L3.82026 9.30198L10.8987 2.00623L12 3.14079L4.75443 10.6072C4.63183 10.7337 4.48621 10.8341 4.32591 10.9026C4.16561 10.9711 3.99378 11.0063 3.82026 11.0062Z"
      }, null)])]
    })]
  }) : rowActionRenderer ? rowActionRenderer({
    columns,
    column,
    columnIndex,
    rowData: renderRowData,
    rowIndex,
    rowKey: rowData[rowKey]
  }) : createVNode(ElButton, {
    "link": true,
    "class": ns.e("row-delete-button"),
    "onClick": (event) => {
      event.stopPropagation();
      onRowDelete == null ? void 0 : onRowDelete({
        event,
        rowData,
        rowIndex,
        rowKey: rowData[rowKey]
      });
    }
  }, {
    default: () => [createVNode(ElIcon, {
      "size": "16px",
      "class": "delete-icon"
    }, {
      default: () => [createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "16",
        "height": "16",
        "viewBox": "0 0 16 16"
      }, [createVNode("path", {
        "d": "M11.334 2.66667V1.33333C11.334 0.979711 11.1935 0.640573 10.9435 0.390524C10.6934 0.140476 10.3543 0 10.0007 0L6.00065 0C5.64703 0 5.30789 0.140476 5.05784 0.390524C4.80779 0.640573 4.66732 0.979711 4.66732 1.33333V2.66667H1.33398V4H2.66732V14C2.66732 14.5304 2.87803 15.0391 3.2531 15.4142C3.62818 15.7893 4.13688 16 4.66732 16H11.334C11.8644 16 12.3731 15.7893 12.7482 15.4142C13.1233 15.0391 13.334 14.5304 13.334 14V4H14.6673V2.66667H11.334ZM7.33398 11.3333H6.00065V7.33333H7.33398V11.3333ZM10.0007 11.3333H8.66732V7.33333H10.0007V11.3333ZM10.0007 2.66667H6.00065V1.33333H10.0007V2.66667Z"
      }, null)])]
    })]
  }) : shouldRenderGhostEditCell ? (() => {
    const rendered = editColumnCellRenderer(cellProps);
    return applyRequiredInputState(rendered, column, rowData);
  })() : shouldRenderEditor && columnCellRenderer ? columnCellRenderer(cellProps) : renderSlot(slots, "default", cellProps, () => [createVNode(TableCell, cellProps, null)]);
  const kls = [ns.e("row-cell"), column.diagonalHeader && "is-diagonal-header-column", ghostTable && "is-full-width", isGhostRow && ns.is("ghost-row"), column.required && "required-column", column[rowDeletePlaceholderMergedSign] && ns.is("row-delete-placeholder-merged"), column.class, column.align === Alignment.CENTER && ns.is("align-center"), column.align === Alignment.RIGHT && ns.is("align-right")];
  const expandable = rowIndex >= 0 && expandColumnKey && column.key === expandColumnKey;
  const expanded = rowIndex >= 0 && expandedRowKeys.includes(rowData[rowKey]);
  let IconOrPlaceholder;
  const iconStyle = `margin-inline-start: ${depth * indentSize}px;`;
  if (expandable) {
    if (isObject(expandIconProps)) {
      IconOrPlaceholder = createVNode(ExpandIcon, mergeProps(expandIconProps, {
        "class": [ns.e("expand-icon"), ns.is("expanded", expanded)],
        "size": iconSize,
        "expanded": expanded,
        "style": iconStyle,
        "expandable": true
      }), null);
    } else {
      IconOrPlaceholder = createVNode("div", {
        "style": [iconStyle, `width: ${iconSize}px; height: ${iconSize}px;`].join(" ")
      }, null);
    }
  }
  return createVNode("div", mergeProps({
    "class": kls,
    "style": cellStyle
  }, extraCellProps, {
    "role": "cell"
  }), [IconOrPlaceholder, Cell]);
};
CellRenderer.inheritAttrs = false;
var Cell = CellRenderer;

export { Cell as default };
//# sourceMappingURL=cell.mjs.map
