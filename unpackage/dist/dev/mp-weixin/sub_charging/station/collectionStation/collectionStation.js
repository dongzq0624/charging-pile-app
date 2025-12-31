"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_rice_swipe_action_item2 = common_vendor.resolveComponent("rice-swipe-action-item");
  const _easycom_rice_swipe_action2 = common_vendor.resolveComponent("rice-swipe-action");
  const _easycom_jcode_empty2 = common_vendor.resolveComponent("jcode-empty");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2 + _easycom_rice_swipe_action_item2 + _easycom_rice_swipe_action2 + _easycom_jcode_empty2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_rice_swipe_action_item = () => "../../../uni_modules/rice-swipe-action/components/rice-swipe-action-item/rice-swipe-action-item.js";
const _easycom_rice_swipe_action = () => "../../../uni_modules/rice-swipe-action/components/rice-swipe-action/rice-swipe-action.js";
const _easycom_jcode_empty = () => "../../../components/jcode-empty/jcode-empty.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons + _easycom_rice_swipe_action_item + _easycom_rice_swipe_action + _easycom_jcode_empty)();
}
const _sfc_main = {
  __name: "collectionStation",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    common_vendor.ref(null);
    common_vendor.ref(null);
    common_vendor.ref(false);
    const deleteRef = common_vendor.ref();
    common_vendor.onLoad(async (option) => {
    });
    common_vendor.onShow(async () => {
      getList();
    });
    const list = common_vendor.ref([]);
    async function getList() {
      simulateData();
    }
    function cancelCollectionStationFun(stationId) {
      proxy.msg("已取消收藏");
    }
    function simulateData(e) {
      proxy.showLoading();
      setTimeout(() => {
        proxy.hideLoading();
        list.value = [
          {
            address: "广东省深圳市福田区黄河路黄河大厦地下停车场",
            currentFee: 1.69,
            latitude: 22.5472,
            longitude: 114.0445,
            stationName: "内部测试充电站",
            totalGunNum: 2,
            freeGunNum: 1
          },
          {
            address: "广东省深圳市福田区长江路111号",
            currentFee: 1.19,
            latitude: 21.5472,
            longitude: 114.0445,
            stationName: "内部测试充电站2",
            totalGunNum: 0,
            freeGunNum: 2
          },
          {
            address: "广东省深圳市福田区长江路112号",
            currentFee: 1.19,
            latitude: 21.6472,
            longitude: 114.0445,
            stationName: "内部测试充电站3",
            totalGunNum: 1,
            freeGunNum: 2
          },
          {
            address: "广东省深圳市福田区长江路113号",
            currentFee: 1.19,
            latitude: 21.5672,
            longitude: 114.0445,
            stationName: "内部测试充电站4",
            totalGunNum: 2,
            freeGunNum: 2
          }
        ];
      }, 1e3);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "left",
          title: "收藏站点"
        }),
        b: list.value && list.value.length > 0
      }, list.value && list.value.length > 0 ? {
        c: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: index != 0
          }, index != 0 ? {} : {}, {
            b: item.isFast == 0
          }, item.isFast == 0 ? {} : {}, {
            c: common_vendor.t(item.stationName),
            d: item.distance
          }, item.distance ? {
            e: "031bdf0d-3-" + i0 + "," + ("031bdf0d-2-" + i0),
            f: common_vendor.p({
              type: "location",
              color: "gray",
              size: "20"
            }),
            g: common_vendor.t(_ctx.numFilter(item.distance, 1))
          } : {}, {
            h: common_vendor.t(item.address),
            i: common_vendor.t(item.freeGunNum),
            j: common_vendor.t(item.totalGunNum),
            k: common_vendor.t(_ctx.numFilter(item.currentFee, 2)),
            l: "031bdf0d-4-" + i0 + "," + ("031bdf0d-2-" + i0),
            m: common_vendor.o(($event) => _ctx.toMap(item)),
            n: common_vendor.o(($event) => _ctx.navTo(`/sub_charging/station/stationDetail?id=${item.id}`)),
            o: common_vendor.o(($event) => cancelCollectionStationFun(item.id)),
            p: "031bdf0d-2-" + i0 + ",031bdf0d-1"
          });
        }),
        d: common_assets._imports_0,
        e: common_vendor.p({
          type: "paperplane",
          size: "16",
          color: "white"
        }),
        f: common_vendor.sr(deleteRef, "031bdf0d-1", {
          "k": "deleteRef"
        }),
        g: common_vendor.p({
          customStyle: {
            marginTop: "0"
          }
        })
      } : {
        h: common_vendor.p({
          emptyText: "无收藏站点"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-031bdf0d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/sub_charging/station/collectionStation/collectionStation.js.map
