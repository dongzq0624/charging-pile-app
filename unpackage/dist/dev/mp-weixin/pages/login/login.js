"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_dialog2 = common_vendor.resolveComponent("jcode-dialog");
  (_easycom_jcode_navbar2 + _easycom_jcode_dialog2)();
}
const _easycom_jcode_navbar = () => "../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_dialog = () => "../../components/jcode-dialog/jcode-dialog.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_dialog)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const agreeDialogRef = common_vendor.ref();
    const toPageUrl = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      if (options.toPageUrl) {
        toPageUrl.value = decodeURIComponent(options.toPageUrl);
      }
    });
    common_vendor.onMounted(() => {
      agreeDialogRef.value.open();
    });
    const toAgreementPage = (e) => {
      proxy.showLoading();
      setTimeout(() => {
        proxy.hideLoading();
        proxy.navTo(`/pages/richTextView/richTextView?title=${e}`);
      }, 1e3);
    };
    const toLogin = async () => {
      proxy.showLoading("登录中...");
      setTimeout(() => {
        proxy.hideLoading();
        loginSuccess();
      }, 1e3);
    };
    const loginSuccess = () => {
      common_vendor.index.setStorageSync("member_id", "123456");
      common_vendor.index.setStorageSync("member_mobile", "123****8910");
      common_vendor.index.setStorageSync("member_nickName", "微信用户");
      if (toPageUrl.value)
        proxy.redTo(toPageUrl.value);
      else
        proxy.back();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "登录",
          backgroundColor: "transparent"
        }),
        b: common_assets._imports_1$1,
        c: common_vendor.o(($event) => _ctx.noMultipleClicks(toLogin)),
        d: common_vendor.o(($event) => toAgreementPage("用户协议")),
        e: common_vendor.o(($event) => toAgreementPage("隐私协议")),
        f: common_vendor.o(($event) => agreeDialogRef.value.close()),
        g: common_vendor.o(($event) => _ctx.back()),
        h: common_vendor.sr(agreeDialogRef, "e4e4508d-1", {
          "k": "agreeDialogRef"
        }),
        i: common_vendor.p({
          type: "buttonSlot",
          theme: "用户隐私政策概要"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
