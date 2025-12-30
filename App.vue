<script setup>
	import {
		getSystem
	} from "@/utils/system.js"
	import {
		ref
	} from "vue"
	import {
		onLaunch,
		onShow,
		onHide
	} from "@dcloudio/uni-app"


	onLaunch(async () => {
		const res = await getSystem()
		uni.setStorageSync("uniPlatform", res.uniPlatform)
	})

	onShow(() => {
		//自动更新
		const updateManager = uni.getUpdateManager();

		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate);
		});

		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate  应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});

		});

		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		});
	})

	// export default {
	// 	onLaunch: function() {
	// 		console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
	// 		console.log('App Launch')
	// 	},
	// 	onShow: function() {
	// 		console.log('App Show')
	// 	},
	// 	onHide: function() {
	// 		console.log('App Hide')
	// 	}
	// }
</script>

<style lang="scss">
	@import '/static/css/order.scss';
	@import '/static/css/recordCard.scss';
	@import '/static/css/card.scss';

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: 'iconfont';
		/* Project id 4682157 */
		src: url('//at.alicdn.com/t/c/font_4682157_84actsiktpf.ttf?t=1746688164712') format('truetype');
	}

	@import url("./static/css/common.css");
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	.primary-color {
		color: $uni-color-primary;
	}
</style>