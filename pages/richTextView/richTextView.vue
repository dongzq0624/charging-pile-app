<template>
	<view class="whitePage">
		<jcode-navbar leftIcon="left" :title="navbarTitle"></jcode-navbar>
		<view style="padding: 15rpx 25rpx;">
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<jcode-losePage v-if="showLose" @buttonBack="buttonBack"></jcode-losePage>
	</view>
</template>

<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow, onLoad
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	const navbarTitle = ref('');
	const nodes = ref('');
	const showLose = ref(false);

	onLoad((options) => {
		// navbarTitle.value = options.title
	})

	onShow(() => {
		getNavigation()
	})

	const getNavigation = () => {
		//调接口 拿数据
		proxy.showLoading()
		setTimeout(()=>{
			proxy.hideLoading()
			//接口调用成功
			showLose.value = false
			nodes.value = '内容'
			navbarTitle.value = '标题'
			
			
			//接口调用失败 展示失败的背景 提供重新加载按钮
			// showLose.value = true;
		},1000)
	}

	const buttonBack = () => {
		getNavigation()
	}
</script>

<style lang="scss" scoped>

</style>