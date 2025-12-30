"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "jcode-losePage",
  emits: ["buttonBack"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const refresh = () => {
      emit("buttonBack");
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$13,
        b: common_vendor.o(refresh)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ebeea0a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-losePage/jcode-losePage.js.map
