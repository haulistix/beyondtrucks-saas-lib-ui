import { getCurrentInstance, ref, watchEffect, computed, unref, h, renderSlot, Comment, cloneVNode } from 'vue';
import { cellForced, defaultRenderCell, treeCellPrefix, getDefaultClassName } from '../config.mjs';
import { getAutoColumnWidth } from '../column-width.mjs';
import { parseWidth, parseMinWidth } from '../util.mjs';
import { ghostRowSign, ghostRowKey } from '../private.mjs';
import GhostRowAddButton from '../ghost-row-add-button.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../../utils/types.mjs';
import { isArray } from '@vue/shared';

const isEmptyRequiredValue = (value) => value === "" || value === null || value === void 0;
const hasGhostRowValue = (row) => {
  return Object.entries(row != null ? row : {}).some(([key, value]) => {
    if (key === ghostRowSign || key === ghostRowKey)
      return false;
    return !isEmptyRequiredValue(value);
  });
};
const isElInputVNode = (vnode) => {
  const type = vnode.type;
  return (type == null ? void 0 : type.name) === "ElInput" || (type == null ? void 0 : type.__name) === "ElInput";
};
const applyRequiredInputState = (vnodes, column, row) => {
  if (!column.required || !column.property)
    return vnodes;
  if ((row == null ? void 0 : row[ghostRowSign]) && !hasGhostRowValue(row))
    return vnodes;
  if (!isEmptyRequiredValue(row == null ? void 0 : row[column.property]))
    return vnodes;
  const patchVNode = (vnode) => {
    var _a, _b, _c, _d, _e;
    if (!isElInputVNode(vnode))
      return vnode;
    const vnodeProps = (_a = vnode.props) != null ? _a : {};
    return cloneVNode(vnode, {
      inputType: (_c = (_b = vnodeProps.inputType) != null ? _b : vnodeProps["input-type"]) != null ? _c : "error",
      infoTip: (_e = (_d = vnodeProps.infoTip) != null ? _d : vnodeProps["info-tip"]) != null ? _e : "Required"
    });
  };
  return isArray(vnodes) ? vnodes.map((vnode) => patchVNode(vnode)) : patchVNode(vnodes);
};
function useRender(props, slots, owner) {
  const instance = getCurrentInstance();
  const columnId = ref("");
  const isSubColumn = ref(false);
  const realAlign = ref();
  const realHeaderAlign = ref();
  const ns = useNamespace("table");
  watchEffect(() => {
    realAlign.value = props.align ? `is-${props.align}` : null;
    realAlign.value;
  });
  watchEffect(() => {
    realHeaderAlign.value = props.headerAlign ? `is-${props.headerAlign}` : realAlign.value;
    realHeaderAlign.value;
  });
  const columnOrTableParent = computed(() => {
    let parent = instance.vnode.vParent || instance.parent;
    while (parent && !parent.tableId && !parent.columnId) {
      parent = parent.vnode.vParent || parent.parent;
    }
    return parent;
  });
  const hasTreeColumn = computed(() => {
    const { store } = instance.parent;
    if (!store)
      return false;
    const { treeData } = store.states;
    const treeDataValue = treeData.value;
    return treeDataValue && Object.keys(treeDataValue).length > 0;
  });
  const realWidth = ref(parseWidth(props.width));
  const realMinWidth = ref(parseMinWidth(props.minWidth));
  const setColumnWidth = (column) => {
    if (realWidth.value)
      column.width = realWidth.value;
    if (realMinWidth.value) {
      column.minWidth = realMinWidth.value;
    }
    if (!realWidth.value && realMinWidth.value) {
      column.width = void 0;
    }
    column.autoWidth = isUndefined(column.width) && !realWidth.value && !realMinWidth.value;
    if (column.autoWidth) {
      column.minWidth = getAutoColumnWidth(column.label);
    } else if (!column.minWidth) {
      column.minWidth = 80;
    }
    column.realWidth = Number(isUndefined(column.width) ? column.minWidth : column.width);
    return column;
  };
  const setColumnForcedProps = (column) => {
    const type = column.type;
    const source = cellForced[type] || {};
    Object.keys(source).forEach((prop) => {
      const value = source[prop];
      if (prop !== "className" && !isUndefined(value)) {
        column[prop] = value;
      }
    });
    const className = getDefaultClassName(type);
    if (className) {
      const forceClass = `${unref(ns.namespace)}-${className}`;
      column.className = column.className ? `${column.className} ${forceClass}` : forceClass;
    }
    return column;
  };
  const checkSubColumn = (children) => {
    if (isArray(children)) {
      children.forEach((child) => check(child));
    } else {
      check(children);
    }
    function check(item) {
      var _a;
      if (((_a = item == null ? void 0 : item.type) == null ? void 0 : _a.name) === "ElTableColumn") {
        item.vParent = instance;
      }
    }
  };
  const setColumnRenders = (column) => {
    if (props.renderHeader) ; else if (column.type !== "selection") {
      column.renderHeader = (scope) => {
        instance.columnConfig.value["label"];
        const fallbackContent = [
          h("span", {
            class: ["cell-span"]
          }, [column.label])
        ];
        return renderSlot(slots, "header", scope, () => fallbackContent);
      };
    }
    if (slots["filter-icon"]) {
      column.renderFilterIcon = (scope) => {
        return renderSlot(slots, "filter-icon", scope);
      };
    }
    if (slots.expand) {
      column.renderExpand = (scope) => {
        return renderSlot(slots, "expand", scope);
      };
    }
    const editSlot = slots["edit-cell"];
    if (editSlot) {
      column.renderEditCell = (scope) => {
        return editSlot(scope);
      };
    }
    let originRenderCell = column.renderCell;
    if (column.type === "expand") {
      column.renderCell = (data) => h("div", {
        class: "cell"
      }, [originRenderCell(data)]);
      owner.value.renderExpanded = (row) => {
        return slots.default ? slots.default(row) : slots.default;
      };
    } else {
      originRenderCell = originRenderCell || defaultRenderCell;
      column.renderCell = (data) => {
        var _a, _b;
        let children = null;
        const { columns } = owner.value.store.states;
        const columnCount = columns.value.length;
        const shouldRenderAddButton = owner.value.props.ghostTable && owner.value.props.editTable && !!((_a = data.row) == null ? void 0 : _a[ghostRowSign]) && (columnCount === 1 ? data.cellIndex === 0 : data.cellIndex === columnCount - 1);
        const shouldRenderEditCell = owner.value.props.ghostTable && owner.value.props.editTable && !!column.renderEditCell;
        if (shouldRenderAddButton) {
          children = [
            h(GhostRowAddButton, {
              row: data.row
            })
          ];
        } else if (shouldRenderEditCell) {
          const vnodes = applyRequiredInputState(column.renderEditCell(data), column, data.row);
          const editVNodes = isArray(vnodes) ? vnodes : [vnodes];
          children = editVNodes.some((v) => v.type !== Comment) ? vnodes : originRenderCell(data);
        } else if (slots.default) {
          const vnodes = slots.default(data);
          const defaultVNodes = isArray(vnodes) ? vnodes : [vnodes];
          children = defaultVNodes.some((v) => v.type !== Comment) ? vnodes : originRenderCell(data);
        } else {
          children = originRenderCell(data);
        }
        const firstUserColumnIndex = columns.value.findIndex((item) => item.type === "default");
        const shouldCreatePlaceholder = hasTreeColumn.value && !((_b = data.row) == null ? void 0 : _b[ghostRowSign]) && data.cellIndex === firstUserColumnIndex;
        const prefix = treeCellPrefix(data, shouldCreatePlaceholder);
        const props2 = {
          class: "cell",
          style: {},
          rowIndex: data.$index,
          cellIndex: data.cellIndex
        };
        if (column.showOverflowTooltip) {
          props2.class = `${props2.class} ${unref(ns.namespace)}-tooltip`;
          props2.style = {
            width: `${(data.column.realWidth || Number(data.column.width)) - 1}px`
          };
        }
        if (owner.value.props.ghostTable) {
          props2.class = `${props2.class} is-full-width`;
        }
        checkSubColumn(children);
        return h("div", props2, [prefix, children]);
      };
    }
    return column;
  };
  const getPropsData = (...propsKey) => {
    return propsKey.reduce((prev, cur) => {
      if (isArray(cur)) {
        cur.forEach((key) => {
          prev[key] = props[key];
        });
      }
      return prev;
    }, {});
  };
  const getColumnElIndex = (children, child) => {
    return Array.prototype.indexOf.call(children, child);
  };
  const updateColumnOrder = () => {
    owner.value.store.commit("updateColumnOrder", instance.columnConfig.value);
  };
  return {
    columnId,
    realAlign,
    isSubColumn,
    realHeaderAlign,
    columnOrTableParent,
    setColumnWidth,
    setColumnForcedProps,
    setColumnRenders,
    getPropsData,
    getColumnElIndex,
    updateColumnOrder
  };
}

export { useRender as default };
//# sourceMappingURL=render-helper.mjs.map
