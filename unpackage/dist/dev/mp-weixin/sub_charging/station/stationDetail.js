"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_empty2 = common_vendor.resolveComponent("jcode-empty");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_jcode_navbar2 + _easycom_jcode_empty2 + _easycom_uni_icons2)();
}
const _easycom_jcode_navbar = () => "../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_empty = () => "../../components/jcode-empty/jcode-empty.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_empty + _easycom_uni_icons)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "stationDetail",
  setup(__props) {
    const navBarHeight = common_vendor.ref(common_vendor.index.getSystemInfoSync().statusBarHeight + 60);
    const listHeight = common_vendor.ref(null);
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const tabCurrentIndex = common_vendor.ref(0);
    const navList = common_vendor.ref(["电桩列表", "收费标准"]);
    const pileGunModels = common_vendor.ref([]);
    const degreeSettingFeeModels = common_vendor.ref([]);
    const changeTab = (e) => {
      tabCurrentIndex.value = e.target.current;
    };
    const getGunStatusStyle = (e) => {
      switch (e) {
        case "空闲":
          return "color:#4CAF50";
        case "已插枪":
          return "color:#FF9800";
        case "充电中":
          return "color:#3D86F3";
      }
    };
    const show = common_vendor.ref(false);
    const stationId = common_vendor.ref(null);
    const stationDetail = common_vendor.ref({});
    common_vendor.ref(0);
    const location = common_vendor.ref(null);
    common_vendor.onLoad(async (option) => {
      stationId.value = option.id;
      getCollectionFlag();
      location.value = await proxy.getLocation();
      const topImg = await proxy.getViewHW(".topImg");
      common_vendor.index.__f__("log", "at sub_charging/station/stationDetail.vue:179", "topImg", topImg);
      let sysInfo = common_vendor.index.getSystemInfoSync();
      listHeight.value = sysInfo.windowHeight - topImg.bottom - 70 - 40 - 70;
    });
    common_vendor.onShow(async () => {
      getDetail();
    });
    const getDetail = async () => {
      proxy.showLoading();
      setTimeout(() => {
        common_vendor.index.hideLoading();
        show.value = true;
        stationDetail.value = {
          address: "罗湖区宝安南路1881号万象城B2层",
          stationName: "双龙充电站"
        };
        pileGunModels.value = [
          {
            gunSortNo: "01",
            gunStatus: "空闲",
            pileNo: "48767300005",
            qrGunNo: "80050101"
          },
          {
            gunSortNo: "02",
            gunStatus: "充电中",
            pileNo: "48767300006",
            qrGunNo: "80050102"
          },
          {
            gunSortNo: "03",
            gunStatus: "已插枪",
            pileNo: "48767300007",
            qrGunNo: "80050103"
          }
        ];
        degreeSettingFeeModels.value = [
          {
            startTime: "00:00:00",
            endTime: "07:59:00",
            serviceFee: 0.45,
            elecPrice: 0.09,
            elecType: "平期"
          },
          {
            startTime: "08:00:00",
            endTime: "12:59:00",
            serviceFee: 0.95,
            elecPrice: 0.09,
            elecType: "峰期"
          },
          {
            startTime: "13:00:00",
            endTime: "20:59:00",
            serviceFee: 0.25,
            elecPrice: 0.09,
            elecType: "谷期"
          },
          {
            startTime: "21:00:00",
            endTime: "23:59:00",
            serviceFee: 1.45,
            elecPrice: 0.09,
            elecType: "尖期"
          }
        ];
      }, 1e3);
    };
    const collectionFlag = common_vendor.ref(false);
    common_vendor.ref("");
    function getCollectionFlag() {
      var data = {
        memberId: common_vendor.index.getStorageSync("member_id"),
        stationId: stationId.value
      };
      getCollectionStationIdList(data).then((res) => {
        if (res.code == 0) {
          if (res.rows.length == 0) {
            collectionFlag.value = false;
          } else {
            collectionFlag.value = true;
          }
        }
      });
    }
    function collectionStationFun() {
      collectionFlag.value = true;
      proxy.successMsg("收藏成功");
    }
    function cancelCollectionStationFun() {
      collectionFlag.value = false;
      proxy.msg("已取消收藏");
    }
    const scanCode = () => {
      common_vendor.index.scanCode({
        onlyFromCamera: false,
        scanType: ["qrCode"],
        success: function(res) {
          common_vendor.index.__f__("log", "at sub_charging/station/stationDetail.vue:302", "qrCode", res.result);
          proxy.isLoginToPage(`/sub_charging/charge/readyToCharge/readyToCharge?result=${res.result}`);
        },
        fail: function(res) {
          proxy.msg("未扫描到结果");
          common_vendor.index.__f__("log", "at sub_charging/station/stationDetail.vue:307", res);
        }
      });
    };
    const intervalId = common_vendor.ref(null);
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
      }, 2e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "left",
          title: "电站详情",
          backgroundImage: ""
        }),
        b: common_assets._imports_0$10,
        c: -navBarHeight.value + "px",
        d: show.value
      }, show.value ? common_vendor.e({
        e: common_assets._imports_1$4,
        f: common_vendor.t(stationDetail.value.stationName),
        g: common_vendor.t(stationDetail.value.address),
        h: common_vendor.f(navList.value, (navListItem, navListIndex, i0) => {
          return {
            a: common_vendor.t(navListItem),
            b: navListIndex,
            c: tabCurrentIndex.value === navListIndex ? 1 : "",
            d: common_vendor.o(($event) => {
              tabCurrentIndex.value = navListIndex;
            }, navListIndex)
          };
        }),
        i: pileGunModels.value.length == 0
      }, pileGunModels.value.length == 0 ? {
        j: common_vendor.p({
          emptyText: "暂无电桩"
        })
      } : {
        k: common_vendor.f(pileGunModels.value, (pileGunItem, pileGunIndex, i0) => {
          return common_vendor.e({
            a: (pileGunIndex + 1).toString().length == 1
          }, (pileGunIndex + 1).toString().length == 1 ? {
            b: common_vendor.t("0" + (1 + pileGunIndex))
          } : {
            c: common_vendor.t(pileGunIndex + 1)
          }, {
            d: common_vendor.t(pileGunItem.qrGunNo),
            e: common_vendor.t(pileGunItem.gunStatus),
            f: common_vendor.s("font-size: 13px;" + getGunStatusStyle(pileGunItem.gunStatus)),
            g: pileGunIndex == pileGunModels.value.length - 1
          }, pileGunIndex == pileGunModels.value.length - 1 ? {} : {}, {
            h: pileGunIndex
          });
        }),
        l: common_vendor.s("height: " + listHeight.value + "px")
      }, {
        m: degreeSettingFeeModels.value.length == 0
      }, degreeSettingFeeModels.value.length == 0 ? {
        n: common_vendor.p({
          emptyText: "暂无数据"
        })
      } : {}, {
        o: common_vendor.f(degreeSettingFeeModels.value, (FeeItem, FeeIndex, i0) => {
          return {
            a: common_vendor.t(FeeItem.startTime),
            b: common_vendor.t(FeeItem.endTime),
            c: common_vendor.t(FeeItem.elecType),
            d: common_vendor.t(FeeItem.elecPrice),
            e: common_vendor.t(FeeItem.serviceFee)
          };
        }),
        p: common_vendor.s("height: " + (listHeight.value - 40) + "px"),
        q: tabCurrentIndex.value,
        r: common_vendor.o(changeTab)
      }) : {}, {
        s: common_vendor.p({
          type: "chatbubble",
          color: "gray",
          size: "28"
        }),
        t: !collectionFlag.value
      }, !collectionFlag.value ? {
        v: common_vendor.p({
          type: "star",
          color: "gray",
          size: "28"
        }),
        w: common_vendor.o(($event) => _ctx.noMultipleClicks(collectionStationFun))
      } : {
        x: common_vendor.p({
          type: "star-filled",
          color: "sandybrown",
          size: "28"
        }),
        y: common_vendor.o(($event) => _ctx.noMultipleClicks(cancelCollectionStationFun))
      }, {
        z: common_vendor.p({
          type: "scan",
          color: "white",
          size: "28"
        }),
        A: common_vendor.o(scanCode)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-720581c2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/sub_charging/station/stationDetail.js.map
