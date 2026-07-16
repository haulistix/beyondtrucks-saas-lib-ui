'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('./common.js');
var row = require('./row.js');
var header = require('./header.js');
var grid = require('./grid.js');
var props = require('../../virtual-list/src/props.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const tableV2Emits = {
  "update:expandedRowKeys": (expandedRowKeys) => Array.isArray(expandedRowKeys),
  "header-dragend": (newWidth, oldWidth, column, event) => Number.isFinite(newWidth) && Number.isFinite(oldWidth) && Boolean(column) && event instanceof MouseEvent,
  "row-delete": (params) => Boolean(params),
  "row-add": (params) => Boolean(params),
  "add-column": (params) => Boolean(params),
  "add-row": (params) => Boolean(params),
  "add-ghost-row": (params) => Boolean(params)
};
const tableV2Props = runtime.buildProps({
  cache: grid.tableV2GridProps.cache,
  estimatedRowHeight: row.tableV2RowProps.estimatedRowHeight,
  rowKey: common.rowKey,
  headerClass: {
    type: runtime.definePropType([
      String,
      Function
    ])
  },
  headerProps: {
    type: runtime.definePropType([
      Object,
      Function
    ])
  },
  headerCellProps: {
    type: runtime.definePropType([
      Object,
      Function
    ])
  },
  headerHeight: header.tableV2HeaderProps.headerHeight,
  footerHeight: {
    type: Number,
    default: 0
  },
  isFooterDefault: {
    type: Boolean,
    default: true
  },
  editable: {
    type: Boolean,
    default: true
  },
  canEditTable: Boolean,
  ghostTable: Boolean,
  editTable: Boolean,
  ghostRowTemplate: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  showAddColumnTrigger: Boolean,
  addColumnButton: {
    type: Boolean,
    default: true
  },
  showAddRowTrigger: Boolean,
  total: {
    type: Number,
    default: 0
  },
  updateTime: {
    type: String,
    default: ""
  },
  rowClass: {
    type: runtime.definePropType([String, Function])
  },
  rowProps: {
    type: runtime.definePropType([Object, Function])
  },
  rowHeight: {
    type: Number,
    default: 44
  },
  cellProps: {
    type: runtime.definePropType([
      Object,
      Function
    ])
  },
  columns: common.columns,
  data: common.dataType,
  dataGetter: {
    type: runtime.definePropType(Function)
  },
  fixedData: common.fixedDataType,
  expandColumnKey: row.tableV2RowProps.expandColumnKey,
  expandedRowKeys: common.expandKeys,
  defaultExpandedRowKeys: common.expandKeys,
  class: common.classType,
  fixed: Boolean,
  style: {
    type: runtime.definePropType(Object)
  },
  width: common.optionalNumber,
  height: common.optionalNumber,
  maxHeight: Number,
  useIsScrolling: Boolean,
  indentSize: {
    type: Number,
    default: 12
  },
  iconSize: {
    type: Number,
    default: 12
  },
  hScrollbarSize: props.virtualizedGridProps.hScrollbarSize,
  vScrollbarSize: props.virtualizedGridProps.vScrollbarSize,
  scrollbarAlwaysOn: props.virtualizedScrollbarProps.alwaysOn,
  sortBy: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  sortState: {
    type: runtime.definePropType(Object),
    default: void 0
  },
  onColumnSort: {
    type: runtime.definePropType(Function)
  },
  onExpandedRowsChange: {
    type: runtime.definePropType(Function)
  },
  onEndReached: {
    type: runtime.definePropType(Function)
  },
  onRowExpand: row.tableV2RowProps.onRowExpand,
  onScroll: grid.tableV2GridProps.onScroll,
  onRowsRendered: grid.tableV2GridProps.onRowsRendered,
  rowEventHandlers: row.tableV2RowProps.rowEventHandlers
});

exports.tableV2Emits = tableV2Emits;
exports.tableV2Props = tableV2Props;
//# sourceMappingURL=table.js.map
