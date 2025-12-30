"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const common_assets = require("../../../../../common/assets.js");
const _sfc_main = {
  __name: "MemberInfo",
  setup(__props) {
    common_vendor.ref();
    const avatar = common_vendor.ref("");
    const nickName = common_vendor.ref("");
    const id = common_vendor.ref();
    const mobile = common_vendor.ref("");
    const initView = () => {
      common_vendor.index.__f__("log", "at pages/tabBar/user/components/MemberInfo/MemberInfo.vue:46", "member onShow");
      id.value = common_vendor.index.getStorageSync("member_id") || "";
      avatar.value = common_vendor.index.getStorageSync("member_avatar") || "";
      nickName.value = common_vendor.index.getStorageSync("member_nickName") || "";
      mobile.value = common_vendor.index.getStorageSync("member_mobile") || "";
      common_vendor.index.__f__("log", "at pages/tabBar/user/components/MemberInfo/MemberInfo.vue:51", "avatar.value", avatar.value);
      common_vendor.index.__f__("log", "at pages/tabBar/user/components/MemberInfo/MemberInfo.vue:52", "avatar.value", nickName.value);
    };
    common_vendor.onShow(() => {
      initView();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: id.value
      }, id.value ? common_vendor.e({
        b: avatar.value
      }, avatar.value ? {
        c: avatar.value
      } : {
        d: common_assets._imports_0$12
      }, {
        e: common_vendor.t(nickName.value),
        f: common_vendor.t(id.value),
        g: common_vendor.o(($event) => _ctx.copyText(id.value))
      }) : {
        h: common_assets._imports_1$5,
        i: common_vendor.o(($event) => _ctx.navTo(`/pages/login/login`)),
        j: common_vendor.o(($event) => _ctx.navTo(`/pages/login/login`))
      }, {
        k: id.value
      }, id.value ? {
        l: common_vendor.t(mobile.value || "未绑定手机号"),
        m: common_assets._imports_2$4,
        n: common_vendor.o(($event) => _ctx.navTo(`/pages/setting/memberSetting`))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-263e9645"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages/tabBar/user/components/MemberInfo/MemberInfo.js.map
