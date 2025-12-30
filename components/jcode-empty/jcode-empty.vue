<template>
	<view style="display: flex;flex-direction: column; align-items: center;width: 100%; height: 100%;color: gray;">
		<image style="width: 100%;height: 100%; margin-top: -15vh;" src="@/static/images/empty/empty.png"  mode="aspectFit"></image>
		<view style="margin-top: -25vh;">{{emptyText}}</view>
	</view>
</template>

<script>
	export default {
		name: "Empty",
		props: {
			// image: {
			// 	type: [String, Object],
			// 	default: () => require('@/static/images/empty/empty') 
			// },
			emptyText:{
				type: String,
				default: '数据为空'
			}
		},
	}
</script>
<style lang="scss" scoped>
	::v-deep .van-empty__image {
		width: 90px;
		height: 90px;
		
	}
</style>