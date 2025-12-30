"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_jcode_navbar2 = common_vendor.resolveComponent("jcode-navbar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_jcode_dialog2 = common_vendor.resolveComponent("jcode-dialog");
  (_easycom_jcode_navbar2 + _easycom_uni_icons2 + _easycom_jcode_dialog2)();
}
const _easycom_jcode_navbar = () => "../../../components/jcode-navbar/jcode-navbar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_jcode_dialog = () => "../../../components/jcode-dialog/jcode-dialog.js";
if (!Math) {
  (_easycom_jcode_navbar + _easycom_uni_icons + _easycom_jcode_dialog)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "readyToCharge",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const qrGunNo = common_vendor.ref("");
    const chargeStation = common_vendor.ref({
      isFast: "0",
      stationName: "测试站",
      distance: 22.11
    });
    common_vendor.ref([]);
    const degreeSettingFeeList = common_vendor.ref([
      {
        startTime: "00:00",
        endTime: "07:59",
        serviceFee: 0.45,
        elecPrice: 0.09,
        elecType: "平期"
      },
      {
        startTime: "08:00",
        endTime: "12:59",
        serviceFee: 0.95,
        elecPrice: 0.09,
        elecType: "峰期"
      },
      {
        startTime: "13:00",
        endTime: "20:59",
        serviceFee: 0.25,
        elecPrice: 0.09,
        elecType: "谷期"
      },
      {
        startTime: "21:00",
        endTime: "23:59",
        serviceFee: 1.45,
        elecPrice: 0.09,
        elecType: "尖期"
      }
    ]);
    common_vendor.ref(0);
    const strategyDict = common_vendor.ref([
      {
        dictLabel: "充满为止",
        remark: "充满后自动断电"
      },
      {
        dictLabel: "充电时长",
        remark: "自定义充电时长"
      },
      {
        dictLabel: "充电电量",
        remark: "自定义充电电量"
      },
      {
        dictLabel: "充电均衡",
        remark: "电量均衡"
      }
    ]);
    common_vendor.ref([]);
    common_vendor.ref();
    const pileMsgDialogRef = common_vendor.ref();
    const pileMsg = common_vendor.ref("");
    const rechargeDialogRef = common_vendor.ref();
    const rechargeMsg = common_vendor.ref("");
    common_vendor.ref();
    const feesDialogRef = common_vendor.ref();
    common_vendor.onShow(async () => {
      proxy.refreshWallet();
    });
    common_vendor.onLoad(async (option) => {
      if (option.result)
        qrGunNo.value = decodeURIComponent(option.result);
      else
        qrGunNo.value = option.id;
    });
    const chargeDialogRef = common_vendor.ref();
    const tipDialogRef = common_vendor.ref();
    const chargeDialogTheme = common_vendor.ref("");
    const chargeStrategyType = common_vendor.ref(0);
    const chargeStrategyValue = common_vendor.ref("");
    const chargeDialogPlaceholder = common_vendor.ref("");
    const chargeDate = common_vendor.ref({});
    const toCharge = (e) => {
      switch (e) {
        case 0:
          chargeDate.value = {
            qrGunNo: qrGunNo.value,
            source: common_vendor.index.getStorageSync("uniPlatform") == "mp-weixin" ? 1 : 2,
            strategyType: e.dictValue
          };
          tipDialogRef.value.open();
          break;
        case 1:
          chargeDialogTheme.value = e.remark;
          chargeDialogPlaceholder.value = "请输入充电时长（小时）";
          chargeStrategyType.value = e.dictValue;
          chargeStrategyValue.value = "";
          chargeDialogRef.value.open();
          break;
        case 2:
          chargeDialogTheme.value = e.remark;
          chargeDialogPlaceholder.value = "请输入充电电量（度）";
          chargeStrategyType.value = e.dictValue;
          chargeStrategyValue.value = "";
          chargeDialogRef.value.open();
          break;
        case 3:
          chargeDate.value = {
            qrGunNo: qrGunNo.value,
            source: common_vendor.index.getStorageSync("uniPlatform") == "mp-weixin" ? 1 : 2,
            strategyType: e.dictValue
          };
          tipDialogRef.value.open();
          break;
      }
    };
    const chargeDialogRefBack = (e) => {
      if (e == "right") {
        if (!chargeStrategyValue.value) {
          proxy.msg("请正确输入");
          return;
        }
        chargeDate.value = {
          qrGunNo: qrGunNo.value,
          source: common_vendor.index.getStorageSync("uniPlatform") == "mp-weixin" ? 1 : 2,
          strategyType: chargeStrategyType.value,
          strategyValue: chargeStrategyValue.value
        };
        tipDialogRef.value.open();
      }
      chargeDialogRef.value.close();
    };
    const tipDialogButtonBack = (e) => {
      tipDialogRef.value.close();
      if (e == "right") {
        startCharge();
      }
    };
    const startCharge = () => {
      proxy.showLoading();
      setTimeout(() => {
        proxy.hideLoading();
        var id = "123";
        proxy.redTo(`/sub_charging/charge/charging/charging?id=${id}`);
      }, 1e3);
    };
    const rechargeDialogButtonBack = (e) => {
      rechargeDialogRef.value.close();
      if (e == "right") {
        proxy.navTo("/pages/wallet/recharge/recharge");
      }
    };
    function getCurrentPrice() {
      return 1.1;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          leftIcon: "left",
          title: "准备充电"
        }),
        b: chargeStation.value.isFast == 0
      }, chargeStation.value.isFast == 0 ? {} : {}, {
        c: common_vendor.t(chargeStation.value.stationName),
        d: chargeStation.value.distance
      }, chargeStation.value.distance ? {
        e: common_vendor.p({
          type: "location",
          color: "gray",
          size: "20"
        }),
        f: common_vendor.t(_ctx.numFilter(chargeStation.value.distance, 1))
      } : {}, {
        g: common_vendor.t(qrGunNo.value),
        h: common_vendor.t(_ctx.numFilter(getCurrentPrice(), 2)),
        i: common_vendor.o(($event) => feesDialogRef.value.open()),
        j: common_assets._imports_0$4,
        k: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.amount || 0, 2)),
        l: common_vendor.t(_ctx.numFilter(_ctx.memberWallet.giftAmount || 0, 2)),
        m: common_vendor.t(_ctx.numFilter(0, 2)),
        n: common_vendor.o(($event) => _ctx.navTo(`/pages/wallet/recharge/recharge`)),
        o: common_vendor.o(($event) => _ctx.navTo(`/pages/wallet/walletRecord/walletRecord`)),
        p: common_vendor.o(($event) => _ctx.navTo(`/pages/wallet/withdrawal/withdrawal`)),
        q: common_vendor.f(strategyDict.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.dictLabel),
            b: common_vendor.t(item.remark),
            c: common_vendor.o(($event) => toCharge(index), index),
            d: index
          };
        }),
        r: common_vendor.sr(pileMsgDialogRef, "5772c08d-2", {
          "k": "pileMsgDialogRef"
        }),
        s: common_vendor.o(($event) => _ctx.back()),
        t: common_vendor.p({
          type: "singleButton",
          singleButtonText: "返回",
          message: pileMsg.value
        }),
        v: common_vendor.sr(tipDialogRef, "5772c08d-3", {
          "k": "tipDialogRef"
        }),
        w: common_vendor.o(tipDialogButtonBack),
        x: common_vendor.p({
          theme: "温馨提示",
          message: "尊敬的用户，请确认使用的充电枪与扫码主机为同一台设备，避免误操作为他人充电，造成不必要损失，谢谢。",
          rightButtonText: "立即充电"
        }),
        y: common_vendor.sr(rechargeDialogRef, "5772c08d-4", {
          "k": "rechargeDialogRef"
        }),
        z: common_vendor.o(rechargeDialogButtonBack),
        A: common_vendor.p({
          theme: "温馨提示",
          message: rechargeMsg.value,
          rightButtonText: "立即充值"
        }),
        B: common_vendor.f(degreeSettingFeeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.startTime),
            b: common_vendor.t(item.endTime),
            c: common_vendor.t(item.elecType),
            d: common_vendor.t(_ctx.numFilter(item.elecPrice, 2)),
            e: common_vendor.t(_ctx.numFilter(item.serviceFee, 2))
          };
        }),
        C: common_vendor.o(($event) => feesDialogRef.value.close()),
        D: common_vendor.sr(feesDialogRef, "5772c08d-5", {
          "k": "feesDialogRef"
        }),
        E: common_vendor.p({
          isMaskClick: true,
          type: "buttonSlot",
          theme: "费用标准"
        }),
        F: chargeDialogPlaceholder.value,
        G: chargeStrategyValue.value,
        H: common_vendor.o(($event) => chargeStrategyValue.value = $event.detail.value),
        I: common_vendor.sr(chargeDialogRef, "5772c08d-6", {
          "k": "chargeDialogRef"
        }),
        J: common_vendor.o(chargeDialogRefBack),
        K: common_vendor.p({
          isMaskClick: true,
          type: "contentSlot",
          theme: chargeDialogTheme.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5772c08d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/sub_charging/charge/readyToCharge/readyToCharge.js.map
