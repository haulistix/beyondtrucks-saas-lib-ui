'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SortOrder = /* @__PURE__ */ ((SortOrder2) => {
  SortOrder2["DEFAULT"] = "";
  SortOrder2["ASC"] = "asc";
  SortOrder2["DESC"] = "desc";
  return SortOrder2;
})(SortOrder || {});
var Alignment = /* @__PURE__ */ ((Alignment2) => {
  Alignment2["LEFT"] = "left";
  Alignment2["CENTER"] = "center";
  Alignment2["RIGHT"] = "right";
  return Alignment2;
})(Alignment || {});
var FixedDir = /* @__PURE__ */ ((FixedDir2) => {
  FixedDir2["LEFT"] = "left";
  FixedDir2["RIGHT"] = "right";
  return FixedDir2;
})(FixedDir || {});
const nextSortOrderMap = {
  ["" /* DEFAULT */]: "asc" /* ASC */,
  ["asc" /* ASC */]: "desc" /* DESC */,
  ["desc" /* DESC */]: "" /* DEFAULT */
};
const sortOrders = [
  "" /* DEFAULT */,
  "asc" /* ASC */,
  "desc" /* DESC */
];

exports.Alignment = Alignment;
exports.FixedDir = FixedDir;
exports.SortOrder = SortOrder;
exports.nextSortOrderMap = nextSortOrderMap;
exports.sortOrders = sortOrders;
//# sourceMappingURL=constants.js.map
