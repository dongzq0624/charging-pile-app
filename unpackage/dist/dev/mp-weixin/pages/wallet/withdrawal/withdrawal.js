"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_jcode_dialog2 = common_vendor.resolveComponent("jcode-dialog");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2 + _easycom_jcode_dialog2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_jcode_dialog = () => "../../../components/jcode-dialog/jcode-dialog.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons + _easycom_jcode_dialog)();
}
const _sfc_main = {
  __name: "withdrawal",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const dialogRef = common_vendor.ref();
    const money = common_vendor.ref(null);
    const maxlength = common_vendor.ref(10);
    const placeholder = common_vendor.ref("请输入退款金额");
    const message = common_vendor.ref("");
    common_vendor.onShow(() => {
      proxy.refreshWallet();
    });
    const blur = () => {
      if (money.value != null && money.value != "") {
        money.value = parseFloat(money.value);
      } else {
        placeholder.value = "请输入退款金额";
      }
    };
    const checkNum = (e) => {
      common_vendor.index.__f__("log", "at pages/wallet/withdrawal/withdrawal.vue:88", "this.money", money.value);
      let value = e.detail.value;
      let dot = value.indexOf(".");
      let reg = /^[0-9]+$/;
      if (dot > -1) {
        maxlength.value = dot + 3;
        if (value.length > dot + 3)
          ;
      }
      if (reg.test(value)) {
        maxlength.value = 6;
      }
    };
    const submit = async () => {
      if (money.value <= 0) {
        proxy.msg("请填写正确金额");
        return;
      }
      message.value = "您确认退款 " + money.value + " 元吗？";
      dialogRef.value.open();
    };
    const buttonBack = async (e) => {
      dialogRef.value.close();
      if (e == "right") {
        proxy.showLoading();
        setTimeout(() => {
          proxy.hideLoading();
          proxy.navTo(`/pages/wallet/success/success?navbarTitle=退款成功&message=申请退款将在2-3分钟内原路退回`);
        }, 1e3);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "余额退款"
        }),
        b: common_assets._imports_0$4,
        c: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.amount, 2)),
        d: common_vendor.p({
          type: "help",
          color: "white",
          size: "20"
        }),
        e: common_vendor.o(($event) => placeholder.value = ""),
        f: common_vendor.o([($event) => money.value = $event.detail.value, checkNum]),
        g: maxlength.value,
        h: common_vendor.o(blur),
        i: placeholder.value,
        j: money.value,
        k: common_vendor.o(($event) => money.value = _ctx.numFilter(_ctx.memberWallet.amount, 2)),
        l: common_vendor.o(submit),
        m: common_vendor.o(($event) => _ctx.navTo("/pages/wallet/walletRecord/walletRecord?tabStartIndex=2")),
        n: common_vendor.sr(dialogRef, "51bb6a0a-2", {
          "k": "dialogRef"
        }),
        o: common_vendor.o(buttonBack),
        p: common_vendor.p({
          type: "dialog",
          message: message.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51bb6a0a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wallet/withdrawal/withdrawal.js.map
