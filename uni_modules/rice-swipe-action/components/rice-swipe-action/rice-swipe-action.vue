<template>
	<view :style="customStyle">
		<slot></slot>
	</view>
</template>


<script>
	/**
	 * swipr-action 滑动单元格
	 * @description  滑动单元格
	 * @property {Boolean} autoClose 是否关闭同组中的其他单元格
	 * @property {Object|String} customStyle 自定义style样式
	 */
	export default {
		name: 'riceSwipeAction',
		// #ifdef MP-WEIXIN
		virtualHost: true,
		// #endif
		props: {
			autoClose: {
				type: Boolean,
				default: true
			},
			customStyle: {
				type: [Object, String],
				default: () => ({})
			},
		},
		data() {
			return {}
		},

		methods: {
			/**
			 * 关闭同组中所有打开的action
			 */
			closeAll() {
				this.children.forEach(vm => {
					if (vm) vm.show = 'none'
				})
			},
			/**
			 * 关闭同组中的其他action
			 */
			closeOther(vm) {
				if (!this.autoClose) return
				if (this.openItem && this.openItem !== vm) {
					this.openItem.show = 'none'
				}
				//记录上一个打开的 swipe-action-item实例
				this.openItem = vm

			},
		},

		created() {
			this.openItem = null
			this.children = []
		}
	}
</script>

<style scoped lang="scss">

</style>