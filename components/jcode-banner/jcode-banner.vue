<template>
	<view class="content">
		<uni-swiper-dot class="uni-swiper-dot-box" :info="bannerList" :current="current" :mode="mode"
			:dots-styles="dotsStyles" :borderRadius="'40rpx'" field="content">
			<swiper :style="'height:'+bannerHeight+';width:'+bannerWidth" @change="change" :current="swiperDotIndex"
				circular :duration="duration" :interval="interval" autoplay>
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="displayListClick(item)">
					<image style="height: 100%;width:100%;" :src="item.attachments[0].url" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>


<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue'

	import {
		onShow
	} from "@dcloudio/uni-app"

	const {
		proxy,
		ctx
	} = getCurrentInstance();

	const bannerHeight = ref('120px');//轮播图高度
	const bannerWidth = ref('95vw');//轮播图宽度
	const interval = ref(5000);//定时切换时长
	const duration = ref(400);//滑动动画时长
	const dotsStyles = ref({
		backgroundColor: 'rgba(255, 90, 95,0.3)',
		border: '1px rgba(255, 90, 95,0.3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
		selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
	});
	//参考颜色
	// dotStyle: [{
	// 	backgroundColor: 'rgba(0, 0, 0, .3)',
	// 	border: '1px rgba(0, 0, 0, .3) solid',
	// 	color: '#fff',
	// 	selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
	// 	selectedBorder: '1px rgba(0, 0, 0, .9) solid'
	// },
	// {
	// 	backgroundColor: 'rgba(255, 90, 95,0.3)',
	// 	border: '1px rgba(255, 90, 95,0.3) solid',
	// 	color: '#fff',
	// 	selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
	// 	selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
	// },
	// {
	// 	backgroundColor: 'rgba(83, 200, 249,0.3)',
	// 	border: '1px rgba(83, 200, 249,0.3) solid',
	// 	color: '#fff',
	// 	selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
	// 	selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
	// }
	// ]

	const current = ref(0);
	const swiperDotIndex = ref(0);
	const mode = ref('round');

	const bannerList = ref([]);

	onShow(async () => {
		console.log('banner onShow')
		bannerList.value = await proxy.getDisplayListByGroup(1)
	})

	const change = (e) => {
		current.value = e.detail.current
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
					url: item.pageUrl
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
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFCF6;;
		height: 200px;
		color: #fff;
	}

	.swiper-item0 {
		background-color: #cee1fd;
	}

	.swiper-item1 {
		background-color: #b2cef7;
	}

	.swiper-item2 {
		background-color: #cee1fd;
	}

	.image {
		width: 750rpx;
	}

	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	/* #endif */

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			height: 100%;
			width: 93vw;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 95%;
		}
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
</style>