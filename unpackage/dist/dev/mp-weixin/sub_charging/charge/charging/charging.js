"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_dialog2 = common_vendor.resolveComponent("jcode-dialog");
  (_easycom_jcode_navbar2 + _easycom_jcode_dialog2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_dialog = () => "../../../components/jcode-dialog/jcode-dialog.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_dialog)();
}
const _sfc_main = {
  __name: "charging",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const navBarHeight = common_vendor.ref(common_vendor.index.getSystemInfoSync().statusBarHeight + 60);
    common_vendor.ref(false);
    const timeStep = common_vendor.ref(2);
    const dialogRef = common_vendor.ref();
    const orderId = common_vendor.ref("");
    const orderInfo = common_vendor.ref({});
    const intervalId = common_vendor.ref();
    common_vendor.onLoad((option) => {
      proxy.showLoading();
      common_vendor.index.__f__("log", "at sub_charging/charge/charging/charging.vue:129", "option.id", option.id);
      orderId.value = option.id;
      getInfo();
    });
    const topImageUrl = common_vendor.ref("");
    common_vendor.ref([]);
    const getInfo = async () => {
      setTimeout(() => {
        common_vendor.index.hideLoading();
        topImageUrl.value = "/static/images/charge/charging1.svg";
        orderInfo.value = {
          degree: 1.22,
          timeSpend: "20分钟",
          orderAmt: 2.51,
          power: 220,
          current: 5,
          voltage: 44,
          temperature: 50
        };
      }, 1e3);
    };
    const stopCharge = () => {
      dialogRef.value.open();
    };
    const buttonBack = (e) => {
      dialogRef.value.close();
      if (e == "right") {
        proxy.showLoading("订单结束中...");
        setTimeout(() => {
          proxy.redTo(`/sub_charging/order/orderDetails?id=${orderId.value}`);
        }, 1e3);
      }
    };
    common_vendor.onMounted(() => {
      reSetIntervalId();
    });
    common_vendor.onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });
    const reSetIntervalId = () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
      intervalId.value = setInterval(() => {
        getInfo();
      }, timeStep.value * 1e3);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "充电中...",
          backgroundColor: "transparent",
          ["background-image"]: ""
        }),
        b: topImageUrl.value,
        c: -navBarHeight.value + "px",
        d: common_vendor.t(orderInfo.value.degree),
        e: common_assets._imports_0$9,
        f: common_vendor.t(orderInfo.value.timeSpend),
        g: common_assets._imports_1$3,
        h: common_vendor.t(orderInfo.value.orderAmt),
        i: common_assets._imports_2$3,
        j: common_vendor.t(orderInfo.value.power),
        k: common_vendor.t(orderInfo.value.current),
        l: common_vendor.t(orderInfo.value.voltage),
        m: common_vendor.t(orderInfo.value.temperature),
        n: common_vendor.t(orderInfo.value.orderAmt),
        o: common_vendor.o(($event) => _ctx.noMultipleClicks(stopCharge)),
        p: common_vendor.sr(dialogRef, "953e4ffc-1", {
          "k": "dialogRef"
        }),
        q: common_vendor.o(buttonBack),
        r: common_vendor.p({
          message: "确定停止当前充电订单吗？"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-953e4ffc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/sub_charging/charge/charging/charging.js.map
