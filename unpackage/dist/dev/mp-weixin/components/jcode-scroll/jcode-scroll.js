"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_jcode_empty2 = common_vendor.resolveComponent("jcode-empty");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_jcode_empty2 + _easycom_uni_load_more2)();
}
const _easycom_jcode_empty = () => "../jcode-empty/jcode-empty.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_jcode_empty + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "jcode-scroll",
  props: {
    type: {
      type: String,
      default: ""
    },
    scrollHeight: {
      type: String,
      default: "200px"
    },
    navTextList: {
      type: [Array, String],
      default: []
    },
    tabStartIndex: {
      type: Number,
      default: 0
    },
    queryInfo: {
      type: Object,
      default: {
        pageNum: 1,
        pageSize: 5
      }
    },
    emptyText: {
      type: String,
      default: "数据为空"
    },
    refresherEnabled: {
      type: Boolean,
      default: true
    },
    scrollY: {
      type: Boolean,
      default: true
    }
  },
  emits: ["getData", "backData"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const data = common_vendor.ref({
      loaded: false,
      loadingType: "more",
      totalPage: 0,
      isEmpty: false,
      triggered: false,
      list: []
    });
    const navList = common_vendor.ref([]);
    const changeSign = common_vendor.ref(false);
    const tabCurrentIndex = common_vendor.ref(0);
    const currentPageNum = common_vendor.ref(null);
    common_vendor.watch(() => props.tabStartIndex, (newValue) => {
      initView();
    }, { deep: true });
    common_vendor.onLoad(() => {
      common_vendor.index.__f__("log", "at components/jcode-scroll/jcode-scroll.vue:116", "scroll onLoad");
      initView();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.__f__("log", "at components/jcode-scroll/jcode-scroll.vue:121", "scroll onUnload");
    });
    const initView = () => {
      navList.value = [];
      if (props.type == "navList") {
        tabCurrentIndex.value = props.tabStartIndex;
        common_vendor.index.__f__("log", "at components/jcode-scroll/jcode-scroll.vue:128", "props.tabStartIndex", props.tabStartIndex);
        props.navTextList.forEach((item) => {
          var info = {
            pageNum: props.queryInfo.pageNum,
            pageSize: props.queryInfo.pageSize
          };
          var pushData = {
            ...data.value,
            queryInfo: info,
            text: item
          };
          navList.value.push(pushData);
        });
      }
      silentRefresh();
    };
    const silentRefresh = () => {
      getData(true, false);
    };
    const getData = (fresh, load) => {
      if (props.type == "navList") {
        if (!navList.value[tabCurrentIndex.value].loaded || fresh) {
          if (load)
            common_vendor.index.showLoading({
              title: "加载中...",
              mask: true
            });
          setTimeout(() => {
            emit("getData", {
              queryInfo: navList.value[tabCurrentIndex.value].queryInfo,
              tabCurrentIndex: tabCurrentIndex.value
            });
          }, 500);
        } else {
          changeSign.value = false;
          emit("backData", {
            tabCurrentIndex: tabCurrentIndex.value,
            list: navList.value[tabCurrentIndex.value].list
          });
        }
      } else {
        if (!data.value.loaded || fresh) {
          if (load)
            common_vendor.index.showLoading({
              title: "加载中...",
              mask: true
            });
          setTimeout(() => {
            emit("getData", props.queryInfo);
          }, 500);
        }
      }
    };
    const backData = (e) => {
      var _a, _b, _c, _d;
      common_vendor.index.hideLoading();
      if (props.type == "navList") {
        changeSign.value = false;
        navList.value[tabCurrentIndex.value].list = navList.value[tabCurrentIndex.value].queryInfo.pageNum === 1 ? e.rows || e.data.list : navList.value[tabCurrentIndex.value].list.concat(e.rows || e.data.list);
        emit("backData", {
          list: navList.value[tabCurrentIndex.value].list,
          tabCurrentIndex: tabCurrentIndex.value
        });
        navList.value[tabCurrentIndex.value].totalPage = ceilDivision(
          e.total || e.data.totalRow,
          navList.value[tabCurrentIndex.value].queryInfo.pageSize
        );
        navList.value[tabCurrentIndex.value].isEmpty = (e.total || e.data.totalRow) == 0;
        navList.value[tabCurrentIndex.value].loadingType = "more";
        navList.value[tabCurrentIndex.value].loaded = true;
        navList.value[tabCurrentIndex.value].triggered = false;
      } else {
        if (props.queryInfo.pageNum == currentPageNum.value && props.queryInfo.pageNum != 1)
          return;
        currentPageNum.value = props.queryInfo.pageNum;
        data.value.list = props.queryInfo.pageNum === 1 ? e.rows || ((_a = e.data) == null ? void 0 : _a.list) : data.value.list.concat(e.rows || ((_b = e.data) == null ? void 0 : _b.list));
        emit("backData", data.value.list);
        data.value.totalPage = ceilDivision(
          e.total || ((_c = e.data) == null ? void 0 : _c.totalRow),
          props.queryInfo.pageSize
        );
        data.value.isEmpty = (e.total || ((_d = e.data) == null ? void 0 : _d.totalRow)) == 0;
        data.value.loadingType = "more";
        data.value.loaded = true;
        data.value.triggered = false;
        common_vendor.index.__f__("log", "at components/jcode-scroll/jcode-scroll.vue:218", "data.value.totalPage", data.value.totalPage);
      }
    };
    const scrolltolower = () => {
      if (props.type == "navList") {
        if (navList.value[tabCurrentIndex.value].queryInfo.pageNum === navList.value[tabCurrentIndex.value].totalPage) {
          navList.value[tabCurrentIndex.value].loadingType = "noMore";
          return;
        }
        navList.value[tabCurrentIndex.value].queryInfo.pageNum += 1;
        navList.value[tabCurrentIndex.value].loadingType = "loading";
      } else {
        common_vendor.index.__f__("log", "at components/jcode-scroll/jcode-scroll.vue:232", "eqwqweqwe");
        if (props.queryInfo.pageNum === data.value.totalPage) {
          data.value.loadingType = "noMore";
          return;
        }
        props.queryInfo.pageNum += 1;
        data.value.loadingType = "loading";
      }
      setTimeout(() => {
        getData(true, false);
      }, 500);
    };
    const refresherrefresh = () => {
      if (props.type == "navList") {
        navList.value[tabCurrentIndex.value].triggered = true;
        navList.value[tabCurrentIndex.value].queryInfo.pageNum = 1;
      } else {
        data.value.triggered = true;
        props.queryInfo.pageNum = 1;
      }
      getData(true);
    };
    const changeTab = (e) => {
      changeSign.value = true;
      tabCurrentIndex.value = e.target.current;
      getData();
    };
    const tabClick = (index) => {
      tabCurrentIndex.value = index;
    };
    const ceilDivision = (dividend, divisor) => {
      return Math.ceil(dividend / divisor);
    };
    __expose({
      refresherrefresh,
      backData,
      getData,
      silentRefresh,
      initView,
      tabClick
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.type == ""
      }, __props.type == "" ? common_vendor.e({
        b: data.value.loaded && data.value.isEmpty
      }, data.value.loaded && data.value.isEmpty ? {
        c: common_vendor.p({
          emptyText: __props.emptyText
        })
      } : {}, {
        d: data.value.loaded && !data.value.isEmpty && data.value.totalPage > 1
      }, data.value.loaded && !data.value.isEmpty && data.value.totalPage > 1 ? {
        e: common_vendor.p({
          status: data.value.loadingType
        })
      } : {}, {
        f: __props.scrollHeight,
        g: __props.scrollY,
        h: __props.refresherEnabled,
        i: data.value.triggered,
        j: common_vendor.o(refresherrefresh),
        k: common_vendor.o(scrolltolower)
      }) : __props.type == "navList" ? {
        m: common_vendor.f(navList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index,
            c: tabCurrentIndex.value === index ? 1 : "",
            d: common_vendor.o(($event) => tabClick(index), index)
          };
        }),
        n: common_vendor.f(navList.value, (tabItem, tabIndex, i0) => {
          return common_vendor.e({
            a: tabItem.loaded && tabItem.isEmpty
          }, tabItem.loaded && tabItem.isEmpty ? {
            b: "a00d1c4d-2-" + i0,
            c: common_vendor.p({
              emptyText: __props.emptyText
            })
          } : {}, changeSign.value ? {} : common_vendor.e({
            d: tabIndex == tabCurrentIndex.value
          }, tabIndex == tabCurrentIndex.value ? {} : {}, {
            e: tabIndex == tabCurrentIndex.value && tabItem.loaded && !tabItem.isEmpty && tabItem.totalPage > 1
          }, tabIndex == tabCurrentIndex.value && tabItem.loaded && !tabItem.isEmpty && tabItem.totalPage > 1 ? {
            f: "a00d1c4d-3-" + i0,
            g: common_vendor.p({
              status: tabItem.loadingType
            })
          } : {}), {
            h: tabItem.triggered,
            i: common_vendor.o(refresherrefresh, tabIndex),
            j: common_vendor.o(scrolltolower, tabIndex),
            k: tabIndex
          });
        }),
        o: changeSign.value,
        p: tabCurrentIndex.value,
        q: `calc(` + __props.scrollHeight + ` - 40px)`,
        r: common_vendor.o(changeTab)
      } : {}, {
        l: __props.type == "navList"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a00d1c4d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jcode-scroll/jcode-scroll.js.map
