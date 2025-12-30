<template>
	<view class="whitePage">
		<jcode-navbar title="订单"></jcode-navbar>

		<jcode-navListScroll style="width: 100%;" class="scroll" :tabStartIndex="tabStartIndex"
			:navTextList="navTextList" :queryInfo="queryInfo" :navPostDataList="navPostDataList"
			:getDataUrl="getDataUrl" @backData="backData" :scrollHeight="scrollHeight">


			<view class="context" v-for="(item,index) in list" @click="toOrder(item)">
				<view class="top">
					<image src="@/static/images/charge/orderLeft.png" style="width: 40rpx;height: 40rpx;"></image>
					<view style="font-size: 30rpx;max-width: 60%;margin-left: 10rpx;">{{item.stationName}}</view>
					<view style="flex:1"></view>

					<view class="status" :style="getStyle(item.orderStatus)">
						{{item.orderStatus}}
					</view>


				</view>

				<view style="background-color: #8080803b;height: 1px;width: 100%;margin-top: 20rpx;"></view>

				<view class="middle">
					<view class="middle-item">
						<view style="color: #9A9A9A;">订单编号：</view>
						<view @tap.stop="copyText(item.orderNo)">{{item.orderNo}}
							<uni-icons fontFamily="iconfont" size="18" color="gray">{{"&#xe8b0;"}}</uni-icons>
						</view>
					</view>
					<!-- <view class="middle-item">
						<view style="color: #9A9A9A;">充电枪号：</view>
						<view >{{item.gun_no}}</view>
					</view> -->
					<view class="middle-item">
						<view style="color: #9A9A9A;">开始时间：</view>
						<view v-if="item.beginTime">{{item.beginTime}}</view>
						<view v-else>未开始</view>
					</view>
					<view class="middle-item" v-if="item.stopTime">
						<view style="color: #9A9A9A;">结束时间：</view>
						<view>{{item.endTime}}</view>
					</view>
					<view class="middle-item" v-if="item.timeSpend">
						<view style="color: #9A9A9A;">充电时长：</view>
						<view>{{item.timeSpend}}</view>
					</view>
					<view class="middle-item" v-if="item.orderAmt">
						<view style="color: #9A9A9A;">订单金额：</view>
						<view>
							<span style="color: #FF5E5E;font-size: 40rpx;">¥{{numFilter(item.orderAmt,2)}}</span>
						</view>
					</view>
				</view>


				<view style="display: flex;color:#ed6c1c ;font-size: 26rpx;justify-content: center;margin-top: 20rpx;">
					查看详情
				</view>
			</view>
		</jcode-navListScroll>
		<jcode-tabBar currentPage="3"></jcode-tabBar>
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow
	} from "@dcloudio/uni-app";

	const getDataUrl = ref('') //调用接口
	const navTextList = ref(['全部', '充电中', '已完成'])
	const navPostDataList = ref([
		{ memberId: uni.getStorageSync('member_id') },
		{
			memberId: uni.getStorageSync('member_id'),
			orderStatus: 3
		},
		{
			memberId: uni.getStorageSync('member_id'),
			orderStatus: 5
		},
	])

	const tabStartIndex = ref(0);
	const list = ref([{
		beginTime: "2025-06-26 18:11:30",
		createTime: "2025-06-26 18:11:29",
		endReasons: "用户小程序主动关停",
		endTime: "2025-06-26 18:11:38",
		gunSortNo: "01",
		id: "148345705702883329",
		orderAmt: 5.12,
		orderNo: "OR2506260007",
		orderStatus: "充电中",
		stationName: "曙光大厦内部测试充电站",
		strategyType: "1",
		strategyValue: null,
		timeSpend: "<1分钟"
	},
	{
		beginTime: "2025-06-26 18:11:30",
		createTime: "2025-06-26 18:11:29",
		endReasons: "用户小程序主动关停",
		endTime: "2025-06-26 18:11:38",
		gunSortNo: "01",
		id: "148345705702883329",
		orderAmt: 5.22,
		orderNo: "OR2506260007",
		orderStatus: "启动失败",
		stationName: "曙光大厦内部测试充电站",
		strategyType: "2",
		strategyValue: 5,
		timeSpend: "<1分钟"
	},
	{
		beginTime: "2025-06-26 18:11:30",
		createTime: "2025-06-26 18:11:29",
		endReasons: "用户小程序主动关停",
		endTime: "2025-06-26 18:11:38",
		gunSortNo: "01",
		id: "148345705702883329",
		orderAmt: 5.32,
		orderNo: "OR2506260007",
		orderStatus: "充电结束",
		stationName: "曙光大厦内部测试充电站",
		strategyType: "1",
		strategyValue: null,
		timeSpend: "<1分钟"
	}]);  //模拟数据


	const queryInfo = ref({
		pageNum: 1,
		pageSize: 5
	})
	const {
		proxy
	} = getCurrentInstance();

	const scrollHeight = ref('')
	onShow(async () => {
		//计算高度
		let sysInfo = uni.getSystemInfoSync();
		//屏幕高度 - 顶部导航栏 - 底部导航栏 - 顶部navList栏 - 底部提升高度 （为完整展示底部加载更多数据的提示文字）
		scrollHeight.value = (sysInfo.windowHeight - sysInfo.safeAreaInsets.top - 55 - 40 - 20) + 'px';
		console.log('scrollHeight', scrollHeight.value)
	})

	//组件将数据拼接后传回父页面
	const backData = (e) => {
		console.log('backData', e)
		list.value = e
	}

	const getStyle = (orderStatus) => {
		if (orderStatus == '充电结束')
			return 'background-color: #12A1FE;'
		else if (orderStatus == '充电中')
			return 'background-color:#1ab394;'
		else if (orderStatus == '启动失败')
			return 'background-color:#F76548;'
		else
			return 'background-color:gray;'
	}

	function toOrder(item) {
		if (item.orderStatus == '充电中') {
			proxy.navTo(`/sub_charging/charge/charging/charging?id=${item.id}`)
		} else {
			proxy.navTo(`/sub_charging/order/orderDetails?order=${JSON.stringify(item)}`)
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		width: 95vw;
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-top: 20rpx;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);

		&-top {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.no {
				color: gray;
			}

			.status {
				border-radius: 10rpx;
				padding: 6rpx 15rpx;
				font-size: 24rpx;
				margin-right: 10rpx;
				color: white;
			}
		}

		&-middle {
			display: flex;
			width: 100%;
			margin-top: 20rpx;
		}
	}


	.context {
		border-radius: 16px;
		font-size: 15px;
		background-color: white;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);
		padding: 40rpx;
		margin: 30rpx;

		.top {
			display: flex;
			align-items: flex-start;

			.status {
				border-radius: 10rpx;
				padding: 6rpx 15rpx;
				font-size: 24rpx;
				margin-right: 10rpx;
				color: white;
			}
		}

		.middle {
			display: flex;
			flex-direction: column;
			font-size: 28rpx;

			.middle-item {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
			}
		}

		.xia {
			display: flex;
			justify-content: space-around;
			justify-content: flex-end;
			margin-top: 20rpx;
		}

	}


	image {
		width: 100px;
		height: 100px;
	}
</style>