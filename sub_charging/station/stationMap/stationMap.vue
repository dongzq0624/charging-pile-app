<template>
	<view class="whitePage" style="height: 100vh;">
		<jcode-navbar leftIcon="left" title="充电地图"></jcode-navbar>

		<map id="map" class="map" :style="'width: 100%;height: '+ mapHeight+'px'" :latitude="latitude" :scale="scale"
			:longitude="longitude" :markers="markers" :show-location="true" @markertap="onMarkerTap"
			@callouttap="onMarkerTap">

			<cover-view slot="callout">
				<block v-for="item in markers">
					<cover-view style="display: flex;align-items: center;font-size: 24rpx;" :marker-id="item.id">
						<cover-view
							style="z-index: 1; padding: 10rpx 20rpx; border-radius: 30rpx;background-color: #12A1FE;color: white;">空闲{{stationList[item.id].freeGunNum}}</cover-view>
						<cover-view
							style="z-index: 0; padding: 10rpx 20rpx 10rpx 50rpx; border-radius: 30rpx;background-color: white;color: gray;margin-left: -40rpx;">共{{stationList[item.id].totalGunNum}}</cover-view>
					</cover-view>
				</block>
			</cover-view>

			<!-- 自定义定位控件 -->
			<view class="card" v-if="currentStation">
				<view class="stationcard" @click="navTo(`/sub_charging/station/stationDetail?id=${currentStation.id}`)">
					<view class="stationcard-top">
						<view style="display: flex;    align-items: center;">
							<block v-if="currentStation.isFast==0">
								<view class="label label-type1">
									快充</view>
							</block>
							<block v-else>
								<view class="label label-type2">
									慢充</view>
							</block>
							<view class="stationname">
								{{currentStation.stationName}}
							</view>
						</view>

						<view style="display: flex;align-items: center;">
							<uni-icons type="location" color="gray" size="20"></uni-icons>
							<view style="font-size: 24rpx;color: gray;">{{numFilter(currentStation.distance,1)}}km
							</view>
						</view>
					</view>

					<view class="stationcard-middle">
						<view class="stationcard-middle-address">
							24小时 | 对外开放 | {{currentStation.address}}</view>

						<view
							style="display: flex;align-items: center;background-color: #F7F7F7;padding:15rpx 30rpx;margin-top: 20rpx;border-radius: 20rpx;">
							<image src="@/static/images/tj/home/flash2.svg" style="height: 25rpx;margin-right: 20rpx;"
								mode="heightFix"></image>
							<view style="font-size: 26rpx;font-weight: bold;color: #333333;">
								空闲&nbsp;{{currentStation.freeGunNum}} </view>
							<view style="color: #989898;font-size: 22rpx;margin-left: 10rpx;">
								/共&nbsp;{{currentStation.totalGunNum}}</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-top: 20rpx;">
							<view class="stationcard-middle-fee">
								{{ numFilter(currentStation.currentFee,2)}}<span
									style="font-size: 24rpx;font-weight: 300">
									元/度</span>
							</view>

							<view class="stationcard-middle-chargebutton" @tap.stop="toMap(currentStation)"
								style="justify-content: space-between;">
								<uni-icons type="paperplane" size="16" color="white"></uni-icons>
								<view style="margin-left: 10rpx;">导航</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 自定义定位控件 -->
			<view class="location-btn" @click="getLocation">
				<uni-icons type="map-pin-ellipse" color="#12A1FE" size="25"></uni-icons>
			</view>
		</map>
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance,
		onMounted,
		onUnmounted
	} from "vue";

	import {
		onLoad,
		onShow,
		onReady
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const mapHeight = ref(0)

	const longitude = ref(null)
	const latitude = ref(null)
	const scale = ref(17)

	const stationList = ref([])
	const markers = ref([])
	const currentStation = ref(null)



	onReady(() => {
		let sysInfo = uni.getSystemInfoSync();
		//屏幕高度 - 顶部栏高度
		var navbarHeight = sysInfo.statusBarHeight + 44
		mapHeight.value = sysInfo.windowHeight - navbarHeight;
	})

	onMounted(() => {
	})

	onLoad((option) => {
		longitude.value = option.longitude
		latitude.value = option.latitude
		getAllStation()
	})

	onShow(async () => { })

	const getLocation = async () => {
		currentStation.value = null
		const newLocation = await proxy.getLocation()
		// 检查是否与上次位置相同
		if (newLocation.latitude == latitude.value &&
			newLocation.longitude == longitude.value) {

			latitude.value = newLocation.latitude + 0.000001
			longitude.value = newLocation.longitude + 0.000001
			console.log('latitude.value', latitude.value)
		} else {
			latitude.value = newLocation.latitude;
			longitude.value = newLocation.longitude;
		}
		scale.value = 17
	}

	async function getAllStation() {
		//模拟接口获取所有站数据
		var sList =
			[{
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


		//展示到地图上 markers
		for (var i = 0; i < sList.length; i++) {
			markers.value.push({
				id: i,
				latitude: sList[i].latitude,
				longitude: sList[i].longitude,
				width: 20,
				height: 20,
				joinCluster: true,
				distance: 30,
				customCallout: {
					anchorY: 0,
					anchorX: 0,
					display: 'ALWAYS',
				}
			})
		}

	}


	function onMarkerTap(e) {
		proxy.showLoading()
		setTimeout(() => {
			uni.hideLoading()
			checkStation(e.detail.markerId)
		}, 300)
	}

	function checkStation(e) {
		console.log('ee')
		currentStation.value = stationList.value[e]
		longitude.value = currentStation.value.longitude
		latitude.value = currentStation.value.latitude
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
</script>

<style lang="scss" scoped>
	.location-btn {
		position: absolute;
		bottom: 250px;
		right: 20px;
		width: 40px;
		height: 40px;
		background-color: #ffffff;
		border-radius: 50%;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
		}
	}

	.card {
		position: absolute;
		bottom: 20px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

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
</style>