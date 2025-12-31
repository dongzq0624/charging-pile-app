"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  _easycom_jcode_navbar2();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
if (!Math) {
  _easycom_jcode_navbar();
}
const _sfc_main = {
  __name: "success",
  setup(__props) {
    const navbarTitle = common_vendor.ref("");
    const message = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      navbarTitle.value = option.navbarTitle;
      message.value = option.message;
    });
    const back = () => {
      common_vendor.index.navigateBack({
        delta: 2
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: navbarTitle.value
        }),
        b: common_assets._imports_0$7,
        c: common_vendor.t(navbarTitle.value),
        d: common_vendor.t(message.value),
        e: common_vendor.o(back)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c4213421"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wallet/success/success.js.map
