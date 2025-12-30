"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "jcode-dialog",
  props: {
    isMaskClick: {
      type: Boolean,
      default: () => false
    },
    type: {
      type: String,
      default: () => "dialog"
    },
    theme: {
      type: String,
      default: () => "提示"
    },
    message: {
      type: String,
      default: () => ""
    },
    leftButtonText: {
      type: String,
      default: () => "取消"
    },
    rightButtonText: {
      type: String,
      default: () => "确认"
    },
    leftButtonColor: {
      type: String,
      default: () => ""
    },
    rightButtonColor: {
      type: String,
      default: () => ""
    },
    subscribeList: {
      type: Array,
      default: () => []
    },
    singleButtonText: {
      type: String,
      default: () => "知道了"
    }
  },
  emits: ["buttonBack"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const props = __props;
    common_vendor.onLoad(async () => {
      if (props.subscribeList.length > 0)
        await proxy.getDict("app_template");
    });
    const popup = common_vendor.ref();
    const emit = __emit;
    const chuliString = () => {
      return props.message.replace(/\n/g, "\n");
    };
    const open = (e) => {
      popup.value.open();
    };
    const close = () => {
      popup.value.close();
    };
    const buttonClick = (e) => {
      if (e == "right" && props.subscribeList.length > 0) {
        common_vendor.index.__f__("log", "at components/jcode-dialog/jcode-dialog.vue:149", "props.subscribeList", props.subscribeList);
        var list = [];
        props.subscribeList.forEach((item, index) => {
          if (item) {
            common_vendor.index.__f__("log", "at components/jcode-dialog/jcode-dialog.vue:153", "item", item);
            common_vendor.index.__f__("log", "at components/jcode-dialog/jcode-dialog.vue:154", "app_template", proxy.getDictValueByLabel("app_template", item));
            list.push(proxy.getDictValueByLabel("app_template", item) || "");
            common_vendor.index.__f__("log", "at components/jcode-dialog/jcode-dialog.vue:156", "list", list);
          }
          if (index == props.subscribeList.length - 1) {
            utils_system.subscribe(list);
          }
        });
      }
      emit("buttonBack", e);
    };
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.type == "dialog"
      }, __props.type == "dialog" ? {
        b: common_vendor.t(__props.theme),
        c: common_vendor.t(chuliString()),
        d: common_vendor.t(__props.leftButtonText),
        e: common_vendor.o(($event) => buttonClick("left")),
        f: common_vendor.t(__props.rightButtonText),
        g: common_vendor.o(($event) => buttonClick("right"))
      } : __props.type == "buttonSlot" ? common_vendor.e({
        i: common_vendor.t(__props.theme),
        j: __props.message
      }, __props.message ? {
        k: common_vendor.t(chuliString())
      } : {}) : __props.type == "contentSlot" ? common_vendor.e({
        m: common_vendor.t(__props.theme),
        n: common_vendor.t(chuliString()),
        o: __props.leftButtonColor != ""
      }, __props.leftButtonColor != "" ? {
        p: common_vendor.t(__props.leftButtonText),
        q: common_vendor.o(($event) => buttonClick("left"))
      } : {
        r: common_vendor.t(__props.leftButtonText),
        s: common_vendor.s("color:" + __props.leftButtonColor),
        t: common_vendor.o(($event) => buttonClick("left"))
      }, {
        v: __props.leftButtonColor != ""
      }, __props.leftButtonColor != "" ? {
        w: common_vendor.t(__props.rightButtonText),
        x: common_vendor.o(($event) => buttonClick("right"))
      } : {
        y: common_vendor.t(__props.rightButtonText),
        z: common_vendor.s("color:" + __props.rightButtonColor),
        A: common_vendor.o(($event) => buttonClick("right"))
      }) : __props.type == "singleButton" ? {
        C: common_vendor.t(__props.theme),
        D: common_vendor.t(chuliString()),
        E: common_vendor.t(__props.singleButtonText),
        F: common_vendor.o(($event) => buttonClick())
      } : {}, {
        h: __props.type == "buttonSlot",
        l: __props.type == "contentSlot",
        B: __props.type == "singleButton",
        G: common_vendor.sr(popup, "c562b666-0", {
          "k": "popup"
        }),
        H: common_vendor.p({
          type: "center",
          isMaskClick: __props.isMaskClick
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c562b666"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-dialog/jcode-dialog.js.map
