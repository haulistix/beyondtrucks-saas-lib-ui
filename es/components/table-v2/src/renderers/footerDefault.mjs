import { createVNode, createTextVNode } from 'vue';

const FooterDefault = (props) => {
  return createVNode("div", {
    "class": ["footer-default", props.class],
    "style": props.style
  }, [createVNode("div", {
    "class": "count"
  }, [props.total, createTextVNode(" items")]), props.updateTime && createVNode("div", {
    "class": "time"
  }, [createTextVNode("Last Updated "), props.updateTime])]);
};
FooterDefault.displayName = "ElTableV2FooterDefault";
var FooterDefault$1 = FooterDefault;

export { FooterDefault$1 as default };
//# sourceMappingURL=footerDefault.mjs.map
