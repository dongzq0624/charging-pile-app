"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "riceSwipeAction",
  virtualHost: true,
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: [Object, String],
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 关闭同组中所有打开的action
     */
    closeAll() {
      this.children.forEach((vm) => {
        if (vm)
          vm.show = "none";
      });
    },
    /**
     * 关闭同组中的其他action
     */
    closeOther(vm) {
      if (!this.autoClose)
        return;
      if (this.openItem && this.openItem !== vm) {
        this.openItem.show = "none";
      }
      this.openItem = vm;
    }
  },
  created() {
    this.openItem = null;
    this.children = [];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($props.customStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/rice-swipe-action/components/rice-swipe-action/rice-swipe-action.js.map
