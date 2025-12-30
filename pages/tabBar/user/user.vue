<template>
	<view class="whitePage">
		<jcode-navbar leftIcon="" title="我的"></jcode-navbar>


		<MemberInfo style="width: 95vw;" ref="memberInfoRef"></MemberInfo>
		<jcode-notice></jcode-notice>
		<view class="walletcard">
			<image src="@/static/images/wallet/walletback.png" mode="scaleToFill"></image>
			<view style="z-index: 1;">
				我的钱包
			</view>
			<view style="font-size: 60rpx;font-weight: bold;margin-top: 10rpx;z-index: 1;">
				{{numFilter(memberWallet.amount||0,2)}}
			</view>
			<view style="font-size: 30rpx;display: flex;width: 100%;align-items: center;margin-top: 30rpx;z-index: 1;">
				<view style="display: flex;flex-direction: column;align-items: center;flex: 1;">
					{{numFilter(memberWallet.giftAmount||0,2)}}<span>赠额(元)</span>
				</view>
				<span style="font-size: 24rpx;">|</span>
				<view style="display: flex;flex-direction: column;align-items: center;flex: 1;">0<span>积分</span></view>
				<span style="font-size: 24rpx;">|</span>
				<view style="display: flex;flex-direction: column;align-items: center;flex: 1;">
					{{numFilter(0,2)}}<span>充电金</span>
				</view>
			</view>
			<view style="font-size: 30rpx;display: flex;width: 100%;align-items: center;margin-top: 30rpx;z-index: 1;">
				<view style="flex: 1;text-align: center;" @click="switchTab(`/pages/tabBar/recharge/recharge`)">我要充值
				</view>
				<span style="font-size: 24rpx;">|</span>
				<view style="flex: 1;text-align: center;"
					@click="isLoginToPage(`/pages/wallet/walletRecord/walletRecord`)">钱包明细</view>
				<span style="font-size: 24rpx;">|</span>
				<view style="flex: 1;text-align: center;" @click="isLoginToPage(`/pages/wallet/withdrawal/withdrawal`)">
					余额退款</view>
			</view>
		</view>

		<view class="card-content">
			<view class="my-wallet-card">
				<view class="card" style="margin-top: 0;">
					<block v-for="(item, index) in cardList" :key="index">
						<button class="card-item" v-if="item.title=='在线客服'" open-type="contact">
							<image :src="item.image" style="height: 45px;width: 45px;"></image>
							<text class="card-bottom-text">{{item.title}}</text>
						</button>

						<view class="card-item" v-else @click="navTo(item.page)">
							<image :src="item.image" style="height: 45px;width: 45px;"></image>
							<text class="card-bottom-text">{{item.title}}</text>
						</view>
					</block>
				</view>
			</view>
		</view>

		<view v-if="getLoginFlag()" class="bottom-row">
			<button class="btn" @click="quit">退出登录</button>
		</view>
	</view>
	<jcode-dialog ref="dialogRef" @buttonBack="buttonBack" type="dialog" :message="dialogMessage"></jcode-dialog>

	<jcode-tabBar currentPage="4"></jcode-tabBar>
</template>

<script setup>
	import {
		ref,
		onUpdated,
		onMounted,
		getCurrentInstance
	} from "vue";

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	import MemberInfo from './components/MemberInfo/MemberInfo.vue';
	const {
		proxy
	} = getCurrentInstance();

	const memberInfoRef = ref();
	const WalletMoudleRef = ref();
	const partnerFlag = ref(false)
	onShow(async () => {
		proxy.refreshWallet()
	})


	onMounted(() => {
		console.log('user onMounted')
	});

	onUpdated(() => {
		console.log('user onUpdated')
	});

	const dialogRef = ref();
	const dialogMessage = ref('');
	const cardList = ref([{
		title: '在线客服',
		image: '/static/images/home/card1.svg',
		page: ''
	},
	{
		title: '用户协议',
		image: '/static/images/user/yhxy.svg',
		page: '/pages/richTextView/richTextView'
	},
	{
		title: '隐私协议',
		image: '/static/images/user/ysxy.svg',
		page: '/pages/richTextView/richTextView'
	},
	{
		title: '关于我们',
		image: '/static/images/user/gywm.svg',
		page: '/pages/richTextView/richTextView'
	}])

	function quit() {
		dialogMessage.value = '您确认退出当前登录账号吗？'
		dialogRef.value.open()
	}

	//弹窗回调
	function buttonBack(e) {
		if (e == 'left')
			dialogRef.value.close()
		else
			proxy.memberQuit()
	}
</script>

<style lang="scss" scoped>
	.walletcard {
		color: white;
		padding: 30rpx;
		width: 95vw;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-top: 30rpx;

		image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.bottom-row {
		z-index: 10;
		position: fixed;
		bottom: 80px;
		left: 0;
		width: 100%;

		.btn {
			width: 690rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #ffffff;
			font-size: 30rpx;
			background: $uni-color-theme;
			border-radius: 40rpx;
			margin-bottom: 20px;
		}
	}
	
	.card {
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 20rpx;
		padding: 0rpx 0 10rpx 0;
		text-align: center;
		flex-wrap: wrap;
	
		.card-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: calc(100% / 4);
			margin-top: 15rpx;
			margin-bottom: 15rpx;
	
			.card-bottom-text {
				color: black;
				font-size: 25rpx;
				margin-top: 15rpx;
			}
		}
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
		text-align: center;
		text-decoration: none;
		line-height: 1.35;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
</style>