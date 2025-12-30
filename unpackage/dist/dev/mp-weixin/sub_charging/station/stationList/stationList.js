"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_zy_search2 = common_vendor.resolveComponent("zy-search");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_jcode_scroll2 = common_vendor.resolveComponent("jcode-scroll");
  (_easycom_jcode_navbar2 + _easycom_zy_search2 + _easycom_uni_icons2 + _easycom_jcode_scroll2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_zy_search = () => "../../../components/zy-search/zy-search.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_jcode_scroll = () => "../../../components/jcode-scroll/jcode-scroll.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_zy_search + _easycom_uni_icons + _easycom_jcode_scroll)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "stationList",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const themeClass = common_vendor.ref("circle");
    const title = common_vendor.ref("");
    const focus = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      title.value = option.title;
      focus.value = option.focus == 1 ? true : false;
      common_vendor.index.__f__("log", "at sub_charging/station/stationList/stationList.vue:92", "focus.value", focus.value);
    });
    common_vendor.onShow(async () => {
    });
    const mainHeight = common_vendor.ref(0);
    const navbarHeight = common_vendor.ref(0);
    common_vendor.onReady(async () => {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      common_vendor.index.__f__("log", "at sub_charging/station/stationList/stationList.vue:103", "sysInfo", sysInfo);
      navbarHeight.value = sysInfo.statusBarHeight + 44;
      mainHeight.value = sysInfo.windowHeight - navbarHeight.value - 50;
      common_vendor.index.__f__("log", "at sub_charging/station/stationList/stationList.vue:107", "mainHeight", mainHeight.value);
    });
    common_vendor.ref(null);
    common_vendor.ref(null);
    const jcodeScrollRef = common_vendor.ref();
    const stationList = common_vendor.ref([]);
    const queryInfo = common_vendor.ref({
      pageNum: 1,
      pageSize: 7
    });
    common_vendor.ref(0);
    const getData = async (e) => {
      simulateData();
    };
    const backData = (e) => {
      stationList.value = e;
      common_vendor.index.hideLoading();
    };
    const searchText = common_vendor.ref("");
    async function getSearchText(e) {
      if (!e) {
        title.value = "站点列表";
      } else {
        title.value = "搜索结果";
      }
      searchText.value = e;
      simulateData(searchText.value);
    }
    function simulateData(e) {
      proxy.showLoading();
      setTimeout(() => {
        proxy.hideLoading();
        var sList = {};
        if (e) {
          sList = {
            data: {
              totalRow: 4,
              totalPage: 1,
              list: [
                {
                  address: "广东省深圳市福田区黄河路黄河大厦地下停车场",
                  currentFee: 1.69,
                  latitude: 22.5472,
                  longitude: 114.0445,
                  stationName: "搜索结果站",
                  totalGunNum: 2,
                  freeGunNum: 1
                }
              ]
            }
          };
        } else {
          sList = {
            data: {
              totalRow: 4,
              totalPage: 1,
              list: [
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
              ]
            }
          };
        }
        jcodeScrollRef.value.backData(sList);
      }, 1e3);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: title.value
        }),
        b: common_vendor.s("position: fixed;z-index: 10;top: " + navbarHeight.value + "px;"),
        c: common_vendor.o(getSearchText),
        d: common_vendor.p({
          focus: focus.value,
          inputPlaceholder: "站名搜索",
          theme: themeClass.value
        }),
        e: common_vendor.f(stationList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.isFast == 0
          }, item.isFast == 0 ? {} : {}, {
            b: common_vendor.t(item.stationName),
            c: item.distance
          }, item.distance ? {
            d: "114ca5f1-3-" + i0 + ",114ca5f1-2",
            e: common_vendor.p({
              type: "location",
              color: "gray",
              size: "20"
            }),
            f: common_vendor.t(_ctx.numFilter(item.distance, 1))
          } : {}, {
            g: common_vendor.t(item.address),
            h: common_vendor.t(item.freeGunNum),
            i: common_vendor.t(item.totalGunNum),
            j: common_vendor.t(_ctx.numFilter(item.currentFee, 2)),
            k: "114ca5f1-4-" + i0 + ",114ca5f1-2",
            l: common_vendor.o(($event) => _ctx.toMap(item)),
            m: common_vendor.o(($event) => _ctx.navTo(`/sub_charging/station/stationDetail?id=${item.id}`))
          });
        }),
        f: common_assets._imports_0,
        g: common_vendor.p({
          type: "paperplane",
          size: "16",
          color: "white"
        }),
        h: common_vendor.sr(jcodeScrollRef, "114ca5f1-2", {
          "k": "jcodeScrollRef"
        }),
        i: common_vendor.o(getData),
        j: common_vendor.o(backData),
        k: common_vendor.p({
          scrollHeight: mainHeight.value + "px",
          queryInfo: queryInfo.value,
          scrollY: true,
          emptyText: "未查到站点"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-114ca5f1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/sub_charging/station/stationList/stationList.js.map
