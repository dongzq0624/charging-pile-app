"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "manualInput",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const result = common_vendor.ref("");
    common_vendor.onShow(() => {
    });
    const submit = () => {
      if (!result.value) {
        proxy.msg("请正确输入编号");
      } else {
        proxy.isLoginToPage(`/sub_charging/charge/readyToCharge/readyToCharge?result=${result.value}`);
      }
    };
    const scanCode = () => {
      common_vendor.index.scanCode({
        onlyFromCamera: false,
        scanType: ["qrCode"],
        success: function(res) {
          common_vendor.index.__f__("log", "at pages/scan/manualInput/manualInput.vue:52", "qrCode", res.result);
          proxy.isLoginToPage(`/sub_charging/charge/readyToCharge/readyToCharge?result=${res.result}`);
        },
        fail: function(res) {
          proxy.msg("未扫描到结果");
          common_vendor.index.__f__("log", "at pages/scan/manualInput/manualInput.vue:57", res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "输入编号"
        }),
        b: common_assets._imports_1$1,
        c: result.value,
        d: common_vendor.o(($event) => result.value = $event.detail.value),
        e: common_vendor.o(($event) => scanCode()),
        f: common_vendor.p({
          type: "scan",
          size: "25"
        }),
        g: common_vendor.o(($event) => _ctx.noMultipleClicks(submit))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75562255"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/scan/manualInput/manualInput.js.map
