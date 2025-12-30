<template>
	<view class="tabbar-container">
		<!-- <view class="tuqi"></view> -->
		<view class="tabbar-item" v-for="(item, index) in tabbarList" :class="[item.centerItem ? ' center-item2' : '']"
			@click="changeItem(item,index)">
			<view v-if="item.centerItem"
				style="background-color: white;width: 140rpx;height: 140rpx;border-radius: 100%;z-index: 50;display: flex;justify-content: center;align-items: center;">
				<view class="item-top">
					<image :src="currentItem == item.id ? item.selectIcon : item.icon" mode="aspectFit"></image>
				</view>
			</view>
			<block v-else>
				<view :style="currentItem == item.id ?'    width: 85%;padding: 8rpx;border-radius: 10px;background: #FFF7F2;':''" style="width: ;">
					<view class="item-top">
						<image :src="currentItem == item.id ? item.selectIcon : item.icon" mode="aspectFit"></image>
					</view>
					<view class="item-bottom" v-if="item.text" :class="[currentItem == item.id ? 'item-active' : '']">
						<text>{{ item.text }}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>
<script setup>
	import {
		defineProps,
		onMounted,
		ref,
		getCurrentInstance
	} from "vue"

	import {
		onLoad
	} from "@dcloudio/uni-app"

	const {
		proxy,
		ctx
	} = getCurrentInstance();

	const props = defineProps({
		currentPage: {
			type: Number,
			default: 0
		}
	})
	const currentItem = ref(0);
	const tabbarList = ref([{
		id: 0,
		path: '/pages/tabBar/home/home',
		icon: '/static/images/tabBar/home1.png',
		selectIcon: '/static/images/tabBar/home2.png',
		text: '首页',
		centerItem: false
	},
	{
		id: 1,
		path: '/pages/tabBar/recharge/recharge',
		icon: '/static/images/tabBar/recharge1.png',
		selectIcon: '/static/images/tabBar/recharge2.png',
		text: '充值',
		centerItem: false
	},

	{
		id: 2,
		path: '',
		icon: '/static/images/tabBar/scan.png',
		selectIcon: '/static/images/tabBar/scan.png',
		// text: '扫码充电',
		centerItem: true
	},
	{
		id: 3,
		path: '/pages/tabBar/order/order',
		icon: '/static/images/tabBar/order1.png',
		selectIcon: '/static/images/tabBar/order2.png',
		text: '订单',
		centerItem: false
	},
	{
		id: 4,
		path: '/pages/tabBar/user/user',
		icon: '/static/images/tabBar/user1.png',
		selectIcon: '/static/images/tabBar/user2.png',
		text: '我的',
		centerItem: false
	}
	]);

	onLoad(async () => {
		const tabbar = await proxy.getViewHW('.tabbar-container')
		console.log('tabbar', tabbar)
	})

	onMounted(() => {
		currentItem.value = props.currentPage;
		// 非微信小程序需隐藏原生tabBar（微信小程序已通过"custom": true配置项隐藏原生tabbar）
		if (process.env.VUE_APP_PLATFORM != 'mp-weixin') {
			uni.hideTabBar()
		}
	});

	function changeItem(item, index) {
		if (index == 2) {
			if (uni.getStorageSync('member_id')) {
				uni.showActionSheet({
					itemList: ['扫一扫', '手动输入电桩编号'],
					success: function (res) {
						if (res.tapIndex == 0) {
							scanCode()
						}
						else if (res.tapIndex == 1) {
							uni.navigateTo({
								url: `/pages/scan/manualInput/manualInput`
							})
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});

			}
			else
				proxy.toLogin()
			
		} else if(index == 3){
			if(uni.getStorageSync('member_id')){
				uni.switchTab({
					url: item.path
				});
			}
			else{
				proxy.toLogin()
			}
		}
		else{
			uni.switchTab({
				url: item.path
			});
		}
	
	}

	const scanCode = () => {
		uni.scanCode({
			onlyFromCamera: false,
			scanType: ['qrCode'],
			success: function (res) {
				console.log('qrCode', res.result);
				proxy.isLoginToPage(`/sub_charging/charge/readyToCharge/readyToCharge?result=${res.result}`)
			},
			fail: function (res) {
				proxy.msg('未扫描到结果')
				console.log(res);
			}
		});
	}
</script>

<style scoped lang="scss">
	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.tabbar-container {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 55px;
		/* box-shadow: 0 0 5px    #8d6c36; */
		display: flex;
		align-items: center;
		color: gray;
		background-color: white;
		box-shadow: 0px 0px 14px 0px rgba(231, 160, 109, 0.2);

		.tabbar-item {
			width: 20%;
			// height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;

			.item-top {
				// width: 70rpx;
				// height: 70rpx;
				// padding: 10rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

		}

		.center-item2 {
			width: 20%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			margin-bottom: 30px;

			.item-top {
				z-index: 51;
				width: 110rpx;
				height: 110rpx;
				background-color: $uni-color-theme;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}

		.item-active {
			color: $uni-color-theme;
		}

		// .center-item {
		// 	display: block;
		// 	position: relative;

		// 	.item-top {
		// 		flex-shrink: 0;
		// 		width: 100rpx;
		// 		height: 100rpx;
		// 		padding: 20rpx;
		// 		position: absolute;
		// 		top: -30rpx;
		// 		left: calc((20vw - 100rpx)/2);
		// 		border-radius: 50%;
		// 		/* box-shadow: 0 0 5px #999; */
		// 		background-color: #f36e2f;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		border: 3px solid white;
		// 		z-index: 60;

		// 		image {
		// 			/* 		width: 60rpx;
		// 			height: 60rpx; */
		// 		}
		// 	}

		// 	.item-bottom {
		// 		position: absolute;
		// 		bottom: 0;
		// 	}
		// }

		.item-bottom {
			font-size: 24rpx;
			width: 100%;
			font-weight: bold
		}

	}

	/*省略部分代码*/
	.tuqi {
		position: fixed;
		left: calc(50vw - 97rpx);
		background-color: #fff;
		z-index: 50;
		height: 100rpx;
		width: 194rpx;
		-webkit-clip-path: path('M 50,0 Q 35,0 25,7.5 Q 20.5, 11.5 0, 15 V 50 H 100 V15 Q 79.5,11.5 75,7.5 Q 65,0 50,0 z');
		clip-path: path('M 50,0 Q 35,0 25,7.5 Q 20.5, 11.5 0, 15 V 50 H 100 V15 Q 79.5,11.5 75,7.5 Q 65,0 50,0 z');
		bottom: 40rpx;
	}

	/*省略部分代码*/
</style>