import { createVNode } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import FilterIconUp from './filter-icon-up.mjs';
import FilterIconDown from './filter-icon-down.mjs';
import { SortOrder } from '../constants.mjs';

const SortIcon = (props) => {
  const {
    sortOrder,
    sorting
  } = props;
  return createVNode(ElIcon, {
    "size": 12,
    "class": props.class,
    "color": sorting ? "var(--color-gray-800)" : "var(--color-gray-400)"
  }, {
    default: () => [sortOrder === SortOrder.ASC ? createVNode(FilterIconUp, null, null) : createVNode(FilterIconDown, null, null)]
  });
};
var SortIcon$1 = SortIcon;

export { SortIcon$1 as default };
//# sourceMappingURL=sort-icon.mjs.map
