'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var constants = require('../constants.js');
var _private = require('../private.js');
var utils = require('./utils.js');
var shared = require('@vue/shared');

const AUTO_COLUMN_PADDING = 48;
const FALLBACK_HEADER_CHAR_WIDTH = 8;
const textWidthCache = /* @__PURE__ */ new Map();
const PERCENTAGE_WIDTH_RE = /^\s*(-?\d+(?:\.\d+)?)%\s*$/;
const PIXEL_WIDTH_RE = /^\s*(-?\d+(?:\.\d+)?)(?:px)?\s*$/;
const measureHeaderTextWidth = (text) => {
  if (textWidthCache.has(text))
    return textWidthCache.get(text);
  let width = text.length * FALLBACK_HEADER_CHAR_WIDTH;
  const isJsdom = typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent);
  if (typeof document !== "undefined" && !isJsdom) {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = "400 14px Inter, sans-serif";
        width = Math.ceil(context.measureText(text).width);
      }
    } catch (e) {
    }
  }
  textWidthCache.set(text, width);
  return width;
};
const getAutoColumnWidth = (column) => {
  var _a;
  return measureHeaderTextWidth(String((_a = column.title) != null ? _a : "")) + AUTO_COLUMN_PADDING;
};
const resolveColumnWidth = (width, referenceWidth) => {
  if (typeof width === "number")
    return width;
  if (typeof width !== "string")
    return void 0;
  const percentageMatch = width.match(PERCENTAGE_WIDTH_RE);
  if (percentageMatch) {
    return Math.round(referenceWidth * Number(percentageMatch[1]) / 100);
  }
  const pixelMatch = width.match(PIXEL_WIDTH_RE);
  if (pixelMatch) {
    return Number(pixelMatch[1]);
  }
  return void 0;
};
function useColumns(props, columns, fixed, effectiveWidth, reservedVScrollbarWidth) {
  const columnWidths = vue.ref({});
  const _columns = vue.computed(() => {
    const availableWidth = Math.max(vue.unref(effectiveWidth) - vue.unref(reservedVScrollbarWidth), 0);
    const normalizedColumns = vue.unref(columns).map((column, index) => {
      var _a, _b, _c;
      const key = (_b = (_a = column.key) != null ? _a : column.dataKey) != null ? _b : index;
      return {
        ...column,
        key,
        resizable: column.resizable !== false,
        width: (_c = columnWidths.value[key]) != null ? _c : resolveColumnWidth(column.width, availableWidth)
      };
    });
    const rowDeleteColumn = {
      key: _private.rowDeleteColumnKey,
      dataKey: _private.rowDeleteColumnKey,
      title: "",
      width: _private.rowDeleteColumnWidth,
      resizable: false,
      fixed: constants.FixedDir.RIGHT,
      align: "center",
      class: "is-row-delete-column",
      headerClass: "is-row-delete-column"
    };
    const shouldAppendActionColumn = props.canEditTable && props.editable || props.ghostTable && props.editTable;
    const columnsWithEditAction = shouldAppendActionColumn ? [...normalizedColumns, rowDeleteColumn] : normalizedColumns;
    const visibleColumns2 = columnsWithEditAction.filter((column) => !column.hidden);
    const autoWidthCandidates = visibleColumns2.filter((column) => column.width == null);
    if (!autoWidthCandidates.length)
      return columnsWithEditAction;
    const stretchColumn = autoWidthCandidates[autoWidthCandidates.length - 1];
    const resolvedColumns = columnsWithEditAction.map((column) => {
      if (column.width != null)
        return column;
      return {
        ...column,
        width: getAutoColumnWidth(column)
      };
    });
    const otherWidth = resolvedColumns.filter((column) => {
      var _a;
      return !column.hidden && ((_a = column.key) != null ? _a : column.dataKey) !== stretchColumn.key;
    }).reduce((width, column) => width + (typeof column.width === "number" ? column.width : 0), 0);
    const stretchWidth = Math.max(getAutoColumnWidth(stretchColumn), availableWidth - otherWidth);
    return resolvedColumns.map((column) => column.key === stretchColumn.key ? {
      ...column,
      width: stretchWidth
    } : column);
  });
  const visibleColumns = vue.computed(() => {
    return vue.unref(_columns).filter((column) => !column.hidden);
  });
  const fixedColumnsOnLeft = vue.computed(() => vue.unref(visibleColumns).filter((column) => column.fixed === "left" || column.fixed === true));
  const fixedColumnsOnRight = vue.computed(() => vue.unref(visibleColumns).filter((column) => column.fixed === "right"));
  const normalColumns = vue.computed(() => vue.unref(visibleColumns).filter((column) => !column.fixed));
  const rowDeletePlaceholderMerge = vue.computed(() => {
    const rowDeleteColumn = vue.unref(fixedColumnsOnRight).find((column) => column.key === _private.rowDeleteColumnKey);
    const targetColumn = [...vue.unref(normalColumns)].reverse().find((column) => column.key !== _private.rowDeleteColumnKey);
    return rowDeleteColumn && targetColumn ? { rowDeleteColumn, targetColumn } : void 0;
  });
  const mainColumns = vue.computed(() => {
    const ret = [];
    const merge = vue.unref(rowDeletePlaceholderMerge);
    vue.unref(fixedColumnsOnLeft).forEach((column) => {
      ret.push({
        ...column,
        placeholderSign: _private.placeholderSign
      });
    });
    vue.unref(normalColumns).forEach((column) => {
      ret.push(column.key === (merge == null ? void 0 : merge.targetColumn.key) ? {
        ...column,
        [_private.rowDeletePlaceholderMergedSign]: true
      } : column);
    });
    vue.unref(fixedColumnsOnRight).forEach((column) => {
      if (column.key === (merge == null ? void 0 : merge.rowDeleteColumn.key))
        return;
      ret.push({
        ...column,
        placeholderSign: _private.placeholderSign
      });
    });
    return ret;
  });
  const hasFixedColumns = vue.computed(() => {
    return vue.unref(fixedColumnsOnLeft).length || vue.unref(fixedColumnsOnRight).length;
  });
  const columnsStyles = vue.computed(() => {
    const styles = vue.unref(_columns).reduce((style, column) => {
      const key = column.key;
      style[key] = utils.calcColumnStyle(column, vue.unref(fixed), props.fixed);
      return style;
    }, {});
    const merge = vue.unref(rowDeletePlaceholderMerge);
    if (merge) {
      const targetKey = merge.targetColumn.key;
      const targetWidth = typeof merge.targetColumn.width === "number" ? merge.targetColumn.width : 0;
      const rowDeleteWidth = typeof merge.rowDeleteColumn.width === "number" ? merge.rowDeleteColumn.width : 0;
      styles[targetKey] = {
        ...styles[targetKey],
        width: targetWidth + rowDeleteWidth
      };
    }
    return styles;
  });
  const columnsTotalWidth = vue.computed(() => {
    return vue.unref(visibleColumns).reduce((width, column) => width + (typeof column.width === "number" ? column.width : 0), 0);
  });
  const getColumn = (key) => {
    return vue.unref(_columns).find((column) => column.key === key);
  };
  const getColumnStyle = (key) => {
    return vue.unref(columnsStyles)[key];
  };
  const updateColumnWidth = (column, width) => {
    columnWidths.value = {
      ...columnWidths.value,
      [column.key]: width
    };
    column.width = width;
  };
  function onColumnSorted(e) {
    var _a, _b, _c;
    const { key } = e.currentTarget.dataset;
    if (!key)
      return;
    const { sortState, sortBy } = props;
    let order = constants.SortOrder.ASC;
    if (shared.isObject(sortState)) {
      order = (_a = constants.oppositeOrderMap[sortState[key]]) != null ? _a : constants.SortOrder.ASC;
    } else {
      order = sortBy.key === key ? (_b = constants.oppositeOrderMap[sortBy.order]) != null ? _b : constants.SortOrder.ASC : constants.SortOrder.ASC;
    }
    (_c = props.onColumnSort) == null ? void 0 : _c.call(props, { column: getColumn(key), key, order });
  }
  return {
    columns: _columns,
    columnsStyles,
    columnsTotalWidth,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    hasFixedColumns,
    mainColumns,
    normalColumns,
    visibleColumns,
    getColumn,
    getColumnStyle,
    updateColumnWidth,
    onColumnSorted
  };
}

exports.useColumns = useColumns;
//# sourceMappingURL=use-columns.js.map
