"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_jcode_form2 = common_vendor.resolveComponent("jcode-form");
  const _easycom_jcode_dialog2 = common_vendor.resolveComponent("jcode-dialog");
  (_easycom_jcode_navbar2 + _easycom_jcode_form2 + _easycom_jcode_dialog2)();
}
const _easycom_jcode_navbar = () => "../../components/jcode-navbar/jcode-navbar.js";
const _easycom_jcode_form = () => "../../components/jcode-form/jcode-form.js";
const _easycom_jcode_dialog = () => "../../components/jcode-dialog/jcode-dialog.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_jcode_form + _easycom_jcode_dialog)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "memberSetting",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const version = common_vendor.ref("");
    const changeMobilePopup = common_vendor.ref();
    common_vendor.ref();
    const mobile = common_vendor.ref("");
    const list = common_vendor.ref([
      {
        id: 0,
        type: "weChatAvatar",
        title: "头像",
        value: "",
        right: "right"
      },
      {
        id: 1,
        type: "weChatNickName",
        title: "昵称",
        value: "",
        right: "right"
      },
      {
        id: 2,
        type: "weChatMobile",
        title: "绑定手机",
        value: "",
        right: "right",
        callBack: true
      }
    ]);
    common_vendor.onShow(() => {
      if (common_vendor.index.getStorageSync("member_id"))
        initView();
      else
        proxy.toLogin();
    });
    const initView = () => {
      list.value[0].value = common_vendor.index.getStorageSync("member_avatar") || "";
      list.value[1].value = common_vendor.index.getStorageSync("member_nickName") || "";
      if (common_vendor.index.getStorageSync("member_mobile")) {
        list.value[2].value = common_vendor.index.getStorageSync("member_mobile");
      } else {
        list.value[2].title = "关联手机";
        list.value[2].value = "立即绑定";
      }
      common_vendor.index.__f__("log", "at pages/setting/memberSetting.vue:83", "memberInfo", list.value);
    };
    const jcodeFormBack = async (e) => {
      common_vendor.index.__f__("log", "at pages/setting/memberSetting.vue:87", "接收表单传回", e);
      switch (e.id) {
        case 0:
          setTimeout(() => {
            saveSuccess();
          }, 1e3);
          break;
        case 1:
          setTimeout(() => {
            saveSuccess();
          }, 1e3);
          break;
        case 2:
          if (list.value[2].value.length > 10) {
            changeMobilePopup.value.open();
          } else {
            list.value[2].value = e.value;
          }
          break;
      }
    };
    const saveSuccess = () => {
      initView();
      common_vendor.index.showToast({
        title: "操作成功！",
        icon: "none"
      });
    };
    const getPhoneNumberBack = async (button, e) => {
      changeMobilePopup.value.close();
      if (button == "right") {
        common_vendor.index.__f__("log", "at pages/setting/memberSetting.vue:134", "getPhoneNumber点击回调", e);
        if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
          proxy.msg("用户拒绝获取手机号");
        } else {
          setTimeout(() => {
            proxy.successMsg("绑定成功");
          }, 1e3);
        }
      }
    };
    const getVersion = () => {
      const info = common_vendor.index.getAccountInfoSync().miniProgram;
      switch (info.envVersion) {
        case "develop":
          version.value = "开发版" + info.version;
          break;
        case "trial":
          version.value = "体验版" + info.version;
          break;
        case "release":
          version.value = info.version;
          break;
      }
    };
    getVersion();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          leftIcon: "left",
          title: "个人中心"
        }),
        b: common_vendor.sr("form", "61d76cdf-1"),
        c: common_vendor.o(jcodeFormBack),
        d: common_vendor.p({
          title: "个人资料",
          formList: list.value
        }),
        e: common_vendor.o(($event) => getPhoneNumberBack("left")),
        f: common_vendor.o(($event) => getPhoneNumberBack("right", $event)),
        g: common_vendor.sr(changeMobilePopup, "61d76cdf-2", {
          "k": "changeMobilePopup"
        }),
        h: common_vendor.p({
          type: "buttonSlot",
          message: "您确认更换当前" + mobile.value + "的手机号吗？"
        }),
        i: common_vendor.t(version.value)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-61d76cdf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/memberSetting.js.map
