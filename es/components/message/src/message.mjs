import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';
import { mutable } from '../../../utils/typescript.mjs';
import { isClient } from '@vueuse/core';

const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const MESSAGE_DEFAULT_PLACEMENT = "top";
const messageDefaults = mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  title: "",
  effect: "light",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  center: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : void 0
});
const messageProps = buildProps({
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  center: {
    type: Boolean,
    default: messageDefaults.center
  },
  alert: {
    type: Boolean,
    default: false
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  title: {
    type: String,
    default: messageDefaults.title
  },
  effect: {
    type: definePropType(String),
    default: messageDefaults.effect
  },
  label: {
    type: String,
    default: ""
  },
  onLabelClick: {
    type: Function,
    default: () => null
  },
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = {
  destroy: () => true
};

export { MESSAGE_DEFAULT_PLACEMENT, messageDefaults, messageEmits, messagePlacement, messageProps, messageTypes };
//# sourceMappingURL=message.mjs.map
