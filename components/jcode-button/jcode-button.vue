<template>
	<view class="bottom-row" v-if="type == 'bottom'">
		<slot>
		</slot>
		<button class="btn" @click="noMultipleClicks(submit)">{{buttonText}}</button>
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue'

	import {
		onShow
	} from "@dcloudio/uni-app"
	
	// defineEmits明确事件定义
	const emit = defineEmits(["buttonBack"])
	const {
		proxy,
		ctx
	} = getCurrentInstance();

	const props = defineProps({
		type: {
			type: String,
			default: () => ''
		},
		buttonText: {
			type: String,
			default: () => ''
		}
	})

	onShow(async () => {
		console.log('banner onShow')

	})
	const submit = () => {
		console.log('调整')
		emit('buttonBack')
	}
</script>

<style lang="scss" scoped>
	.bottom-row {
		z-index: 10;
		position: fixed;
		bottom: 0px;
		left: 0;
		background-color: #ffffff;
		width: 100%;
		box-shadow: 0px -2rpx 12rpx 0px rgba(0, 0, 0, 0.1);
		@include padding(10rpx);
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		// padding-bottom: 51rpx;
		.btn {
			width: 690rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #ffffff;
			font-size: 30rpx;
			background: $uni-color-theme;
			border-radius: 20rpx;
			margin-bottom: 20px;
		}
	}
</style>