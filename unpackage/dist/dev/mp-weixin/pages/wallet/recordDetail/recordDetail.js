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
  __name: "recordDetail",
  setup(__props) {
    const tabCurrentIndex = common_vendor.ref(0);
    const currentOrder = common_vendor.ref({});
    const sourcePayOrder = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      tabCurrentIndex.value = option.tabCurrentIndex;
      currentOrder.value = JSON.parse(option.currentOrder);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "left",
          title: "订单详情"
        }),
        b: tabCurrentIndex.value == 0
      }, tabCurrentIndex.value == 0 ? common_vendor.e({
        c: common_assets._imports_0$6,
        d: common_vendor.t(currentOrder.value.orderNo),
        e: common_vendor.o(($event) => _ctx.copyText(currentOrder.value.orderNo)),
        f: common_vendor.t(currentOrder.value.operateTime),
        g: currentOrder.value.remark
      }, currentOrder.value.remark ? {
        h: common_vendor.t(currentOrder.value.remark)
      } : {}, {
        i: currentOrder.value.amount
      }, currentOrder.value.amount ? {
        j: common_vendor.t(_ctx.numFilter(currentOrder.value.amount, 2))
      } : {}, {
        k: currentOrder.value.giftAmount
      }, currentOrder.value.giftAmount ? {
        l: common_vendor.t(_ctx.numFilter(currentOrder.value.giftAmount, 2))
      } : {}, {
        m: currentOrder.value.freezeAmount
      }, currentOrder.value.freezeAmount ? {
        n: common_vendor.t(_ctx.numFilter(currentOrder.value.freezeAmount, 2))
      } : {}) : tabCurrentIndex.value == 1 ? common_vendor.e({
        p: currentOrder.value.operateType == 2
      }, currentOrder.value.operateType == 2 ? common_vendor.e({
        q: common_assets._imports_0$6,
        r: common_vendor.t(currentOrder.value.orderNo),
        s: common_vendor.o(($event) => _ctx.copyText(currentOrder.value.orderNo)),
        t: common_vendor.t(currentOrder.value.operateTime),
        v: common_vendor.t(_ctx.numFilter(currentOrder.value.amount, 2)),
        w: common_vendor.t(sourcePayOrder.value.tradeNo),
        x: common_vendor.o(($event) => _ctx.copyText(sourcePayOrder.value.tradeNo)),
        y: currentOrder.value.amount
      }, currentOrder.value.amount ? {
        z: common_vendor.t(_ctx.numFilter(currentOrder.value.amount, 2))
      } : {}, {
        A: currentOrder.value.giftAmount
      }, currentOrder.value.giftAmount ? {
        B: common_vendor.t(_ctx.numFilter(currentOrder.value.giftAmount, 2))
      } : {}, {
        C: currentOrder.value.freezeAmount
      }, currentOrder.value.freezeAmount ? {
        D: common_vendor.t(_ctx.numFilter(currentOrder.value.freezeAmount, 2))
      } : {}) : currentOrder.value.operateType == 4 ? common_vendor.e({
        F: common_assets._imports_0$6,
        G: common_vendor.t(currentOrder.value.orderNo),
        H: common_vendor.o(($event) => _ctx.copyText(currentOrder.value.orderNo)),
        I: common_vendor.t(currentOrder.value.operateTime),
        J: currentOrder.value.remark
      }, currentOrder.value.remark ? {
        K: common_vendor.t(currentOrder.value.remark)
      } : {}, {
        L: currentOrder.value.amount
      }, currentOrder.value.amount ? {
        M: common_vendor.t(_ctx.numFilter(currentOrder.value.amount, 2))
      } : {}, {
        N: currentOrder.value.giftAmount
      }, currentOrder.value.giftAmount ? {
        O: common_vendor.t(_ctx.numFilter(currentOrder.value.giftAmount, 2))
      } : {}, {
        P: currentOrder.value.freezeAmount
      }, currentOrder.value.freezeAmount ? {
        Q: common_vendor.t(_ctx.numFilter(currentOrder.value.freezeAmount, 2))
      } : {}) : {}, {
        E: currentOrder.value.operateType == 4
      }) : tabCurrentIndex.value == 2 ? common_vendor.e({
        S: common_assets._imports_1$2,
        T: common_vendor.t(currentOrder.value.orderNo),
        U: common_vendor.o(($event) => _ctx.copyText(currentOrder.value.orderNo)),
        V: common_vendor.t(currentOrder.value.createTime),
        W: common_vendor.t(_ctx.numFilter(currentOrder.value.refundAmt, 2)),
        X: common_vendor.t(currentOrder.value.refundStatus),
        Y: currentOrder.value.remark
      }, currentOrder.value.remark ? {
        Z: common_vendor.t(currentOrder.value.remark)
      } : {}) : {}, {
        o: tabCurrentIndex.value == 1,
        R: tabCurrentIndex.value == 2,
        aa: common_assets._imports_2$1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f1a8445e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wallet/recordDetail/recordDetail.js.map
