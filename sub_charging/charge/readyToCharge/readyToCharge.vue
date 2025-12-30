<template>
	<view class="whitePage">
		<jcode-navbar leftIcon="left" title="准备充电"></jcode-navbar>
		<view class="card">
			<view class="card-top">
				<view style="display: flex;    align-items: center;">
					<block v-if="chargeStation.isFast==0">
						<view class="label label-type1">
							快充</view>
					</block>
					<block v-else>
						<view class="label label-type2">
							慢充</view>
					</block>
					<view class="stationname">
						{{chargeStation.stationName}}
					</view>
				</view>

				<view style="display: flex;align-items: center;" v-if="chargeStation.distance">
					<uni-icons type="location" color="gray" size="20"></uni-icons>
					<view style="font-size: 24rpx;color: gray;">{{numFilter(chargeStation.distance,1)}}km
					</view>
				</view>
			</view>

			<view style="font-size:28rpx;margin-top: 20rpx;color: #989898;">设备编号：{{qrGunNo}}</view>


			<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20rpx;">
				<view style="color: #F76548;font-size: 50rpx;font-weight: bold;">
					{{ numFilter(getCurrentPrice(),2)}}<span style="font-size: 28rpx;font-weight: 300">
						元/度</span>
				</view>

				<view
					style="background-color: rgba(54, 98, 236, 0.1);border-radius: 10rpx;padding: 10rpx 20rpx;color: #237FF3;font-size: 24rpx;"
					@click="feesDialogRef.open()">
					查看详情
				</view>
			</view>
		</view>


		<view  class="walletcard">
			<image src="@/static/images/wallet/walletback.png" mode="scaleToFill"></image>
			<view style="z-index: 1;">
				我的钱包
			</view>
			<view style="font-size: 60rpx;font-weight: bold;margin-top: 10rpx;z-index: 1;">
				{{numFilter(memberWallet.amount||0,2)}}
			</view>
			<view style="font-size: 30rpx;display: flex;width: 100%;align-items: center;margin-top: 30rpx;z-index: 1;">
				<view style="display: flex;flex-direction: column;align-items: center;flex: 1;">
					{{numFilter(memberWallet.giftAmount||0,2)}}<span>赠额(元)</span>
				</view>
				<span style="font-size: 24rpx;">|</span>
				<view style="display: flex;flex-direction: column;align-items: center;flex: 1;">0<span>积分</span></view>
				<span style="font-size: 24rpx;">|</span>
				<view style="display: flex;flex-direction: column;align-items: center;flex: 1;">
					{{numFilter(0,2)}}<span>充电金</span>
				</view>
			</view>
			<view style="font-size: 30rpx;display: flex;width: 100%;align-items: center;margin-top: 30rpx;z-index: 1;">
				<view style="flex: 1;text-align: center;" @click="navTo(`/pages/wallet/recharge/recharge`)">我要充值
				</view>
				<span style="font-size: 24rpx;">|</span>
				<view style="flex: 1;text-align: center;" @click="navTo(`/pages/wallet/walletRecord/walletRecord`)">钱包明细
				</view>
				<span style="font-size: 24rpx;">|</span>
				<view style="flex: 1;text-align: center;" @click="navTo(`/pages/wallet/withdrawal/withdrawal`)">余额退款
				</view>
			</view>
		</view>


		<view style="width: 95vw;">
			<block v-for="(item,index) of strategyDict" :key="index">
				<view class="strategy" @click="toCharge(index)">
					<text style="font-size: 34rpx;font-weight: bold;color: #7D4A23;">{{item.dictLabel}}</text>
					<text style="margin-top: 15rpx; color:#B27140;">{{item.remark}}</text>
				</view>
			</block>
		</view>

		<jcode-dialog ref="pileMsgDialogRef" type="singleButton" singleButtonText="返回" :message="pileMsg"
			@buttonBack="back()"></jcode-dialog>

		<jcode-dialog ref="tipDialogRef" theme="温馨提示" :message="'尊敬的用户，请确认使用的充电枪与扫码主机为同一台设备，避免误操作为他人充电，造成不必要损失，谢谢。'"
			rightButtonText="立即充电" @buttonBack="tipDialogButtonBack"></jcode-dialog>

		<jcode-dialog ref="rechargeDialogRef" theme="温馨提示" :message="rechargeMsg" rightButtonText="立即充值"
			@buttonBack="rechargeDialogButtonBack"></jcode-dialog>

		<jcode-dialog ref="feesDialogRef" :isMaskClick="true" type="buttonSlot" theme="费用标准">
			<view class="yuji-item" style="font-size: 30rpx;padding: 20rpx 20rpx;background-color: #f6f6f6;">
				<view style="width:200rpx;text-align: center;flex: 2;">时间区间<span style="font-size: 26rpx;">（电类）</span>
				</view>
				<view style="width:200rpx;text-align: center;flex: 1;">电费<span style="font-size: 26rpx;">(元)</span>
				</view>
				<view style="width:200rpx;text-align: center;flex: 1;">服务费<span style="font-size: 26rpx;">(元)</span>
				</view>
			</view>
			<view>
				<scroll-view style="max-height: 30vh;" scroll-y>
					<block v-for="(item,index) in degreeSettingFeeList">
						<view class="yuji-item" style="margin: 30rpx 20rpx;">
							<view style="color: gray;width:200rpx;text-align: center;flex: 2;">
								{{item.startTime}}-{{item.endTime}}（{{item.elecType}}）
							</view>
							<view style="font-weight: 600;width:200rpx;text-align: center;flex: 1;">
								{{numFilter(item.elecPrice,2)}}
							</view>
							<view style="font-weight: 600;width:200rpx;text-align: center;flex: 1;">
								{{numFilter(item.serviceFee,2)}}
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
			<view class="grayLine"></view>
			<view class="feesClose-button" @click="feesDialogRef.close()">关 闭</view>
		</jcode-dialog>

		<jcode-dialog ref="chargeDialogRef" :isMaskClick="true" type="contentSlot" :theme="chargeDialogTheme"
			@buttonBack="chargeDialogRefBack">
			<view style="margin-top: -30px;margin-bottom: 30px;display: flex;justify-content: center;width: 100%;">
				<input v-model="chargeStrategyValue" :placeholder="chargeDialogPlaceholder" type="number"
					style="text-align: center;background-color: #f8f8f8;padding: 20rpx;width: 70%;border-radius: 20rpx;font-size: 28rpx;" />
			</view>
		</jcode-dialog>
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const qrGunNo = ref('')
	const chargeStation = ref({
		isFast: '0',
		stationName: '测试站',
		distance: 22.11
	}) //充电站信息
	const chargeStrategyModes = ref([]) //充电策略列表
	const degreeSettingFeeList = ref([
		{
			startTime: "00:00",
			endTime: "07:59",
			serviceFee: 0.45,
			elecPrice: 0.09,
			elecType: "平期",
		},
		{

			startTime: "08:00",
			endTime: "12:59",
			serviceFee: 0.95,
			elecPrice: 0.09,
			elecType: "峰期",
		},
		{

			startTime: "13:00",
			endTime: "20:59",
			serviceFee: 0.25,
			elecPrice: 0.09,
			elecType: "谷期",
		},
		{

			startTime: "21:00",
			endTime: "23:59",
			serviceFee: 1.45,
			elecPrice: 0.09,
			elecType: "尖期",
		}
	]) //费用标准列表
	const currentSettingFeeIndex = ref(0) //当前时段费用index
	const strategyDict = ref([{
		dictLabel: '充满为止',
		remark: '充满后自动断电'
	},
	{
		dictLabel: '充电时长',
		remark: '自定义充电时长'
	},
	{
		dictLabel: '充电电量',
		remark: '自定义充电电量'
	},
	{
		dictLabel: '充电均衡',
		remark: '电量均衡'
	}
	])

	const stationStrategy = ref([])
	const balance = ref()

	const pileMsgDialogRef = ref(); //桩状态异常弹窗ref
	const pileMsg = ref(''); //桩状态异常弹窗消息

	const rechargeDialogRef = ref()//钱包余额不足弹窗ref
	const rechargeMsg = ref('')//钱包余额不足弹窗消息


	const dialogRef = ref();

	const feesDialogRef = ref(); //费用标准弹窗ref


	onShow(async () => {
		proxy.refreshWallet()
	})

	onLoad(async (option) => {
		if (option.result)
			qrGunNo.value = decodeURIComponent(option.result)
		else
			qrGunNo.value = option.id
	})


	//选择充电策略
	const chargeDialogRef = ref() //选择充电策略弹窗
	const tipDialogRef = ref() //充电确认提示弹窗

	const chargeDialogTheme = ref('')
	const chargeStrategyType = ref(0)
	const chargeStrategyValue = ref('')
	const chargeDialogPlaceholder = ref('')
	const chargeDate = ref({})
	const toCharge = (e) => {
		switch (e) {
			case 0:
				chargeDate.value = {
					qrGunNo: qrGunNo.value,
					source: uni.getStorageSync("uniPlatform") == 'mp-weixin' ? 1 : 2,
					strategyType: e.dictValue
				}
				tipDialogRef.value.open()
				break;
			case 1:
				chargeDialogTheme.value = e.remark
				chargeDialogPlaceholder.value = '请输入充电时长（小时）'
				chargeStrategyType.value = e.dictValue
				chargeStrategyValue.value = ''
				chargeDialogRef.value.open()
				break;
			case 2:
				chargeDialogTheme.value = e.remark
				chargeDialogPlaceholder.value = '请输入充电电量（度）'
				chargeStrategyType.value = e.dictValue
				chargeStrategyValue.value = ''
				chargeDialogRef.value.open()
				break;
			case 3:
				chargeDate.value = {
					qrGunNo: qrGunNo.value,
					source: uni.getStorageSync("uniPlatform") == 'mp-weixin' ? 1 : 2,
					strategyType: e.dictValue
				}
				tipDialogRef.value.open()
				break;
			default:
				break;
		}
	}

	const chargeDialogRefBack = (e) => {
		if (e == 'right') {
			if (!chargeStrategyValue.value) {
				proxy.msg('请正确输入')
				return
			}
			chargeDate.value = {
				qrGunNo: qrGunNo.value,
				source: uni.getStorageSync("uniPlatform") == 'mp-weixin' ? 1 : 2,
				strategyType: chargeStrategyType.value,
				strategyValue: chargeStrategyValue.value
			}
			tipDialogRef.value.open()
		}
		chargeDialogRef.value.close()
	}

	const tipDialogButtonBack = (e) => {
		tipDialogRef.value.close()
		if (e == 'right') {
			startCharge()
		}
	}

	const startCharge = () => {
		proxy.showLoading()
		//模拟创建订单 启动充电 得到订单id
		setTimeout(()=>{
			proxy.hideLoading()
			var id = '123'
			proxy.redTo(`/sub_charging/charge/charging/charging?id=${id}`)
		},1000)
		
		//钱包余额不足
		// rechargeMsg.value = '钱包余额不足'
		// rechargeDialogRef.value.open()
	}
 
	const rechargeDialogButtonBack = (e) => {
		rechargeDialogRef.value.close()
		if (e == 'right') {
			proxy.navTo('/pages/wallet/recharge/recharge') 
		}
	}

	//获取当前时段电费
	function getCurrentPrice() {
		return 1.1
	}
</script>

<style lang="scss" scoped>
	.card {
		width: 95vw;
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: 30rpx;
		padding: 30rpx;
		margin-top: 20rpx;
		box-shadow: 0px 0px 10px 0px rgba(253, 226, 172, 0.3);

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
				font-size: 34rpx;
				font-weight: bold;
				margin: 0 20rpx;
			}
		}

		&-currentpricetitle {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.tip {
				color: gray;
				font-size: 26rpx;
			}

			.showall {
				color: $uni-color-theme;
				font-weight: 600;
				border-bottom: 1px solid;
			}
		}

		&-price {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin-top: 20rpx;
			align-items: center;
			margin-bottom: 10rpx;

			&-left {
				width: 25px;
				background-image: linear-gradient(120deg, #58B1F6 30%, #5598FF 70%);
				color: white;
				border-radius: 10px;
				padding: 5px 0;
				text-align: center;
				margin-right: 30rpx;
			}

			&-right {
				display: flex;
				justify-content: space-between;
				color: gray;
				font-size: 26rpx;
				flex-grow: 1;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.price {
					color: $uni-color-theme;
					font-size: 32rpx;
					font-weight: bold;
					margin-right: 5rpx;
				}
			}
		}

		&-wallet {
			flex-direction: row;
			justify-content: space-between;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.balance {
				color: $uni-color-theme;
				margin: 0 10rpx;
				font-size: 40rpx;
				font-weight: bold;
			}
		}
	}

	.strategy {
		margin-top: 20rpx;
		position: relative;
		width: calc(93vw/2);
		height: 80px;
		float: left;
		color: white;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		border-radius: 30rpx;
		background: linear-gradient(348deg, #FFE2CB 17%, #F5D3B9 122%);
		justify-content: center;
		align-items: center;

		&:nth-child(2n-1) {
			margin-right: 1vw;
			margin-left: 0;
		}

		&:nth-child(2n) {
			margin-right: 0;
			margin-left: 1vw;
		}




		image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		text {
			z-index: 1;
		}
	}

	.recharge-button {
		background-image: linear-gradient(120deg, #58B1F6 30%, #5598FF 70%);
		margin-left: 20rpx;
		width: 130rpx;
		color: white;
		border-radius: 20rpx;
		height: 65rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
	}

	.yuji-item {
		font-size: 28rpx;
		justify-content: space-between;
		display: flex;
		margin-top: 30rpx;
	}

	.feesClose-button {
		font-size: 30rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		font-weight: 600;
	}

	.walletcard {
		color: white;
		padding: 30rpx;
		margin-top: 20rpx;
		width: 95vw;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>