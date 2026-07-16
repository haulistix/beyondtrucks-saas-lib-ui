import { cloneVNode } from 'vue';
import { ghostRowSign, ghostRowTouchedSign, ghostRowFieldKey, ghostRowKey } from './private.mjs';
import { isArray } from '@vue/shared';

const isEmptyRequiredValue = (value) => value === "" || value === null || value === void 0;
const isGhostTableRow = (row) => Boolean(row == null ? void 0 : row[ghostRowSign]);
const isGhostRowTouched = (row) => Boolean(row == null ? void 0 : row[ghostRowTouchedSign]);
const getGhostRowPayload = (row) => {
  const rowField = row == null ? void 0 : row[ghostRowFieldKey];
  const internalKeys = /* @__PURE__ */ new Set([
    ghostRowSign,
    ghostRowKey,
    ghostRowFieldKey,
    ghostRowTouchedSign,
    rowField
  ]);
  return Reflect.ownKeys(row).reduce((payload, key) => {
    if (!internalKeys.has(key) && Object.prototype.propertyIsEnumerable.call(row, key)) {
      payload[key] = row[key];
    }
    return payload;
  }, {});
};
const hasGhostRowValue = (row) => {
  const rowField = row == null ? void 0 : row[ghostRowFieldKey];
  return Object.entries(row != null ? row : {}).some(([key, value]) => {
    if (key === ghostRowSign || key === ghostRowKey || key === ghostRowFieldKey || key === ghostRowTouchedSign || key === rowField) {
      return false;
    }
    return !isEmptyRequiredValue(value);
  });
};
const getVNodeComponentName = (vnode) => {
  var _a;
  const type = vnode.type;
  return (_a = type == null ? void 0 : type.name) != null ? _a : type == null ? void 0 : type.__name;
};
const isElInputVNode = (vnode) => {
  return getVNodeComponentName(vnode) === "ElInput";
};
const isElSelectVNode = (vnode) => {
  const name = getVNodeComponentName(vnode);
  return name === "ElSelect" || name === "ElSelectV2";
};
const applyRequiredInputState = (vnodes, column, row) => {
  if (!column.required || column.dataKey == null)
    return vnodes;
  if (isGhostTableRow(row) && !isGhostRowTouched(row))
    return vnodes;
  if (!isEmptyRequiredValue(row == null ? void 0 : row[column.dataKey]))
    return vnodes;
  const patchVNode = (vnode) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const vnodeProps = (_a = vnode.props) != null ? _a : {};
    if (isElInputVNode(vnode)) {
      return cloneVNode(vnode, {
        inputType: (_c = (_b = vnodeProps.inputType) != null ? _b : vnodeProps["input-type"]) != null ? _c : "error",
        infoTip: (_e = (_d = vnodeProps.infoTip) != null ? _d : vnodeProps["info-tip"]) != null ? _e : "Required"
      });
    }
    if (isElSelectVNode(vnode)) {
      return cloneVNode(vnode, {
        inputType: (_g = (_f = vnodeProps.inputType) != null ? _f : vnodeProps["input-type"]) != null ? _g : "error"
      });
    }
    return vnode;
  };
  return isArray(vnodes) ? vnodes.map((vnode) => patchVNode(vnode)) : patchVNode(vnodes);
};

export { applyRequiredInputState, getGhostRowPayload, hasGhostRowValue, isEmptyRequiredValue, isGhostRowTouched, isGhostTableRow };
//# sourceMappingURL=ghost-table.mjs.map
