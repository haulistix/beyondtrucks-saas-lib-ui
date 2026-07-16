import { ref, computed, unref } from 'vue';
import { FixedDir, SortOrder, oppositeOrderMap } from '../constants.mjs';
import { rowDeleteColumnKey, rowDeleteColumnWidth, placeholderSign, rowDeletePlaceholderMergedSign } from '../private.mjs';
import { calcColumnStyle } from './utils.mjs';
import { isObject } from '@vue/shared';

const AUTO_COLUMN_PADDING = 48;
const MIN_AUTO_COLUMN_WIDTH = 80;
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
  return Math.max(MIN_AUTO_COLUMN_WIDTH, measureHeaderTextWidth(String((_a = column.title) != null ? _a : "")) + AUTO_COLUMN_PADDING);
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
  const columnWidths = ref({});
  const _columns = computed(() => {
    const availableWidth = Math.max(unref(effectiveWidth) - unref(reservedVScrollbarWidth), 0);
    const normalizedColumns = unref(columns).map((column, index) => {
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
      key: rowDeleteColumnKey,
      dataKey: rowDeleteColumnKey,
      title: "",
      width: rowDeleteColumnWidth,
      resizable: false,
      fixed: FixedDir.RIGHT,
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
  const visibleColumns = computed(() => {
    return unref(_columns).filter((column) => !column.hidden);
  });
  const fixedColumnsOnLeft = computed(() => unref(visibleColumns).filter((column) => column.fixed === "left" || column.fixed === true));
  const fixedColumnsOnRight = computed(() => unref(visibleColumns).filter((column) => column.fixed === "right"));
  const normalColumns = computed(() => unref(visibleColumns).filter((column) => !column.fixed));
  const rowDeletePlaceholderMerge = computed(() => {
    const rowDeleteColumn = unref(fixedColumnsOnRight).find((column) => column.key === rowDeleteColumnKey);
    const targetColumn = [...unref(normalColumns)].reverse().find((column) => column.key !== rowDeleteColumnKey);
    return rowDeleteColumn && targetColumn ? { rowDeleteColumn, targetColumn } : void 0;
  });
  const mainColumns = computed(() => {
    const ret = [];
    const merge = unref(rowDeletePlaceholderMerge);
    unref(fixedColumnsOnLeft).forEach((column) => {
      ret.push({
        ...column,
        placeholderSign
      });
    });
    unref(normalColumns).forEach((column) => {
      ret.push(column.key === (merge == null ? void 0 : merge.targetColumn.key) ? {
        ...column,
        [rowDeletePlaceholderMergedSign]: true
      } : column);
    });
    unref(fixedColumnsOnRight).forEach((column) => {
      if (column.key === (merge == null ? void 0 : merge.rowDeleteColumn.key))
        return;
      ret.push({
        ...column,
        placeholderSign
      });
    });
    return ret;
  });
  const hasFixedColumns = computed(() => {
    return unref(fixedColumnsOnLeft).length || unref(fixedColumnsOnRight).length;
  });
  const columnsStyles = computed(() => {
    const styles = unref(_columns).reduce((style, column) => {
      const key = column.key;
      style[key] = calcColumnStyle(column, unref(fixed), props.fixed);
      return style;
    }, {});
    const merge = unref(rowDeletePlaceholderMerge);
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
  const columnsTotalWidth = computed(() => {
    return unref(visibleColumns).reduce((width, column) => width + (typeof column.width === "number" ? column.width : 0), 0);
  });
  const getColumn = (key) => {
    return unref(_columns).find((column) => column.key === key);
  };
  const getColumnStyle = (key) => {
    return unref(columnsStyles)[key];
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
    let order = SortOrder.ASC;
    if (isObject(sortState)) {
      order = (_a = oppositeOrderMap[sortState[key]]) != null ? _a : SortOrder.ASC;
    } else {
      order = sortBy.key === key ? (_b = oppositeOrderMap[sortBy.order]) != null ? _b : SortOrder.ASC : SortOrder.ASC;
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

export { useColumns };
//# sourceMappingURL=use-columns.mjs.map
