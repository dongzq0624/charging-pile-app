<template>
	<view class="whitePage">

		<jcode-navbar leftIcon="left" title="电站详情" backgroundImage=""></jcode-navbar>
		<image class="topImg" src="@/static/images/tj/stationdetail.png"
			:style="{width: '100%',marginTop:-navBarHeight+'px'}" mode="widthFix">
		</image>
		<view class="main" v-if="show">
			<view class="main-top">
				<view style="display: flex;align-items: center;">
					<image src="/static/images/tj/stationlogo.png" style="width: 35rpx;height: 35rpx;"></image>
					<view style="font-weight: bold;margin-left: 10rpx;"> {{stationDetail.stationName}}</view>
				</view>
				<view style="font-size: 28rpx;margin-top: 20rpx;">地址：{{stationDetail.address}}</view>
			</view>
			<view class="grayLine"></view>
			<view style="display: flex;flex-grow: 1;flex-direction: column;width: 100vw;">

				<view class="navbar">
					<view v-for="(navListItem, navListIndex) in navList" :key="navListIndex" class="nav-item"
						:class="{current: tabCurrentIndex === navListIndex}" @click="tabCurrentIndex = navListIndex;">
						{{navListItem}}
					</view>
				</view>

				<swiper :current="tabCurrentIndex" duration="300" @change="changeTab"
					style="flex-grow: 1;display: flex;">
					<swiper-item>
						<jcode-empty emptyText="暂无电桩" v-if="pileGunModels.length==0"></jcode-empty>
						<block v-else>
							<scroll-view :style="'height: '+listHeight+'px'" scroll-y>
								<view class="gunlist">
									<view class="gunlist-item" style="flex-direction: row;"
										v-for="(pileGunItem,pileGunIndex) in pileGunModels" :key="pileGunIndex">
										<view style="font-size: 50rpx;color: lightslategray">
											<span
												v-if="(pileGunIndex+1).toString().length==1">{{'0'+(1+pileGunIndex)}}</span>
											<span v-else>{{pileGunIndex+1}}</span>
										</view>

										<view
											style="display: flex; margin-top: 5px;flex-direction: column;align-items: center;margin-left: 20rpx;">
											<view
												style="font-size: 26rpx; display: flex;margin-left: 10rpx;margin-bottom: 20rpx;color: black;font-weight: bold;">
												{{pileGunItem.qrGunNo}}
											</view>
											<view :style="'font-size: 13px;'+getGunStatusStyle(pileGunItem.gunStatus)">
												{{pileGunItem.gunStatus}}
											</view>
										</view>
										<view v-if="pileGunIndex == pileGunModels.length-1" style="height: 20px;">
										</view>
									</view>
								</view>
							</scroll-view>
						</block>
					</swiper-item>
					<swiper-item>
						<jcode-empty emptyText="暂无数据" v-if="degreeSettingFeeModels.length==0"></jcode-empty>
						<view class="degreeFeeItem" v-else
							style="font-size: 30rpx;padding: 20rpx 20rpx;background-color: #f6f6f6;">
							<view style="width:200rpx;text-align: center;flex: 2;">时间<span
									style="font-size: 26rpx;">(电类)</span></view>
							<view style="width:200rpx;text-align: center;flex: 1;">电费<span
									style="font-size: 26rpx;">(元)</span></view>
							<view style="width:200rpx;text-align: center;flex: 1;">服务费<span
									style="font-size: 26rpx;">(元)</span></view>
						</view>
						<view>
							<scroll-view :style="'height: '+(listHeight-40)+'px'" scroll-y>
								<block v-for="(FeeItem,FeeIndex) in degreeSettingFeeModels">
									<view class="degreeFeeItem" style="margin: 30rpx 20rpx;">
										<view style="width:200rpx;text-align: center;flex: 2;">
											{{FeeItem.startTime}}-{{FeeItem.endTime}}（{{FeeItem.elecType}}）
										</view>
										<view style="font-weight: 600;width:200rpx;text-align: center;flex: 1;">
											{{FeeItem.elecPrice}}
										</view>
										<view style="font-weight: 600;width:200rpx;text-align: center;flex: 1;">
											{{FeeItem.serviceFee}}
										</view>
									</view>
								</block>
							</scroll-view>
						</view>
					</swiper-item>

				</swiper>
			</view>
		</view>
		<view class="page-bottom">
			<view
				style="height: 50px; display: flex;justify-content: space-around;font-size: 24rpx;align-items: center;">

				<button
					style="display: flex;flex-direction: column;align-items: center;justify-content: center;font-size: 24rpx;"
					open-type="contact">
					<uni-icons type="chatbubble" color="gray" size="28"></uni-icons>
					在线客服
				</button>

				<view
					style="display: flex;flex-direction: column;align-items: center;justify-content: space-between;height: 100%;"
					v-if="!collectionFlag" @click="noMultipleClicks(collectionStationFun)">
					<uni-icons type="star" color="gray" size="28"></uni-icons>
					收藏
				</view>
				<view
					style="display: flex;flex-direction: column;align-items: center;justify-content: space-between;height: 100%;"
					v-else @click="noMultipleClicks(cancelCollectionStationFun)">
					<uni-icons type="star-filled" color="sandybrown" size="28"></uni-icons>
					取消收藏
				</view>
				<view @click="scanCode"
					style="display: flex;align-items: center;background-color: #F76548;padding: 15rpx 30rpx;border-radius: 20rpx;color: white;margin-left: 100rpx;font-size: 32rpx;">
					<uni-icons type="scan" color="white" size="28" style="margin-right: 20rpx;"></uni-icons>
					扫码充电
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance,
		onUnmounted,
		onMounted
	} from "vue";

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	const navBarHeight = ref(uni.getSystemInfoSync().statusBarHeight + 60)
	const listHeight = ref(null)

	const {
		proxy
	} = getCurrentInstance();

	const tabCurrentIndex = ref(0)
	const navList = ref(['电桩列表', '收费标准'])
	const pileGunModels = ref([])
	const degreeSettingFeeModels = ref([])
	const changeTab = (e) => {
		tabCurrentIndex.value = e.target.current;
	}
	const getGunStatusStyle = (e) => {
		switch (e) {
			case "空闲":
				return 'color:#4CAF50'
				break;
			case '已插枪':
				return 'color:#FF9800'
				break;
			case '充电中':
				return 'color:#3D86F3'
				break;
			default:
				break;
		}
	}

	const show = ref(false)
	const stationId = ref(null)
	const stationDetail = ref({})
	const distance = ref(0)
	const location = ref(null)
	onLoad(async (option) => {
		stationId.value = option.id
		getCollectionFlag()

		location.value = await proxy.getLocation()
		//计算list高度
		const topImg = await proxy.getViewHW('.topImg')
		console.log('topImg', topImg)
		let sysInfo = uni.getSystemInfoSync();
		//屏幕高度 - 顶部图片高度 - 底部栏高度
		listHeight.value = sysInfo.windowHeight - topImg.bottom - 70 - 40 - 70;
	})

	onShow(async () => {
		getDetail()
	})

	const getDetail = async () => {
		//模拟调接口拿数据
		proxy.showLoading()
		setTimeout(() => {
			uni.hideLoading()
			show.value = true
			stationDetail.value = {
				address: "罗湖区宝安南路1881号万象城B2层",
				stationName: "双龙充电站"
			}

			pileGunModels.value = [
				{
					gunSortNo: "01",
					gunStatus: "空闲",
					pileNo: "48767300005",
					qrGunNo: "80050101"
				},
				{
					gunSortNo: "02",
					gunStatus: "充电中",
					pileNo: "48767300006",
					qrGunNo: "80050102"
				},
				{
					gunSortNo: "03",
					gunStatus: "已插枪",
					pileNo: "48767300007",
					qrGunNo: "80050103"
				}
			]
			degreeSettingFeeModels.value = [
				{
					startTime: "00:00:00",
					endTime: "07:59:00",
					serviceFee: 0.45,
					elecPrice: 0.09,
					elecType: "平期",
				},
				{

					startTime: "08:00:00",
					endTime: "12:59:00",
					serviceFee: 0.95,
					elecPrice: 0.09,
					elecType: "峰期",
				},
				{

					startTime: "13:00:00",
					endTime: "20:59:00",
					serviceFee: 0.25,
					elecPrice: 0.09,
					elecType: "谷期",
				},
				{

					startTime: "21:00:00",
					endTime: "23:59:00",
					serviceFee: 1.45,
					elecPrice: 0.09,
					elecType: "尖期",
				}
			]
		}, 1000)
	}


	const toMap = (item) => {
		wx.openLocation({
			latitude: parseFloat(item.latitude),
			longitude: parseFloat(item.longitude),
			scale: 18,
			name: item.stationName,
			address: item.address
		})
	}

	const collectionFlag = ref(false)
	const collectionIds = ref('')
	function getCollectionFlag() {
		var data = {
			memberId: uni.getStorageSync('member_id'),
			stationId: stationId.value
		}
		getCollectionStationIdList(data).then(res => {
			if (res.code == 0) {
				if (res.rows.length == 0) {
					collectionFlag.value = false
				}
				else {
					collectionFlag.value = true
				}
			}
		})
	}

	function collectionStationFun() {
		collectionFlag.value = true
		proxy.successMsg('收藏成功')
	}


	function cancelCollectionStationFun() {
		collectionFlag.value = false
		proxy.msg('已取消收藏')
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

	//↑↑↑↑↑↑↑↑↑↑定时器↑↑↑↑↑↑↑↑↑↑
	const intervalId = ref(null)
	onMounted(() => {
		reSetIntervalId()
	});

	onUnmounted(() => {
		// 清除定时器
		if (intervalId.value) {
			clearInterval(intervalId.value);
		}
	});

	const reSetIntervalId = () => {
		if (intervalId.value) {
			clearInterval(intervalId.value);
		}
		intervalId.value = setInterval(() => {
			//要执行的方法
			refresh()
		}, 2000);
	}
	//↑↑↑↑↑↑↑↑↑↑定时器↑↑↑↑↑↑↑↑↑↑

	function refresh() {
		//定时调用接口更新枪状态
	}
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;
		background-color: white;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
		width: 100%;
		margin-top: -70px;
		flex-grow: 1;
		font-size: 30rpx;

		&-top {
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			height: 69px;
		}

		.navbar {
			display: flex;
			height: 40px;
			padding: 0 5px;
			// background: #fff;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
			position: relative;
			z-index: 10;
			width: 100%;
			// background-color: white;

			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 15px;
				color: $font-color-dark;
				position: relative;
				// background-color: $uni-color-back;

				&.current {
					color: $uni-color-theme;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 44px;
						height: 0;
						border-bottom: 2px solid $uni-color-theme;
					}
				}
			}
		}
	}



	.gunlist {
		align-items: center;
		overflow: hidden;
		display: block;
		margin-top: 20rpx;
		margin-bottom: 20px;

		&-item {
			margin-top: 20rpx;
			background-color: #F6F6F6;
			float: left;
			width: calc((100vw - 120rpx)/2);
			// height: calc((95vw - 80rpx - 60rpx - 40rpx)/2);
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 10rpx;
			border: 2rpx solid #efefef;
			border-radius: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			box-shadow: #f0f0f0 0px 1px 8px 0;
			flex-shrink: 0;
			font-size: 40rpx;
			padding: 20rpx;
		}
	}

	.degreeFeeItem {
		font-size: 28rpx;
		justify-content: space-between;
		display: flex;
	}

	button::after {
		border: none;
	}

	button {
		position: relative;
		display: block;
		margin-left: 0;
		margin-right: 0;
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
		width: auto;
		height: 100%;
	}
</style>