'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

var HeaderType = /* @__PURE__ */ ((HeaderType2) => {
  HeaderType2["Error"] = "error";
  HeaderType2["Warning"] = "warning";
  return HeaderType2;
})(HeaderType || {});
const dialogContentProps = runtime.buildProps({
  center: Boolean,
  alignCenter: {
    type: Boolean,
    default: void 0
  },
  closeIcon: {
    type: icon.iconPropType
  },
  draggable: {
    type: Boolean,
    default: void 0
  },
  overflow: {
    type: Boolean,
    default: void 0
  },
  fullscreen: Boolean,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  showClose: {
    type: Boolean,
    default: true
  },
  headerBackgroundColor: {
    type: String,
    default: ""
  },
  headerType: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const dialogContentEmits = {
  close: () => true
};

exports.HeaderType = HeaderType;
exports.dialogContentEmits = dialogContentEmits;
exports.dialogContentProps = dialogContentProps;
//# sourceMappingURL=dialog-content.js.map
