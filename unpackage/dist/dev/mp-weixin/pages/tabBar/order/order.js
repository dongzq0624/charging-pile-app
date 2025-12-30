"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_jcode_navListScroll2 = common_vendor.resolveComponent("jcode-navListScroll");
  const _easycom_jcode_tabBar2 = common_vendor.resolveComponent("jcode-tabBar");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2 + _easycom_jcode_navListScroll2 + _easycom_jcode_tabBar2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_jcode_navListScroll = () => "../../../components/jcode-navListScroll/jcode-navListScroll.js";
const _easycom_jcode_tabBar = () => "../../../components/jcode-tabBar/jcode-tabBar.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons + _easycom_jcode_navListScroll + _easycom_jcode_tabBar)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "order",
  setup(__props) {
    const getDataUrl = common_vendor.ref("");
    const navTextList = common_vendor.ref(["全部", "充电中", "已完成"]);
    const navPostDataList = common_vendor.ref([
      { memberId: common_vendor.index.getStorageSync("member_id") },
      {
        memberId: common_vendor.index.getStorageSync("member_id"),
        orderStatus: 3
      },
      {
        memberId: common_vendor.index.getStorageSync("member_id"),
        orderStatus: 5
      }
    ]);
    const tabStartIndex = common_vendor.ref(0);
    const list = common_vendor.ref([
      {
        beginTime: "2025-06-26 18:11:30",
        createTime: "2025-06-26 18:11:29",
        endReasons: "用户小程序主动关停",
        endTime: "2025-06-26 18:11:38",
        gunSortNo: "01",
        id: "148345705702883329",
        orderAmt: 5.12,
        orderNo: "OR2506260007",
        orderStatus: "充电中",
        stationName: "曙光大厦内部测试充电站",
        strategyType: "1",
        strategyValue: null,
        timeSpend: "<1分钟"
      },
      {
        beginTime: "2025-06-26 18:11:30",
        createTime: "2025-06-26 18:11:29",
        endReasons: "用户小程序主动关停",
        endTime: "2025-06-26 18:11:38",
        gunSortNo: "01",
        id: "148345705702883329",
        orderAmt: 5.22,
        orderNo: "OR2506260007",
        orderStatus: "启动失败",
        stationName: "曙光大厦内部测试充电站",
        strategyType: "2",
        strategyValue: 5,
        timeSpend: "<1分钟"
      },
      {
        beginTime: "2025-06-26 18:11:30",
        createTime: "2025-06-26 18:11:29",
        endReasons: "用户小程序主动关停",
        endTime: "2025-06-26 18:11:38",
        gunSortNo: "01",
        id: "148345705702883329",
        orderAmt: 5.32,
        orderNo: "OR2506260007",
        orderStatus: "充电结束",
        stationName: "曙光大厦内部测试充电站",
        strategyType: "1",
        strategyValue: null,
        timeSpend: "<1分钟"
      }
    ]);
    const queryInfo = common_vendor.ref({
      pageNum: 1,
      pageSize: 5
    });
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const scrollHeight = common_vendor.ref("");
    common_vendor.onShow(async () => {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      scrollHeight.value = sysInfo.windowHeight - sysInfo.safeAreaInsets.top - 55 - 40 - 20 + "px";
      common_vendor.index.__f__("log", "at pages/tabBar/order/order.vue:153", "scrollHeight", scrollHeight.value);
    });
    const backData = (e) => {
      common_vendor.index.__f__("log", "at pages/tabBar/order/order.vue:158", "backData", e);
      list.value = e;
    };
    const getStyle = (orderStatus) => {
      if (orderStatus == "充电结束")
        return "background-color: #12A1FE;";
      else if (orderStatus == "充电中")
        return "background-color:#1ab394;";
      else if (orderStatus == "启动失败")
        return "background-color:#F76548;";
      else
        return "background-color:gray;";
    };
    function toOrder(item) {
      if (item.orderStatus == "充电中") {
        proxy.navTo(`/sub_charging/charge/charging/charging?id=${item.id}`);
      } else {
        proxy.navTo(`/sub_charging/order/orderDetails?order=${JSON.stringify(item)}`);
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "订单"
        }),
        b: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.stationName),
            b: common_vendor.t(item.orderStatus),
            c: common_vendor.s(getStyle(item.orderStatus)),
            d: common_vendor.t(item.orderNo),
            e: "1387b3e1-2-" + i0 + ",1387b3e1-1",
            f: common_vendor.o(($event) => _ctx.copyText(item.orderNo)),
            g: item.beginTime
          }, item.beginTime ? {
            h: common_vendor.t(item.beginTime)
          } : {}, {
            i: item.stopTime
          }, item.stopTime ? {
            j: common_vendor.t(item.endTime)
          } : {}, {
            k: item.timeSpend
          }, item.timeSpend ? {
            l: common_vendor.t(item.timeSpend)
          } : {}, {
            m: item.orderAmt
          }, item.orderAmt ? {
            n: common_vendor.t(_ctx.numFilter(item.orderAmt, 2))
          } : {}, {
            o: common_vendor.o(($event) => toOrder(item))
          });
        }),
        c: common_assets._imports_0$3,
        d: common_vendor.t(""),
        e: common_vendor.p({
          fontFamily: "iconfont",
          size: "18",
          color: "gray"
        }),
        f: common_vendor.o(backData),
        g: common_vendor.p({
          tabStartIndex: tabStartIndex.value,
          navTextList: navTextList.value,
          queryInfo: queryInfo.value,
          navPostDataList: navPostDataList.value,
          getDataUrl: getDataUrl.value,
          scrollHeight: scrollHeight.value
        }),
        h: common_vendor.p({
          currentPage: "3"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1387b3e1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/order/order.js.map
