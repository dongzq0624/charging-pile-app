<template>
	<view class="whitePage" style="background-color: #FFFCF4; color: #;">
		<jcode-navbar title="充值"></jcode-navbar>

		<view class="walletcard">
			<image src="@/static/images/wallet/walletback2.png" mode="scaleToFill"></image>
			<view style="z-index: 1;">
				当前余额(元)：
			</view>
			<view style="font-size: 55rpx;font-weight: bold;margin-top: 10rpx;z-index: 1;">
				{{numFilter(memberWallet.amount||0,2)}}
			</view>
			<view
				style="font-size: 30rpx;display: flex;justify-content: space-around;width: 100%;align-items: center;margin-top: 10rpx;z-index: 1;">
				<view @click="isLoginToPage(`/pages/wallet/walletRecord/walletRecord`)">扣减记录</view>
				<span style="font-size: 24rpx;">|</span>
				<view @click="isLoginToPage(`/pages/wallet/walletRecord/walletRecord?tabStartIndex=1`)">充值记录</view>
				<span style="font-size: 24rpx;">|</span>
				<view @click="isLoginToPage(`/pages/wallet/walletRecord/walletRecord?tabStartIndex=2`)">退款记录</view>
			</view>
		</view>

		<view class="rechargecard">
			<view style="font-size: 32rpx;">充值金额</view>
			<view
				style="border-bottom: 1px solid #F3F3F3;;width: 100%;margin-top: 20rpx;display: flex;height: 80px;align-items: center;">
				<span style="font-size: 65rpx;font-weight: bold;">￥</span>
				<input style="margin-left: 20rpx;font-size: 80rpx;width: 70%;font-weight: bold;height: 80%;"
					type="digit" v-model="money" @input="checkNum" :maxlength="maxlength" @blur="blur" @focus="focus"
					placeholder="自定义金额" placeholder-style="font-weight: 300;font-size:40rpx;" />
			</view>

			<view class="recharge-money" style="display: block;margin-top: 20rpx;">
				<view class="recharge-money-item" v-for="(item,index) in moneyList" :key="index"
					:class="activeIndex == index?'active':''" @click="selectMoney(index)">
					<view class="recharge-item-money">
						¥&nbsp;{{ item.money }}
					</view>
				</view>
			</view>
		</view>
		<view class="paybutton" @click="noMultipleClicks(rechargePay)">立即支付</view>

		<jcode-tabBar currentPage="1"></jcode-tabBar>
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";


	const {
		proxy
	} = getCurrentInstance();

	const money = ref(null);
	const endChargeMoney = ref(10);
	const maxlength = ref(10);
	const moneyList = ref([{
		'id': 0,
		'money': 10
	}, {
		'id': 1,
		'money': 20
	}, {
		'id': 2,
		'money': 30
	}, {
		'id': 3,
		'money': 50
	}, {
		'id': 4,
		'money': 100
	}, {
		'id': 5,
		'money': 200
	}]);
	const activeIndex = ref(0);

	const focus = () => {
		activeIndex.value = -1
	}

	const blur = () => {
		if (money.value) {
			money.value = proxy.numFilter(money.value, 2)
			endChargeMoney.value = proxy.numFilter(money.value, 2)
		}
		else {
			activeIndex.value = 0
		}
	}

	const checkNum = (e) => {
		let value = e.detail.value;
		let dot = value.indexOf('.'); //包含小数点
		let reg = /^[0-9]+$/; //正整数
		if (dot > -1) {
			maxlength.value = dot + 3; //长度是小数点后两位
		}
		if (reg.test(value)) { //如果是正整数不包含小数点
			maxlength.value = 6;
		}
	}

	/* 选择充值金额 */
	const selectMoney = (index) => {
		activeIndex.value = index
		money.value = ''
		endChargeMoney.value = moneyList.value[index].money
	}


	onShow(() => {
		proxy.refreshWallet()
	})

	onLoad(async (option) => {

	})

	const toWalletRecord = (e) => {
		uni.navigateTo({
			url: `/pages/wallet/walletRecord/walletRecord?tabStartIndex=${e}`
		})
	}

	const rechargePay = async () => {
		if (endChargeMoney.value <= 0)
			return
		proxy.navTo(`/pages/wallet/success/success?navbarTitle=充值成功&message=可在我的钱包中查看`)
	}
</script>

<style lang="scss" scoped>
	.walletcard {
		color: white;
		padding: 30rpx;
		margin-top: 20rpx;
		width: 95vw;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.rechargecard {
		color: black;
		padding: 30rpx;
		margin-top: 30rpx;
		background-color: white;
		width: 95vw;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;


		.recharge-money {
			display: flex;
			align-items: center;
			overflow: hidden;
			// overflow-x: scroll;

			.recharge-money-item:first-child {
				margin-left: 0;
			}

			.recharge-money-item {
				margin-top: 20rpx;
				background-color: #F6F6F6;
				float: left;
				width: calc((95vw - 40rpx - 60rpx)/3);
				height: calc((95vw - 80rpx - 60rpx - 120rpx)/3);
				margin-left: 10rpx;
				margin-right: 10rpx;
				margin-bottom: 10rpx;


				// margin: 20rpx 10rpx;
				// width: 250rpx;
				// height: 200rpx;
				border: 2rpx solid #efefef;
				border-radius: 30rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				box-shadow: #f0f0f0 0px 1px 8px 0;
				flex-shrink: 0;
				font-size: 40rpx;
				font-weight: bold;

				&:nth-child(3n) {
					margin-right: 0rpx;
				}

				&:nth-child(3n-2) {
					margin-left: 0rpx;
				}


				.recharge-item-money {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.recharge-item-tip {
					padding: 6rpx 20rpx;
					font-size: 28rpx;
					border-radius: 40rpx;
					color: #000000;
				}
			}

			.active {
				border: 1px solid $uni-color-theme;
				background: rgba(247, 101, 72, 0.2);
				;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				color: $uni-color-theme;
				font-size: 40rpx;
			}
		}
	}

	.paybutton {
		width: 95vw;
		padding: 30rpx 0;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		background-color: $uni-color-theme;
		border-radius: 35rpx;
		color: white;
		font-size: 30rpx;
		font-weight: bold;
	}
</style>