"use strict";
const common_vendor = require("../common/vendor.js");
const getSystem = () => {
  return new Promise(async (resolve, reject) => {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    if (systemInfo.platform === "android" || systemInfo.platform === "ios") {
      common_vendor.index.__f__("log", "at utils/system.js:11", "这段代码只在App环境下运行。");
    } else {
      common_vendor.index.__f__("log", "at utils/system.js:14", "这段代码在非App环境下运行，例如H5或小程序。");
    }
    const {
      appId,
      envVersion,
      version
    } = common_vendor.index.getAccountInfoSync().miniProgram;
    const safeInfo = await common_vendor.index.getSystemInfoSync();
    resolve({
      appId,
      envVersion,
      bottomHeight: safeInfo.safeAreaInsets.bottom,
      topHeight: safeInfo.safeAreaInsets.top,
      uniPlatform: safeInfo.uniPlatform,
      osName: safeInfo.osName
    });
  });
};
const subscribe = (templateIds) => {
  common_vendor.wx$1.requestSubscribeMessage({
    tmplIds: templateIds,
    success(res) {
      common_vendor.index.__f__("log", "at utils/system.js:158", "订阅消息唤起成功 =====>", res);
    },
    fail(err) {
      common_vendor.index.__f__("log", "at utils/system.js:161", "订阅消息唤起失败 =====>", err);
    }
  });
};
exports.getSystem = getSystem;
exports.subscribe = subscribe;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
