import { createVNode, isVNode } from 'vue';
import { tryCall } from '../utils.mjs';
import HeaderRow from '../components/header-row.mjs';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const HeaderRenderer = ({
  columns,
  columnsStyles,
  headerIndex,
  style,
  headerClass,
  headerProps,
  ns
}, {
  slots
}) => {
  const param = {
    columns,
    headerIndex
  };
  const kls = [ns.e("header-row"), tryCall(headerClass, param, ""), ns.is("customized", Boolean(slots.header))];
  const extraProps = {
    ...tryCall(headerProps, param),
    columnsStyles,
    class: kls,
    columns,
    headerIndex,
    style
  };
  return createVNode(HeaderRow, extraProps, _isSlot(slots) ? slots : {
    default: () => [slots]
  });
};
var HeaderRenderer$1 = HeaderRenderer;

export { HeaderRenderer$1 as default };
//# sourceMappingURL=header.mjs.map
