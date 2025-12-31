<template>
	<jcode-navbar leftIcon="left" title="个人中心"></jcode-navbar>
	<view class="container">
		<jcode-form ref="form" title="个人资料" :formList="list" @jcodeFormBack="jcodeFormBack"></jcode-form>

		<jcode-dialog ref="changeMobilePopup" type="buttonSlot" :message="'您确认更换当前' + mobile + '的手机号吗？'">
			<view class="foot">
				<button class="btn cancel" @click="getPhoneNumberBack('left')">取消</button>
				<!-- getMobile 获取手机号 -->
				<button class="btn confirm" open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumberBack('right',$event)">确认</button>
			</view>
		</jcode-dialog>

		<view class="version">
			<view style="width:100rpx;text-align: center;color: gray;font-size: 28rpx;">{{version}}</view>
		</view>
	</view>
</template>

<script setup>
	// import {
	// 	requestFile
	// } from '@/utils/request.js'

	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const version = ref('');
	const changeMobilePopup = ref();
	const sendCode = ref();
	const mobile = ref('')
	const list = ref([{
		id: 0,
		type: 'weChatAvatar',
		title: '头像',
		value: "",
		right: "right"
	},
	{
		id: 1,
		type: 'weChatNickName',
		title: '昵称',
		value: "",
		right: "right",
	},
	{
		id: 2,
		type: 'weChatMobile',
		title: '绑定手机',
		value: "",
		right: "right",
		callBack: true
	}
	])

	onShow(() => {
		if (uni.getStorageSync('member_id'))
			initView()
		else
			proxy.toLogin()
	})

	const initView = () => {
		list.value[0].value = uni.getStorageSync("member_avatar") || ''
		list.value[1].value = uni.getStorageSync("member_nickName") || ''
		if (uni.getStorageSync("member_mobile")) {
			list.value[2].value = uni.getStorageSync("member_mobile")
		} else {
			list.value[2].title = "关联手机"
			list.value[2].value = "立即绑定"
		}
		console.log("memberInfo", list.value)
	}

	const jcodeFormBack = async (e) => {
		console.log("接收表单传回", e)
		var data = {}
		switch (e.id) {
			case 0:
				// const img = await requestFile(e.value)

				//模拟上传图片 和 调用修改头像接口
				setTimeout(() => {
					saveSuccess()
				}, 1000)
				break;
			case 1:
				//模拟调用修改昵称接口
				setTimeout(() => {
					saveSuccess()
				}, 1000)
				break;
			case 2:
				//如果是直接绑定,就不需要二次确认
				if (list.value[2].value.length > 10) {
					changeMobilePopup.value.open()
				} else {
					list.value[2].value = e.value
				}
				break;
			default:
				break;
		}
	}

	const saveSuccess = () => {
		initView()
		uni.showToast({
			title: '操作成功！',
			icon: 'none'
		});
	}

	// import {
	// 	bindMobile,
	// 	setStory
	// } from '@/pages/login/loginMethods.js'

	//一键绑定按钮回调
	const getPhoneNumberBack = async (button, e) => {
		changeMobilePopup.value.close()
		if (button == 'right') {
			console.log('getPhoneNumber点击回调', e) // 动态令牌
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
				proxy.msg('用户拒绝获取手机号')
			} else {
				// e.detail.code 模拟 根据code去后端解密手机号并绑定
				setTimeout(()=>{
					proxy.successMsg('绑定成功')
				},1000)
			}
		}
	}

	const getVersion = () => {
		const info = uni.getAccountInfoSync().miniProgram
		switch (info.envVersion) {
			case 'develop':
				version.value = '开发版' + info.version
				break;
			case 'trial':
				version.value = '体验版' + info.version
				break;
			case 'release':
				version.value = info.version
				break;
			default:
				break;
		}
	}
	getVersion()
</script>

<style scoped lang="scss">
	.container {
		background-color: #f8f8f8;
		width: 100%;
		height: 100%;
		position: fixed;

		.version {
			position: fixed;
			bottom: 10px;
			left: calc(50% - 50rpx);
		}
	}

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
</style>