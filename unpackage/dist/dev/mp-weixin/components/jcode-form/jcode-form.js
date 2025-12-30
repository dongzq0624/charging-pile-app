"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_Navbar = common_vendor.resolveComponent("Navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_aui_autocomplete = common_vendor.resolveComponent("aui-autocomplete");
  const _easycom_buuug7_simple_datetime_picker2 = common_vendor.resolveComponent("buuug7-simple-datetime-picker");
  (_component_Navbar + _easycom_uni_icons2 + _component_aui_autocomplete + _easycom_buuug7_simple_datetime_picker2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_buuug7_simple_datetime_picker = () => "../../uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_buuug7_simple_datetime_picker)();
}
const _sfc_main = {
  __name: "jcode-form",
  props: {
    leftIcon: {
      type: String,
      default: "left"
    },
    editSign: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    //表单
    formList: {
      type: [Array, Object],
      default: []
    },
    inputText: {
      type: String,
      default: ""
    },
    jcodePictureDisplaySign: {
      type: Boolean,
      default: false
    }
  },
  emits: ["jcodeFormBack", "choosed"],
  setup(__props, { emit: __emit }) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const myPicker = common_vendor.ref();
    const nowCheckId = common_vendor.ref(0);
    const pickerShow = common_vendor.ref([]);
    const suggestions = common_vendor.ref([]);
    const emit = __emit;
    const onclick = (item) => {
      common_vendor.index.__f__("log", "at components/jcode-form/jcode-form.vue:289", "点击" + item.id);
      nowCheckId.value = item.id;
      if (item.callBack) {
        toBack(item, null);
      }
      switch (item.type) {
        case "toPage":
          common_vendor.index.navigateTo({
            url: item.pageUrl
          });
          break;
        case "time":
          pickerShow.value = item.show;
          myPicker.value.show(item.id);
          break;
      }
    };
    const toBack = (data, value) => {
      var backData = {};
      if (data)
        backData = data;
      else
        backData = {
          id: nowCheckId.value,
          value
        };
      emit("jcodeFormBack", backData);
    };
    const onKeyInput = (id, e) => {
      nowCheckId.value = id;
      toBack(null, e.detail.value);
    };
    const tipInputFocus = (item) => {
      if (item.focusSign)
        suggestions.value = item.tips;
    };
    const ontipInput = (item, value) => {
      suggestions.value = item.tips.filter((item2) => item2.includes(value));
      toBack(null, value);
    };
    const select = (value) => {
      toBack(null, value);
    };
    const radioChange = (id, e) => {
      nowCheckId.value = id;
      toBack(null, e.detail.value);
    };
    const selectorPickerBindChange = (id, e) => {
      nowCheckId.value = id;
      toBack(null, e.target.value);
    };
    const handleSubmit = (e) => {
      var time = "";
      if (e.year != "")
        time += e.year + "年";
      if (e.month != "")
        time += e.month + "月";
      if (e.day != "")
        time += e.day + "日";
      if (e.hour != "")
        time += e.hour + "时";
      if (e.minute != "")
        time += e.minute + "分";
      if (e.second != "")
        time += e.second + "秒";
      toBack(null, time);
    };
    const chooseAvatarEvent = (id, e) => {
      nowCheckId.value = id;
      toBack(null, e.detail.avatarUrl);
    };
    const inputNickName = (id, e) => {
      nowCheckId.value = id;
      toBack(null, e.detail.value);
    };
    const getPhoneNumberBack = async (e) => {
      common_vendor.index.__f__("log", "at components/jcode-form/jcode-form.vue:433", "getPhoneNumber点击回调", e);
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
        proxy.msg("用户拒绝获取手机号");
      } else {
        setTimeout(() => {
          proxy.successMsg("绑定成功");
        }, 1e3);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: __props.leftIcon,
          editSign: __props.editSign,
          backgroundColor: "#f8f8f8",
          color: "#000000",
          title: __props.title
        }),
        b: common_vendor.f(__props.formList, (item, index, i0) => {
          return common_vendor.e({
            a: item.type == "head"
          }, item.type == "head" ? {
            b: common_vendor.t(item.title)
          } : {}, {
            c: item.type == "text" || item.type == "toPage"
          }, item.type == "text" || item.type == "toPage" ? common_vendor.e({
            d: item.must
          }, item.must ? {} : {}, {
            e: common_vendor.t(item.title),
            f: item.value
          }, item.value ? {
            g: common_vendor.t(item.value)
          } : {
            h: common_vendor.t(item.placeholder)
          }, {
            i: item.right
          }, item.right ? {
            j: "1fda366d-1-" + i0,
            k: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            l: item.type == "input"
          }, item.type == "input" ? common_vendor.e({
            m: item.must
          }, item.must ? {} : {}, {
            n: common_vendor.t(item.title),
            o: common_vendor.o(($event) => onKeyInput(item.id, $event), index),
            p: item.value,
            q: item.disabled,
            r: item.placeholder,
            s: item.right
          }, item.right ? {
            t: "1fda366d-2-" + i0,
            v: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            w: item.type == "borderInput"
          }, item.type == "borderInput" ? common_vendor.e({
            x: item.must
          }, item.must ? {} : {}, {
            y: common_vendor.t(item.title),
            z: common_vendor.o(($event) => onKeyInput(item.id, $event), index),
            A: item.value,
            B: item.disabled,
            C: item.placeholder,
            D: item.right
          }, item.right ? {
            E: "1fda366d-3-" + i0,
            F: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            G: item.type == "tipInput"
          }, item.type == "tipInput" ? common_vendor.e({
            H: item.must
          }, item.must ? {} : {}, {
            I: common_vendor.t(item.title),
            J: common_vendor.sr("AuiAutocomplete", "1fda366d-4-" + i0, {
              "f": 1
            }),
            K: common_vendor.o(($event) => ontipInput(item, $event), index),
            L: common_vendor.o(($event) => tipInputFocus(item), index),
            M: common_vendor.o(select, index),
            N: "1fda366d-4-" + i0,
            O: common_vendor.p({
              suggestions: suggestions.value,
              placeholder: item.placeholder
            }),
            P: item.right
          }, item.right ? {
            Q: "1fda366d-5-" + i0,
            R: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            S: item.type == "selectorPicker"
          }, item.type == "selectorPicker" ? common_vendor.e({
            T: item.must
          }, item.must ? {} : {}, {
            U: common_vendor.t(item.title),
            V: common_vendor.t(item.pickerArray[item.pickerIndex]),
            W: item.right
          }, item.right ? {
            X: "1fda366d-6-" + i0,
            Y: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}, {
            Z: item.pickerArray,
            aa: common_vendor.o(($event) => selectorPickerBindChange(item.id, $event), index)
          }) : {}, {
            ab: item.type == "radio"
          }, item.type == "radio" ? common_vendor.e({
            ac: item.must
          }, item.must ? {} : {}, {
            ad: common_vendor.t(item.title),
            ae: common_vendor.f(item.list, (radioItem, k1, i1) => {
              return {
                a: common_vendor.t(radioItem.value),
                b: radioItem.key,
                c: radioItem.key == item.value
              };
            }),
            af: common_vendor.o(($event) => radioChange(item.id, $event), index),
            ag: item.right
          }, item.right ? {
            ah: "1fda366d-7-" + i0,
            ai: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            aj: item.type == "time"
          }, item.type == "time" ? common_vendor.e({
            ak: item.must
          }, item.must ? {} : {}, {
            al: common_vendor.t(item.title),
            am: item.value != ""
          }, item.value != "" ? {
            an: common_vendor.t(item.value)
          } : {}, {
            ao: item.right
          }, item.right ? {
            ap: "1fda366d-8-" + i0,
            aq: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            ar: item.type == "weChatAvatar"
          }, item.type == "weChatAvatar" ? common_vendor.e({
            as: item.must
          }, item.must ? {} : {}, {
            at: common_vendor.t(item.title),
            av: item.value
          }, item.value ? {
            aw: item.value
          } : {
            ax: common_assets._imports_0$12
          }, {
            ay: item.right
          }, item.right ? {
            az: "1fda366d-9-" + i0,
            aA: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}, {
            aB: common_vendor.o(($event) => chooseAvatarEvent(item.id, $event), index)
          }) : {}, {
            aC: item.type == "weChatNickName"
          }, item.type == "weChatNickName" ? common_vendor.e({
            aD: item.must
          }, item.must ? {} : {}, {
            aE: common_vendor.t(item.title),
            aF: common_vendor.o(($event) => inputNickName(item.id, $event), index),
            aG: item.value,
            aH: common_vendor.o(($event) => item.value = $event.detail.value, index),
            aI: item.right
          }, item.right ? {
            aJ: "1fda366d-10-" + i0,
            aK: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            aL: item.type == "weChatMobile" && item.value.length < 10
          }, item.type == "weChatMobile" && item.value.length < 10 ? common_vendor.e({
            aM: item.must
          }, item.must ? {} : {}, {
            aN: common_vendor.t(item.title),
            aO: item.value
          }, item.value ? {
            aP: common_vendor.t(item.value)
          } : {
            aQ: common_vendor.t(item.placeholder)
          }, {
            aR: item.right
          }, item.right ? {
            aS: "1fda366d-11-" + i0,
            aT: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}, {
            aU: common_vendor.o(getPhoneNumberBack, index)
          }) : item.type == "weChatMobile" && item.value.length > 10 ? common_vendor.e({
            aW: item.must
          }, item.must ? {} : {}, {
            aX: common_vendor.t(item.title),
            aY: item.value
          }, item.value ? {
            aZ: common_vendor.t(item.value)
          } : {
            ba: common_vendor.t(item.placeholder)
          }, {
            bb: item.right
          }, item.right ? {
            bc: "1fda366d-12-" + i0,
            bd: common_vendor.p({
              color: "#a8a8a8",
              type: item.right,
              size: 20
            })
          } : {}) : {}, {
            aV: item.type == "weChatMobile" && item.value.length > 10,
            be: index,
            bf: common_vendor.o(($event) => onclick(item), index)
          });
        }),
        c: common_vendor.sr(myPicker, "1fda366d-13", {
          "k": "myPicker"
        }),
        d: common_vendor.o(handleSubmit),
        e: common_vendor.p({
          ["start-year"]: 1930,
          ["end-year"]: 2030,
          ["time-hide"]: pickerShow.value,
          ["time-label"]: ["年", "月", "日", "时", "分", "秒"]
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fda366d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-form/jcode-form.js.map
