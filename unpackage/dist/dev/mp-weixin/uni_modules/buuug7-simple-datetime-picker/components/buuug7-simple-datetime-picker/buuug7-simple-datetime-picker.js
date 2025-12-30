"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "buuug7-simple-datetime-picker",
  props: {
    startYear: {
      type: Number,
      default: 2e3
    },
    endYear: {
      type: Number,
      default: 2099
    },
    timeLabel: {
      type: Array,
      default: () => ["年", "月", "日", "时", "分", "秒"]
    },
    timeHide: {
      type: Array,
      default: () => [true, true, true, true, true, false]
    },
    timeInit: {
      type: Number,
      default: (/* @__PURE__ */ new Date()).valueOf()
    }
  },
  data() {
    return {
      open: false,
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      seconds: [],
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      second: "",
      value: [0, 0, 0, 0, 0, 0],
      done: false
    };
  },
  computed: {
    currentDatetime() {
      return new Date(this.timeInit);
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    month() {
      this.initDays();
    }
  },
  methods: {
    init() {
      this.initYears();
      this.initMonths();
      this.initDays();
      this.initHours();
      this.initMinutes();
      this.initSeconds();
      this.setSelectValue();
      this.done = true;
    },
    initYears() {
      const years = [];
      for (let year = this.startYear; year <= this.endYear; year++) {
        years.push(year);
        if (this.currentDatetime.getFullYear() === year) {
          this.$set(this.value, 0, year - this.startYear);
        }
      }
      this.years = years;
    },
    initMonths() {
      const months = [];
      for (let month = 1; month <= 12; month++) {
        months.push(month);
        if (this.currentDatetime.getMonth() + 1 === month) {
          this.$set(this.value, 1, month - 1);
        }
      }
      this.months = months;
    },
    initDays() {
      const value = this.value;
      const selectedYear = this.years[value[0]];
      const selectedMonth = this.months[value[1]];
      const days = [];
      const totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
      for (let day = 1; day <= totalDays; day++) {
        days.push(day);
        if (this.currentDatetime.getDate() === day) {
          this.$set(value, 2, day - 1);
        }
      }
      this.days = days;
    },
    initHours() {
      const hours = [];
      for (let hour = 0; hour <= 23; hour++) {
        hours.push(hour);
        if (this.currentDatetime.getHours() === hour) {
          this.$set(this.value, 3, hour);
        }
      }
      this.hours = hours;
    },
    initMinutes() {
      const minutes = [];
      for (let minute = 0; minute < 60; minute++) {
        minutes.push(minute);
        if (this.currentDatetime.getMinutes() === minute) {
          this.$set(this.value, 4, minute);
        }
      }
      this.minutes = minutes;
    },
    initSeconds() {
      const seconds = [];
      for (let second = 0; second < 60; second++) {
        seconds.push(second);
        if (this.currentDatetime.getSeconds() === second) {
          this.$set(this.value, 5, second);
        }
      }
      this.seconds = seconds;
    },
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    },
    _onChange(e) {
      this.value = e.detail.value;
      this.setSelectValue();
    },
    setSelectValue() {
      const v = this.value;
      this.year = this.years[v[0]];
      this.month = this.months[v[1]];
      this.day = this.days[v[2]];
      this.hour = this.hours[v[3]];
      this.minute = this.minutes[v[4]];
      this.second = this.seconds[v[5]];
    },
    _onSubmit() {
      const {
        year,
        month,
        day,
        hour,
        minute,
        second,
        formatNum,
        timeHide,
        timeLabel
      } = this;
      const result = {
        year: timeHide[0] ? formatNum(year) : "",
        month: timeHide[1] ? formatNum(month) : "",
        day: timeHide[2] ? formatNum(day) : "",
        hour: timeHide[3] ? formatNum(hour) : "",
        minute: timeHide[4] ? formatNum(minute) : "",
        second: timeHide[5] ? formatNum(second) : ""
      };
      this.$emit("submit", result);
      this.hide();
    },
    formatNum(num) {
      return num < 10 ? "0" + num : num + "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.done
  }, $data.done ? common_vendor.e({
    b: $data.open ? 1 : "",
    c: common_vendor.o(() => {
    }),
    d: common_vendor.o(($event) => $data.open = false),
    e: common_vendor.o((...args) => $options._onSubmit && $options._onSubmit(...args)),
    f: common_vendor.o(() => {
    }),
    g: $props.timeHide[0]
  }, $props.timeHide[0] ? {
    h: common_vendor.f($data.years, (item, k0, i0) => {
      return {
        a: common_vendor.t(item + $props.timeLabel[0]),
        b: item
      };
    })
  } : {}, {
    i: $props.timeHide[1]
  }, $props.timeHide[1] ? {
    j: common_vendor.f($data.months, (item, k0, i0) => {
      return {
        a: common_vendor.t($options.formatNum(item) + $props.timeLabel[1]),
        b: item
      };
    })
  } : {}, {
    k: $props.timeHide[2]
  }, $props.timeHide[2] ? {
    l: common_vendor.f($data.days, (item, k0, i0) => {
      return {
        a: common_vendor.t($options.formatNum(item) + $props.timeLabel[2]),
        b: item
      };
    })
  } : {}, {
    m: $props.timeHide[3]
  }, $props.timeHide[3] ? {
    n: common_vendor.f($data.hours, (item, k0, i0) => {
      return {
        a: common_vendor.t($options.formatNum(item) + $props.timeLabel[3]),
        b: item
      };
    })
  } : {}, {
    o: $props.timeHide[4]
  }, $props.timeHide[4] ? {
    p: common_vendor.f($data.minutes, (item, k0, i0) => {
      return {
        a: common_vendor.t($options.formatNum(item) + $props.timeLabel[4]),
        b: item
      };
    })
  } : {}, {
    q: $props.timeHide[5]
  }, $props.timeHide[5] ? {
    r: common_vendor.f($data.seconds, (item, k0, i0) => {
      return {
        a: common_vendor.t($options.formatNum(item) + $props.timeLabel[5]),
        b: item
      };
    })
  } : {}, {
    s: $data.value,
    t: common_vendor.o((...args) => $options._onChange && $options._onChange(...args)),
    v: $data.open ? 1 : ""
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.js.map
