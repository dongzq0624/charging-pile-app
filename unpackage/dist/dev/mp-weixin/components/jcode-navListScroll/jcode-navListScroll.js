"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_jcode_scroll2 = common_vendor.resolveComponent("jcode-scroll");
  _easycom_jcode_scroll2();
}
const _easycom_jcode_scroll = () => "../jcode-scroll/jcode-scroll.js";
if (!Math) {
  _easycom_jcode_scroll();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "jcode-navListScroll",
  props: {
    scrollHeight: {
      type: String,
      default: ""
    },
    tabStartIndex: {
      type: Number,
      default: 0
    },
    navTextList: {
      type: [Array, String],
      default: []
    },
    navPostDataList: {
      type: [Array, Object],
      default: []
    },
    getDataUrl: {
      type: String,
      default: ""
    },
    queryInfo: {
      type: Object,
      default: {
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  emits: ["backData"],
  setup(__props, { expose: __expose, emit: __emit }) {
    common_vendor.ref(false);
    const tabCurrentIndex = common_vendor.ref(0);
    const jcodeScrollRef = common_vendor.ref();
    common_vendor.ref([]);
    const emit = __emit;
    const props = __props;
    common_vendor.onShow(async () => {
      jcodeScrollRef.value.silentRefresh();
    });
    common_vendor.onLoad(async () => {
    });
    const getData = (e) => {
      common_vendor.index.__f__("log", "at components/jcode-navListScroll/jcode-navListScroll.vue:71", "e", e);
      common_vendor.index.__f__("log", "at components/jcode-navListScroll/jcode-navListScroll.vue:72", "e", props.navPostDataList[e.tabCurrentIndex]);
    };
    const backData = (e) => {
      common_vendor.index.__f__("log", "at components/jcode-navListScroll/jcode-navListScroll.vue:88", "e", e);
      tabCurrentIndex.value = e.tabCurrentIndex;
      common_vendor.index.__f__("log", "at components/jcode-navListScroll/jcode-navListScroll.vue:90", "this.list ", e.list);
      emit("backData", e.list);
    };
    __expose({
      // open, close
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(jcodeScrollRef, "5452e939-0", {
          "k": "jcodeScrollRef"
        }),
        b: common_vendor.o(getData),
        c: common_vendor.o(backData),
        d: common_vendor.p({
          scrollHeight: __props.scrollHeight,
          type: "navList",
          navTextList: __props.navTextList,
          tabStartIndex: __props.tabStartIndex,
          emptyText: "暂无订单"
        })
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-navListScroll/jcode-navListScroll.js.map
