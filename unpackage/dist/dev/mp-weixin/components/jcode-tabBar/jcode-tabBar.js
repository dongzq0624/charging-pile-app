"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "jcode-tabBar",
  props: {
    currentPage: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const {
      proxy,
      ctx
    } = common_vendor.getCurrentInstance();
    const props = __props;
    const currentItem = common_vendor.ref(0);
    const tabbarList = common_vendor.ref([
      {
        id: 0,
        path: "/pages/tabBar/home/home",
        icon: "/static/images/tabBar/home1.png",
        selectIcon: "/static/images/tabBar/home2.png",
        text: "首页",
        centerItem: false
      },
      {
        id: 1,
        path: "/pages/tabBar/recharge/recharge",
        icon: "/static/images/tabBar/recharge1.png",
        selectIcon: "/static/images/tabBar/recharge2.png",
        text: "充值",
        centerItem: false
      },
      {
        id: 2,
        path: "",
        icon: "/static/images/tabBar/scan.png",
        selectIcon: "/static/images/tabBar/scan.png",
        // text: '扫码充电',
        centerItem: true
      },
      {
        id: 3,
        path: "/pages/tabBar/order/order",
        icon: "/static/images/tabBar/order1.png",
        selectIcon: "/static/images/tabBar/order2.png",
        text: "订单",
        centerItem: false
      },
      {
        id: 4,
        path: "/pages/tabBar/user/user",
        icon: "/static/images/tabBar/user1.png",
        selectIcon: "/static/images/tabBar/user2.png",
        text: "我的",
        centerItem: false
      }
    ]);
    common_vendor.onLoad(async () => {
      const tabbar = await proxy.getViewHW(".tabbar-container");
      common_vendor.index.__f__("log", "at components/jcode-tabBar/jcode-tabBar.vue:94", "tabbar", tabbar);
    });
    common_vendor.onMounted(() => {
      currentItem.value = props.currentPage;
    });
    function changeItem(item, index) {
      if (index == 2) {
        if (common_vendor.index.getStorageSync("member_id")) {
          common_vendor.index.showActionSheet({
            itemList: ["扫一扫", "手动输入电桩编号"],
            success: function(res) {
              if (res.tapIndex == 0) {
                scanCode();
              } else if (res.tapIndex == 1) {
                common_vendor.index.navigateTo({
                  url: `/pages/scan/manualInput/manualInput`
                });
              }
            },
            fail: function(res) {
              common_vendor.index.__f__("log", "at components/jcode-tabBar/jcode-tabBar.vue:121", res.errMsg);
            }
          });
        } else
          proxy.toLogin();
      } else if (index == 3) {
        if (common_vendor.index.getStorageSync("member_id")) {
          common_vendor.index.switchTab({
            url: item.path
          });
        } else {
          proxy.toLogin();
        }
      } else {
        common_vendor.index.switchTab({
          url: item.path
        });
      }
    }
    const scanCode = () => {
      common_vendor.index.scanCode({
        onlyFromCamera: false,
        scanType: ["qrCode"],
        success: function(res) {
          common_vendor.index.__f__("log", "at components/jcode-tabBar/jcode-tabBar.vue:152", "qrCode", res.result);
          proxy.isLoginToPage(`/sub_charging/charge/readyToCharge/readyToCharge?result=${res.result}`);
        },
        fail: function(res) {
          proxy.msg("未扫描到结果");
          common_vendor.index.__f__("log", "at components/jcode-tabBar/jcode-tabBar.vue:157", res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabbarList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.centerItem
          }, item.centerItem ? {
            b: currentItem.value == item.id ? item.selectIcon : item.icon
          } : common_vendor.e({
            c: currentItem.value == item.id ? item.selectIcon : item.icon,
            d: item.text
          }, item.text ? {
            e: common_vendor.t(item.text),
            f: common_vendor.n(currentItem.value == item.id ? "item-active" : "")
          } : {}, {
            g: common_vendor.s(currentItem.value == item.id ? "    width: 85%;padding: 8rpx;border-radius: 10px;background: #FFF7F2;" : "")
          }), {
            h: common_vendor.n(item.centerItem ? " center-item2" : ""),
            i: common_vendor.o(($event) => changeItem(item, index))
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7850d2c8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-tabBar/jcode-tabBar.js.map
