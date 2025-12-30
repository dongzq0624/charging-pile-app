<template>
	<uni-popup ref="popup" type="center" :isMaskClick="false">
		<view class="popupDialogStyle">
			<!-- 标题 -->
			<view class="dialog-theme">
				{{notifyTitle}}
			</view>

			<view style="width: 100%;justify-content: center;display: flex;margin-bottom: 20rpx;">
				<scroll-view style="max-height: 50vh;" scroll-y>
					<view style="padding: 15rpx 15rpx;">
						<rich-text style="" :nodes="notifyContent"></rich-text>
					</view>
				</scroll-view>
			</view>

			<view class="foot" v-if="notify.pageType!=4">
				<button class="btn cancel" @click="cancel('cancel')">知道了</button>
				<button class="btn confirm" @click="displayListClick(notify)">查看详情</button>
			</view>
			<view class="foot" v-else>
				<button class="btn cancel2" @click="cancel('cancel')">知道了</button>
			</view>
		</view>
	</uni-popup>
</template>
<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue'

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"


	const {
		proxy
	} = getCurrentInstance();

	const props = defineProps({
		group: {
			type: String,
			default: () => '3'
		}
	})

	const notify = ref({});
	const notifyTitle = ref('通知');
	const notifyContent = ref('');
	const popup = ref();
	
	onLoad(async () => {
		console.log('onLoad')
		var rows = await proxy.getDisplayListByGroup(props.group)
		if (rows.length > 0) {
			notify.value = rows[0]
			notifyContent.value = rows[0].titleContent
			notifyTitle.value = rows[0].titleText
			popup.value.open()
		}
	})

	const open = (e) => { }

	const cancel = (e) => {
		popup.value.close()
	}
	
	
	const displayListClick = (item) => {
		switch (+item.pageType) {
			case 1:
				uni.navigateTo({
					url: `/pages/richTextView/richTextView?id=${item.id}`
				})
				break;
			case 2:
				uni.navigateTo({
					url: item.pageUrl+'?title='+item.titleText
				})
				break;
			case 3:
				uni.navigateTo({
					url: item.pageUrl
				})
				break;
			default:
				break;
		}
	}
	
	defineExpose({
		open, cancel
	})
</script>

<style lang="scss" scoped>
	.foot {
		display: flex;
		// @extend .flex;

		.btn {
			flex: 1;
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			// @include padding(20rpx 0);
			// @include flexCenter();
			border-radius: 0;
			border-top: 1px solid #cbcbcb70;
			font-weight: bold;
			height: 50px;

			font: {
				size: 32rpx
			}

			&.cancel {
				border-bottom-left-radius: 20rpx;
			}

			&.cancel2 {
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
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

	.popupDialogStyle {
		flex-direction: column;
		background-color: white;
		width: 85vw;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		position: relative;

		.dialog-theme {
			font-size: 17px;
			display: flex;
			justify-content: center;
			font-weight: bold;
			align-items: flex-end;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}

		.dialog-message {
			padding: 30px;
			font-size: 34rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 400;
			color: #3e3d3d;
			word-break: break-all;
			text-align: center;
		}
	}

	.form {
		.sendClass {
			margin-left: 40rpx;
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
</style>