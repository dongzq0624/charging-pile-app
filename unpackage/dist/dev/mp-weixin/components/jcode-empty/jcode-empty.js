"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "Empty",
  props: {
    // image: {
    // 	type: [String, Object],
    // 	default: () => require('@/static/images/empty/empty') 
    // },
    emptyText: {
      type: String,
      default: "数据为空"
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$14,
    b: common_vendor.t($props.emptyText)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fa30b7fb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-empty/jcode-empty.js.map
