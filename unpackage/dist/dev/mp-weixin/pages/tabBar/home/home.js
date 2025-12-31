"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_xsuu_swiper2 = common_vendor.resolveComponent("jcode-xsuu-swiper");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_jcode_scroll2 = common_vendor.resolveComponent("jcode-scroll");
  const _easycom_jcode_tabBar2 = common_vendor.resolveComponent("jcode-tabBar");
  (_easycom_jcode_navbar2 + _easycom_jcode_xsuu_swiper2 + _easycom_uni_icons2 + _easycom_jcode_scroll2 + _easycom_jcode_tabBar2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_xsuu_swiper = () => "../../../components/jcode-xsuu-swiper/jcode-xsuu-swiper.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_jcode_scroll = () => "../../../components/jcode-scroll/jcode-scroll.js";
const _easycom_jcode_tabBar = () => "../../../components/jcode-tabBar/jcode-tabBar.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_xsuu_swiper + _easycom_uni_icons + _easycom_jcode_scroll + _easycom_jcode_tabBar)();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const queryInfo = common_vendor.ref({
      pageNum: 1,
      pageSize: 5
    });
    const statusBarHeight = common_vendor.ref(common_vendor.index.getSystemInfoSync().statusBarHeight + 44);
    const navBarBackGroundSign = common_vendor.ref(0);
    const swiperItems = common_vendor.ref([]);
    const swiperCurrent = common_vendor.ref(0);
    const loadOk = common_vendor.ref(false);
    const mainHeight = common_vendor.ref(0);
    const swiperCurrentSliderLeft = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      { name: "全部站点" },
      { name: "收藏站点" }
    ]);
    const onPageScrollHeight = common_vendor.ref(0);
    const locationSign = common_vendor.ref(false);
    const jcodeScrollRef = common_vendor.ref();
    const latitude = common_vendor.ref(null);
    const longitude = common_vendor.ref(null);
    const stationList = common_vendor.ref([]);
    const stationList2 = common_vendor.ref([]);
    common_vendor.ref("");
    common_vendor.ref("@static/images/home/mapBack.png");
    const cardList = common_vendor.ref([
      {
        title: "在线客服",
        image: "/static/images/home/card1.svg",
        page: ""
      },
      {
        title: "站点列表",
        image: "/static/images/home/card2.svg",
        page: "/sub_charging/station/stationList/stationList"
      },
      {
        title: "收藏管理",
        image: "/static/images/home/card3.svg",
        page: "/sub_charging/station/collectionStation/collectionStation"
      },
      {
        title: "更多功能",
        image: "/static/images/home/card4.svg",
        page: ""
      }
    ]);
    common_vendor.onShow(async () => {
      initview();
    });
    common_vendor.onReady(async () => {
      const topHeight = await proxy.getViewHW(".mainPage");
      common_vendor.index.__f__("log", "at pages/tabBar/home/home.vue:312", "topHeight", topHeight);
      const cardList2 = await proxy.getViewHW(".card-content");
      common_vendor.index.__f__("log", "at pages/tabBar/home/home.vue:315", "cardList", cardList2);
      const navbar = await proxy.getViewHW(".navbar");
      common_vendor.index.__f__("log", "at pages/tabBar/home/home.vue:318", "navbar", navbar);
      onPageScrollHeight.value = topHeight.height - navbar.bottom + cardList2.height;
      let sysInfo = common_vendor.index.getSystemInfoSync();
      common_vendor.index.__f__("log", "at pages/tabBar/home/home.vue:323", "sysInfo", sysInfo);
      mainHeight.value = sysInfo.windowHeight - navbar.bottom - 55 + 12;
      common_vendor.index.__f__("log", "at pages/tabBar/home/home.vue:326", "mainHeight", mainHeight.value);
    });
    common_vendor.onPageScroll((e) => {
      navBarBackGroundSign.value = e.scrollTop / onPageScrollHeight.value < 1 ? e.scrollTop / onPageScrollHeight.value : 1;
    });
    const initview = async () => {
      setTimeout(() => {
        swiperItems.value = [
          { url: "/static/images/home/top.png" },
          { url: "/static/images/home/top.png" }
        ];
      }, 1e3);
      getLocation();
      proxy.refreshWallet();
      if (swiperCurrent.value == 1 && common_vendor.index.getStorageSync("member_id")) {
        setTimeout(() => {
          stationList2.value = [
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
              totalGunNum: 2,
              freeGunNum: 2
            }
          ];
        }, 1e3);
      }
    };
    const getMobile = () => {
      return common_vendor.index.getStorageSync("member_mobile") ? common_vendor.index.getStorageSync("member_mobile") : "微信用户";
    };
    const transition = ({ detail: { dx } }) => {
    };
    const animationfinish = ({ detail: { current } }) => {
      swiperCurrent.value = current;
      swiperChange(current);
    };
    const swiperChange = (index) => {
      swiperCurrent.value = index;
      swiperCurrentSliderLeft.value = index * 110;
      if (index == 1) {
        if (common_vendor.index.getStorageSync("member_id")) {
          setTimeout(() => {
            stationList2.value = [
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
                totalGunNum: 2,
                freeGunNum: 2
              }
            ];
          }, 1e3);
        } else {
          proxy.toLogin();
        }
      }
    };
    const getData = (e) => {
      setTimeout(() => {
        loadOk.value = true;
        var sList = {
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
        jcodeScrollRef.value.backData(sList);
      }, 1e3);
    };
    const backData = (e) => {
      stationList.value = e;
      common_vendor.index.hideLoading();
    };
    const getLocation = async () => {
      var location = await proxy.getLocation();
      if (location) {
        loadOk.value = true;
        locationSign.value = true;
        latitude.value = location.latitude;
        longitude.value = location.longitude;
        jcodeScrollRef.value.silentRefresh();
      } else {
        loadOk.value = true;
        locationSign.value = false;
        jcodeScrollRef.value.silentRefresh();
      }
    };
    const toMap = (item) => {
      common_vendor.wx$1.openLocation({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        scale: 18,
        name: item.stationName,
        address: item.address
      });
    };
    async function toStationMap() {
      const res = await proxy.getLocation();
      if (res) {
        proxy.navTo(`/sub_charging/station/stationMap/stationMap?latitude=${res.latitude}&longitude=${res.longitude}`);
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: "需要获取位置权限，请到设置中开启",
          success(res2) {
            if (res2.confirm) {
              common_vendor.index.openSetting();
            }
          }
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => _ctx.navTo(`/sub_charging/station/stationList/stationList?title=站点列表&focus=1`)),
        c: common_vendor.p({
          leftIcon: "slot",
          backgroundImage: "",
          backgroundColor: navBarBackGroundSign.value == 1 ? "#FFFCF6" : "rgba(248, 248, 248," + navBarBackGroundSign.value + ")"
        }),
        d: common_vendor.p({
          swiperItems: swiperItems.value,
          margin: 0,
          borderRadius: 0,
          height: 600,
          dotHeight: 100,
          button: 0
        }),
        e: _ctx.getLoginFlag()
      }, _ctx.getLoginFlag() ? {
        f: common_assets._imports_1,
        g: common_vendor.t(getMobile()),
        h: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.amount, 2)),
        i: common_vendor.p({
          type: "right",
          size: "16"
        }),
        j: common_vendor.o(($event) => _ctx.switchTab(`/pages/tabBar/user/user`))
      } : {
        k: common_assets._imports_1,
        l: common_vendor.o(($event) => _ctx.isLogin())
      }, {
        m: common_vendor.o(($event) => _ctx.switchTab(`/pages/tabBar/recharge/recharge`)),
        n: common_vendor.o(($event) => _ctx.isLoginToPage(`/pages/wallet/walletRecord/walletRecord?tabStartIndex=1`)),
        o: common_vendor.o(($event) => _ctx.isLoginToPage(`/pages/wallet/withdrawal/withdrawal`)),
        p: common_vendor.s("margin-top: -" + statusBarHeight.value + "px"),
        q: common_vendor.f(cardList.value, (item, index, i0) => {
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
        r: common_vendor.f(tabs.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: i,
            c: swiperCurrent.value == i ? 1 : "",
            d: common_vendor.o(($event) => swiperChange(i), i)
          };
        }),
        s: swiperCurrentSliderLeft.value + "px",
        t: common_assets._imports_2,
        v: common_vendor.o(toStationMap),
        w: common_vendor.f(stationList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.isFast == 0
          }, item.isFast == 0 ? {} : {}, {
            b: common_vendor.t(item.stationName)
          }, locationSign.value ? {
            c: "15dac74a-4-" + i0 + ",15dac74a-3",
            d: common_vendor.p({
              type: "location",
              color: "gray",
              size: "20"
            }),
            e: common_vendor.t(_ctx.numFilter(item.distance || 0, 1))
          } : {}, {
            f: common_vendor.t(item.address),
            g: common_vendor.t(item.freeGunNum),
            h: common_vendor.t(item.totalGunNum),
            i: common_vendor.t(_ctx.numFilter(item.currentFee, 2)),
            j: "15dac74a-5-" + i0 + ",15dac74a-3",
            k: common_vendor.o(($event) => toMap(item)),
            l: common_vendor.o(($event) => _ctx.navTo(`/sub_charging/station/stationDetail?id=${item.id}`))
          });
        }),
        x: locationSign.value,
        y: common_assets._imports_0,
        z: common_vendor.p({
          type: "paperplane",
          size: "16",
          color: "white"
        }),
        A: common_vendor.sr(jcodeScrollRef, "15dac74a-3", {
          "k": "jcodeScrollRef"
        }),
        B: common_vendor.o(getData),
        C: common_vendor.o(backData),
        D: common_vendor.p({
          scrollHeight: mainHeight.value - 70 + "px",
          queryInfo: queryInfo.value,
          refresherEnabled: navBarBackGroundSign.value == 0,
          scrollY: navBarBackGroundSign.value == 1,
          emptyText: "暂无站点"
        }),
        E: common_vendor.f(stationList2.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.isFast == 0
          }, item.isFast == 0 ? {} : {}, {
            b: common_vendor.t(item.stationName)
          }, locationSign.value ? {
            c: "15dac74a-6-" + i0,
            d: common_vendor.p({
              type: "location",
              color: "gray",
              size: "20"
            }),
            e: common_vendor.t(_ctx.numFilter(item.distance || 0, 1))
          } : {}, {
            f: common_vendor.t(item.address),
            g: common_vendor.t(item.freeGunNum),
            h: common_vendor.t(item.totalGunNum),
            i: common_vendor.t(_ctx.numFilter(item.currentFee, 2)),
            j: "15dac74a-7-" + i0,
            k: common_vendor.o(($event) => toMap(item)),
            l: common_vendor.o(($event) => _ctx.navTo(`/sub_charging/station/stationDetail?id=${item.id}`))
          });
        }),
        F: locationSign.value,
        G: common_assets._imports_0,
        H: common_vendor.p({
          type: "paperplane",
          size: "16",
          color: "white"
        }),
        I: swiperCurrent.value,
        J: common_vendor.o(transition),
        K: common_vendor.o(animationfinish),
        L: common_vendor.p({
          currentPage: "0"
        }),
        M: mainHeight.value + "px"
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-15dac74a"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/home/home.js.map
