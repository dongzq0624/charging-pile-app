"use strict";
const common_vendor = require("../common/vendor.js");
const common = {
  data() {
    return {
      //点击防抖
      noClick: true,
      memberWallet: {}
    };
  },
  methods: {
    //保留几位小数
    numFilter(value, num) {
      let tempVal = parseFloat(value).toFixed(num + 5);
      let realVal = tempVal.substring(0, tempVal.length - 5);
      return realVal;
    },
    //点击事件防抖
    noMultipleClicks(methods, info) {
      if (this.noClick) {
        this.noClick = false;
        if (info && info !== "")
          methods(info);
        else
          methods();
        setTimeout(
          () => {
            this.noClick = true;
          },
          2e3
        );
      }
    },
    msg(e) {
      common_vendor.index.showToast({
        icon: "none",
        title: e
      });
    },
    successMsg(e) {
      common_vendor.index.showToast({
        title: e
      });
    },
    failMsg(e) {
      common_vendor.index.showToast({
        icon: "error",
        title: e
      });
    },
    showLoading(e) {
      if (e)
        common_vendor.index.showLoading({
          title: e,
          mask: true
        });
      else
        common_vendor.index.showLoading({
          title: "加载中...",
          mask: true
        });
    },
    hideLoading() {
      common_vendor.index.hideLoading();
    },
    navTo(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    redTo(url) {
      common_vendor.index.redirectTo({
        url
      });
    },
    switchTab(url) {
      common_vendor.index.switchTab({
        url
      });
    },
    back() {
      const pages = getCurrentPages();
      if (pages.length > 1)
        common_vendor.index.navigateBack();
      else {
        common_vendor.index.reLaunch({
          url: "/pages/tabBar/home/home"
        });
      }
    },
    //复制
    copyText(e) {
      common_vendor.index.setClipboardData({
        data: e,
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success",
            duration: 2e3
          });
        },
        fail: (error) => {
          common_vendor.index.__f__("log", "at utils/common.js:105", "失败", error);
          common_vendor.index.showToast({
            title: "复制失败",
            icon: "none"
          });
        }
      });
    },
    daysBetweenDates(date1, date2) {
      const dateOne = new Date(date1);
      const dateTwo = new Date(date2);
      const timeDifference = Math.abs(dateTwo - dateOne);
      const hours = Math.floor(timeDifference / (1e3 * 60 * 60) % 24);
      const minutes = Math.floor(timeDifference / (1e3 * 60) % 60);
      return `${hours}时${minutes}分`;
    },
    toLogin() {
      this.navTo(`/pages/login/login`);
    },
    convertToTimestamp(time) {
      const parts = time.split(":");
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return (hours * 3600 + minutes * 60 + seconds) * 1e3;
    },
    previewImg(img) {
      let imgs = [];
      imgs[0] = img;
      common_vendor.index.previewImage({
        urls: imgs,
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data) {
          },
          fail: function(err) {
          }
        }
      });
    },
    toPrePage(preNum, data) {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - (preNum + 1)];
      common_vendor.index.__f__("log", "at utils/common.js:157", "prevPage.$vm", prevPage);
      prevPage.$vm.backCarryData({
        data
      });
      common_vendor.index.navigateBack({
        delta: preNum
      });
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getLocation({
          type: "gcj02",
          geocode: true,
          success: (res) => {
            common_vendor.index.__f__("log", "at utils/common.js:173", "getLocationSucc", res);
            resolve({
              latitude: res.latitude,
              longitude: res.longitude
            });
          },
          fail: (err) => {
            this.msg("为了更加准确的为你提供站点导航，请打开手机定位！");
            common_vendor.index.__f__("log", "at utils/common.js:181", "getLocationErr", err);
            resolve(false);
          }
        });
      });
    },
    getLoginFlag() {
      if (common_vendor.index.getStorageSync("member_id"))
        return true;
      else
        return false;
    },
    // 计算滚动列表高度
    calculateHeight(domName) {
      return new Promise(async (resolve, reject) => {
        const {
          windowHeight
        } = await common_vendor.index.getSystemInfo();
        const query = common_vendor.index.createSelectorQuery();
        common_vendor.index.__f__("log", "at utils/common.js:201", "query", query);
        query.select(domName).boundingClientRect();
        query.exec((res) => {
          common_vendor.index.__f__("log", "at utils/common.js:204", "res", res);
          common_vendor.index.__f__("log", "at utils/common.js:205", "windowHeight", windowHeight);
          resolve(windowHeight - res[0].top);
        });
      });
    },
    // 获取view高度宽度等
    getViewHW(domName) {
      return new Promise(async (resolve, reject) => {
        const query = await common_vendor.index.createSelectorQuery();
        query.select(domName).boundingClientRect((data) => {
          common_vendor.index.__f__("log", "at utils/common.js:215", "getViewHW", data);
          resolve(data);
        }).exec();
      });
    },
    //退出登录
    async memberQuit() {
      common_vendor.index.__f__("log", "at utils/common.js:222", "ewq");
      common_vendor.index.showLoading({
        title: "退出登录中...",
        mask: true
      });
      await this.removeStroage();
      setTimeout(
        () => {
          common_vendor.index.hideLoading();
          common_vendor.wx$1.reLaunch({
            url: "/pages/tabBar/user/user"
          });
        },
        1e3
      );
    },
    removeStroage() {
      return new Promise(async (resolve, reject) => {
        common_vendor.index.removeStorageSync("member_token");
        common_vendor.index.removeStorageSync("member_id");
        common_vendor.index.removeStorageSync("member_avatar");
        common_vendor.index.removeStorageSync("member_nickName");
        common_vendor.index.removeStorageSync("member_mobile");
        common_vendor.index.removeStorageSync("member_role");
        common_vendor.index.removeStorageSync("currAuthorizeStep");
        resolve(true);
      });
    },
    //登录验证
    async isLogin(methods, info) {
      const result = common_vendor.index.getStorageSync("member_id");
      if (!result)
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      else {
        if (info && info !== "")
          methods(info);
        else
          methods();
      }
    },
    isLoginToPage(toPageUrl) {
      const result = common_vendor.index.getStorageSync("member_id");
      if (!result)
        common_vendor.index.navigateTo({
          url: `/pages/login/login?toPageUrl=${encodeURIComponent(toPageUrl)}`
        });
      else {
        common_vendor.index.navigateTo({
          url: toPageUrl
        });
      }
    },
    async refreshWallet() {
      if (this.getLoginFlag()) {
        setTimeout(() => {
          this.memberWallet = {
            amount: 100,
            giftAmount: 0,
            freezeAmount: 0
          };
        }, 1e3);
      }
    }
  }
};
exports.common = common;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
