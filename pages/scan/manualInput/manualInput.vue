<template>
	<view class="whitePage">
		<jcode-navbar  leftIcon="left" title="输入编号"></jcode-navbar>
		<image style="margin-top: 20rpx;" mode="aspectFit" src="@/static/images/tj/loginback2.png"></image>
		<view class="input-view"><input style="width: 90%;" focus type="number" placeholder="请输入二维码编号"
				v-model="result" />
			<view style="flex:1"></view>
			<uni-icons type="scan" size="25" @click="scanCode()"></uni-icons>
		</view>
		<button class="btn" @click="noMultipleClicks(submit)">确定</button>
	</view>
</template>

<script setup>
	// import {
	// 	withdrawal
	// } from '@/api/baseApi.js'

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
	const result = ref('')

	onShow(() => {

	})

	const submit = () => {

		if (!result.value) {
			proxy.msg('请正确输入编号')
		}
		else {
			proxy.isLoginToPage(`/sub_charging/charge/readyToCharge/readyToCharge?result=${result.value}`)
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

<style lang="scss" scoped>
	.input-view {
		background-color: white;
		width: 90vw;
		margin-top: 30px;
		border-radius: 20rpx;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);
		display: flex;
		align-items: center;
		padding: 10px;
		font-size: 30rpx;
	}

	.btn {

		width: 690rpx;
		height: 88rpx;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 30rpx;
		background: $uni-color-theme;
		border-radius: 20rpx;
		margin-top: 40px;
	}
</style>