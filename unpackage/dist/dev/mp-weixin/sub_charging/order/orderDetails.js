"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2)();
}
const _easycom_jcode_navbar = () => "../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "orderDetails",
  setup(__props) {
    const order = common_vendor.ref({
      stationName: "测试充电站",
      orderNo: "OR11001",
      qrGunNo: "1001",
      orderStatus: "已完成",
      strategyType: "充满为止",
      beginTime: "2025-01-01 18:30:00",
      endTime: "2025-01-01 19:30:00",
      timeSpend: "1小时",
      endReasons: "充电桩主动停止",
      orderAmt: 5.21
    });
    common_vendor.onLoad(async (option) => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "订单详情",
          backgroundImage: "",
          backgroundColor: "transparent"
        }),
        b: common_assets._imports_0$8,
        c: common_assets._imports_1$1,
        d: common_assets._imports_2$2,
        e: common_vendor.t(order.value.stationName),
        f: common_vendor.t(order.value.orderNo),
        g: common_vendor.t(""),
        h: common_vendor.p({
          fontFamily: "iconfont",
          size: "18",
          color: "gray"
        }),
        i: common_vendor.o(($event) => _ctx.copyText(order.value.orderNo)),
        j: common_vendor.t(order.value.qrGunNo),
        k: common_vendor.t(""),
        l: common_vendor.p({
          fontFamily: "iconfont",
          size: "18",
          color: "gray"
        }),
        m: common_vendor.o(($event) => _ctx.copyText(order.value.qrGunNo)),
        n: common_vendor.t(order.value.orderStatus),
        o: common_vendor.t(order.value.strategyType),
        p: common_vendor.t(order.value.beginTime),
        q: common_vendor.t(order.value.stopTime || order.value.endTime),
        r: common_vendor.t(order.value.timeSpend),
        s: common_vendor.t(order.value.endReasons),
        t: common_vendor.t(_ctx.numFilter(order.value.orderAmt, 2)),
        v: common_assets._imports_3
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9723a186"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/sub_charging/order/orderDetails.js.map
