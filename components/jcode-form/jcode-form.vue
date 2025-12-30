<template>
	<view>
		<Navbar :leftIcon="leftIcon" :editSign="editSign" backgroundColor="#f8f8f8" color="#000000" :title="title">
		</Navbar>
		<view class="container">
			<!-- <uni-nav-bar color="#fff" IconSize="50rpx" fontSize="32rpx"  :fixed="true" border="false" statusBar="true" left-icon="left" background-color="#398ade" title="编辑问题"></uni-nav-bar> -->
			<view v-for="(item, index) in formList" :key="index" @tap="onclick(item)">
				<view class="cell-container">

					<!--***** 表头 *****-->
					<view class="head-content" v-if="item.type=='head'">
						<text style="font-size:30rpx;">{{item.title}}</text>
					</view>


					<!--***** 文本展示 *****-->
					<view class="cell-content" v-if="item.type=='text'||item.type=='toPage'">
						<view class="cell-content-left">
							<!-- 左侧标题  -->
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<!-- 普通文本  -->
							<text v-if="item.value" class="left-right">{{item.value}}</text>
							<text v-else class="left-right" style="    color: dimgray;">{{item.placeholder}}</text>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>


					<!--***** 输入框 *****-->
					<view class="cell-content" v-if="item.type=='input'">
						<view class="cell-content-left">
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<input class="left-right" @input="onKeyInput(item.id,$event)" :value="item.value"
								:disabled="item.disabled" :placeholder="item.placeholder" />
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>

					<!--***** 输入框 *****-->
					<view class="cell-content" v-if="item.type=='borderInput'">
						<view class="cell-content-left">
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<textarea class="left-right" style="height: 20px;width: 60%;" auto-height
								@input="onKeyInput(item.id,$event)" :value="item.value" :disabled="item.disabled"
								:placeholder="item.placeholder" />
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>


					<!--***** 带提示输入框 *****-->
					<view class="cell-content" v-if="item.type=='tipInput'">
						<view class="cell-content-left">
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<aui-autocomplete class="left-right" :suggestions="suggestions"
								:placeholder="item.placeholder" @input="ontipInput(item,$event)"
								@focus="tipInputFocus(item)" @select="select" ref="AuiAutocomplete">
							</aui-autocomplete>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>


					<!--***** 底部弹出单项选择框 *****-->
					<picker mode="selector" :range="item.pickerArray" style="width: 100%;align-items: center;"
						@change="selectorPickerBindChange(item.id,$event)" v-if="item.type=='selectorPicker'">
						<view class="cell-content">
							<view class="cell-content-left">
								<text class="left-title">
									<text style="color: red;" v-if="item.must">*</text>
									{{item.title}}</text>
								<view class="left-right">
									{{item.pickerArray[item.pickerIndex]}}
								</view>
							</view>
							<!-- 右侧图标  -->
							<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
							<view v-else style="width: 20px;"></view>
						</view>
					</picker>


					<!--***** radio二选一 *****-->
					<view class="cell-content" v-if="item.type=='radio'">
						<view class="cell-content-left">
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<radio-group style="flex-direction: row;display: flex;"
								@change="radioChange(item.id,$event)">
								<label v-for="radioItem of item.list">
									<radio style="margin-left: 20px;" :value="radioItem.key"
										:checked="radioItem.key==item.value">{{ radioItem.value }}
									</radio>
								</label>
							</radio-group>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>


					<!-- 			***** 上传图片 *****
					<view class="cell-content" v-if="item.type=='uploadImg'">
						<view class="cell-content-left">
							左侧标题 
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>

							右侧内容 
							<view style="margin-right: -16px;margin-bottom: -15rpx;">
								<jcode-picture :ref="'jcodePicture'+item.id" max="1" :showLoadingSign="false"
									:displaySign="jcodePictureDisplaySign" :url="item.value"
									@getUrlSuccess="getUrlSuccess" @choosed="choosed(item.id,$event)"
									@noneUrlUpload="noneUrlUpload"></jcode-picture>
							</view>
						</view>
						右侧图标 
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view> -->


					<!-- 时间选择 -->
					<view class="cell-content" v-if="item.type=='time'">
						<view class="cell-content-left">
							<!-- 左侧标题  -->
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<text class="left-right" v-if="item.value!=''"
								style="flex:1;font-size:30rpx;">{{item.value}}</text>
							<text class="left-right" v-else style="flex:1;font-size:30rpx;color: gray;">请选择</text>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>


					<!--***** 微信头像 *****-->
					<button class="cell-content" v-if="item.type=='weChatAvatar'" open-type="chooseAvatar"
						@chooseavatar="chooseAvatarEvent(item.id,$event)">
						<view class="cell-content-left">
							<!-- 左侧标题  -->
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<!-- 微信头像  -->
							<image class="img" :src="item.value" v-if="item.value"></image>
							<image class="img" src="@/static/images/logo/logo.png" v-else></image>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</button>


					<!--***** 微信昵称 *****-->
					<view class="cell-content" v-if="item.type=='weChatNickName'">
						<view class="cell-content-left">
							<!-- 左侧标题  -->
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<!-- 普通文本  -->
							<input class="left-right" type="nickname" confirm-type="done" v-model="item.value"
								placeholder="请输入昵称" auto-blur="true" @blur="inputNickName(item.id,$event)"
								placeholder-style="color: #AAAAAA;">
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</view>

					<!--***** 微信手机号 *****-->
					<button class="cell-content" v-if="item.type=='weChatMobile' && item.value.length < 10"
						open-type="getPhoneNumber" @getphonenumber="getPhoneNumberBack">
						<view class="cell-content-left">
							<!-- 左侧标题  -->
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<!-- 普通文本  -->
							<text v-if="item.value" class="left-right">{{item.value}}</text>
							<text v-else class="left-right" style="    color: dimgray;">{{item.placeholder}}</text>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</button>

					<!--***** 微信手机号 *****-->
					<button class="cell-content" v-else-if="item.type=='weChatMobile' && item.value.length > 10">
						<view class="cell-content-left">
							<!-- 左侧标题  -->
							<text class="left-title">
								<text style="color: red;" v-if="item.must">*</text>
								{{item.title}}</text>
							<!-- 普通文本  -->
							<text v-if="item.value" class="left-right">{{item.value}}</text>
							<text v-else class="left-right" style="    color: dimgray;">{{item.placeholder}}</text>
						</view>
						<!-- 右侧图标  -->
						<uni-icons v-if="item.right" color="#a8a8a8" :type="item.right" :size="20" />
						<view v-else style="width: 20px;"></view>
					</button>

				</view>
			</view>

			<buuug7-simple-datetime-picker ref="myPicker" @submit="handleSubmit" :start-year="1930" :end-year="2030"
				:time-hide="pickerShow" :time-label="['年', '月', '日', '时', '分', '秒']" />
		</view>
	</view>
</template>


<script lang="ts" setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";

	import {
		onShow
	} from "@dcloudio/uni-app"


	const props = defineProps({
		leftIcon: {
			type: String,
			default: 'left'
		},
		editSign: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		//表单
		formList: {
			type: [Array, Object],
			default: []
		},
		inputText: {
			type: String,
			default: ''
		},
		jcodePictureDisplaySign: {
			type: Boolean,
			default: false
		}
	})

	const {
		proxy
	} = getCurrentInstance();

	const myPicker = ref();//时间选择组件


	const nowCheckId = ref(0);
	const pickerShow = ref([]);
	const suggestions = ref([]);
	const emit = defineEmits(["jcodeFormBack", "choosed"])

	const onclick = (item) => {
		console.log('点击' + item.id)
		// 记录当前点击index
		nowCheckId.value = item.id

		if (item.callBack) {
			toBack(item, null)
		}

		switch (item.type) {
			case 'toPage':
				uni.navigateTo({
					url: item.pageUrl
				})
				break;
			case 'time':
				pickerShow.value = item.show
				myPicker.value.show(item.id)
				break;
			default:
				break;
		}
	}
	// 回调方法
	const toBack = (data, value) => {
		var backData = {}
		if (data)
			backData = data
		else
			backData = {
				id: nowCheckId.value,
				value
			}
		emit("jcodeFormBack", backData)
	}

	//input监听
	const onKeyInput = (id, e) => {
		nowCheckId.value = id
		toBack(null, e.detail.value)
	}

	//tipinput聚焦提示
	const tipInputFocus = (item) => {
		if (item.focusSign)
			suggestions.value = item.tips
	}

	// tipInput输入框输入时触发
	const ontipInput = (item, value) => {
		suggestions.value = item.tips.filter(item => item.includes(value));
		toBack(null, value)
	}

	// 选中建议列表中的项时触发
	const select = (value) => {
		toBack(null, value)
	}

	//radio点击切换选项
	const radioChange = (id, e) => {
		// 记录当前点击index
		nowCheckId.value = id
		toBack(null, e.detail.value)
	}

	//selectorPicker点击切换
	const selectorPickerBindChange = (id, e) => {
		nowCheckId.value = id
		toBack(null, e.target.value)
	}

	//调用jcode-picture组件上传图片
	// const uploadImg = (formList) => {
	// 	formList.forEach(item => {
	// 		if (item.type == 'uploadImg') {
	// 			this.$refs['jcodePicture' + item.id][0].upload(item.id)
	// 		}
	// 	})
	// }

	//jcode-picture组件选择图片后的回调
	const choosed = (id, e) => {
		var data = {
			id,
			choosed: e
		}
		emit("choosed", data)
	}

	// //jcode-picture组件上传图片成功后的回调
	// const getUrlSuccess=(e)=> {
	// 	console.log('e', e)
	// 	//图片选择回调  返回格式{id:index, urlList:[]}
	// 	toBack(e)
	// }
	// const jcodePictureInitView=(list)=> {
	// 	list.forEach(item => {
	// 		if (item.type == 'uploadImg' && item.value != '') {
	// 			var s = []
	// 			s.push(item.value)
	// 			this.$refs['jcodePicture' + item.id][0].initView(s)
	// 		}
	// 	})
	// }

	// const noneUrlUpload=(id)=> {
	// 	this.toBack({
	// 		id
	// 	})
	// }

	// time选择
	const handleSubmit = (e) => {
		var time = ''
		if (e.year != '')
			time += e.year + '年'
		if (e.month != '')
			time += e.month + '月'
		if (e.day != '')
			time += e.day + '日'
		if (e.hour != '')
			time += e.hour + '时'
		if (e.minute != '')
			time += e.minute + '分'
		if (e.second != '')
			time += e.second + '秒'
		// this.showList[this.nowCheckIndex].value = time
		toBack(null, time)
	}

	// 头像选择
	const chooseAvatarEvent = (id, e) => {
		nowCheckId.value = id
		toBack(null, e.detail.avatarUrl)
	}

	const inputNickName = (id, e) => {
		nowCheckId.value = id
		toBack(null, e.detail.value)
	}


	//一键绑定按钮回调
	const getPhoneNumberBack = async (e) => {
		console.log('getPhoneNumber点击回调', e) // 动态令牌
		if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
			proxy.msg('用户拒绝获取手机号')
		} else {
			// e.detail.code 模拟 根据code去后端解密手机号并绑定
			setTimeout(() => {
				proxy.successMsg('绑定成功')
			}, 1000)
		}
	}
</script>

<style scoped lang="scss">
	.container {
		@include flexColumn();
		margin-bottom: 60px;

		.card {
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			background-color: white;
			padding: 30rpx;
			flex-wrap: wrap;
			width: 100%;

		}
	}

	.cell-container {
		@include flexColumn();
		background-color: white;
		align-items: center;

		.head-content {
			@include padding(20rpx);
			@include border(['bottom'], 1px, #eee);
			@include flexRowsCenter();
			width: 100%;
			background-color: #f8f8f8;
			font-size: 16px;
			color: #7a7a7a;
		}

		.cell-content {
			@include padding(20rpx);
			@include border(['bottom'], 1px, #eee);
			@include flexRowsCenter();
			width: 100%;

			font: {
				size: 28rpx;
			}

			.cell-content-left {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex: 1;
				margin-right: 10rpx;

				.left-title {
					color: black;
					margin-right: 15px;
					width: 100px;
					font-weight: 400;
					font-size: 32rpx;
				}

				.left-right {
					word-break: break-all;
					font-size: 30rpx;
					text-align: right;
				}
			}
		}
	}

	.bottom-row {
		z-index: 100;
		position: fixed;
		bottom: 0px;
		padding: 30rpx;
		left: 0;
		background-color: #ffffff;
		width: 750rpx;
		box-shadow: 0px -2rpx 12rpx 0px rgba(0, 0, 0, 0.1);
		@include padding(10rpx);

		// padding-bottom: 51rpx;
		.btn {
			width: 690rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #ffffff;
			font-size: 30rpx;
			background: #12A1FE;
			border-radius: 20rpx;
		}
	}

	.img {
		width: 40px;
		height: 40px;
		/* border:5upx solid #fff; */
		border-radius: 50%;
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
		text-align: left;
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