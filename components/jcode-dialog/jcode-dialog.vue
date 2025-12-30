<template>
	<uni-popup ref="popup" type="center" :isMaskClick="isMaskClick" style="margin-top: -100px;">
		<view class="popupDialogStyle" v-if="type=='dialog'">
			<!-- 标题 -->
			<view class="dialog-theme">
				{{theme}}
			</view>
			<text class="dialog-message">
				{{chuliString()}}
			</text>

			<view class="foot">
				<button class="btn cancel" @click="buttonClick('left')">{{leftButtonText}}</button>
				<button class="btn confirm" @click="buttonClick('right')">{{rightButtonText}}</button>
			</view>
		</view>

		<view class="popupDialogStyle" v-else-if="type=='buttonSlot'">
			<!-- 标题 -->
			<view class="dialog-theme">
				{{theme}}
			</view>
			<text class="dialog-message" v-if="message">
				{{chuliString()}}
			</text>
			<slot>
			</slot>
		</view>

		<view class="popupDialogStyle" v-else-if="type=='contentSlot'">
			<!-- 标题 -->
			<view class="dialog-theme">
				{{theme}}
			</view>
			<text class="dialog-message">
				{{chuliString()}}
			</text>
			<slot>
			</slot>
			<view class="foot">
				<button v-if="leftButtonColor!=''" class="btn cancel"
					@click="buttonClick('left')">{{leftButtonText}}</button>
				<button v-else class="btn cancel" :style="'color:'+leftButtonColor"
					@click="buttonClick('left')">{{leftButtonText}}</button>
				<button v-if="leftButtonColor!=''" class="btn confirm"
					@click="buttonClick('right')">{{rightButtonText}}</button>
				<button v-else class="btn confirm" :style="'color:'+rightButtonColor"
					@click="buttonClick('right')">{{rightButtonText}}</button>
			</view>
		</view>

		<view class="popupDialogStyle" v-else-if="type=='singleButton'">
			<!-- 标题 -->
			<view class="dialog-theme">
				{{theme}}
			</view>
			<text class="dialog-message">
				{{chuliString()}}
			</text>
			<view class="foot">
				<button class="btn cancel2" @click="buttonClick()">{{singleButtonText}}</button>
			</view>
		</view>
	</uni-popup>
</template>


<script lang="ts" setup>
	import { ref, getCurrentInstance } from 'vue'

	import { subscribe } from '@/utils/system.js'

	import {
		onLoad
	} from "@dcloudio/uni-app"

	const {
		proxy
	} = getCurrentInstance();

	//子组件中接收
	const props = defineProps({
		isMaskClick: {
			type: Boolean,
			default: () => false
		},
		type: {
			type: String,
			default: () => 'dialog'
		},
		theme: {
			type: String,
			default: () => '提示'
		},
		message: {
			type: String,
			default: () => ''
		},
		leftButtonText: {
			type: String,
			default: () => '取消'
		},
		rightButtonText: {
			type: String,
			default: () => '确认'
		},
		leftButtonColor: {
			type: String,
			default: () => ''
		},
		rightButtonColor: {
			type: String,
			default: () => ''
		},
		subscribeList: {
			type: Array,
			default: () => []
		},
		singleButtonText: {
			type: String,
			default: () => '知道了'
		},
	})


	onLoad(async () => {
		if (props.subscribeList.length > 0)
			await proxy.getDict('app_template')
	})

	const popup = ref()
	// defineEmits明确事件定义
	const emit = defineEmits(["buttonBack"])

	const chuliString = () => {
		return props.message.replace(/\n/g, "\n")
	}
	// 打开
	const open = (e) => {
		popup.value.open()
	}
	// 关闭
	const close = () => {
		popup.value.close()
	}

	const buttonClick = (e) => {
		if (e == 'right' && props.subscribeList.length > 0) {
			console.log('props.subscribeList', props.subscribeList)
			var list = []
			props.subscribeList.forEach((item, index) => {
				if (item) {
					console.log('item', item)
					console.log("app_template", proxy.getDictValueByLabel('app_template', item))
					list.push(proxy.getDictValueByLabel('app_template', item) || '')
					console.log('list', list)
				}
				if (index == props.subscribeList.length - 1) {
					subscribe(list)
				}
			})
		}
		emit("buttonBack", e)
	}

	defineExpose({
		open, close
	})
</script>

<style lang="scss" scoped>
	.foot {
		@extend .flex;

		.btn {
			flex: 1;
			@include padding(20rpx 0);
			@include flexCenter();
			border-radius: 0;
			border-top: 1px solid #cbcbcb70;
			font-weight: bold;
			height: 55px;

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