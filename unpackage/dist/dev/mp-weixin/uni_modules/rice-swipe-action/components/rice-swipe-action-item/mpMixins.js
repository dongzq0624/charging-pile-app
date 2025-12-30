"use strict";
const mpMixins = {
  virtualHost: true,
  name: "riceSwipeActionItem",
  props: {
    name: {
      type: [String, Number],
      default: ""
    },
    leftMenu: {
      type: Array,
      default: () => []
    },
    rightMenu: {
      type: Array,
      default: () => []
    },
    iosStyle: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 300
    },
    modelValue: {
      type: String,
      default: "none"
    },
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
    return {
      show: "none",
      opened: false,
      resizeDom: false
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.show = newVal || "none";
      },
      immediate: true
    }
  },
  computed: {
    hasLeftAction() {
      return this.leftMenu.length > 0 || this.$slots.left;
    },
    hasRightAction() {
      return this.rightMenu.length > 0 || this.$slots.right;
    }
  },
  methods: {
    /**
     * 重新获取尺寸
     */
    resize() {
      this.resizeDom = true;
    },
    unresize() {
      this.resizeDom = false;
    },
    /**
     * 获取唯一的id
     */
    getDomId() {
      return "id" + String(Math.random()).slice(10);
    },
    /**
     * 关闭单元格
     */
    close() {
      if (this.opened) {
        this.opened = false;
        this.$emit("close", {
          name: this.name
        });
      }
      this.$emit("update:modelValue", "none");
      this.show = "none";
    },
    /**
     * 打开单元格
     */
    open(direction = "right") {
      this.closeSwipe();
      if (this.disabled)
        return;
      if (direction == "right" && !this.hasRightAction)
        return;
      if (direction == "left" && !this.hasLeftAction)
        return;
      if (!this.opened) {
        this.opened = true;
        this.$emit("open", {
          direction,
          name: this.name
        });
      }
      this.$emit("update:modelValue", direction);
      this.show = direction;
    },
    /**
     * 单元格点击
     */
    menuClick(index, direction) {
      if (this.autoClose) {
        this.close();
      }
      this.$emit("menuClick", {
        index,
        direction,
        name: this.name
      });
    },
    /**
     * 内容点击
     */
    contentClick() {
      if (this.autoClose) {
        this.close();
      }
      this.$emit("contentClick", {
        name: this.name
      });
    },
    /**
     * 关闭同组中的其他action
     */
    closeSwipe() {
      if (this.swipeaction) {
        this.swipeaction.closeOther(this);
      }
    },
    /**
     * 获取父实例
     */
    getSwipeAction() {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName != "riceSwipeAction") {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    /**
     * uninstall
     */
    uninstall() {
      var _a;
      if (this.swipeaction) {
        (_a = this.swipeaction.children) == null ? void 0 : _a.forEach((item, index) => {
          if (item === this)
            this.swipeaction.children.splice(index, 1);
        });
      }
    }
  },
  created() {
    var _a;
    this.swipeaction = this.getSwipeAction();
    if ((_a = this.swipeaction) == null ? void 0 : _a.children) {
      this.swipeaction.children.push(this);
    }
  },
  unmounted() {
    this.uninstall();
  }
};
exports.mpMixins = mpMixins;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/rice-swipe-action/components/rice-swipe-action-item/mpMixins.js.map
