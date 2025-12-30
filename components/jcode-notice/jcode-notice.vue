<template>
	<view class="notice">
		<view class="left">
			<image src="/static/images/home/noticeimg.svg" style="width: 18px;height: 18px;"></image>
			<view
				style="display: flex;flex-direction: column;color: #FD6E35;font-size: 12px;font-weight: bold;margin-left: 10rpx;">
				<view style="width: 2em;word-break: break-all;white-space: normal;line-height: normal;">系统公告</view>
			</view>
			<view style="background-color: #e3e7f08c;height: 80%;width: 2px;margin-left: 20rpx;"></view>
		</view>
		<view class="center">
			<swiper vertical autoplay interval="1500" duration="300" circular>
				<swiper-item v-for="item in noticeList">
					<navigator @click="displayListClick(item)"
						style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{item.titleText}}
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="right">
			<uni-icons type="right" size="16" color="#333"></uni-icons>
		</view>
	</view>
</template>
<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue'

	import getAppDisplayGroupConfig from '@/config/appDisplayConfig.js'

	import {
		onShow
	} from "@dcloudio/uni-app"

	const props = defineProps({
		group: {
			type: String,
			default: () => '1'
		}
	})

	const {
		proxy
	} = getCurrentInstance();
	const noticeList = ref([]);

	onShow(async () => {
		//模拟获取公告接口

		setTimeout(() => {
			noticeList.value = [{
				titleText: '第一条公告'
			},
			{
				titleText: '第二条公告'
			},
			]
		}, 1000)

		if (noticeList.value.length == 0) {
			noticeList.value = [{
				titleText: '暂无公告'
			}]
		}
		console.log('onShow', noticeList.value)
	})


	const displayListClick = (item) => {
		uni.navigateTo({
			url: `/pages/richTextView/richTextView`
		})
	}

	defineExpose({

	})
</script>

<style lang="scss" scoped>
	.notice {
		width: 95vw;
		height: 100rpx;
		line-height: 100rpx;
		background: white;
		border-radius: 80rpx;
		display: flex;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);

		.left {
			padding: 5rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			:deep() {
				.uni-icons {
					color: #28B389 !important;
				}
			}

			.text {
				color: #28B389;
				font-weight: 600;
				font-size: 28rpx;
			}
		}

		.center {
			flex: 1;

			swiper {
				height: 100%;

				&-item {
					height: 100%;
					font-size: 12px;
					color: black;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>