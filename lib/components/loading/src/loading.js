'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var useGlobalConfig = require('../../config-provider/src/hooks/use-global-config.js');
var style = require('../../../utils/dom/style.js');

function createLoadingComponent(options, appContext) {
  let afterLeaveTimer;
  const afterLeaveFlag = vue.ref(false);
  const data = vue.reactive({
    ...options,
    originalPosition: "",
    originalOverflow: "",
    visible: false
  });
  function setText(text) {
    data.text = text;
  }
  function destroySelf() {
    const target = data.parent;
    const ns = vm.ns;
    if (!target.vLoadingAddClassList) {
      let loadingNumber = target.getAttribute("loading-number");
      loadingNumber = Number.parseInt(loadingNumber) - 1;
      if (!loadingNumber) {
        style.removeClass(target, ns.bm("parent", "relative"));
        target.removeAttribute("loading-number");
      } else {
        target.setAttribute("loading-number", loadingNumber.toString());
      }
      style.removeClass(target, ns.bm("parent", "hidden"));
    }
    removeElLoadingChild();
    loadingInstance.unmount();
  }
  function removeElLoadingChild() {
    var _a, _b;
    (_b = (_a = vm.$el) == null ? void 0 : _a.parentNode) == null ? void 0 : _b.removeChild(vm.$el);
  }
  function close() {
    var _a;
    if (options.beforeClose && !options.beforeClose())
      return;
    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);
    afterLeaveTimer = setTimeout(handleAfterLeave, 400);
    data.visible = false;
    (_a = options.closed) == null ? void 0 : _a.call(options);
  }
  function handleAfterLeave() {
    if (!afterLeaveFlag.value)
      return;
    const target = data.parent;
    afterLeaveFlag.value = false;
    target.vLoadingAddClassList = void 0;
    destroySelf();
  }
  const elLoadingComponent = vue.defineComponent({
    name: "ElLoading",
    setup(_, { expose }) {
      const { ns, zIndex } = useGlobalConfig.useGlobalComponentSettings("loading");
      expose({
        ns,
        zIndex
      });
      return () => {
        const svg = data.svg || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n  <path d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12L2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2L12 5Z" fill="#7A909E" fill-opacity="0.38"/>\n</svg>';
        const spinner = vue.h("svg", {
          class: "circular",
          viewBox: data.svgViewBox ? data.svgViewBox : "0 0 24 24",
          ...svg ? { innerHTML: svg } : {}
        }, [
          vue.h("circle", {
            class: "path",
            cx: "25",
            cy: "25",
            r: "20",
            fill: "none"
          })
        ]);
        const spinnerText = data.text ? vue.h("p", { class: ns.b("text") }, [data.text]) : void 0;
        return vue.h(vue.Transition, {
          name: ns.b("fade"),
          onAfterLeave: handleAfterLeave
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("div", {
              style: {
                backgroundColor: data.background || ""
              },
              class: [
                ns.b("mask"),
                data.customClass,
                ns.is("fullscreen", data.fullscreen)
              ]
            }, [
              vue.h("div", {
                class: ns.b("spinner")
              }, [spinner, spinnerText])
            ]), [[vue.vShow, data.visible]])
          ])
        });
      };
    }
  });
  const loadingInstance = vue.createApp(elLoadingComponent);
  Object.assign(loadingInstance._context, appContext != null ? appContext : {});
  const vm = loadingInstance.mount(document.createElement("div"));
  return {
    ...vue.toRefs(data),
    setText,
    removeElLoadingChild,
    close,
    handleAfterLeave,
    vm,
    get $el() {
      return vm.$el;
    }
  };
}

exports.createLoadingComponent = createLoadingComponent;
//# sourceMappingURL=loading.js.map
