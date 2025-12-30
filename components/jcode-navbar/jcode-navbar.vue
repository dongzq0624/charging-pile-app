<!-- 顶部状态栏 -->
<template>
	<view v-if="leftIcon=='slot'">
		<uni-nav-bar ref="navbar" @clickLeft="onLeftClick" :color="color" IconSize="50rpx" fontSize="32rpx"
			:borderColor="borderColor" :border="border" :rightText="rightText" :rightIcon="rightIcon" :fixed="true"
			:statusBar="statusBar" :left-icon="leftIcon" :background-color="backgroundColor" :height="height" 
			:shadow="shadow" :backgroundImage="backgroundImage" :currentPageIndex="currentPageIndex" :title="title">
			<slot></slot>
		</uni-nav-bar>
	</view>

	<view v-else>
		<!-- <view style="backgroundColor:rgba(248, 248, 248,1);"></view> -->
		<uni-nav-bar ref="navbar" @clickLeft="onLeftClick" :color="color" IconSize="50rpx" fontSize="32rpx"
			:borderColor="borderColor" :border="border" :rightText="rightText" :rightIcon="rightIcon" :fixed="true"
			:statusBar="statusBar" :left-icon="leftIcon" :background-color="backgroundColor"
			:backgroundImage="backgroundImage" :currentPageIndex="currentPageIndex" :title="title"></uni-nav-bar>

		<!-- <jcode-dialog ref="outPopup" @popupBack="popupBack" type="dialog" :message="dialog.message"></jcode-dialog> -->
	</view>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance } from 'vue'

	import {
		onLoad
	} from "@dcloudio/uni-app"

	const {
		proxy
	} = getCurrentInstance();

	//子组件中接收
	const props = defineProps({
		// 图标和字体颜色
		color: {
			type: String,
			default: '#000000'
		},

		// 标题,默认为空
		title: {
			type: String,
			default: ''
		},

		// 导航栏背景色
		backgroundColor: {
			type: String,
			default: 'transparent'
		},

		// 是否开启右侧状态栏
		statusBar: {
			type: Boolean,
			default: true
		},

		// 是否要底部边框
		border: {
			type: Boolean,
			default: false
		},

		// 底部边框颜色
		borderColor: {
			type: String,
			default: ''
		},

		// 左侧图标
		leftIcon: {
			type: String,
			default: ''
		},

		// 右侧按钮图标
		rightIcon: {
			type: String,
			default: ''
		},

		// 右侧按钮文字,不可与右侧图标共用,如需都使用，请使用 right 插槽自定义
		rightText: {
			type: String,
			default: ''
		},

		//页面是否进行未保存退出的提示
		editSign: {
			type: Boolean,
			default: false
		},

		height: {
			type: String,
			default: '44px'
		},

		shadow: {
			type: Boolean,
			default: false
		},
		backgroundImage:{
			type:String,
			default:'linear-gradient(91deg, #FAE3C4 0%, #F8F6F7 99%);',
		}
	})


	onLoad(async () => {
		// 获取当前页面栈数组
		const pages = getCurrentPages();
		// 当前页面是数组中的最后一个，即pages.length - 1
		currentPageIndex.value = pages.length - 1;
		// 打印当前页面索引
		console.log('当前页面是第' + currentPageIndex.value + '个页面')
	})

	const currentPageIndex = ref(0);
	const popup = ref()
	// defineEmits明确事件定义
	const emit = defineEmits(["onLeftClick", "selectAddressBack"])
	const dialog = ref({
		message: ''
	})

	// 点击左侧图标
	const onLeftClick = () => {
		if (props.leftIcon == 'gear') {
			uni.navigateTo({
				url: '/pages/admin1Pages/myPages/setting/sysSetting/index'
			})
		}

		if (props.editSign == true) {
			// props.dialog.message = '确定不保存退出？'
			// props.$refs.outPopup.open()
			return
		}

		if (props.leftIcon === 'left' && currentPageIndex.value != 0) return uni.navigateBack()

		if (props.leftIcon === 'close') return uni.exitMiniProgram()

		if ((props.leftIcon === 'home' ||  currentPageIndex.value == 0 ) && props.leftIcon != '') return uni.reLaunch({
			url: '/pages/tabBar/home/home'
		})

		emit('onLeftClick')
	}

	const popupBack = (e) => {
		if (e == 'cancel') {

		} else if (e == 'confirm') {

			return uni.navigateBack()
		}
	}

	defineExpose({
		// open, close
	})
</script>

<style lang="scss" scoped>
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}
</style>