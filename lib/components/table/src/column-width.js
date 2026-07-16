'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const AUTO_COLUMN_PADDING = 48;
const MIN_AUTO_COLUMN_WIDTH = 80;
const FALLBACK_HEADER_CHAR_WIDTH = 8;
const textWidthCache = /* @__PURE__ */ new Map();
const measureHeaderTextWidth = (text) => {
  if (textWidthCache.has(text))
    return textWidthCache.get(text);
  let width = text.length * FALLBACK_HEADER_CHAR_WIDTH;
  const isJsdom = typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent);
  if (typeof document !== "undefined" && !isJsdom) {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = "400 14px Inter, sans-serif";
        width = Math.ceil(context.measureText(text).width);
      }
    } catch (e) {
    }
  }
  textWidthCache.set(text, width);
  return width;
};
const getAutoColumnWidth = (label) => Math.max(MIN_AUTO_COLUMN_WIDTH, measureHeaderTextWidth(String(label != null ? label : "")) + AUTO_COLUMN_PADDING);

exports.getAutoColumnWidth = getAutoColumnWidth;
//# sourceMappingURL=column-width.js.map
