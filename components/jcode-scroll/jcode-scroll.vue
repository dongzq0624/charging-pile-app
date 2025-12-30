<template>
	<block v-if="type==''">
		<scroll-view class="list-scroll-content" :style="{height: scrollHeight}" :scroll-y="scrollY" :enable-flex="true"
			show-scrollbar="false" :refresher-enabled="refresherEnabled" :refresher-triggered="data.triggered"
			:refresher-threshold="30" @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
			<!-- 空白页 -->
			<jcode-empty v-if="data.loaded && data.isEmpty" :emptyText="emptyText"></jcode-empty>

			<slot>
				<!-- 这里是默认插槽内容 -->
			</slot>

			<uni-load-more v-if="data.loaded && !data.isEmpty && data.totalPage>1"
				:status="data.loadingType"></uni-load-more>
		</scroll-view>
	</block>

	<block v-else-if="type == 'navList'">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{current: tabCurrentIndex === index}" @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" :style="{ height: `calc(`+scrollHeight+` - 40px)` }"
			duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" style="height: 100%" scroll-y :enable-flex="true"
					:refresher-enabled="true" :refresher-triggered="tabItem.triggered"
					@refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
					<!-- 空白页 -->
					<jcode-empty :emptyText="emptyText" v-if="tabItem.loaded && tabItem.isEmpty"></jcode-empty>
					<view v-if="changeSign"></view>
					<view v-else>
						<slot v-if="tabIndex==tabCurrentIndex">
							<!-- 这里是默认插槽内容 -->
						</slot>
						<uni-load-more
							v-if="tabIndex==tabCurrentIndex &&tabItem.loaded && !tabItem.isEmpty && tabItem.totalPage>1"
							:status="tabItem.loadingType"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</block>
</template>

<script lang="ts" setup>
	import { ref, watch } from 'vue'
	import {
		onLoad,
		onUnload
	} from "@dcloudio/uni-app"

	//子组件中接收
	const props = defineProps({
		type: {
			type: String,
			default: ''
		},
		scrollHeight: {
			type: String,
			default: '200px'
		},
		navTextList: {
			type: [Array, String],
			default: []
		},
		tabStartIndex: {
			type: Number,
			default: 0
		},
		queryInfo: {
			type: Object,
			default: {
				pageNum: 1,
				pageSize: 5
			}
		},
		emptyText: {
			type: String,
			default: '数据为空'
		},
		refresherEnabled: {
			type: Boolean,
			default: true
		},
		scrollY: {
			type: Boolean,
			default: true
		}
	})

	const emit = defineEmits(["getData", "backData"])

	const data = ref({
		loaded: false,
		loadingType: 'more',
		totalPage: 0,
		isEmpty: false,
		triggered: false,
		list: []
	});
	const navList = ref([]);
	const changeSign = ref(false);
	const tabCurrentIndex = ref(0);
	const currentPageNum = ref(null)

	watch(() => props.tabStartIndex, (newValue) => {
		initView()
	}, { deep: true })

	onLoad(() => {
		console.log("scroll onLoad")
		initView()
	})

	onUnload(() => {
		console.log("scroll onUnload")
	})

	const initView = () => {
		navList.value = []
		if (props.type == 'navList') {
			tabCurrentIndex.value = props.tabStartIndex
			console.log('props.tabStartIndex', props.tabStartIndex)
			props.navTextList.forEach(item => {
				var info = {
					pageNum: props.queryInfo.pageNum,
					pageSize: props.queryInfo.pageSize
				}
				var pushData = {
					...data.value,
					queryInfo: info,
					text: item
				}
				navList.value.push(pushData)
			})
		}
		silentRefresh()
	}


	//静默刷新
	const silentRefresh = () => {
		getData(true, false)
	}

	const getData = (fresh, load) => {
		if (props.type == 'navList') {
			if (!navList.value[tabCurrentIndex.value].loaded || fresh) {
				if (load)
					uni.showLoading({
						title: '加载中...',
						mask: true
					});
				setTimeout(() => {
					emit("getData", {
						queryInfo: navList.value[tabCurrentIndex.value].queryInfo,
						tabCurrentIndex: tabCurrentIndex.value
					})
				}, 500)
			} else {
				changeSign.value = false
				emit("backData", {
					tabCurrentIndex: tabCurrentIndex.value,
					list: navList.value[tabCurrentIndex.value].list
				})
			}
		} else {
			if (!data.value.loaded || fresh) {
				if (load)
					uni.showLoading({
						title: '加载中...',
						mask: true
					});
				setTimeout(() => {
					emit('getData', props.queryInfo)
				}, 500)
			}
		}
	}

	const backData = (e) => {
		uni.hideLoading()
		if (props.type == 'navList') {
			changeSign.value = false
			navList.value[tabCurrentIndex.value].list = navList.value[tabCurrentIndex.value].queryInfo.pageNum === 1 ?
				e.rows || e.data.list :
				navList.value[tabCurrentIndex.value].list.concat(e.rows || e.data.list)
			emit("backData", {
				list: navList.value[tabCurrentIndex.value].list,
				tabCurrentIndex: tabCurrentIndex.value
			})
			navList.value[tabCurrentIndex.value].totalPage = ceilDivision(e.total || e.data.totalRow,
				navList.value[tabCurrentIndex.value].queryInfo.pageSize)
			navList.value[tabCurrentIndex.value].isEmpty = (e.total || e.data.totalRow) == 0
			navList.value[tabCurrentIndex.value].loadingType = 'more'
			navList.value[tabCurrentIndex.value].loaded = true
			navList.value[tabCurrentIndex.value].triggered = false
		} else {
			if (props.queryInfo.pageNum == currentPageNum.value && props.queryInfo.pageNum != 1)
				return
			currentPageNum.value = props.queryInfo.pageNum
			data.value.list = props.queryInfo.pageNum === 1 ?
				e.rows || e.data?.list :
				data.value.list.concat(e.rows || e.data?.list)
			emit("backData", data.value.list)
			data.value.totalPage = ceilDivision(e.total || e.data?.totalRow,
				props.queryInfo
					.pageSize)
			data.value.isEmpty = (e.total || e.data?.totalRow) == 0
			data.value.loadingType = 'more'
			data.value.loaded = true
			data.value.triggered = false
			console.log('data.value.totalPage', data.value.totalPage)
		}
	}
	// 上拉加载
	const scrolltolower = () => {
		if (props.type == 'navList') {
			if (navList.value[tabCurrentIndex.value].queryInfo.pageNum === navList.value[tabCurrentIndex.value]
				.totalPage) {
				navList.value[tabCurrentIndex.value].loadingType = 'noMore'
				return
			}
			navList.value[tabCurrentIndex.value].queryInfo.pageNum += 1
			navList.value[tabCurrentIndex.value].loadingType = 'loading'
		} else {
			console.log('eqwqweqwe')
			if (props.queryInfo.pageNum === data.value.totalPage) {
				data.value.loadingType = 'noMore'
				return
			}
			props.queryInfo.pageNum += 1
			data.value.loadingType = 'loading'
		}

		setTimeout(() => {
			getData(true, false)
		}, 500)
	}

	// 下拉刷新
	const refresherrefresh = () => {
		if (props.type == 'navList') {
			navList.value[tabCurrentIndex.value].triggered = true
			navList.value[tabCurrentIndex.value].queryInfo.pageNum = 1
		} else {
			data.value.triggered = true
			props.queryInfo.pageNum = 1
		}

		getData(true)
	}

	//swiper 切换
	const changeTab = (e) => {
		changeSign.value = true
		tabCurrentIndex.value = e.target.current;
		getData()
	}

	//顶部tab点击
	const tabClick = (index) => {
		tabCurrentIndex.value = index;
	}

	// 定义一个向上取整的函数
	const ceilDivision = (dividend, divisor) => {
		return Math.ceil(dividend / divisor);
	}

	defineExpose({
		refresherrefresh, backData, getData, silentRefresh, initView, tabClick
	})
</script>
<style lang="scss" scoped>
	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		// background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			background-color: $uni-color-back;

			&.current {
				color: $uni-color-theme;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $uni-color-theme;
				}
			}
		}
	}

	.swiper-box {
		// height: calc(100% - 40px);
	}
</style>