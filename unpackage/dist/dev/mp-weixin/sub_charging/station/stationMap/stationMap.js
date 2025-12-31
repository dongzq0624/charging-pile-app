"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "stationMap",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const mapHeight = common_vendor.ref(0);
    const longitude = common_vendor.ref(null);
    const latitude = common_vendor.ref(null);
    const scale = common_vendor.ref(17);
    const stationList = common_vendor.ref([]);
    const markers = common_vendor.ref([]);
    const currentStation = common_vendor.ref(null);
    common_vendor.onReady(() => {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      var navbarHeight = sysInfo.statusBarHeight + 44;
      mapHeight.value = sysInfo.windowHeight - navbarHeight;
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad((option) => {
      longitude.value = option.longitude;
      latitude.value = option.latitude;
      getAllStation();
    });
    common_vendor.onShow(async () => {
    });
    const getLocation = async () => {
      currentStation.value = null;
      const newLocation = await proxy.getLocation();
      if (newLocation.latitude == latitude.value && newLocation.longitude == longitude.value) {
        latitude.value = newLocation.latitude + 1e-6;
        longitude.value = newLocation.longitude + 1e-6;
        common_vendor.index.__f__("log", "at sub_charging/station/stationMap/stationMap.vue:141", "latitude.value", latitude.value);
      } else {
        latitude.value = newLocation.latitude;
        longitude.value = newLocation.longitude;
      }
      scale.value = 17;
    };
    async function getAllStation() {
      var sList = [
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
      for (var i = 0; i < sList.length; i++) {
        markers.value.push({
          id: i,
          latitude: sList[i].latitude,
          longitude: sList[i].longitude,
          width: 20,
          height: 20,
          joinCluster: true,
          distance: 30,
          customCallout: {
            anchorY: 0,
            anchorX: 0,
            display: "ALWAYS"
          }
        });
      }
    }
    function onMarkerTap(e) {
      proxy.showLoading();
      setTimeout(() => {
        common_vendor.index.hideLoading();
        checkStation(e.detail.markerId);
      }, 300);
    }
    function checkStation(e) {
      common_vendor.index.__f__("log", "at sub_charging/station/stationMap/stationMap.vue:221", "ee");
      currentStation.value = stationList.value[e];
      longitude.value = currentStation.value.longitude;
      latitude.value = currentStation.value.latitude;
    }
    const toMap = (item) => {
      common_vendor.wx$1.openLocation({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        scale: 18,
        name: item.stationName,
        address: item.address
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "left",
          title: "充电地图"
        }),
        b: common_vendor.f(markers.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(stationList.value[item.id].freeGunNum),
            b: common_vendor.t(stationList.value[item.id].totalGunNum),
            c: item.id
          };
        }),
        c: currentStation.value
      }, currentStation.value ? common_vendor.e({
        d: currentStation.value.isFast == 0
      }, currentStation.value.isFast == 0 ? {} : {}, {
        e: common_vendor.t(currentStation.value.stationName),
        f: common_vendor.p({
          type: "location",
          color: "gray",
          size: "20"
        }),
        g: common_vendor.t(_ctx.numFilter(currentStation.value.distance, 1)),
        h: common_vendor.t(currentStation.value.address),
        i: common_assets._imports_0,
        j: common_vendor.t(currentStation.value.freeGunNum),
        k: common_vendor.t(currentStation.value.totalGunNum),
        l: common_vendor.t(_ctx.numFilter(currentStation.value.currentFee, 2)),
        m: common_vendor.p({
          type: "paperplane",
          size: "16",
          color: "white"
        }),
        n: common_vendor.o(($event) => toMap(currentStation.value)),
        o: common_vendor.o(($event) => _ctx.navTo(`/sub_charging/station/stationDetail?id=${currentStation.value.id}`))
      }) : {}, {
        p: common_vendor.p({
          type: "map-pin-ellipse",
          color: "#12A1FE",
          size: "25"
        }),
        q: common_vendor.o(getLocation),
        r: common_vendor.s("width: 100%;height: " + mapHeight.value + "px"),
        s: latitude.value,
        t: scale.value,
        v: longitude.value,
        w: markers.value,
        x: common_vendor.o(onMarkerTap),
        y: common_vendor.o(onMarkerTap)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-003fb960"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/sub_charging/station/stationMap/stationMap.js.map
