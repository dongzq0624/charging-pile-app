"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "jcode-notice",
  props: {
    group: {
      type: String,
      default: () => "1"
    }
  },
  setup(__props, { expose: __expose }) {
    const noticeList = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      setTimeout(() => {
        noticeList.value = [
          {
            titleText: "第一条公告"
          },
          {
            titleText: "第二条公告"
          }
        ];
      }, 1e3);
      if (noticeList.value.length == 0) {
        noticeList.value = [{
          titleText: "暂无公告"
        }];
      }
      common_vendor.index.__f__("log", "at components/jcode-notice/jcode-notice.vue:68", "onShow", noticeList.value);
    });
    const displayListClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/richTextView/richTextView`
      });
    };
    __expose({});
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$11,
        b: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.titleText),
            b: common_vendor.o(($event) => displayListClick())
          };
        }),
        c: common_vendor.p({
          type: "right",
          size: "16",
          color: "#333"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2240fb10"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-notice/jcode-notice.js.map
