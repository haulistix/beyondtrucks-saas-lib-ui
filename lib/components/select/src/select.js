'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@popperjs/core');
var iconsVue = require('@element-plus/icons-vue');
var useProps = require('../../select-v2/src/useProps.js');
var scrollbar = require('../../scrollbar/src/scrollbar.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-size/index.js');
var content = require('../../tooltip/src/content.js');
var icon = require('../../../utils/vue/icon.js');
var tag = require('../../tag/src/tag2.js');
var index$1 = require('../../../hooks/use-empty-values/index.js');
var index$2 = require('../../../hooks/use-aria/index.js');
var event = require('../../../constants/event.js');

const selectProps = runtime.buildProps({
  name: String,
  id: String,
  modelValue: {
    type: runtime.definePropType([
      Array,
      String,
      Number,
      Boolean,
      Object
    ]),
    default: void 0
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  automaticDropdown: Boolean,
  size: index.useSizeProp,
  effect: {
    type: runtime.definePropType(String),
    default: "light"
  },
  disabled: Boolean,
  addItem: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: {
    type: String,
    default: ""
  },
  popperStyle: {
    type: runtime.definePropType([String, Object])
  },
  popperOptions: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  remote: Boolean,
  debounce: {
    type: Number,
    default: 300
  },
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: {
    type: runtime.definePropType(Function)
  },
  filterMethod: {
    type: runtime.definePropType(Function)
  },
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String
  },
  defaultFirstOption: Boolean,
  reserveKeyword: {
    type: Boolean,
    default: true
  },
  floatLabel: {
    type: Boolean,
    default: true
  },
  preStar: Boolean,
  addShowTip: String,
  haveAll: {
    type: String
  },
  valueKey: {
    type: String,
    default: "value"
  },
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  teleported: content.useTooltipContentProps.teleported,
  persistent: {
    type: Boolean,
    default: true
  },
  clearIcon: {
    type: icon.iconPropType,
    default: iconsVue.CircleClose
  },
  fitInputWidth: {
    type: Boolean,
    default: true
  },
  suffixIcon: {
    type: icon.iconPropType,
    default: iconsVue.ArrowDown
  },
  labelSuffix: {
    type: String,
    default: ""
  },
  tagType: { ...tag.tagProps.type, default: "info" },
  tagEffect: { ...tag.tagProps.effect, default: "light" },
  validateEvent: {
    type: Boolean,
    default: true
  },
  remoteShowSuffix: Boolean,
  showArrow: Boolean,
  offset: {
    type: Number,
    default: 4
  },
  placement: {
    type: runtime.definePropType(String),
    values: core.placements,
    default: "bottom-start"
  },
  fallbackPlacements: {
    type: runtime.definePropType(Array),
    default: ["bottom-start", "top-start", "right", "left"]
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  appendTo: content.useTooltipContentProps.appendTo,
  options: {
    type: runtime.definePropType(Array)
  },
  props: {
    type: runtime.definePropType(Object),
    default: () => useProps.defaultProps
  },
  ...index$1.useEmptyValuesProps,
  ...index$2.useAriaProps(["ariaLabel"])
});
const selectEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => true,
  [event.CHANGE_EVENT]: (val) => true,
  "popup-scroll": scrollbar.scrollbarEmits.scroll,
  "remove-tag": (val) => true,
  "visible-change": (visible) => true,
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true
};

exports.selectEmits = selectEmits;
exports.selectProps = selectProps;
//# sourceMappingURL=select.js.map
