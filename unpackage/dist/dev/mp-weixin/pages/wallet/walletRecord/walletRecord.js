"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_scroll2 = common_vendor.resolveComponent("jcode-scroll");
  (_easycom_jcode_navbar2 + _easycom_jcode_scroll2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_scroll = () => "../../../components/jcode-scroll/jcode-scroll.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_scroll)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "walletRecord",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const scrollHeight = common_vendor.ref("");
    const navTextList = common_vendor.ref(["扣减记录", "充值记录", "退款记录"]);
    const queryInfo = common_vendor.ref({
      pageNum: 1,
      pageSize: 10
    });
    const tabStartIndex = common_vendor.ref(0);
    const tabCurrentIndex = common_vendor.ref(0);
    common_vendor.ref({});
    const list = common_vendor.ref([]);
    const jcodeScrollRef = common_vendor.ref();
    common_vendor.onLoad((option) => {
      if (option.tabStartIndex)
        tabStartIndex.value = option.tabStartIndex;
    });
    common_vendor.onShow(async () => {
      scrollHeight.value = await proxy.calculateHeight(".scroll") + "px";
      common_vendor.index.__f__("log", "at pages/wallet/walletRecord/walletRecord.vue:118", "scrollHeight", scrollHeight);
    });
    const getData = (e) => {
      tabCurrentIndex.value = e.tabCurrentIndex;
      common_vendor.index.__f__("log", "at pages/wallet/walletRecord/walletRecord.vue:124", "e", e);
      switch (e.tabCurrentIndex) {
        case 0:
          var data = {
            code: 0,
            msg: "",
            rows: [
              {
                amount: 1,
                operateTime: "2025-07-04 16:46:18",
                orderNo: "C250704660000166",
                remark: "测试"
              },
              {
                amount: 2,
                operateTime: "2025-07-05 16:46:18",
                orderNo: "C250704660000167",
                remark: "测试2"
              }
            ],
            total: "2"
          };
          jcodeScrollRef.value.backData(data);
          break;
        case 1:
          var data = {
            code: 0,
            msg: "",
            rows: [
              {
                amount: 3,
                operateTime: "2025-07-04 16:46:18",
                orderNo: "C250704660000166",
                remark: "测试"
              },
              {
                amount: 4,
                operateTime: "2025-07-05 16:46:18",
                orderNo: "C250704660000167",
                remark: "测试2"
              }
            ],
            total: "2"
          };
          jcodeScrollRef.value.backData(data);
          break;
        case 2:
          var data = {
            code: 0,
            msg: "",
            rows: [
              {
                amount: 3,
                operateTime: "2025-07-04 16:46:18",
                orderNo: "C250704660000166",
                refundStatus: "处理中",
                remark: "测试"
              },
              {
                amount: 4,
                operateTime: "2025-07-05 16:46:18",
                orderNo: "C250704660000167",
                refundStatus: "退款成功",
                remark: "测试2"
              },
              {
                amount: 10,
                operateTime: "2025-07-05 16:46:18",
                orderNo: "C250704660000167",
                refundStatus: "退款失败",
                remark: "测试2"
              }
            ],
            total: "3"
          };
          jcodeScrollRef.value.backData(data);
          break;
      }
    };
    const backData = (e) => {
      common_vendor.index.__f__("log", "at pages/wallet/walletRecord/walletRecord.vue:205", "e", e);
      tabCurrentIndex.value = e.tabCurrentIndex;
      list.value = e.list;
      common_vendor.index.__f__("log", "at pages/wallet/walletRecord/walletRecord.vue:208", "this.list ", list.value);
    };
    common_vendor.onLoad(async (option) => {
      if (option.tabStartIndex) {
        tabStartIndex.value = option.tabStartIndex;
      }
    });
    const toDetail = (item) => {
      proxy.navTo(`/pages/wallet/recordDetail/recordDetail?tabCurrentIndex=${tabCurrentIndex.value}&currentOrder=${JSON.stringify(item)}`);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "钱包明细"
        }),
        b: common_vendor.f(list.value, (item, index, i0) => {
          return tabCurrentIndex.value == 0 ? {
            a: common_assets._imports_0$5,
            b: common_vendor.t(_ctx.numFilter(item.amount, 2)),
            c: common_vendor.t(item.orderNo),
            d: common_vendor.t(item.operateTime),
            e: common_vendor.o(($event) => toDetail(item))
          } : tabCurrentIndex.value == 1 ? {
            f: common_assets._imports_0$6,
            g: common_vendor.t(_ctx.numFilter(item.amount, 2)),
            h: common_vendor.t(item.orderNo),
            i: common_vendor.t(item.operateTime),
            j: common_vendor.o(($event) => toDetail(item))
          } : tabCurrentIndex.value == 2 ? common_vendor.e({
            k: common_assets._imports_1$2,
            l: item.refundStatus == "处理中"
          }, item.refundStatus == "处理中" ? {
            m: common_vendor.t(item.refundStatus)
          } : item.refundStatus == "退款成功" ? {
            o: common_vendor.t(item.refundStatus)
          } : {
            p: common_vendor.t(item.refundStatus)
          }, {
            n: item.refundStatus == "退款成功",
            q: common_vendor.t(_ctx.numFilter(item.amount, 2)),
            r: common_vendor.t(item.orderNo),
            s: common_vendor.t(item.operateTime),
            t: common_vendor.o(($event) => toDetail(item))
          }) : {};
        }),
        c: tabCurrentIndex.value == 0,
        d: tabCurrentIndex.value == 1,
        e: tabCurrentIndex.value == 2,
        f: common_vendor.sr(jcodeScrollRef, "1eae9fac-1", {
          "k": "jcodeScrollRef"
        }),
        g: common_vendor.o(getData),
        h: common_vendor.o(backData),
        i: common_vendor.p({
          scrollHeight: scrollHeight.value,
          type: "navList",
          navTextList: navTextList.value,
          tabStartIndex: tabStartIndex.value,
          queryInfo: queryInfo.value,
          emptyText: "暂无记录"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1eae9fac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wallet/walletRecord/walletRecord.js.map
