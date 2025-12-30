<template>
	<view class="whitePage" style="background-image: linear-gradient(120deg, #FAE3C4 30%, #F8F6F7 70%);">
		<jcode-navbar leftIcon="left" title="登录" backgroundColor="transparent"></jcode-navbar>
		<view class="backImg">
			<image mode="aspectFit" src="@/static/images/tj/loginback2.png"
				style="transform: scale(0.85);bottom: -20px;position: absolute;">
			</image>
		</view>

		<view style="margin-top: 100px;">
			<view style="color: #F76548;font-size: 38rpx;font-weight: 900;text-align: center;">Hi~请登录</view>
			<view style="font-size: 34rpx;text-align: center;color: gray;margin-top: 10rpx;">登录轻松找到您周围的充电桩
			</view>
		</view>

		<!-- 登录按钮 -->
		<view style="width: 100vw;display: flex;justify-content: center;">
			<view class="submit-btn" @click="noMultipleClicks(toLogin)">
				微信快速登录
			</view>
		</view>
	</view>

	<jcode-dialog ref="agreeDialogRef" type="buttonSlot" theme="用户隐私政策概要">
		<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100%;">
			<view class="message" style="padding: 30px; line-height: 50rpx;font-size: 30rpx;text-align: justify;">
				感谢您使用本小程序，我们将通过
				<span class="f-26" style="color: #12A1FE;" @click="toAgreementPage('用户协议')">
					《用户协议》
				</span>
				和
				<span class="f-26" style="color: #12A1FE;" @click="toAgreementPage('隐私协议')">
					《隐私协议》
				</span>来帮助您了解在我们服务过程中可能会收集、使用、存储和共享您的个人信息的情况。请您务必仔细阅读、充分理解相关内容，若您同意，请选择同意并继续接受我们的服务;若您不同意，请选择不同意并退出。
			</view>
			<view class="agreeNext" @click="agreeDialogRef.close()">同意并继续</view>
			<view style="font-size: 28rpx;margin-top: 30rpx;color: gray;margin-bottom: 40rpx;" @click="back()">
				不同意并退出
			</view>
		</view>
	</jcode-dialog>
</template>

<script setup lang="ts">
	import {
		ref,
		getCurrentInstance,
		onMounted
	} from "vue";

	import {
		onLoad,
		onUnload,
		onShow
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const agreeDialogRef = ref();
	const toPageUrl = ref('');

	onLoad((options) => {
		if (options.toPageUrl) {
			toPageUrl.value = decodeURIComponent(options.toPageUrl)
		}
	})
	
	onMounted(()=>{
		agreeDialogRef.value.open()
	})

	const toAgreementPage = (e) => {
		proxy.showLoading()
		//跳转页面  调接口拿富文本数据 进行展示
		setTimeout(() => {
			proxy.hideLoading()
			proxy.navTo(`/pages/richTextView/richTextView?title=${e}`)
		}, 1000)
	}

	const toLogin = async () => {
		//模拟微信登录
		proxy.showLoading('登录中...')
		setTimeout(() => {
			proxy.hideLoading()
			loginSuccess()
		}, 1000)
	}

	const loginSuccess = () => {
		//模拟登录成功 缓存放用户id（token那些看你们实际登录业务来决定，这里只放id方便后续业务判断）
		uni.setStorageSync('member_id','123456')
		uni.setStorageSync('member_mobile','123****8910')
		uni.setStorageSync('member_nickName','微信用户')
		
		
		if (toPageUrl.value)
			proxy.redTo(toPageUrl.value)
		else
			proxy.back()
	}
</script>

<style lang="scss" scoped>
	/* 授权按钮 */
	.submit-btn {
		width: 80%;
		background-color: #00B578;
		;
		color: #FFFFFF;
		margin-top: 60rpx;
		border-radius: 40rpx;
		padding: 25rpx;
		font-size: 32rpx;
		display: flex;
		font-weight: 700;
		align-items: center;
		justify-content: center;
		margin: 30rpx;
		margin-top: 40px;
	}

	.backImg {
		display: flex;
		align-items: flex-end;
		margin-top: 70rpx;
		background-image: url('@/static/images/tj/loginback.png');
		transform: scale(1.4);
		width: 300px;
		height: 250px;
		background-repeat: no-repeat;
		background-size: cover;
		justify-content: center;
		background-position: top;
	}

	.bottom-row {
		position: fixed;
		bottom: 10px;
		left: 0;
		box-sizing: border-box;
		width: 100%;
		padding-bottom: 51rpx;
		display: flex;
		justify-content: center;
	}

	.form {
		margin-top: 72rpx;

		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			color: rgba($color: #ffffff, $alpha: 0.8);
		}

		.input-row {
			width: 478rpx;
			height: 98rpx;
			border-bottom: 2rpx solid #F3F3F3;
			margin: auto;

			input {
				height: 98rpx;
				flex: 1 1 auto;
				padding: 0 16rpx;
			}
		}



		.sendClass {
			text-align: center;
			line-height: 60rpx;
			color: #999999;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 2rpx solid #999999;
			width: 160rpx;
			height: 60rpx;
			font-size: 20rpx;
		}

		.code {
			width: 208rpx;
			height: 78rpx;
			text-align: center;
			line-height: 78rpx;
			color: #ffffff;
			border-radius: 49rpx;
		}
	}

	.foot {
		@extend .flex;

		.btn {
			flex: 1;
			@include padding(20rpx 0);
			@include flexCenter();
			border-radius: 0;
			border-top: 1px solid #cbcbcb70;
			font-weight: bold;
			height: 55px;

			font: {
				size: 32rpx
			}

			&.cancel {
				border-bottom-left-radius: 20rpx;
			}

			&.confirm {
				border-bottom-right-radius: 20rpx;
				border-left: 1px solid #cbcbcb70;
				color: $uni-color-primary;
			}
		}
	}

	::v-deep .my-custom-class {
		top: 50% !important;
		width: calc(100% - 60rpx);
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

	.agreeNext {
		width: 80%;
		background-color: $uni-color-primary;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
		color: white;
		font-weight: 600;
		font-size: 30rpx;
	}
</style>