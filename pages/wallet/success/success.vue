<template>
	<view class="whitePage">
		<jcode-navbar leftIcon="left" :title="navbarTitle"></jcode-navbar>
		<image src="@/static/images/wallet/success.png" style="height: 200rpx;width: 200rpx;margin-top: 20%;"></image>
		<view style="margin-top: 30rpx;font-size: 34rpx;font-weight: 600;">{{navbarTitle}}</view>
		<view style="margin-top: 30rpx;font-size: 30rpx;color: gray;">{{message}}</view>
		<view class="btn" @click="back">返回</view>
		<!-- <jcode-losePage v-if="showLose" @buttonBack="buttonBack"></jcode-losePage> -->
	</view>
</template>

<script lang="ts" setup>
	import {
		withdrawal
	} from '@/api/baseApi.js'

	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onLoad
	} from "@dcloudio/uni-app";

	import {
		xx
	} from '@/api/baseApi.js'

	const {
		proxy,
		ctx
	} = getCurrentInstance();
	const navbarTitle = ref('')
	const message = ref('')

	onLoad((option) => {
		navbarTitle.value = option.navbarTitle
		message.value = option.message
	})
	
	const back =()=>{
		uni.navigateBack({
			delta: 2
		})
	}
</script>

<style lang="scss" scoped>
	.btn {
		width: 80%;
		height: 88rpx;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 30rpx;
		background: #05C160;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}
</style>