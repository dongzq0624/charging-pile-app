"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_notice2 = common_vendor.resolveComponent("jcode-notice");
  const _easycom_jcode_dialog2 = common_vendor.resolveComponent("jcode-dialog");
  const _easycom_jcode_tabBar2 = common_vendor.resolveComponent("jcode-tabBar");
  (_easycom_jcode_navbar2 + _easycom_jcode_notice2 + _easycom_jcode_dialog2 + _easycom_jcode_tabBar2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_notice = () => "../../../components/jcode-notice/jcode-notice.js";
const _easycom_jcode_dialog = () => "../../../components/jcode-dialog/jcode-dialog.js";
const _easycom_jcode_tabBar = () => "../../../components/jcode-tabBar/jcode-tabBar.js";
if (!Math) {
  (_easycom_jcode_navbar + MemberInfo + _easycom_jcode_notice + _easycom_jcode_dialog + _easycom_jcode_tabBar)();
}
const MemberInfo = () => "./components/MemberInfo/MemberInfo.js";
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const memberInfoRef = common_vendor.ref();
    common_vendor.ref();
    common_vendor.ref(false);
    common_vendor.onShow(async () => {
      proxy.refreshWallet();
    });
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/tabBar/user/user.vue:93", "user onMounted");
    });
    common_vendor.onUpdated(() => {
      common_vendor.index.__f__("log", "at pages/tabBar/user/user.vue:97", "user onUpdated");
    });
    const dialogRef = common_vendor.ref();
    const dialogMessage = common_vendor.ref("");
    const cardList = common_vendor.ref([
      {
        title: "在线客服",
        image: "/static/images/home/card1.svg",
        page: ""
      },
      {
        title: "用户协议",
        image: "/static/images/user/yhxy.svg",
        page: "/pages/richTextView/richTextView"
      },
      {
        title: "隐私协议",
        image: "/static/images/user/ysxy.svg",
        page: "/pages/richTextView/richTextView"
      },
      {
        title: "关于我们",
        image: "/static/images/user/gywm.svg",
        page: "/pages/richTextView/richTextView"
      }
    ]);
    function quit() {
      dialogMessage.value = "您确认退出当前登录账号吗？";
      dialogRef.value.open();
    }
    function buttonBack(e) {
      if (e == "left")
        dialogRef.value.close();
      else
        proxy.memberQuit();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "",
          title: "我的"
        }),
        b: common_vendor.sr(memberInfoRef, "04a4edb3-1", {
          "k": "memberInfoRef"
        }),
        c: common_assets._imports_0$4,
        d: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.amount || 0, 2)),
        e: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.giftAmount || 0, 2)),
        f: common_vendor.t(_ctx.numFilter(0, 2)),
        g: common_vendor.o(($event) => _ctx.switchTab(`/pages/tabBar/recharge/recharge`)),
        h: common_vendor.o(($event) => _ctx.isLoginToPage(`/pages/wallet/walletRecord/walletRecord`)),
        i: common_vendor.o(($event) => _ctx.isLoginToPage(`/pages/wallet/withdrawal/withdrawal`)),
        j: common_vendor.f(cardList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.title == "在线客服"
          }, item.title == "在线客服" ? {
            b: item.image,
            c: common_vendor.t(item.title)
          } : {
            d: item.image,
            e: common_vendor.t(item.title),
            f: common_vendor.o(($event) => _ctx.navTo(item.page), index)
          }, {
            g: index
          });
        }),
        k: _ctx.getLoginFlag()
      }, _ctx.getLoginFlag() ? {
        l: common_vendor.o(quit)
      } : {}, {
        m: common_vendor.sr(dialogRef, "04a4edb3-3", {
          "k": "dialogRef"
        }),
        n: common_vendor.o(buttonBack),
        o: common_vendor.p({
          type: "dialog",
          message: dialogMessage.value
        }),
        p: common_vendor.p({
          currentPage: "4"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-04a4edb3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/user/user.js.map
