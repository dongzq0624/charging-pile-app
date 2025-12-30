<template>
	<view class="whitePage">
		<jcode-navbar leftIcon="left" title="订单详情" backgroundImage="" backgroundColor="transparent"></jcode-navbar>
		<view style="display: flex;flex-direction: column;    width: 95vw;">
			<view class="top">
				<view style="display:flex;flex-direction: column;">
					<view style="display:flex;align-items: center;">
						<image mode="aspectFit" src="../../static/images/wallet/success2.png"
							style="width: 120rpx;height: 120rpx;">
						</image>
						<view style="flex-direction: column;margin-left: 10rpx;">
							<view style="font-weight: 600;color: #333333;">订单已结束</view>
							<view style="font-size: 26rpx;color: gray;margin-top: 10rpx;">感谢您的使用。</view>
						</view>
					</view>
					<view></view>
				</view>
				<view style="flex:1"></view>
				<image mode="aspectFit" src="@/static/images/tj/loginback2.png"
					style="width: 280rpx;height: 220rpx;margin-top: 30px;z-index: 1;">
				</image>
			</view>

			<view class="middle-card">
				<view class="middle-card-item" style="justify-content: flex-start;">
					<image src="@/static/images/charge/orderLeftGreen.png" style="width: 40rpx;height: 40rpx;"></image>
					<view style="font-size: 30rpx;max-width: 60%;margin-left: 10rpx;">{{order.stationName}}</view>
				</view>
				<view class="middle-card-item">
					<view class="middle-card-item-left">订单编号</view>
					<view @click="copyText(order.orderNo)"> {{order.orderNo}}<uni-icons fontFamily="iconfont" size="18"
							color="gray">{{"&#xe8b0;"}}</uni-icons>
					</view>
				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">设备编号</view>
					<view @click="copyText(order.qrGunNo)">{{order.qrGunNo}}<uni-icons fontFamily="iconfont" size="18"
							color="gray">{{"&#xe8b0;"}}</uni-icons>
					</view>
				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">订单状态</view>
					<view >{{order.orderStatus}}
					</view>

				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">充电策略</view>
					<view>{{order.strategyType}}
					</view>
				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">充电时间</view>
					<view>{{order.beginTime}}</view>
				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">结束时间</view>
					<view>{{order.stopTime||order.endTime}}</view>
				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">充电时长</view>
					<view>{{order.timeSpend}}</view>
				</view>

				<view class="middle-card-item">
					<view class="middle-card-item-left">结束原因</view>
					<view>{{order.endReasons}}</view>
				</view>

				<view style="background-color: #8080803b;height: 1px;width: 100%;margin-top: 20rpx;"></view>
				<view class="middle-card-item">
					<view class="middle-card-item-left" style="color: black;">订单金额</view>
					<view style="color: #F76548;font-size: 38rpx;font-weight: bold;">￥{{numFilter(order.orderAmt,2)}}
					</view>
				</view>

			</view>

			<view class="buttonBar">
				<view style="flex: 1;">

				</view>
				<view
					style="flex: 1;flex-direction: column;background: white;border-radius: 40rpx;padding: 10rpx 5rpx;box-shadow: 0px 3px 3px #9E9E9E;">
					<button style="background-color: transparent;font-size: 25rpx;" open-type="contact">
						<image src="@/static/images/home/on2.png" style="height: 35px;width: 35px;"></image>
						<view style="margin-top: 5px;font-weight: 600;">在线客服</view>
					</button>
				</view>

				<view style="flex: 1;">

				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	import { getOrderRealTimeInfo } from '@/api/api.js'

	const {
		proxy
	} = getCurrentInstance();

	const order = ref({
		stationName: '测试充电站',
		orderNo: 'OR11001',
		qrGunNo: '1001',
		orderStatus: '已完成',
		strategyType: '充满为止',
		beginTime: '2025-01-01 18:30:00',
		endTime: '2025-01-01 19:30:00',
		timeSpend: '1小时',
		endReasons: '充电桩主动停止',
		orderAmt: 5.21
	});


	onLoad(async (option) => {
	
	})
</script>

<style lang="scss" scoped>
	.top {
		padding: 30rpx;
		display: flex;
	}

	.middle-card {
		border-radius: 16px;
		font-size: 15px;
		background-color: white;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);
		padding: 40rpx;
		margin: 20rpx;
		margin-top: -80rpx;

		.middle-card-item {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			font-size: 26rpx;
			align-items: center;

			.middle-card-item-left {
				color: gray;
			}
		}
	}

	.buttonBar {
		display: flex;
		background-color: transparent;
		text-align: center;
		color: black;
		font-size: 25rpx;
		padding: 40rpx 80rpx;
		align-items: center;
	}

	button::after {
		border: none;
	}

	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		// font-size: 18px;
		text-align: center;
		text-decoration: none;
		// line-height: 1;
		line-height: 1.35;
		// border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
</style>