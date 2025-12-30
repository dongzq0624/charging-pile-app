"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  _easycom_jcode_navbar2();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
if (!Math) {
  _easycom_jcode_navbar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recharge",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const money = common_vendor.ref(null);
    const endChargeMoney = common_vendor.ref(10);
    const maxlength = common_vendor.ref(10);
    const moneyList = common_vendor.ref([{
      "id": 0,
      "money": 10
    }, {
      "id": 1,
      "money": 20
    }, {
      "id": 2,
      "money": 30
    }, {
      "id": 3,
      "money": 50
    }, {
      "id": 4,
      "money": 100
    }, {
      "id": 5,
      "money": 200
    }]);
    const activeIndex = common_vendor.ref(0);
    const focus = () => {
      activeIndex.value = -1;
    };
    const blur = () => {
      if (money.value) {
        money.value = proxy.numFilter(money.value, 2);
        endChargeMoney.value = proxy.numFilter(money.value, 2);
      } else {
        activeIndex.value = 0;
      }
    };
    const checkNum = (e) => {
      let value = e.detail.value;
      let dot = value.indexOf(".");
      let reg = /^[0-9]+$/;
      if (dot > -1) {
        maxlength.value = dot + 3;
      }
      if (reg.test(value)) {
        maxlength.value = 6;
      }
    };
    const selectMoney = (index) => {
      activeIndex.value = index;
      money.value = "";
      endChargeMoney.value = moneyList.value[index].money;
    };
    common_vendor.onShow(() => {
      proxy.refreshWallet();
    });
    common_vendor.onLoad(async (option) => {
    });
    const toWalletRecord = (e) => {
      common_vendor.index.navigateTo({
        url: `/pages/wallet/walletRecord/walletRecord?tabStartIndex=${e}`
      });
    };
    const rechargePay = async () => {
      if (endChargeMoney.value <= 0)
        return;
      const businessNoRes = await getRechargeOrderNo();
      var businessNo = businessNoRes.data.orderNo;
      var data = {
        businessNo,
        memberId: common_vendor.index.getStorageSync("member_id"),
        payAmount: endChargeMoney.value,
        orderType: "1",
        orderStatus: "1",
        amount: endChargeMoney.value
      };
      const res = await creatWalletPayOrder(data);
      if (res.code == 0) {
        const res2 = await proxy.walletPay("钱包充值", businessNo, endChargeMoney.value, "1002");
        if (res2) {
          proxy.navTo(`/pages/wallet/success/success?navbarTitle=充值成功&message=可在我的钱包中查看`);
        }
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "充值",
          leftIcon: "left"
        }),
        b: common_assets._imports_0$4,
        c: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.amount, 2)),
        d: common_vendor.o(($event) => toWalletRecord(0)),
        e: common_vendor.o(($event) => toWalletRecord(1)),
        f: common_vendor.o(($event) => toWalletRecord(2)),
        g: common_vendor.o([($event) => money.value = $event.detail.value, checkNum]),
        h: maxlength.value,
        i: common_vendor.o(blur),
        j: common_vendor.o(focus),
        k: money.value,
        l: common_vendor.f(moneyList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.money),
            b: index,
            c: common_vendor.n(activeIndex.value == index ? "active" : ""),
            d: common_vendor.o(($event) => selectMoney(index), index)
          };
        }),
        m: common_vendor.o(($event) => _ctx.noMultipleClicks(rechargePay))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-25615b45"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wallet/recharge/recharge.js.map
