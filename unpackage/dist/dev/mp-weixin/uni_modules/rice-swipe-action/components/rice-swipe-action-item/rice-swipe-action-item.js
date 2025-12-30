"use strict";
const uni_modules_riceSwipeAction_components_riceSwipeActionItem_mpMixins = require("./mpMixins.js");
const common_vendor = require("../../../../common/vendor.js");
const block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("open", "close", "unresize", "closeSwipe");
};
const block1 = {};
const _sfc_main = {
  //在微信小程序中，app-vue和app-uvue共用这个mixins
  mixins: [uni_modules_riceSwipeAction_components_riceSwipeActionItem_mpMixins.mpMixins]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.hasLeftAction
  }, _ctx.hasLeftAction ? {
    b: common_vendor.f(_ctx.leftMenu, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index,
        c: common_vendor.s(item.style),
        d: common_vendor.o(($event) => _ctx.menuClick(index, "left"), index)
      };
    })
  } : {}, {
    c: common_vendor.o((...args) => _ctx.contentClick && _ctx.contentClick(...args)),
    d: _ctx.hasRightAction
  }, _ctx.hasRightAction ? {
    e: common_vendor.f(_ctx.rightMenu, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index,
        c: common_vendor.s(item.style),
        d: common_vendor.o(($event) => _ctx.menuClick(index, "right"), index)
      };
    })
  } : {}, {
    f: _ctx.disabled,
    g: _ctx.duration,
    h: _ctx.iosStyle,
    i: _ctx.show,
    j: _ctx.resizeDom,
    k: common_vendor.s(_ctx.customStyle)
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
if (typeof block1 === "function")
  block1(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8372e707"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/rice-swipe-action/components/rice-swipe-action-item/rice-swipe-action-item.js.map
