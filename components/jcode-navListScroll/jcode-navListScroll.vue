<template>
	<view>
		<jcode-scroll ref="jcodeScrollRef" class="scroll" :scrollHeight="scrollHeight" type='navList'
			:navTextList="navTextList" :tabStartIndex="tabStartIndex" @getData="getData" @backData="backData"
			emptyText="暂无订单">
			<slot></slot>
			<!-- <view style="height: 20px;"></view> -->
		</jcode-scroll>
	</view>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance } from 'vue'

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"

	const {
		proxy
	} = getCurrentInstance();

	const showSign = ref(false);
	const tabCurrentIndex = ref(0);
	const jcodeScrollRef = ref();
	const list = ref([]);
	const emit = defineEmits(["backData"])

	//子组件中接收
	const props = defineProps({
		scrollHeight:{
			type:String,
			default:''
		},
		tabStartIndex: {
			type: Number,
			default: 0
		},
		navTextList: {
			type: [Array, String],
			default: []
		},
		navPostDataList: {
			type: [Array, Object],
			default: []
		},
		getDataUrl: {
			type: String,
			default: ''
		},
		queryInfo: {
			type: Object,
			default: {
				pageNum: 1,
				pageSize: 5
			}
		},
	})

	onShow(async () => {
		// scrollHeight.value = await proxy.calculateHeight('.scroll') + 'px'
		jcodeScrollRef.value.silentRefresh()
	})

	onLoad(async () => {
	})

	//调接口获取数据
	const getData = (e) => {
		console.log('e', e)
		console.log('e', props.navPostDataList[e.tabCurrentIndex])

		//调自定义方法接口 
		// var data = {
		// 	...e.queryInfo,
		// 	...props.navPostDataList[e.tabCurrentIndex]
		// }


		// customPost(props.getDataUrl, data).then(res => {
		// 	jcodeScrollRef.value.backData(res)
		// })
	}

	//组件将数据拼接后传回父页面
	const backData = (e) => {
		console.log('e', e)
		tabCurrentIndex.value = e.tabCurrentIndex
		console.log('this.list ', e.list)
		emit('backData', e.list)
	}

	defineExpose({
		// open, close
	})
</script>

<style lang="scss" scoped>

</style>