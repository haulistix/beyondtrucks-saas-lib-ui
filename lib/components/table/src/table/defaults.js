'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../../hooks/use-size/index.js');

var defaultProps = {
  data: {
    type: Array,
    default: () => []
  },
  size: index.useSizeProp,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function],
  showHeader: {
    type: Boolean,
    default: true
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: { type: String, default: "light" },
  tooltipOptions: {
    type: Object,
    default: () => ({
      showArrow: false,
      popperClass: "table-tooltip"
    })
  },
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object,
    default: () => {
      return {
        hasChildren: "hasChildren",
        children: "children",
        checkStrictly: false
      };
    }
  },
  lazy: Boolean,
  load: Function,
  style: {
    type: Object,
    default: () => ({})
  },
  className: {
    type: String,
    default: ""
  },
  tableLayout: {
    type: String,
    default: "fixed"
  },
  scrollbarAlwaysOn: Boolean,
  flexible: Boolean,
  editable: Boolean,
  ghostTable: Boolean,
  editTable: Boolean,
  total: {
    type: Number,
    default: 0
  },
  updateTime: {
    type: String,
    default: ""
  },
  haveTableText: Boolean,
  showOverflowTooltip: [Boolean, Object],
  rowDraggable: {
    type: [Function, Boolean],
    default: false
  },
  onDragend: {
    type: Function,
    default: void 0
  },
  onDragstart: {
    type: Function,
    default: void 0
  },
  tooltipFormatter: Function,
  appendFilterPanelTo: String,
  scrollbarTabindex: {
    type: [Number, String],
    default: void 0
  },
  showAddColumnTrigger: Boolean,
  showAddRowTrigger: Boolean,
  allowDragLastColumn: {
    type: Boolean,
    default: true
  },
  preserveExpandedContent: Boolean,
  nativeScrollbar: Boolean
};

exports["default"] = defaultProps;
//# sourceMappingURL=defaults.js.map
