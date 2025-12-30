"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_losePage2 = common_vendor.resolveComponent("jcode-losePage");
  (_easycom_jcode_navbar2 + _easycom_jcode_losePage2)();
}
const _easycom_jcode_navbar = () => "../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_losePage = () => "../../components/jcode-losePage/jcode-losePage.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_losePage)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "richTextView",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const navbarTitle = common_vendor.ref("");
    const nodes = common_vendor.ref("");
    const showLose = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
    });
    common_vendor.onShow(() => {
      getNavigation();
    });
    const getNavigation = () => {
      proxy.showLoading();
      setTimeout(() => {
        proxy.hideLoading();
        showLose.value = false;
        nodes.value = "内容";
        navbarTitle.value = "标题";
      }, 1e3);
    };
    const buttonBack = () => {
      getNavigation();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "left",
          title: navbarTitle.value
        }),
        b: nodes.value,
        c: showLose.value
      }, showLose.value ? {
        d: common_vendor.o(buttonBack)
      } : {});
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/richTextView/richTextView.js.map
