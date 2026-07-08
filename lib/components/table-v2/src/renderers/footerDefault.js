'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const FooterDefault = (props) => {
  return vue.createVNode("div", {
    "class": ["footer-default", props.class],
    "style": props.style
  }, [vue.createVNode("div", {
    "class": "count"
  }, [props.total, vue.createTextVNode(" items")]), props.updateTime && vue.createVNode("div", {
    "class": "time"
  }, [vue.createTextVNode("Last Updated "), props.updateTime])]);
};
FooterDefault.displayName = "ElTableV2FooterDefault";
var FooterDefault$1 = FooterDefault;

exports["default"] = FooterDefault$1;
//# sourceMappingURL=footerDefault.js.map
