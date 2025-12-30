"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_system = require("./utils/system.js");
const utils_common = require("./utils/common.js");
if (!Math) {
  "./pages/tabBar/home/home.js";
  "./pages/tabBar/recharge/recharge.js";
  "./pages/tabBar/order/order.js";
  "./pages/tabBar/user/user.js";
  "./pages/login/login.js";
  "./pages/setting/memberSetting.js";
  "./pages/wallet/walletRecord/walletRecord.js";
  "./pages/wallet/recharge/recharge.js";
  "./pages/wallet/withdrawal/withdrawal.js";
  "./pages/wallet/recordDetail/recordDetail.js";
  "./pages/wallet/success/success.js";
  "./pages/richTextView/richTextView.js";
  "./pages/scan/manualInput/manualInput.js";
  "./sub_charging/charge/readyToCharge/readyToCharge.js";
  "./sub_charging/order/orderDetails.js";
  "./sub_charging/charge/charging/charging.js";
  "./sub_charging/station/stationDetail.js";
  "./sub_charging/station/stationList/stationList.js";
  "./sub_charging/station/collectionStation/collectionStation.js";
  "./sub_charging/station/stationMap/stationMap.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(async () => {
      const res = await utils_system.getSystem();
      common_vendor.index.setStorageSync("uniPlatform", res.uniPlatform);
    });
    common_vendor.onShow(() => {
      const updateManager = common_vendor.index.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        common_vendor.index.__f__("log", "at App.vue:26", res.hasUpdate);
      });
      updateManager.onUpdateReady(function(res) {
        common_vendor.index.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success(res2) {
            if (res2.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function(res) {
      });
    });
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.mixin(utils_common.common);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
