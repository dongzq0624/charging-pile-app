<template>
	<view>
		<view style="display: flex;justify-content: center;margin-top: 15vh;">
			<image style="width: 250rpx;height: 250rpx;" src="@/static/images/empty/lose.gif"></image>
		</view>
		<view style="text-align: center;margin-top: 40rpx;font-size:32rpx">页面走丢啦~</view>
		<button class="btn" @click="refresh">重新加载</button>
	</view>
</template>

<script lang="ts" setup>
	// defineEmits明确事件定义
	const emit = defineEmits(["buttonBack"])

	const refresh = () => {
		emit("buttonBack")
	}
</script>

<style lang="scss" scoped>
	.btn {
		width: 200rpx;
		height: 70rpx;
		color: #000;
		font-size: 30rpx;
		background: white;
		border-radius: 20rpx;
		border: 1px solid gray;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 0px 6px #9e9e9e;
	}
</style>