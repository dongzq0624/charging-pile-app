"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    // swiperItems  循环对象
    // height  高度
    // margin  边距
    // borderRadius 圆角
    // titleFontSize 标题大小
    // titleColor 标题颜色
    // SubtitleFontSize 副标题大小
    // SubtitleColor 副标题颜色
    // dotHeight 指示点距离轮播底部高度
    // dotMargin 指示点侧边距
    // SelectBG 指示点未选中颜色
    // UncheckedBG 指示点选中颜色
    // DotPosition 指示点位置 1左侧 2右侧 3居中
    // button 查看详情按钮是否显示 1显示 0不显示
    // previousMargin 前边距，可用于露出前一项的一小部分
    // nextMargin 后边距，可用于露出后一项的一小部分
    previousMargin: {
      type: String,
      default: "0"
    },
    nextMargin: {
      type: String,
      default: "0"
    },
    swiperItems: {
      type: Array,
      default: function() {
        return new Array();
      }
    },
    height: {
      type: Number,
      default: 320
    },
    margin: {
      type: Number,
      default: 30
    },
    borderRadius: {
      type: Number,
      default: 20
    },
    titleFontSize: {
      type: Number,
      default: 36
    },
    titleColor: {
      type: String,
      default: "#ffffff"
    },
    SubtitleFontSize: {
      type: Number,
      default: 24
    },
    SubtitleColor: {
      type: String,
      default: "#ffffff"
    },
    dotMargin: {
      type: Number,
      default: 0
    },
    dotHeight: {
      type: Number,
      default: 0
    },
    SelectBG: {
      type: String,
      default: "darkgray"
    },
    UncheckedBG: {
      type: String,
      default: "rgba(255, 255, 255, 1)"
    },
    DotPosition: {
      type: Number,
      default: 1
    },
    button: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      enjoySiwper: 0
    };
  },
  methods: {
    swiperChange: function(e) {
      this.enjoySiwper = e.detail.current;
    },
    displayListClick(item) {
      common_vendor.index.navigateTo({
        url: `/pages/richTextView/richTextView`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return common_vendor.e({
        a: item.url,
        b: item.title
      }, item.title ? {
        c: common_vendor.t(item.title),
        d: $props.titleFontSize + "rpx",
        e: $props.titleColor,
        f: common_vendor.n(index === $data.enjoySiwper ? "title" : "")
      } : {}, {
        g: item.Subtitle
      }, item.Subtitle ? {
        h: common_vendor.t(item.Subtitle),
        i: $props.SubtitleFontSize + "rpx",
        j: $props.SubtitleColor,
        k: common_vendor.n(index === $data.enjoySiwper ? "Subtitle" : "")
      } : {}, $props.button === 1 ? {
        l: common_vendor.n(index === $data.enjoySiwper ? "bt" : "")
      } : {}, {
        m: common_vendor.o(($event) => $options.displayListClick(item), index),
        n: index
      });
    }),
    b: $props.button === 1,
    c: $props.height + "rpx",
    d: $props.margin + "rpx",
    e: $props.margin + "rpx",
    f: $props.borderRadius + "rpx",
    g: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args)),
    h: $props.height + "rpx;width:100vw;",
    i: $props.previousMargin,
    j: $props.nextMargin,
    k: $props.DotPosition === 1
  }, $props.DotPosition === 1 ? {
    l: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === $data.enjoySiwper ? "Select " : "Unchecked")
      };
    }),
    m: $props.SelectBG,
    n: $props.height - 30 - $props.dotHeight + "rpx",
    o: $props.margin + 30 + $props.dotMargin + "rpx",
    p: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === $data.enjoySiwper ? "Select1 " : "Unchecked1")
      };
    }),
    q: $props.UncheckedBG,
    r: $props.height - 30 - $props.dotHeight + "rpx",
    s: $props.margin + 30 + $props.dotMargin + "rpx"
  } : {}, {
    t: $props.DotPosition === 2
  }, $props.DotPosition === 2 ? {
    v: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === $data.enjoySiwper ? "Select " : "Unchecked")
      };
    }),
    w: $props.SelectBG,
    x: $props.height - 30 - $props.dotHeight + "rpx",
    y: $props.margin + 30 + $props.dotMargin + "rpx",
    z: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === $data.enjoySiwper ? "Select1 " : "Unchecked1")
      };
    }),
    A: $props.UncheckedBG,
    B: $props.height - 30 - $props.dotHeight + "rpx",
    C: $props.margin + 30 + $props.dotMargin + "rpx"
  } : {}, {
    D: $props.DotPosition === 3
  }, $props.DotPosition === 3 ? {
    E: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === $data.enjoySiwper ? "Select " : "Unchecked")
      };
    }),
    F: $props.SelectBG,
    G: $props.height - 30 - $props.dotHeight + "rpx",
    H: common_vendor.f($props.swiperItems, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === $data.enjoySiwper ? "Select1 " : "Unchecked1")
      };
    }),
    I: $props.UncheckedBG,
    J: $props.height - 30 - $props.dotHeight + "rpx"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-xsuu-swiper/jcode-xsuu-swiper.js.map
