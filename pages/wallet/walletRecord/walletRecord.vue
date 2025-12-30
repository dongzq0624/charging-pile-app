<template>
	<view class="content">
		<jcode-navbar leftIcon="left" title="钱包明细"></jcode-navbar>
		<jcode-scroll ref="jcodeScrollRef" class="scroll" :scrollHeight="scrollHeight" type='navList'
			:navTextList="navTextList" :tabStartIndex="tabStartIndex" :queryInfo="queryInfo" @getData="getData"
			@backData="backData" emptyText="暂无记录">
			<block v-for="(item,index) in list">
				<view class="wallet-record-content" v-if="tabCurrentIndex==0" @click="toDetail(item)">
					<view class="wallet-record-top">
						<view style="display: flex;">
							<image src="@/static/images/wallet/chongdian.png" class="wallet-img"></image>
							充电消费
						</view>
					</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 10rpx;"></view>
					<view class="wallet-record-item-b">
						消费金额：
						<view class="amt" style="color: #FF5E5E;"><span style="font-size: 30rpx;">￥</span>
							{{numFilter(item.amount,2)}}
						</view>
					</view>
					<view class="wallet-record-item-g">
						<view>编号:{{item.orderNo}}</view>
						{{item.operateTime}}
					</view>
					<view class="wallet-record-item-g">
						<view></view>
					</view>
				</view>
				<view class="wallet-record-content" v-else-if="tabCurrentIndex==1" @click="toDetail(item)">
					<view class="wallet-record-top">
						<view style="display: flex;">
							<image src="@/static/images/wallet/chongzhi.png" class="wallet-img"></image>
							人工充值
						</view>
					</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 10rpx;"></view>
					<view class="wallet-record-item-b">充值余额：<view class="amt" style="color: #1078FE;"><span
								style="font-size: 30rpx;">￥</span>
							{{numFilter(item.amount,2)}}
						</view>
					</view>
					<view class="wallet-record-item-g">
						<view>编号:{{item.orderNo}}</view>
						{{item.operateTime}}
					</view>
					<view class="wallet-record-item-g">
						<view></view>
					</view>
				</view>
				<view class="wallet-record-content" v-else-if="tabCurrentIndex==2" @click="toDetail(item)">
					<view class="wallet-record-top">
						<view style="display: flex;">
							<image src="@/static/images/wallet/tuikuan.png" class="wallet-img"></image>钱包退款
						</view>
						<view v-if="item.refundStatus=='处理中'" style="font-size: 28rpx;font-weight: 500;color:#DDAF5A">
							{{item.refundStatus}}
						</view>
						<view v-else-if="item.refundStatus=='退款成功'"
							style="font-size: 28rpx;font-weight: 500;color:#1078FE">
							{{item.refundStatus}}
						</view>
						<view v-else style="font-size: 28rpx;font-weight: 500;color:#FF5E5E">
							{{item.refundStatus}}
						</view>
					</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 10rpx;"></view>
					<view class="wallet-record-item-b">
						退款金额：
						<view class="amt" style="color: #DDAF5A;"><span style="font-size: 30rpx;">￥</span>
							{{numFilter(item.amount,2)}}
						</view>
					</view>
					<view class="wallet-record-item-g">
						<view>编号：{{item.orderNo}}</view>
						{{item.operateTime}}
					</view>
				</view>
			</block>
		</jcode-scroll>
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

	const {
		proxy
	} = getCurrentInstance();

	const scrollHeight = ref('');
	const navTextList = ref(["扣减记录", "充值记录", "退款记录"]);
	const queryInfo = ref({
		pageNum: 1,
		pageSize: 10
	});
	const tabStartIndex = ref(0);
	const tabCurrentIndex = ref(0);
	const transactionType = ref({});
	const list = ref([]);
	const jcodeScrollRef = ref();

	onLoad((option) => {
		if (option.tabStartIndex)
			tabStartIndex.value = option.tabStartIndex
	})

	onShow(async () => {
		scrollHeight.value = await proxy.calculateHeight('.scroll') + 'px'
		console.log('scrollHeight', scrollHeight)
	})

	//调接口获取数据
	const getData = (e) => {
		tabCurrentIndex.value = e.tabCurrentIndex
		console.log('e', e)
		switch (e.tabCurrentIndex) {
			case 0:
				//模拟调用接口获取扣减记录
				var data = {
					code: 0,
					msg: "",
					rows: [{
						amount: 1,
						operateTime: '2025-07-04 16:46:18',
						orderNo: "C250704660000166",
						remark: "测试"
					},
					{
						amount: 2,
						operateTime: '2025-07-05 16:46:18',
						orderNo: "C250704660000167",
						remark: "测试2"
					}],
					total: "2"
				}
				jcodeScrollRef.value.backData(data)
				break;
			case 1:
				//模拟调用接口获取充值记录  rows为数据  total为单页总数  
				var data = {
					code: 0,
					msg: "",
					rows: [{
						amount: 3,
						operateTime: '2025-07-04 16:46:18',
						orderNo: "C250704660000166",
						remark: "测试"
					},
					{
						amount: 4,
						operateTime: '2025-07-05 16:46:18',
						orderNo: "C250704660000167",
						remark: "测试2"
					}],
					total: "2"
				}
				jcodeScrollRef.value.backData(data)
				break;
			case 2:
				//模拟调用接口获取退款记录  rows为数据  total为单页总数  
				var data = {
					code: 0,
					msg: "",
					rows: [{
						amount: 3,
						operateTime: '2025-07-04 16:46:18',
						orderNo: "C250704660000166",
						refundStatus: '处理中',
						remark: "测试"
					},
					{
						amount: 4,
						operateTime: '2025-07-05 16:46:18',
						orderNo: "C250704660000167",
						refundStatus: '退款成功',
						remark: "测试2"
					},
					{
						amount: 10,
						operateTime: '2025-07-05 16:46:18',
						orderNo: "C250704660000167",
						refundStatus: '退款失败',
						remark: "测试2"
					}],
					total: "3"
				}
				jcodeScrollRef.value.backData(data)
				break;
			default:
				break;
		}
	}

	//组件将数据拼接后传回父页面
	const backData = (e) => {
		console.log('e', e)
		tabCurrentIndex.value = e.tabCurrentIndex
		list.value = e.list
		console.log('this.list ', list.value)
	}

	onLoad(async (option) => {
		if (option.tabStartIndex) {
			tabStartIndex.value = option.tabStartIndex
		}
	})

	const toDetail = (item) => {
		proxy.navTo(`/pages/wallet/recordDetail/recordDetail?tabCurrentIndex=${tabCurrentIndex.value}&currentOrder=${JSON.stringify(item)}`)
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: $uni-color-back;
		// padding: 20rpx 3%;
		// box-sizing: border-box;
		// width: 100%;
	}

	.wallet-record-content {
		display: flex;
		flex-direction: column;
		margin: 20rpx;
		border-radius: 20rpx;
		background: white;
		padding: 30rpx 30rpx 20rpx 30rpx;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);

		.wallet-record-top {
			display: flex;
			justify-content: space-between;
			display: flex;
			font-size: 34rpx;
			font-weight: 600;

			.wallet-img {
				height: 40rpx;
				width: 40rpx;
				margin-right: 10rpx;
			}
		}

		.wallet-record-item-b {
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 15rpx;
			font-weight: 600;
			margin: 20rpx 0;

			.amt {
				font-size: 40rpx;
			}
		}

		.wallet-record-item-g {
			font-size: 25rpx;
			color: gray;
			display: flex;
			justify-content: space-between;
			margin-top: 15rpx;
		}
	}
</style>