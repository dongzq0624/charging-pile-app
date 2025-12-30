"use strict";
const common_vendor = require("../../../../common/vendor.js");
const statusBar = () => "./uni-status-bar.js";
const getVal = (val) => typeof val === "number" ? val + "px" : val;
const _sfc_main = {
  name: "UniNavBar",
  components: {
    statusBar
  },
  emits: ["clickLeft", "clickRight", "clickTitle"],
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    fixed: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    statusBar: {
      type: [Boolean, String],
      default: false
    },
    shadow: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: [Number, String],
      default: 44
    },
    leftWidth: {
      type: [Number, String],
      default: 60
    },
    rightWidth: {
      type: [Number, String],
      default: 60
    },
    stat: {
      type: [Boolean, String],
      default: ""
    },
    currentPageIndex: {
      type: [Number, String],
      default: 0
    },
    fontSize: {
      type: String,
      default: "24rpx"
    },
    backgroundImage: {
      type: String,
      default: ""
    }
  },
  computed: {
    themeBgColor() {
      if (this.dark) {
        if (this.backgroundColor) {
          return this.backgroundColor;
        } else {
          return this.dark ? "#333" : "#FFF";
        }
      }
      return this.backgroundColor || "#FFF";
    },
    themeColor() {
      if (this.dark) {
        if (this.color) {
          return this.color;
        } else {
          return this.dark ? "#fff" : "#333";
        }
      }
      return this.color || "#333";
    },
    navbarHeight() {
      return getVal(this.height);
    },
    leftIconWidth() {
      return getVal(this.leftWidth);
    },
    rightIconWidth() {
      return getVal(this.rightWidth);
    }
  },
  mounted() {
    if (common_vendor.index.report && this.stat && this.title !== "") {
      common_vendor.index.report("title", this.title);
    }
  },
  methods: {
    onClickLeft() {
      this.$emit("clickLeft");
    },
    onClickRight() {
      this.$emit("clickRight");
    },
    onClickTitle() {
      this.$emit("clickTitle");
    }
  }
};
if (!Array) {
  const _component_status_bar = common_vendor.resolveComponent("status-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_status_bar + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.statusBar
  }, $props.statusBar ? {} : {}, {
    b: $props.leftIcon != "slot"
  }, $props.leftIcon != "slot" ? common_vendor.e({
    c: $props.leftIcon.length > 0
  }, $props.leftIcon.length > 0 ? common_vendor.e({
    d: $props.currentPageIndex == 0 && $props.leftIcon == "left"
  }, $props.currentPageIndex == 0 && $props.leftIcon == "left" ? {
    e: common_vendor.p({
      color: $options.themeColor,
      type: "home-filled",
      size: "20"
    })
  } : {
    f: common_vendor.p({
      color: $options.themeColor,
      type: $props.leftIcon,
      size: "20"
    })
  }) : {}, {
    g: $props.leftText.length
  }, $props.leftText.length ? {
    h: common_vendor.t($props.leftText),
    i: $options.themeColor,
    j: !$props.leftIcon.length > 0 ? 1 : ""
  } : {}, {
    k: common_vendor.o((...args) => $options.onClickLeft && $options.onClickLeft(...args)),
    l: $options.leftIconWidth
  }) : {}, {
    m: $props.title.length > 0
  }, $props.title.length > 0 ? {
    n: common_vendor.t($props.title),
    o: $options.themeColor,
    p: $props.fontSize
  } : {}, {
    q: common_vendor.o((...args) => $options.onClickTitle && $options.onClickTitle(...args)),
    r: $props.leftIcon != "slot"
  }, $props.leftIcon != "slot" ? common_vendor.e({
    s: $props.rightIcon.length
  }, $props.rightIcon.length ? {
    t: common_vendor.p({
      color: $options.themeColor,
      type: $props.rightIcon,
      size: "22"
    })
  } : {}, {
    v: $props.rightText.length && !$props.rightIcon.length
  }, $props.rightText.length && !$props.rightIcon.length ? {
    w: common_vendor.t($props.rightText),
    x: $options.themeColor,
    y: $props.fontSize
  } : {}, {
    z: common_vendor.o((...args) => $options.onClickRight && $options.onClickRight(...args)),
    A: $options.rightIconWidth
  }) : {}, {
    B: $options.themeColor,
    C: $options.themeBgColor,
    D: $options.navbarHeight,
    E: $props.fixed ? 1 : "",
    F: $props.shadow ? 1 : "",
    G: $props.border ? 1 : "",
    H: $options.themeBgColor,
    I: $options.themeColor,
    J: $props.backgroundImage,
    K: $props.fixed
  }, $props.fixed ? common_vendor.e({
    L: $props.statusBar
  }, $props.statusBar ? {} : {}, {
    M: $props.leftIcon == "slot" ? "44px" : $options.navbarHeight
  }) : {}, {
    N: $props.dark ? 1 : "",
    O: $props.fixed ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-26544265"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js.map
