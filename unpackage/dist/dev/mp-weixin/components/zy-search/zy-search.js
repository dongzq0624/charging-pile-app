"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "zy-search",
  props: {
    focus: {
      //是否自动获取焦点
      type: Boolean,
      default: false
    },
    theme: {
      //选择块级显示还是圆形显示
      type: String,
      default: "block"
    },
    showWant: {
      //是否展示推荐菜单
      type: Boolean,
      default: false
    },
    hotList: {
      //推荐列表数据
      type: Array,
      default() {
        return [];
      }
    },
    speechEngine: {
      //语音引擎=>讯飞:iFly,百度:'baidu'
      type: String,
      default: "baidu"
    },
    inputPlaceholder: {
      type: String,
      default: "请输入关键词搜索"
    }
  },
  data() {
    return {
      showHis: false,
      searchText: "",
      //搜索关键词
      hList: common_vendor.index.getStorageSync("search_cache")
      //历史记录
    };
  },
  methods: {
    searchStart: function() {
      let _this = this;
      if (!_this.searchText) {
        _this.$emit("getSearchText", _this.searchText);
        return;
      }
      _this.$emit("getSearchText", _this.searchText);
      common_vendor.index.getStorage({
        key: "search_cache",
        success(res) {
          let list = res.data;
          if (list.length > 5) {
            for (let item of list) {
              if (item == _this.searchText) {
                return;
              }
            }
            list.pop();
            list.unshift(_this.searchText);
          } else {
            for (let item of list) {
              if (item == _this.searchText) {
                return;
              }
            }
            list.unshift(_this.searchText);
          }
          _this.hList = list;
          common_vendor.index.setStorage({
            key: "search_cache",
            data: _this.hList
          });
        },
        fail() {
          _this.hList = [];
          _this.hList.push(_this.searchText);
          common_vendor.index.setStorage({
            key: "search_cache",
            data: _this.hList
          });
          _this.$emit("getSearchText", _this.searchText);
        }
      });
    },
    clear() {
      this.searchText = "";
    },
    keywordsClick(item) {
      this.searchText = item;
      this.searchStart();
    },
    delhistory() {
      this.hList = [];
      common_vendor.index.setStorage({
        key: "search_cache",
        data: []
      });
    },
    startRecognize: function() {
      let _this = this;
      let options = {};
      options.engine = _this.speechEngine;
      options.punctuation = false;
      options.timeout = 10 * 1e3;
      plus.speech.startRecognize(options, function(s) {
        _this.searchText = _this.searchText + s;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.focus,
    b: common_vendor.o(($event) => $options.searchStart()),
    c: $props.inputPlaceholder,
    d: common_vendor.o(($event) => $data.showHis = true),
    e: common_vendor.o(($event) => $data.showHis = false),
    f: $data.searchText,
    g: common_vendor.o(common_vendor.m(($event) => $data.searchText = $event.detail.value, {
      trim: true
    })),
    h: common_assets._imports_0$15,
    i: common_vendor.o(($event) => $options.searchStart()),
    j: $data.searchText
  }, $data.searchText ? {
    k: common_vendor.o(($event) => $options.clear()),
    l: common_vendor.p({
      type: "clear",
      color: "gray",
      size: "24"
    })
  } : {}, {
    m: $data.hList.length > 0 && $data.showHis
  }, $data.hList.length > 0 && $data.showHis ? {
    n: common_assets._imports_1$6,
    o: common_vendor.o((...args) => $options.delhistory && $options.delhistory(...args)),
    p: common_vendor.f($data.hList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.keywordsClick(item), index)
      };
    }),
    q: common_vendor.n("s-" + $props.theme)
  } : {}, {
    r: $props.showWant
  }, $props.showWant ? {
    s: common_vendor.f($props.hotList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.keywordsClick(item), index)
      };
    }),
    t: common_vendor.n("wanted-" + $props.theme)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-11ab4269"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/zy-search/zy-search.js.map
