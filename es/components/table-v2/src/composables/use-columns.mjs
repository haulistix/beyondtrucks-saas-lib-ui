import { computed, unref } from 'vue';
import { FixedDir, SortOrder, oppositeOrderMap } from '../constants.mjs';
import { rowDeleteColumnKey, rowDeleteColumnWidth, placeholderSign } from '../private.mjs';
import { calcColumnStyle } from './utils.mjs';
import { isObject } from '@vue/shared';

function useColumns(props, columns, fixed) {
  const _columns = computed(() => {
    const normalizedColumns = unref(columns).map((column, index) => {
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
      key: rowDeleteColumnKey,
      dataKey: rowDeleteColumnKey,
      title: "",
      width: rowDeleteColumnWidth,
      fixed: FixedDir.RIGHT,
      align: "center",
      class: "is-row-delete-column",
      headerClass: "is-row-delete-column"
    };
    return [...normalizedColumns, rowDeleteColumn];
  });
  const visibleColumns = computed(() => {
    return unref(_columns).filter((column) => !column.hidden);
  });
  const fixedColumnsOnLeft = computed(() => unref(visibleColumns).filter((column) => column.fixed === "left" || column.fixed === true));
  const fixedColumnsOnRight = computed(() => unref(visibleColumns).filter((column) => column.fixed === "right"));
  const normalColumns = computed(() => unref(visibleColumns).filter((column) => !column.fixed));
  const mainColumns = computed(() => {
    const ret = [];
    unref(fixedColumnsOnLeft).forEach((column) => {
      ret.push({
        ...column,
        placeholderSign
      });
    });
    unref(normalColumns).forEach((column) => {
      ret.push(column);
    });
    unref(fixedColumnsOnRight).forEach((column) => {
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
    return unref(_columns).reduce((style, column) => {
      const key = column.key;
      style[key] = calcColumnStyle(column, unref(fixed), props.fixed);
      return style;
    }, {});
  });
  const columnsTotalWidth = computed(() => {
    return unref(visibleColumns).reduce((width, column) => width + column.width, 0);
  });
  const getColumn = (key) => {
    return unref(_columns).find((column) => column.key === key);
  };
  const getColumnStyle = (key) => {
    return unref(columnsStyles)[key];
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
