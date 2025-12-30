//在微信小程序中，app-vue和app-uvue共用这个mixins
export default {
	// #ifdef MP-WEIXIN
	virtualHost: true,
	// #endif
	name: "riceSwipeActionItem",
	props: {
		name: {
			type: [String, Number],
			default: ""
		},
		leftMenu: {
			type: Array,
			default: () => ([])
		},
		rightMenu: {
			type: Array,
			default: () => ([])
		},
		iosStyle: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false,
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
			default: true,
		},
		customStyle: {
			type: [Object, String],
			default: () => ({})
		},
	},
	data() {
		return {
			show: 'none',
			opened: false,
			resizeDom: false,
		}
	},
	watch: {
		modelValue: {
			handler(newVal) {
				this.show = newVal || 'none'
			},
			immediate: true
		},
	},
	computed: {
		hasLeftAction() {
			return this.leftMenu.length > 0 || this.$slots.left
		},
		hasRightAction() {
			return this.rightMenu.length > 0 || this.$slots.right
		},
	},
	methods: {
		/**
		 * 重新获取尺寸
		 */
		resize() {
			this.resizeDom = true
		},
		unresize() {
			this.resizeDom = false
		},
		/**
		 * 获取唯一的id
		 */
		getDomId() {
			return 'id' + String(Math.random()).slice(10)
		},




		/**
		 * 关闭单元格
		 */
		close() {
			if (this.opened) {
				this.opened = false
				this.$emit('close', {
					name: this.name
				})
			}
			this.$emit('update:modelValue', 'none')
			this.show = 'none'
		},

		/**
		 * 打开单元格
		 */
		open(direction = 'right') {
			this.closeSwipe()
			//其他值一律按照right处理
			direction == 'left' ? 'left' : 'right'
			if (this.disabled) return
			if (direction == 'right' && !this.hasRightAction) return
			if (direction == 'left' && !this.hasLeftAction) return
			if (!this.opened) {
				this.opened = true
				this.$emit('open', {
					direction,
					name: this.name
				})
			}
			this.$emit('update:modelValue', direction)
			this.show = direction
		},

		/**
		 * 单元格点击
		 */
		menuClick(index, direction) {
			if (this.autoClose) {
				this.close()
			}
			this.$emit('menuClick', {
				index,
				direction,
				name: this.name
			})
		},

		/**
		 * 内容点击
		 */
		contentClick() {
			if (this.autoClose) {
				this.close()
			}
			this.$emit('contentClick', {
				name: this.name
			})
		},


		/**
		 * 关闭同组中的其他action
		 */
		closeSwipe() {
			//调用父实例的方法
			if (this.swipeaction) {
				this.swipeaction.closeOther(this)
			}
		},

		/**
		 * 获取父实例
		 */
		getSwipeAction() {
			let parent = this.$parent
			let parentName = parent.$options.name;
			//1.h5端 view等内置标签是以 Vue 组件方式实现，$parent 会获取这些到内置组件，导致的问题是 this.$parent 与其他平台不一致
			//2.swipe-action组件下的第一级元素可能不是swipe-action-item
			while (parentName != 'riceSwipeAction') {
				parent = parent.$parent
				if (!parent) return false
				parentName = parent.$options.name;
			}
			return parent
		},

		// #ifdef UNI-APP-X

		/**
		 * style-为了兼容app-uvue
		 */
		getMenuStyle(style) {
			return style || {}
		},

		getMenuTextStyle() {
			return {}
		},

		// #endif

		/**
		 * uninstall
		 */
		uninstall() {
			if (this.swipeaction) {
				this.swipeaction.children?.forEach((item, index) => {
					if (item === this) this.swipeaction.children.splice(index, 1)
				})
			}
		},
	},
	created() {
		//swipeaction没有在data中进行定义，不会被 Vue 的响应式系统处理，可以减少不必要的开销
		this.swipeaction = this.getSwipeAction()
		if (this.swipeaction?.children) {
			this.swipeaction.children.push(this)
		}
	},
	unmounted() {
		this.uninstall()
	}
}