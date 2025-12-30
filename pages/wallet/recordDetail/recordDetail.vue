<template>
	<view class="whitePage" style="padding: 0 30rpx 30rpx 30rpx;">
		<jcode-navbar leftIcon="left" title="订单详情"></jcode-navbar>
		<block v-if="tabCurrentIndex==0">
			<view style="width: 100%;align-items: center;display: flex;flex-direction: column;">
				<image src="@/static/images/wallet/chongzhi.png"
					style="height: 200rpx;width: 200rpx;margin-top: 50rpx;"></image>
				<view style="font-size: 36rpx;font-weight: 600;margin-top: 20rpx;">人工扣减</view>
				<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view class="detail-item">订单编号
					<view style="color: black;" @click="copyText(currentOrder.orderNo)">{{currentOrder.orderNo}}
					</view>
				</view>
				<view class="detail-item">扣减时间
					<view style="color: black;">{{currentOrder.operateTime}}</view>
				</view>

				<view class="detail-item" v-if="currentOrder.remark">扣减备注
					<view style="color: black;">{{currentOrder.remark}}</view>
				</view>

				<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
				<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.amount">钱包余额
					<view style="color: black;font-weight: 600;">-{{numFilter(currentOrder.amount,2)}}</view>
				</view>
				<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.giftAmount">钱包赠额
					<view style="color: black;font-weight: 600;">-{{numFilter(currentOrder.giftAmount,2)}}</view>
				</view>
				<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.freezeAmount">钱包冻额
					<view style="color: black;font-weight: 600;">-{{numFilter(currentOrder.freezeAmount,2)}}</view>
				</view>
			</view>

		</block>
		<block v-else-if="tabCurrentIndex==1">
			<block v-if="currentOrder.operateType==2">

				<view style="width: 100%;align-items: center;display: flex;flex-direction: column;">
					<image src="@/static/images/wallet/chongzhi.png"
						style="height: 200rpx;width: 200rpx;margin-top: 50rpx;"></image>
					<view style="font-size: 36rpx;font-weight: 600;margin-top: 20rpx;">钱包充值</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: column;">
					<view class="detail-item">订单编号
						<view style="color: black;" @click="copyText(currentOrder.orderNo)">
							{{currentOrder.orderNo}}
						</view>
					</view>
					<view class="detail-item">充值时间
						<view style="color: black;">{{currentOrder.operateTime}}</view>
					</view>
					<view class="detail-item">支付方式
						<view style="color: black;">微信支付</view>
					</view>
					<view class="detail-item">支付金额
						<view style="color: black;">¥{{numFilter(currentOrder.amount,2)}}</view>
					</view>
					<view class="detail-item">支付交易单号
						<view style="color: black;" @click="copyText(sourcePayOrder.tradeNo)">{{sourcePayOrder.tradeNo}}
						</view>
					</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
					<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.amount">钱包余额
						<view style="color: black;font-weight: 600;">+{{numFilter(currentOrder.amount,2)}}</view>
					</view>
					<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.giftAmount">钱包赠额
						<view style="color: black;font-weight: 600;">+{{numFilter(currentOrder.giftAmount,2)}}</view>
					</view>
					<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.freezeAmount">
						钱包冻额
						<view style="color: black;font-weight: 600;">+{{numFilter(currentOrder.freezeAmount,2)}}</view>
					</view>
				</view>
			</block>
			
			<block v-else-if="currentOrder.operateType==4">
			
				<view style="width: 100%;align-items: center;display: flex;flex-direction: column;">
					<image src="@/static/images/wallet/chongzhi.png"
						style="height: 200rpx;width: 200rpx;margin-top: 50rpx;"></image>
					<view style="font-size: 36rpx;font-weight: 600;margin-top: 20rpx;">人工充值</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
				</view>
				<view style="width: 100%;display: flex;flex-direction: column;">
					<view class="detail-item">订单编号
						<view style="color: black;" @click="copyText(currentOrder.orderNo)">
							{{currentOrder.orderNo}}
						</view>
					</view>
					<view class="detail-item">充值时间
						<view style="color: black;">{{currentOrder.operateTime}}</view>
					</view>
					<view class="detail-item" v-if="currentOrder.remark">备注
						<view style="color: black;">{{currentOrder.remark}}</view>
					</view>
					<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
					<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.amount">钱包余额
						<view style="color: black;font-weight: 600;">+{{numFilter(currentOrder.amount,2)}}</view>
					</view>
					<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.giftAmount">钱包赠额
						<view style="color: black;font-weight: 600;">+{{numFilter(currentOrder.giftAmount,2)}}</view>
					</view>
					<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.freezeAmount">
						钱包冻额
						<view style="color: black;font-weight: 600;">+{{numFilter(currentOrder.freezeAmount,2)}}</view>
					</view>
				</view>
			</block>
		</block>

		<block v-else-if="tabCurrentIndex==2">
			<view style="width: 100%;align-items: center;display: flex;flex-direction: column;">
				<image src="@/static/images/wallet/tuikuan.png" style="height: 200rpx;width: 200rpx;margin-top: 50rpx;">
				</image>
				<view style="font-size: 36rpx;font-weight: 600;margin-top: 20rpx;">钱包退款</view>
				<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: column;">
				<view class="detail-item">订单编号
					<view style="color: black;" @click="copyText(currentOrder.orderNo)">{{currentOrder.orderNo}}
					</view>
				</view>
				<view class="detail-item">申请时间
					<view style="color: black;">{{currentOrder.createTime}}</view>
				</view>
				<view class="detail-item" style="font-size: 30rpx;color: black;">退款金额
					<view style="color: black;font-weight: 600;">¥{{numFilter(currentOrder.refundAmt,2)}}</view>
				</view>
				<view class="detail-item" style="font-size: 30rpx;color: black;">订单状态
					<view style="color: black;font-weight: 600;">{{currentOrder.refundStatus}}</view>
				</view>
				<view class="detail-item" style="font-size: 30rpx;color: black;" v-if="currentOrder.remark">
					<view style="color: black;font-weight: 600;">{{currentOrder.remark}}</view>
				</view>
				<view style="width: 100%;background-color: #8080803b;height: 1rpx;margin-top: 20px;"></view>

				<!-- 退款说明 -->
				<view style="margin-top: 30rpx;width: 100%;color: gray;font-size: 30rpx;">
					<view class="f-c-a" style="width: 100%;text-align: center;">——退款说明——</view>
					<view class="p-10">1.提交申请后，将暂时冻结申请退款金额</view>
					<view class="p-10">2.退款将在7～10个工作日(不包括节假日)内完成退款操作</view>
					<view class="p-10">3.原路退回到账时间由各充值渠道商家决定，请耐心等待</view>
					<view class="p-10">4.本退款仅支持个人账户余额退款，如有疑问，可联系客服</view>
					<view class="p-10">5.本规则的解释权归xxxx所有</view>
				</view>
			</view>
		</block>
		<view style="position: fixed;bottom: 20px;">
			<button style="background-color: transparent;font-size: 25rpx;" open-type="contact">
				<view style="display: flex;flex-direction: column;align-items: center;font-size: 28rpx;">
					<image src="@/static/images/wallet/kefu.png"
						style="height: 80rpx;width: 80rpx;margin-bottom: 10rpx;"></image>
					联系客服
				</view>
			</button>
		</view>
	</view>
</template>

<script setup>
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
	
	const tabCurrentIndex = ref(0)
	const currentOrder = ref({})
	const sourcePayOrder = ref({})
	
	onLoad((option) => {
		tabCurrentIndex.value = option.tabCurrentIndex
		currentOrder.value = JSON.parse(option.currentOrder)
	})


</script>

<style lang="scss" scoped>
	.detail-item {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: gray;
		margin-top: 20rpx;
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