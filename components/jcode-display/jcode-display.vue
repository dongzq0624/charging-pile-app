<template>
	<view class="card-content" v-if="type=='card'">
		<view class="my-wallet-card">
			<view v-if="title" class="my-wallet-card-top">
				<view class="card-title" style="font-size: 32rpx;">{{title}}</view>
			</view>

			<view class="card" style="margin-top: 0;">
				<block v-for="(item, index) in funList" :key="index">
					<button class="card-item" v-if="item.titleText=='在线客服'" open-type="contact">
						<image v-if="item.attachments&&item.attachments[0]&&item.attachments[0].url"
							:src="item.attachments[0].url" style="height: 45px;width: 45px;"></image>
						<text v-if="item.titleText" class="card-bottom-text" >{{item.titleText}}</text>
					</button>

					<view class="card-item" v-else-if="(item.titleText=='退出登录'&&loginSign)||item.titleText!='退出登录'"
						@click="displayListClick(item,index)">
						<image v-if="item.attachments&&item.attachments[0]&&item.attachments[0].url"
							:src="item.attachments[0].url" style="height: 45px;width: 45px;"></image>
						<text v-if="item.titleText" class="card-bottom-text">{{item.titleText}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>

	<view class="card-content" v-else-if="type=='list'">
		<view class="my-wallet-card">
			<view v-if="title" class="my-wallet-card-top" style="margin-bottom: 20rpx;">
				<view class="card-title" style="font-size: 32rpx;">{{title}}</view>
			</view>

			<jcode-scroll ref="jcodeScrollRef" class="scroll" :scrollHeight="scrollHeight" @getData="getData"
				@backData="backData" emptyText="暂无通知">
				<view class="card" style="margin-top: 0;flex-direction: column;padding: 0 0 10rpx 0;">
					<block v-for="(item, index) in funList" :key="index">
						<view
							style="flex-direction: row;justify-content: flex-start;display: flex;width: 100%;margin-top: 30rpx;"
							@click="displayListClick(item,index)">
							<image v-if="item.attachments&&item.attachments[0]&&item.attachments[0].url"
								:src="item.attachments[0].url"
								style="height: 18vw;width: 18vw;border-radius: 10px;box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);">
							</image>
							<view style="display: flex;flex-direction: column;padding: 0 10px;flex:1;">
								<text v-if="item.titleText"
									style="font-size: 32rpx;font-weight: 600;text-align: start;">{{item.titleText}}</text>
								<view style="flex: 1;"></view>
								<text v-if="item.createTime"
									style="font-size: 28rpx;color: gray;text-align: left;">{{item.createTime}}</text>
							</view>
						</view>
					</block>
				</view>
			</jcode-scroll>
		</view>
	</view>
	<jcode-dialog ref="dialogRef" @buttonBack="buttonBack" type="dialog" :message="dialogMessage"></jcode-dialog>
</template>

<script lang="ts" setup>
	import {
		getDisplayManageList
	} from '@/api/baseApi.js'

	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow
	} from "@dcloudio/uni-app"


	const props = defineProps({
		type: {
			type: String,
			default: () => 'card'
		},
		title: {
			type: String,
			default: () => ''
		},
		group: {
			type: String,
			default: () => '1'
		},
		scrollHeight: {
			type: String,
			default: () => ''
		},
	})

	const {
		proxy,
		ctx
	} = getCurrentInstance();

	const funList = ref([])
	const dialogMessage = ref('');
	const dialogRef = ref();
	const loginSign = ref(false);
	const currentDialog = ref('');
	const jcodeScrollRef = ref();
	const listTotal = ref(0);
	onShow(async () => {
		console.log('display onShow')
		loginSign.value = uni.getStorageSync("member_id") ? true : false
		if (props.type == 'card')
			funList.value = await getDisplayListByGroup(props.group, '')
	})



	const displayListClick = (item, index) => {
		if (item.titleText == '退出登录') {
			currentDialog.value = '退出登录'
			dialogMessage.value = '您确认退出当前登录账号吗？'
			dialogRef.value.open()
			return '退出登录'
		}

		if (item.titleText == '在线客服') {

			return '退出登录'
		}

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
	//弹窗回调
	const buttonBack = (e) => {
		if (currentDialog.value == '退出登录') {
			if (e == 'left')
				dialogRef.value.close()
			else
				proxy.memberQuit()
		}
	}

	//调接口获取数据
	const getData = async (e) => {
		console.log("得到e", e)
		const list = await getDisplayListByGroup(props.group, e)
		console.log("得到list", list)
		var data = {
			rows: list,
			total: listTotal.value
		}
		jcodeScrollRef.value.backData(data)
	}

	//组件将数据拼接后传回父页面
	const backData = (e) => {
		console.log('e', e)
		funList.value = e
		console.log('this.list ', funList.value)
	}

	//获取展示组
	const getDisplayListByGroup = async (group, queryInfo) => {
		return new Promise(async (resolve, reject) => {
			// #ifdef MP-WEIXIN
			const {
				envVersion
			} = uni.getAccountInfoSync().miniProgram
			var data = {}
			if (envVersion == 'release') {
				if (queryInfo)
					data = {
						group,
						isShelve: 0,
						...queryInfo
					}
				else
					data = {
						group,
						isShelve: 0
					}
			} else {
				if (queryInfo)
					data = {
						group,
						isTestShelve: 0,
						...queryInfo
					}
				else
					data = {
						group,
						isTestShelve: 0
					}
			}
			console.log('data', data)
			getDisplayManageList(data).then(res => {
				if (res.code == 0) {
					var finRes = res.rows
					listTotal.value = res.total
					var readIds = uni.getStorageSync("readIds").split(';')
					console.log('readIds', readIds)
					console.log("finres", finRes)
					if (finRes.length > 0 && readIds) {
						readIds.forEach((item, index) => {
							if (index == readIds.length - 1) {
								var ids = uni.getStorageSync("readIds") || ''
								finRes.forEach((item3, index3) => {
									if (item3.pushMode == 2) {
										ids += item3.id + ';'
										uni.setStorageSync("readIds",
											ids)
									}
									if (index3 == finRes.length - 1) {
										resolve(finRes)
									}
								})
							}
							finRes = finRes.filter(item2 => (item2.pushMode ==
								2 &&
								item2.id != item) || item2.pushMode !=
								2);

							console.log("finres index" + index, finRes)

						})
					} else
						resolve(finRes)
				}
			})
			// #endif

		})
	}
</script>

<style lang="scss" scoped>
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
				// font-weight: 600;
			}
		}
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
</style>