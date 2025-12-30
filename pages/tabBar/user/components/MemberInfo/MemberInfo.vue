<template>
	<view class="member-contain">
		<view style="display: flex;align-items: center;">
			<block v-if="id">
				<image class="portrait" v-if="avatar" :src="avatar"></image>
				<image class="portrait" v-else src="/static/images/logo/logo.png"></image>
				<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
					<text class="username">{{nickName}}</text>
					<view class="userid" style="margin-top: 10rpx;" @tap.stop="copyText(id)">ID：{{id}}</view>
				</view>

			</block>
			<block v-else>
				<image class="portrait" src="/static/images/home/nologin.svg" @click="navTo(`/pages/login/login`)"></image>
				<text class="username" style="margin-left: 20rpx;"  @click="navTo(`/pages/login/login`)">登录/注册</text>
			</block>
		</view>

		<view v-if="id" style="display: flex;align-items: center;color: #989898;font-family: HarmonyOS Sans;font-size: 12px;">
			<view>{{mobile||'未绑定手机号'}}</view>
			<image style="width: 40px;height: 40px;gap: 3.85px;margin-left: 20rpx;" src="/static/images/home/setting.svg" @click="navTo(`/pages/setting/memberSetting`)"></image>
		</view>
	</view>

</template>


<script setup>
	import {
		ref
	} from 'vue';

	import {
		onLaunch,
		onShow,
		onHide
	} from "@dcloudio/uni-app"

	const popup = ref();
	const avatar = ref('');
	const nickName = ref('');
	const id = ref();
	const mobile = ref('');

	const initView = () => {
		console.log('member onShow')
		id.value = uni.getStorageSync("member_id") || ''
		avatar.value = uni.getStorageSync("member_avatar") || ''
		nickName.value = uni.getStorageSync("member_nickName") || ''
		mobile.value = uni.getStorageSync("member_mobile") || ''
		console.log('avatar.value', avatar.value)
		console.log('avatar.value', nickName.value)
	}

	const toPage = () => {
		var url = ''
		if (uni.getStorageSync("member_token")) url = '/pages/setting/memberSetting'
		else url = '/pages/login/login'
		uni.navigateTo({
			url
		});
	}

	onShow(() => {
		initView()
	})
</script>

<style lang="scss" scoped>
	.member-contain {
		display: flex;
		justify-content: space-between;
		width: 95vw;
		margin: 30rpx 0;

		.portrait {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			// box-shadow: 0 0px 12px #848484;
		}

		.username {
			font-size: 16px;
			color: #303133;
			font-weight: bold;
			max-width: 90px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.userid {
			border-radius: 16px;
			background: rgba(253, 110, 53, 0.1);
			box-sizing: border-box;
			border: 0.5px solid #FD6E35;
			color: #FD6E35;
			font-family: HarmonyOS Sans SC;
			font-size: 12px;
			font-weight: normal;
			width: 90px;
			height: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 2rpx 5rpx;
		}
	}


	.user-section {
		padding: 0rpx 30rpx;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.info-box {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
		}

		.portrait {
			width: 60px;
			height: 60px;
			/* border:5upx solid #fff; */
			border-radius: 50%;
			box-shadow: 0 0px 12px #848484;
		}




	}
</style>