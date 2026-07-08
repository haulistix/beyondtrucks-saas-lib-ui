'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var constants = require('../constants.js');
var _private = require('../private.js');
var utils = require('./utils.js');
var shared = require('@vue/shared');

function useColumns(props, columns, fixed) {
  const _columns = vue.computed(() => {
    const normalizedColumns = vue.unref(columns).map((column, index) => {
      var _a, _b;
      return {
        ...column,
        key: (_b = (_a = column.key) != null ? _a : column.dataKey) != null ? _b : index
      };
    });
    if (!(props.canEditTable && props.editable)) {
      return normalizedColumns;
    }
    const rowDeleteColumn = {
      key: _private.rowDeleteColumnKey,
      dataKey: _private.rowDeleteColumnKey,
      title: "",
      width: _private.rowDeleteColumnWidth,
      fixed: constants.FixedDir.RIGHT,
      align: "center",
      class: "is-row-delete-column",
      headerClass: "is-row-delete-column"
    };
    return [...normalizedColumns, rowDeleteColumn];
  });
  const visibleColumns = vue.computed(() => {
    return vue.unref(_columns).filter((column) => !column.hidden);
  });
  const fixedColumnsOnLeft = vue.computed(() => vue.unref(visibleColumns).filter((column) => column.fixed === "left" || column.fixed === true));
  const fixedColumnsOnRight = vue.computed(() => vue.unref(visibleColumns).filter((column) => column.fixed === "right"));
  const normalColumns = vue.computed(() => vue.unref(visibleColumns).filter((column) => !column.fixed));
  const mainColumns = vue.computed(() => {
    const ret = [];
    vue.unref(fixedColumnsOnLeft).forEach((column) => {
      ret.push({
        ...column,
        placeholderSign: _private.placeholderSign
      });
    });
    vue.unref(normalColumns).forEach((column) => {
      ret.push(column);
    });
    vue.unref(fixedColumnsOnRight).forEach((column) => {
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
    return vue.unref(_columns).reduce((style, column) => {
      const key = column.key;
      style[key] = utils.calcColumnStyle(column, vue.unref(fixed), props.fixed);
      return style;
    }, {});
  });
  const columnsTotalWidth = vue.computed(() => {
    return vue.unref(visibleColumns).reduce((width, column) => width + column.width, 0);
  });
  const getColumn = (key) => {
    return vue.unref(_columns).find((column) => column.key === key);
  };
  const getColumnStyle = (key) => {
    return vue.unref(columnsStyles)[key];
  };
  const updateColumnWidth = (column, width) => {
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
