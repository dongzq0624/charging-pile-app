<template>
	<view class="content">
		<jcode-navbar leftIcon="left" title="余额退款"></jcode-navbar>
		<view class="top">
			<image src="/static/images/wallet/walletback.png" class="bg-image" mode="aspectFill"></image>
			<view style="font-size: 70rpx;font-weight: 600;z-index: 2;">{{numFilter(memberWallet.amount,2)}}</view>
			<view style="margin-bottom: 50rpx;display: flex;align-items: center;z-index: 2;">
				<view style="margin-right: 10rpx;">可用余额</view>
				<uni-icons type="help" color="white" size="20"></uni-icons>
			</view>
		</view>

		<view class="card">
			<view style="font-weight: 600;">申请金额</view>
			<view class="input">
				<view style="font-size: 40rpx;font-weight: 500;">¥</view>
				<input @click="placeholder=''"
					style="height: 27px;font-size: 17px;flex: 1;font-size: 40rpx;margin-left: 20rpx;" placeholder-style="color: #CBCBCB;"
					type="digit" v-model="money" @input="checkNum" :maxlength="maxlength" @blur="blur"
					:placeholder="placeholder" />
				<view style="color: #F76548;font-size: 14px;" @click="money=numFilter(memberWallet.amount,2)">全部退款</view>
			</view>

			<view class="grayLine" style="margin-top: 30rpx;"></view>
			<view style="margin-top: 30rpx;">
				<button class="btn" @click="submit">申请退款</button>
				<button class="btn2" style="margin-top: 20rpx;"
					@click="navTo('/pages/wallet/walletRecord/walletRecord?tabStartIndex=2')">退款记录</button>
			</view>
		</view>

		<!-- 退款说明 -->
		
		<view class="card" style="margin-top: 30rpx;">
			<view style="text-align: center;width: 100%;color: #2E2E2E;font-size: 16px;font-weight: bold;line-height: 150%;margin-bottom: 20rpx;">退款说明</view>
			<view class="text-item">
				<view>1.&nbsp;&nbsp;</view>
				<view>原路退回到账时间由各充值渠道商家决定，请耐心等待；</view>
			</view>
			<view class="text-item">
				<view>2.&nbsp;&nbsp;</view>
				<view>本退款仅支持个人账户余额退款，如有疑问，可联系客服；</view>
			</view>
			<view class="text-item">
				<view>3.&nbsp;&nbsp;</view>
				<view>本规则的解释权归xxx所有。</view>
			</view>
	
		</view>

		<jcode-dialog ref="dialogRef" @buttonBack="buttonBack" type="dialog" :message="message"></jcode-dialog>
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

	const {
		proxy
	} = getCurrentInstance();

	const dialogRef = ref();
	const money = ref(null);
	const maxlength = ref(10);
	const placeholder = ref('请输入退款金额');
	const message = ref('');

	onShow(() => {
		proxy.refreshWallet()
	})

	const blur = () => {
		if (money.value != null && money.value != '') {
			money.value = parseFloat(money.value)
		} else {
			placeholder.value = '请输入退款金额'
		}
	}

	const checkNum = (e) => {
		console.log('this.money', money.value)
		let value = e.detail.value;
		let dot = value.indexOf('.'); //包含小数点
		let reg = /^[0-9]+$/; //正整数
		if (dot > -1) {
			maxlength.value = dot + 3; //长度是小数点后两位
			if (value.length > dot + 3) {

			}
		}
		if (reg.test(value)) { //如果是正整数不包含小数点
			maxlength.value = 6;
		}
	}

	const submit = async () => {
		if (money.value <= 0) {
			proxy.msg('请填写正确金额')
			return
		}

		message.value = '您确认退款 ' + money.value + ' 元吗？'
		dialogRef.value.open()
	}

	const buttonBack = async (e) => {
		dialogRef.value.close()
		if (e == 'right') {
			proxy.showLoading()
			
			//模拟退款接口
			setTimeout(()=>{
				proxy.hideLoading()
				proxy.navTo(`/pages/wallet/success/success?navbarTitle=退款成功&message=申请退款将在2-3分钟内原路退回`)
			},1000)
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFFCF4;;
		min-height: 100vh;
		.top {
			height: 20vh;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			flex-direction: column;
			position: relative;

			.bg-image {
				position: absolute;
				top: 0;
				right: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
			}
		}

		.card {
			display: flex;
			background: white;
			margin-top: -3vh;
			border-radius: 20rpx;
			width: 94vw;
			display: flex;
			flex-direction: column;
			box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);
			padding: 30rpx;
			z-index: 2;

			.input {
				margin-top: 40rpx;
				display: flex;
				padding: 0 20rpx;
				align-items: center;
			}

			.btn {
				height: 88rpx;
				line-height: 88rpx;
				color: #ffffff;
				font-size: 30rpx;
				background: $uni-color-theme;
				border-radius: 20rpx;
			}

			.btn2 {
				height: 88rpx;
				line-height: 88rpx;
				color: #000;
				font-size: 30rpx;
				background: #FFEFDD;
				color: #F76548;
				border-radius: 20rpx;
			}
		}
	}
	
	.text-item{
		font-family: HarmonyOS Sans SC;
		font-size: 14px;
		font-weight: normal;
		line-height: 150%;
		display: flex;
		align-items: baseline;
		letter-spacing: normal;
		color: #CCA19D;
	}
</style>