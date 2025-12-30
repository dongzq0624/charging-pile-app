"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "jcode-navbar",
  props: {
    // 图标和字体颜色
    color: {
      type: String,
      default: "#000000"
    },
    // 标题,默认为空
    title: {
      type: String,
      default: ""
    },
    // 导航栏背景色
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    // 是否开启右侧状态栏
    statusBar: {
      type: Boolean,
      default: true
    },
    // 是否要底部边框
    border: {
      type: Boolean,
      default: false
    },
    // 底部边框颜色
    borderColor: {
      type: String,
      default: ""
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: ""
    },
    // 右侧按钮图标
    rightIcon: {
      type: String,
      default: ""
    },
    // 右侧按钮文字,不可与右侧图标共用,如需都使用，请使用 right 插槽自定义
    rightText: {
      type: String,
      default: ""
    },
    //页面是否进行未保存退出的提示
    editSign: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "44px"
    },
    shadow: {
      type: Boolean,
      default: false
    },
    backgroundImage: {
      type: String,
      default: "linear-gradient(91deg, #FAE3C4 0%, #F8F6F7 99%);"
    }
  },
  emits: ["onLeftClick", "selectAddressBack"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    common_vendor.onLoad(async () => {
      const pages = getCurrentPages();
      currentPageIndex.value = pages.length - 1;
      common_vendor.index.__f__("log", "at components/jcode-navbar/jcode-navbar.vue:118", "当前页面是第" + currentPageIndex.value + "个页面");
    });
    const currentPageIndex = common_vendor.ref(0);
    common_vendor.ref();
    const emit = __emit;
    common_vendor.ref({
      message: ""
    });
    const onLeftClick = () => {
      if (props.leftIcon == "gear") {
        common_vendor.index.navigateTo({
          url: "/pages/admin1Pages/myPages/setting/sysSetting/index"
        });
      }
      if (props.editSign == true) {
        return;
      }
      if (props.leftIcon === "left" && currentPageIndex.value != 0)
        return common_vendor.index.navigateBack();
      if (props.leftIcon === "close")
        return common_vendor.index.exitMiniProgram();
      if ((props.leftIcon === "home" || currentPageIndex.value == 0) && props.leftIcon != "")
        return common_vendor.index.reLaunch({
          url: "/pages/tabBar/home/home"
        });
      emit("onLeftClick");
    };
    __expose({
      // open, close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.leftIcon == "slot"
      }, __props.leftIcon == "slot" ? {
        b: common_vendor.sr("navbar", "c6ccd324-0"),
        c: common_vendor.o(onLeftClick),
        d: common_vendor.p({
          color: __props.color,
          IconSize: "50rpx",
          fontSize: "32rpx",
          borderColor: __props.borderColor,
          border: __props.border,
          rightText: __props.rightText,
          rightIcon: __props.rightIcon,
          fixed: true,
          statusBar: __props.statusBar,
          ["left-icon"]: __props.leftIcon,
          ["background-color"]: __props.backgroundColor,
          height: __props.height,
          shadow: __props.shadow,
          backgroundImage: __props.backgroundImage,
          currentPageIndex: currentPageIndex.value,
          title: __props.title
        })
      } : {
        e: common_vendor.sr("navbar", "c6ccd324-1"),
        f: common_vendor.o(onLeftClick),
        g: common_vendor.p({
          color: __props.color,
          IconSize: "50rpx",
          fontSize: "32rpx",
          borderColor: __props.borderColor,
          border: __props.border,
          rightText: __props.rightText,
          rightIcon: __props.rightIcon,
          fixed: true,
          statusBar: __props.statusBar,
          ["left-icon"]: __props.leftIcon,
          ["background-color"]: __props.backgroundColor,
          backgroundImage: __props.backgroundImage,
          currentPageIndex: currentPageIndex.value,
          title: __props.title
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c6ccd324"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-navbar/jcode-navbar.js.map
