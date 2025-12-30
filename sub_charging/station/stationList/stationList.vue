<template>
	<view class="whitePage">
		<jcode-navbar leftIcon="left" :title="title"></jcode-navbar>
		<zy-search :style="'position: fixed;z-index: 10;top: '+navbarHeight+'px;'" :focus="focus"
			inputPlaceholder="站名搜索" :theme="themeClass" @getSearchText="getSearchText"></zy-search>

		<jcode-scroll style="margin-top: 50px;width: 100%;" ref="jcodeScrollRef" class="scroll"
			:scrollHeight="mainHeight+'px'" :queryInfo="queryInfo" @getData="getData" scrollY @backData="backData"
			emptyText="未查到站点">
			<view style="display: flex;align-items: center;flex-direction: column;">

				<block v-for="(item, index) in stationList">
					<view class="stationcard" @click="navTo(`/sub_charging/station/stationDetail?id=${item.id}`)">
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

							<view style="display: flex;align-items: center;" v-if="item.distance">
								<uni-icons type="location" color="gray" size="20"></uni-icons>
								<view style="font-size: 24rpx;color: gray;">{{numFilter(item.distance,1)}}km
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
									{{ numFilter(item.currentFee,2)}}<span style="font-size: 24rpx;font-weight: 300">
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
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onLoad,
		onShow,
		onReady
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const themeClass = ref('circle')
	const title = ref('')
	const focus = ref(false)

	onLoad((option) => {
		title.value = option.title
		focus.value = option.focus == 1 ? true : false
		console.log('focus.value', focus.value)
	})

	onShow(async () => {

	})

	const mainHeight = ref(0)
	const navbarHeight = ref(0)
	onReady(async () => {
		let sysInfo = uni.getSystemInfoSync();
		console.log('sysInfo', sysInfo)
		//屏幕高度 - 顶部栏高度
		navbarHeight.value = sysInfo.statusBarHeight + 44
		mainHeight.value = sysInfo.windowHeight - navbarHeight.value - 50;
		console.log('mainHeight', mainHeight.value)
	})
	
	//经纬度
	const latitude = ref(null)
	const longitude = ref(null)

	const jcodeScrollRef = ref();
	const stationList = ref([])

	const queryInfo = ref({
		pageNum: 1,
		pageSize: 7
	})
	const navBarBackGroundSign = ref(0)

	//调接口获取数据
	const getData = async (e) => {
		// var location = await proxy.getLocation()
		// var data = {
		// 	stationName: searchText.value,
		// 	...e,
		// 	latitude: location?.latitude,
		// 	longitude: location?.longitude
		// }
		// getNearStationList(data).then(res => {
		// 	jcodeScrollRef.value.backData(res)
		// })

		//调接口拿站的分页数据
		simulateData()
	}

	//组件将数据拼接后传回父页面
	const backData = (e) => {
		stationList.value = e
		uni.hideLoading()
	}
	
	
	const searchText = ref('')
	async function getSearchText(e) {
		if (!e) {
			title.value = '站点列表'
		}
		else {
			title.value = '搜索结果'
		}
		searchText.value = e
	
		simulateData(searchText.value)
	}
	
	function simulateData(e) {
		proxy.showLoading()
		setTimeout(() => {
			proxy.hideLoading()
			//分页数据处理  接口返回数据需要这样的格式  totalRow总数   totalPage总页数  list当页数据  
			var sList = {}
			if (e) {
				sList = {
					data: {
						totalRow: 4,
						totalPage: 1,
						list: [{
							address: "广东省深圳市福田区黄河路黄河大厦地下停车场",
							currentFee: 1.69,
							latitude: 22.5472,
							longitude: 114.0445,
							stationName: "搜索结果站",
							totalGunNum: 2,
							freeGunNum: 1
						}
						]
					}
				}
			}
			else {
				sList = {
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
			}
			jcodeScrollRef.value.backData(sList)
		}, 1000)
	}
	
</script>

<style lang="scss" scoped>
	.stationcard {
		background-color: white;
		margin: 10rpx 0rpx;
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
				margin-left: 10rpx;
				color: $uni-color-theme;
				font-size: 45rpx;
				font-weight: bold;
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
</style>