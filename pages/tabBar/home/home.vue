<template>
	<view style="background-color:#FFFCF6 ;">
		<jcode-navbar leftIcon="slot" backgroundImage=""
			:backgroundColor="navBarBackGroundSign==1?'#FFFCF6':'rgba(248, 248, 248,'+navBarBackGroundSign+')'">
			<view class="navbar" style="display: flex;height: 100%;align-items: center;width: 100%;">
				<view @click="navTo(`/sub_charging/station/stationList/stationList?title=站点列表&focus=1`)"
					style="backdrop-filter: blur(20px);display: flex;border-radius: 40rpx;height: 65rpx;width: 70%; align-items: center;box-shadow: inset 1px 1px 4px 0px #EBD1B0;">
					<image src="/static/images/tj/home/search-normal.png" style="height: 40rpx;width: 100rpx;"
						mode="aspectFit">
					</image>
					<input disabled placeholder="搜索" placeholder-style="color: #4A2929;" />
				</view>
			</view>
		</jcode-navbar>

		<view class="mainPage" :style="'margin-top: -'+statusBarHeight+'px'">
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<jcode-xsuu-swiper :swiperItems="swiperItems" :margin="0" :borderRadius="0" :height="600"
					:dotHeight="100" :button="0"></jcode-xsuu-swiper>
				<view class="walletcard">
					<view class="walletcard-top" style="color: #4F3A27;" @click="switchTab(`/pages/tabBar/user/user`)"
						v-if="getLoginFlag()">
						<image src="/static/images/tj/home/flash.png" mode="aspectFit">
						</image>
						<view style="display: flex;align-items: center;">
							<view>尊敬的&nbsp;</view>
							<view style="color: #F76548;font-weight: bold;">{{getMobile()}}</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view>账户余额&nbsp;</view>
							<view style="color: #F76548;font-size: 40rpx;font-weight: bold;">
								{{numFilter(memberWallet.amount,2)}}
							</view>
							<view>&nbsp;元</view>
							<uni-icons style="margin-top: 5rpx;" type="right" size="16"></uni-icons>
						</view>
					</view>
					<view class="walletcard-top" style="color: #4F3A27;justify-content: space-around;" v-else>
						<image src="/static/images/tj/home/flash.png" mode="aspectFit">
						</image>
						点击
						<span style="color: #F76548;font-size: 36rpx;font-weight: bold;margin-left: 10rpx;"
							@click="isLogin()">立即登录</span>
						解锁更多功能
					</view>

					<view class="walletcard-bottom"
						style="color: #222222;font-weight: 500;font-family: HarmonyOS Sans;letter-spacing: normal;">
						<view @click="switchTab(`/pages/tabBar/recharge/recharge`)">我要充值</view>
						<span style="color: lightgray;font-size: 20rpx;">|</span>
						<view @click="isLoginToPage(`/pages/wallet/walletRecord/walletRecord?tabStartIndex=1`)">充值记录
						</view>
						<span style="color: lightgray;font-size: 20rpx;">|</span>
						<view @click="isLoginToPage(`/pages/wallet/withdrawal/withdrawal`)">余额退款</view>
					</view>
				</view>
			</view>
		</view>

		<view class="card-content">
			<view class="my-wallet-card">
				<view class="card" style="margin-top: 0;">
					<block v-for="(item, index) in cardList" :key="index">
						<button class="card-item" v-if="item.title=='在线客服'" open-type="contact">
							<image :src="item.image" style="height: 45px;width: 45px;"></image>
							<text class="card-bottom-text">{{item.title}}</text>
						</button>

						<view class="card-item" v-else @click="navTo(item.page)">
							<image :src="item.image" style="height: 45px;width: 45px;"></image>
							<text class="card-bottom-text">{{item.title}}</text>
						</view>
					</block>
				</view>
			</view>
		</view>

		<view :style="{height: mainHeight+'px'}" class="aaa">
			<view class="tabs-box">
				<view class="" style="height: 100%;width: 94vw; display: flex;justify-content: center;">
					<view class="hx-tabs">
						<view class="hx-tabs-item" v-for="(item,i) in tabs" :key="i"
							:class="{'hx-tabs-active': swiperCurrent == i}" @click="swiperChange(i)"
							style="transition: 100ms;">
							<text>{{item.name}}</text>
						</view>
						<view class="hx-tabs-slider-box"
							:style="{transition: '100ms',left:swiperCurrentSliderLeft + 'px'}">
							<view class="hx-tabs-slider"></view>
						</view>
						<view style="flex: 1;"></view>

						<view @click="toStationMap"
							style=" position: relative; border-radius: 10rpx;border: 1px solid #FFCFA7;padding: 16rpx 30rpx;font-size: 28rpx;color: black;font-weight: bold;">
							<image src="/static/images/home/mapBack.png" class="bg-image" mode="aspectFill"></image>
							地图模式
						</view>
					</view>
				</view>
			</view>


			<swiper id="mainSwiper" style="height: 100%;" :current="swiperCurrent" :duration="100"
				@transition="transition" @animationfinish="animationfinish">
				<!-- 附近的站 -->
				<swiper-item class="swiper-item">
					<jcode-scroll ref="jcodeScrollRef" class="scroll" :scrollHeight="(mainHeight-70)+'px'"
						:queryInfo="queryInfo" @getData="getData" :refresherEnabled="navBarBackGroundSign==0"
						:scrollY="navBarBackGroundSign==1" @backData="backData" emptyText="暂无站点">
						<view style="display: flex;align-items: center;flex-direction: column;">

							<block v-for="(item, index) in stationList">
								<view class="stationcard"
									@click="navTo(`/sub_charging/station/stationDetail?id=${item.id}`)">
									<view class="stationcard-top">
										<view style="display: flex;    align-items: center;">
											<block v-if="item.isFast==0">
												<view class="label label-type1">
													快充</view>
											</block>
											<block v-else>
												<view class="label label-type2">
													慢充</view>
											</block>
											<view class="stationname">
												{{item.stationName}}
											</view>
										</view>

										<view style="display: flex;align-items: center;" v-if="locationSign">
											<uni-icons type="location" color="gray" size="20"></uni-icons>
											<view style="font-size: 24rpx;color: gray;">
												{{numFilter(item.distance||0,1)}}km
											</view>
										</view>
									</view>

									<view class="stationcard-middle">
										<view class="stationcard-middle-address">
											24小时 | 对外开放 | {{item.address}}</view>

										<view
											style="display: flex;align-items: center;background-color: #F7F7F7;padding:15rpx 30rpx;margin-top: 20rpx;border-radius: 20rpx;">
											<image src="@/static/images/tj/home/flash2.svg"
												style="height: 25rpx;margin-right: 20rpx;" mode="heightFix"></image>
											<view style="font-size: 26rpx;font-weight: bold;color: #333333;">
												空闲&nbsp;{{item.freeGunNum}} </view>
											<view style="color: #989898;font-size: 22rpx;margin-left: 10rpx;">
												/共&nbsp;{{item.totalGunNum}}</view>
										</view>
										<view
											style="display: flex;justify-content: space-between;align-items: center;margin-top: 20rpx;">
											<view class="stationcard-middle-fee">
												{{ numFilter(item.currentFee,2)}}<span
													style="font-size: 24rpx;font-weight: 300">
													元/度</span>
											</view>
											<view class="stationcard-middle-chargebutton" @tap.stop="toMap(item)"
												style="justify-content: space-between;">
												<uni-icons type="paperplane" size="16" color="white"></uni-icons>
												<view style="margin-left: 10rpx;">导航</view>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view style="height: 10px;"></view>
					</jcode-scroll>
				</swiper-item>

				<!-- 常用站点 -->
				<swiper-item class="swiper-item">
					<view style="display: flex;align-items: center;flex-direction: column;">
						<block v-for="(item, index) in stationList2">
							<view class="stationcard"
								@click="navTo(`/sub_charging/station/stationDetail?id=${item.id}`)">
								<view class="stationcard-top">
									<view style="display: flex;    align-items: center;">
										<block v-if="item.isFast==0">
											<view class="label label-type1">
												快充</view>
										</block>
										<block v-else>
											<view class="label label-type2">
												慢充</view>
										</block>
										<view class="stationname">
											{{item.stationName}}
										</view>
									</view>

									<view style="display: flex;align-items: center;" v-if="locationSign">
										<uni-icons type="location" color="gray" size="20"></uni-icons>
										<view style="font-size: 24rpx;color: gray;">{{numFilter(item.distance||0,1)}}km
										</view>
									</view>
								</view>

								<view class="stationcard-middle">
									<view class="stationcard-middle-address">
										24小时 | 对外开放 | {{item.address}}</view>

									<view
										style="display: flex;align-items: center;background-color: #F7F7F7;padding:15rpx 30rpx;margin-top: 20rpx;border-radius: 20rpx;">
										<image src="@/static/images/tj/home/flash2.svg"
											style="height: 25rpx;margin-right: 20rpx;" mode="heightFix"></image>
										<view style="font-size: 26rpx;font-weight: bold;color: #333333;">
											空闲&nbsp;{{item.freeGunNum}} </view>
										<view style="color: #989898;font-size: 22rpx;margin-left: 10rpx;">
											/共&nbsp;{{item.totalGunNum}}</view>
									</view>

									<view
										style="display: flex;justify-content: space-between;align-items: center;margin-top: 20rpx;">
										<view class="stationcard-middle-fee">
											{{ numFilter(item.currentFee,2)}}<span
												style="font-size: 24rpx;font-weight: 300">
												元/度</span>
										</view>

										<view class="stationcard-middle-chargebutton" @tap.stop="toMap(item)"
											style="justify-content: space-between;">
											<uni-icons type="paperplane" size="16" color="white"></uni-icons>
											<view style="margin-left: 10rpx;">导航</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view style="height: 10px;"></view>
				</swiper-item>
			</swiper>
			<jcode-tabBar currentPage="0"></jcode-tabBar>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onReady,
		onPageScroll,
		onShow
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const queryInfo = ref({
		pageNum: 1,
		pageSize: 5
	})

	const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight + 44)
	const navBarBackGroundSign = ref(0)

	const swiperItems = ref([]) //轮播图
	const swiperCurrent = ref(0)//滚动标签（非轮播图参数，名字都有swiper 不要弄混）

	const loadOk = ref(false)
	const mainHeight = ref(0)
	const swiperCurrentSliderLeft = ref(0)
	const tabs = ref([
		{ name: '全部站点' },
		{ name: '收藏站点' }
	])
	const onPageScrollHeight = ref(0)
	const locationSign = ref(false);//获取定位标记
	const jcodeScrollRef = ref();
	const latitude = ref(null)
	const longitude = ref(null)
	const stationList = ref([])
	const stationList2 = ref([]) //收藏站点

	const memberInfo = ref('')
	const bgImageUrl = ref('@static/images/home/mapBack.png');

	const cardList = ref([{
		title: '在线客服',
		image: '/static/images/home/card1.svg',
		page: ''
	},
	{
		title: '站点列表',
		image: '/static/images/home/card2.svg',
		page: '/sub_charging/station/stationList/stationList'
	},
	{
		title: '收藏管理',
		image: '/static/images/home/card3.svg',
		page: '/sub_charging/station/collectionStation/collectionStation'
	},
	{
		title: '更多功能',
		image: '/static/images/home/card4.svg',
		page: ''
	}])
	// const memberWallet = ref({})//钱包

	onShow(async () => {
		initview()
	})

	onReady(async () => {
		const topHeight = await proxy.getViewHW('.mainPage')
		console.log('topHeight', topHeight)

		const cardList = await proxy.getViewHW('.card-content')
		console.log('cardList', cardList)

		const navbar = await proxy.getViewHW('.navbar')
		console.log('navbar', navbar)

		onPageScrollHeight.value = topHeight.height - navbar.bottom + cardList.height

		let sysInfo = uni.getSystemInfoSync();
		console.log('sysInfo', sysInfo)
		// //屏幕高度 - 头部导航高度
		mainHeight.value = sysInfo.windowHeight - navbar.bottom - 55 + 12;
		console.log('mainHeight', mainHeight.value)
	})

	onPageScroll((e) => {
		navBarBackGroundSign.value = e.scrollTop / onPageScrollHeight.value < 1 ? e.scrollTop / onPageScrollHeight.value : 1
	})

	const initview = async () => {
		//获取轮播图接口 模拟放两张图
		setTimeout(() => {
			swiperItems.value = [
				{ url: '/static/images/home/top.png' },
				{ url: '/static/images/home/top.png' },
			]
		}, 1000)

		//获取定位
		getLocation()

		//刷新钱包
		proxy.refreshWallet()

		if (swiperCurrent.value == 1 && uni.getStorageSync('member_id')) {
			//切换到收藏站点 且 已登录
			//调接口拿收藏站点数据
			setTimeout(() => {
				stationList2.value = [{
					address: "广东省深圳市福田区黄河路黄河大厦地下停车场",
					currentFee: 1.69,
					latitude: 22.5472,
					longitude: 114.0445,
					stationName: "内部测试充电站",
					totalGunNum: 2,
					freeGunNum: 1
				},
				{
					address: "广东省深圳市福田区长江路111号",
					currentFee: 1.19,
					latitude: 21.5472,
					longitude: 114.0445,
					stationName: "内部测试充电站2",
					totalGunNum: 2,
					freeGunNum: 2
				},
				]
			}, 1000)
		}
	}



	const getMobile = () => {
		return uni.getStorageSync('member_mobile') ? uni.getStorageSync('member_mobile') : '微信用户'
	}

	const transition = ({ detail: { dx } }) => { }
	const animationfinish = ({ detail: { current } }) => {
		swiperCurrent.value = current
		swiperChange(current)
	}

	const swiperChange = (index) => {
		swiperCurrent.value = index;
		swiperCurrentSliderLeft.value = index * 110;
		if (index == 1) {
			if (uni.getStorageSync('member_id')) {
				//切换到收藏站点 且 已登录
				//调接口拿收藏站点数据
				setTimeout(() => {
					stationList2.value = [{
						address: "广东省深圳市福田区黄河路黄河大厦地下停车场",
						currentFee: 1.69,
						latitude: 22.5472,
						longitude: 114.0445,
						stationName: "内部测试充电站",
						totalGunNum: 2,
						freeGunNum: 1
					},
					{
						address: "广东省深圳市福田区长江路111号",
						currentFee: 1.19,
						latitude: 21.5472,
						longitude: 114.0445,
						stationName: "内部测试充电站2",
						totalGunNum: 2,
						freeGunNum: 2
					},
					]
				}, 1000)
			}
			else {
				proxy.toLogin()
			}
		}
	}

	//获取数据
	const getData = (e) => {
		//e 中是{pageNum: 1,pageSize: 5}  可以利用参数去调接口  这块如果分页的逻辑不理解，就都删掉 用自己方法去实现 或者私聊 wx : whckxttkx

		//封装调接口入参
		// var data = {
		// 	...e,
		// 	latitude: latitude.value,
		// 	longitude: longitude.value
		// }

		//调接口拿站的分页数据

		setTimeout(() => {
			loadOk.value = true
			//分页数据处理  接口返回数据需要这样的格式  totalRow总数   totalPage总页数  list当页数据  
			var sList = {
				data: {
					totalRow: 4,
					totalPage: 1,
					list: [{
						address: "广东省深圳市福田区黄河路黄河大厦地下停车场",
						currentFee: 1.69,
						latitude: 22.5472,
						longitude: 114.0445,
						stationName: "内部测试充电站",
						totalGunNum: 2,
						freeGunNum: 1
					},
					{
						address: "广东省深圳市福田区长江路111号",
						currentFee: 1.19,
						latitude: 21.5472,
						longitude: 114.0445,
						stationName: "内部测试充电站2",
						totalGunNum: 0,
						freeGunNum: 2
					},
					{
						address: "广东省深圳市福田区长江路112号",
						currentFee: 1.19,
						latitude: 21.6472,
						longitude: 114.0445,
						stationName: "内部测试充电站3",
						totalGunNum: 1,
						freeGunNum: 2
					},
					{
						address: "广东省深圳市福田区长江路113号",
						currentFee: 1.19,
						latitude: 21.5672,
						longitude: 114.0445,
						stationName: "内部测试充电站4",
						totalGunNum: 2,
						freeGunNum: 2
					},
					]
				}
			}
			jcodeScrollRef.value.backData(sList)
		}, 1000)
	}

	//组件将数据拼接后传回父页面
	const backData = (e) => {
		stationList.value = e
		uni.hideLoading()
	}

	const getLocation = async () => {
		var location = await proxy.getLocation()
		if (location) {
			loadOk.value = true
			locationSign.value = true
			latitude.value = location.latitude;
			longitude.value = location.longitude;
			jcodeScrollRef.value.silentRefresh()
		}
		else {
			loadOk.value = true
			locationSign.value = false
			jcodeScrollRef.value.silentRefresh()
		}
	}

	//去导航
	const toMap = (item) => {
		//转float 兼容苹果上的微信小程序 否则会跳转失败
		wx.openLocation({
			latitude: parseFloat(item.latitude),
			longitude: parseFloat(item.longitude),
			scale: 18,
			name: item.stationName,
			address: item.address
		})
	}

	//打开站分布地图
	async function toStationMap() {
		const res = await proxy.getLocation()
		if (res) {
			proxy.navTo(`/sub_charging/station/stationMap/stationMap?latitude=${res.latitude}&longitude=${res.longitude}`)
		}
		else {
			uni.showModal({
				title: '提示',
				content: '需要获取位置权限，请到设置中开启',
				success(res) {
					if (res.confirm) {
						// 引导用户去设置中开启权限
						uni.openSetting();
					}
				}
			});
		}
	}
</script>


<style lang="scss" scoped>
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
		text-align: center;
		text-decoration: none;
		line-height: 1.35;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}

	.mainPage {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		background-color: #FFFCF6;
	}

	#mainSwiper {
		position: sticky;
	}

	.tabs-box {
		width: 100%;
		display: flex;
		justify-content: center;
		position: sticky;
		z-index: 10;
		height: 45px;
		margin: 20rpx 0 0 0;

		.hx-tabs {
			position: relative;
			display: flex;
			height: 80%;
			width: 100%;
			margin-left: 20rpx;
			align-items: baseline;

			&-item {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 110px;
				color: #666666;

				text {
					font-size: 16px;
				}

			}

			&-active {
				color: #F76548;
				font-weight: bold;
			}

			&-slider-box {
				position: absolute;
				display: flex;
				justify-content: center;
				bottom: 0;
				width: 110px;
			}

			&-slider {
				display: flex;
				background: #F76548;
				width: 20px;
				height: 3px;
			}
		}
	}

	.stationcard {
		background-color: white;
		margin-bottom: 20rpx;
		padding: 30rpx;
		width: 95vw;
		border-radius: 20rpx;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);
		display: flex;
		justify-content: center;
		flex-direction: column;

		&-top {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.label {
				border-top-right-radius: 20rpx;
				border-top-left-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
				padding: 5rpx 30rpx;
				color: white;
				font-size: 28rpx;

				&-type1 {
					background-image: linear-gradient(120deg, #6FD8B2 30%, #3DBE96 70%);
				}

				&-type2 {
					background-image: linear-gradient(120deg, #58B1F6 30%, #5598FF 70%);
				}
			}

			.stationname {
				max-width: 45vw;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 32rpx;
				font-weight: bold;
				margin: 0 20rpx;
			}
		}

		&-middle {
			display: flex;
			flex-direction: column;

			&-address {
				font-size: 12px;
				color: gray;
				margin-top: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 88%;
				margin-left: 10rpx;
			}

			&-fee {
				color: $uni-color-theme;
				font-size: 45rpx;
				font-weight: bold;
				margin-left: 10rpx;
			}

			&-chargebutton {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				padding: 0 20rpx;
				background-color: $uni-color-theme;
				color: white;
				padding: 10rpx 30rpx;
				border-radius: 20rpx;
			}
		}
	}


	.walletcard {
		width: 95vw;
		box-shadow: inset 0px 1px 2px 0px rgba(255, 255, 255, 0.4);
		margin-top: -50px;
		z-index: 10;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;

		&-top {
			padding: 20rpx 20rpx 20rpx 40rpx;
			display: flex;
			height: 50px;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			background: rgba(255, 255, 255, 0.01);
			box-sizing: border-box;
			border: 1px solid rgba(255, 255, 255, 0.2784);
			backdrop-filter: blur(40px);
			
			image {
				height: 40rpx;
				width: 40rpx;
			}
		}

		&-bottom {
			font-size: 30rpx;
			display: flex;
			height: 50px;
			justify-content: space-around;
			width: 100%;
			color: black;
			font-weight: 700;
			background-color: white;
			align-items: center;
			border: 1px solid #f8f8f8c7;
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			padding: 0 20rpx;
		}
	}

	.bg-image {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.card {
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 20rpx;
		padding: 0rpx 0 10rpx 0;
		text-align: center;
		flex-wrap: wrap;

		.card-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: calc(100% / 4);
			margin-top: 15rpx;
			margin-bottom: 15rpx;

			.card-bottom-text {
				color: black;
				font-size: 25rpx;
				margin-top: 15rpx;
			}
		}
	}
</style>