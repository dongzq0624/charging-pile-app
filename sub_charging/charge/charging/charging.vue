<template>
	<view class="whitePage" style="background-color: white;">
		<jcode-navbar leftIcon="left" title="充电中..." backgroundColor="transparent" background-image=""></jcode-navbar>
		<image class="topImg" :src="topImageUrl" :style="{width: '100%',marginTop:-navBarHeight+'px'}" mode="widthFix">
		</image>

		<view
			style="width: 95vw;display: grid;grid-template-columns: repeat(3, 1fr);gap: 20rpx;margin-top: 70rpx;font-size: 24rpx;">
			<view
				style="background-color: #F7F8F8;border-radius: 20rpx;justify-content: center;align-items: center;display: flex;flex-direction: column;padding: 30rpx;">
				<view>
					<span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.degree}}
					</span>度
				</view>
				<view style="color: #989898;display: flex;align-items: center;margin-top: 7rpx;">
					<image src="/static/images/charge/item1.svg" mode="heightFix"
						style="height: 25rpx;margin-right: 7rpx;"></image>
					已充电量
				</view>
			</view>

			<view
				style="background-color: #F7F8F8;border-radius: 20rpx;justify-content: center;align-items: center;display: flex;flex-direction: column;">
				<view style="font-size: 24rpx;">
					<span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.timeSpend}}
					</span>
				</view>
				<view style="color: #989898;display: flex;align-items: center;margin-top: 7rpx;">
					<image src="/static/images/charge/item2.svg" mode="heightFix"
						style="height: 25rpx;margin-right: 7rpx;"></image>
					已充时长
				</view>
			</view>

			<view
				style="background-color: #F7F8F8;border-radius: 20rpx;justify-content: center;align-items: center;display: flex;flex-direction: column;">
				<view style="font-size: 24rpx;">
					<span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.orderAmt}}
					</span>元
				</view>
				<view style="color: #989898;display: flex;align-items: center;margin-top: 7rpx;">
					<image src="/static/images/charge/item3.svg" mode="heightFix"
						style="height: 25rpx;margin-right: 7rpx;"></image>
					当前费用
				</view>
			</view>
		</view>

		<view
			style="width: 95vw;margin-top: 30rpx;font-size: 24rpx;display: flex;background-color: #F7F8F8;border-radius: 20rpx;padding: 30rpx;justify-content: space-around;">
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<view>
					<span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.power}}</span>kw
				</view>
				<view style="color: #989898;margin-top: 7rpx;">功率</view>
			</view>
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<view><span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.current}}</span>A
				</view>
				<view style="color: #989898;margin-top: 7rpx;">电流</view>
			</view>
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<view><span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.voltage}}</span>V
				</view>
				<view style="color: #989898;margin-top: 7rpx;">电压</view>
			</view>
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<view><span
						style="font-size: 40rpx;font-weight: bold;color: black;margin-right: 5rpx;">{{orderInfo.temperature}}</span>℃
				</view>
				<view style="color: #989898;margin-top: 7rpx;">温度</view>
			</view>
		</view>


		<view class="bottom-row">
			<view style="display: flex;align-items: baseline;justify-content: space-between;height: 60px">
				<view>
					<span style="font-size: 30rpx;color: black;margin-left: 20rpx;">￥</span>
					<span style="font-size: 52rpx;font-weight: bold;color: black;">{{orderInfo.orderAmt}}</span>
				</view>

				<view
					style="width: 200px;height: 42px;background-color: #F76548;color: white;border-radius: 50rpx;align-items: center;justify-content: center;display: flex;"
					@click="noMultipleClicks(stopCharge)">结束充电</view>
			</view>
		</view>

		<jcode-dialog ref="dialogRef" message="确定停止当前充电订单吗？" @buttonBack="buttonBack"></jcode-dialog>
	</view>
</template>

<script lang="ts" setup>
	import {
		getOrderRealTimeInfo
	} from '@/api/api.js'

	import {
		ref,
		getCurrentInstance,
		onMounted,
		onUnmounted
	} from "vue";

	import {
		onLoad
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const navBarHeight = ref(uni.getSystemInfoSync().statusBarHeight + 60)
	const chargeStatus = ref(false)
	const timeStep = ref(2)
	const dialogRef = ref();
	const orderId = ref('');
	const orderInfo = ref({});
	const intervalId = ref();//定时器

	onLoad((option) => {
		proxy.showLoading()
		console.log('option.id', option.id)
		orderId.value = option.id
		getInfo()
	})

	const topImageUrl = ref('')
	const topImages = ref([])

	const getInfo = async () => {
		setTimeout(() => {
			uni.hideLoading()
			//此路径下有对应四种策略图片
			topImageUrl.value = '/static/images/charge/charging1.svg'
			orderInfo.value = {
				degree: 1.22,
				timeSpend: '20分钟',
				orderAmt: 2.51,
				power: 220,
				current: 5,
				voltage: 44,
				temperature: 50
			}
		}, 1000)
	}

	const stopCharge = () => {
		dialogRef.value.open()
	}

	const buttonBack = (e) => {
		dialogRef.value.close()
		if (e == 'right') {
			proxy.showLoading("订单结束中...")

			//模拟停止订单接口
			setTimeout(() => {
				proxy.redTo(`/sub_charging/order/orderDetails?id=${orderId.value}`)
			}, 1000)
		}
	}

	onMounted(() => {
		reSetIntervalId()
	});

	onUnmounted(() => {
		// 清除定时器
		if (intervalId.value) {
			clearInterval(intervalId.value);
		}
	});

	const reSetIntervalId = () => {
		if (intervalId.value) {
			clearInterval(intervalId.value);
		}
		intervalId.value = setInterval(() => {
			//轮询接口获取最新充电订单数据
			getInfo();
		}, timeStep.value * 1000);
	}
</script>

<style lang="scss" scoped>
	.orderclass {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		&-top {
			display: flex;
			width: 90vw;
			justify-content: space-between;
			margin-top: 50rpx;
			font-size: 26rpx;


			.item {
				display: flex;
				background-color: #EDF0F6;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 40rpx;
				border-radius: 30rpx;

				.top {
					font-size: 36rpx;
					font-weight: bold;
					color: black;
				}

				.bottom {
					color: gray;
					margin-top: 10rpx;
				}
			}
		}

		&-bottom {
			margin-bottom: 50rpx;
			width: 90vw;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 40rpx;
			background-color: white;
			box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);
			border-radius: 30rpx;
			margin-top: 50rpx;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.top {
					font-size: 40rpx;
					font-weight: bold;
					color: black;
				}

				.bottom {
					color: gray;
					margin-top: 10rpx;
				}
			}
		}
	}


	.bottom-row {
		z-index: 10;
		position: fixed;
		bottom: 0px;
		left: 0;
		background-color: #ffffff;
		width: 100%;
		height: 83px;
		box-shadow: 0px -2rpx 12rpx 0px rgba(0, 0, 0, 0.1);
		@include padding(10rpx);
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
</style>