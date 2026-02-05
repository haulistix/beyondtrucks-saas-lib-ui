const defaultProps = {
  store: {
    required: true,
    type: Object
  },
  stripe: Boolean,
  tooltipEffect: String,
  tooltipOptions: {
    type: Object
  },
  context: {
    default: () => ({}),
    type: Object
  },
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  fixed: {
    type: String,
    default: ""
  },
  highlight: Boolean,
  rowDraggable: {
    type: [Function, Boolean],
    default: false
  },
  onDragend: {
    type: Function,
    default: void 0
  },
  onDragstart: {
    type: Function,
    default: void 0
  }
};

export { defaultProps as default };
//# sourceMappingURL=defaults.mjs.map
