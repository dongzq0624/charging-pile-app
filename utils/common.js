export const common = {
	data() {
		return {
			//点击防抖
			noClick: true,
			memberWallet: {},
		}
	},
	methods: {
		//保留几位小数
		numFilter(value, num) {
			// 截取当前数据到小数点后三位
			let tempVal = parseFloat(value).toFixed(num + 5)
			let realVal = tempVal.substring(0, tempVal.length - 5)
			return realVal
		},
		//点击事件防抖
		noMultipleClicks(methods, info) {
			// methods是需要点击后需要执行的函数， info是点击需要传的参数
			// let that = this;
			if (this.noClick) {
				// 第一次点击
				this.noClick = false;
				if (info && info !== '')
					// info是执行函数需要传的参数
					methods(info);
				else
					methods();
				setTimeout(() => {
						this.noClick = true;
					},
					2000)
			} else {}
		},
		msg(e) {
			uni.showToast({
				icon: 'none',
				title: e
			})
		},
		successMsg(e) {
			uni.showToast({
				title: e
			})
		},
		failMsg(e) {
			uni.showToast({
				icon: 'error',
				title: e
			})
		},
		showLoading(e) {
			if (e)
				uni.showLoading({
					title: e,
					mask: true
				});

			else
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
		},
		hideLoading() {
			uni.hideLoading()
		},
		navTo(url) {
			uni.navigateTo({
				url: url
			})
		},
		redTo(url) {
			uni.redirectTo({
				url: url
			})
		},
		switchTab(url) {
			uni.switchTab({
				url: url
			});
		},
		back() {
			const pages = getCurrentPages();
			if (pages.length > 1)
				uni.navigateBack()
			else {
				uni.reLaunch({
					url: '/pages/tabBar/home/home'
				})
			}
		},
		//复制
		copyText(e) {
			uni.setClipboardData({
				data: e,
				success: function() {
					uni.showToast({
						title: '复制成功',
						icon: 'success',
						duration: 2000
					})
				},
				fail: (error) => {
					console.log('失败', error);
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					});
				}
			})
		},
		daysBetweenDates(date1, date2) {
			// 将字符串转换为Date对象
			const dateOne = new Date(date1);
			const dateTwo = new Date(date2);

			// 计算时间差（以毫秒为单位）
			const timeDifference = Math.abs(dateTwo - dateOne);

			const hours = Math.floor(timeDifference / (1000 * 60 * 60) % 24);
			const minutes = Math.floor(timeDifference / (1000 * 60) % 60);
			return `${hours}时${minutes}分`;
		},
		toLogin() {
			this.navTo(`/pages/login/login`)
		},
		convertToTimestamp(time) {
			// 假设 time 格式为 "HH:mm:ss"
			const parts = time.split(':');
			const hours = parseInt(parts[0], 10);
			const minutes = parseInt(parts[1], 10);
			const seconds = parseInt(parts[2], 10);

			// 将时分秒转换为毫秒，然后加上1970年1月1日的秒数得到时间戳
			return (hours * 3600 + minutes * 60 + seconds) * 1000;
		},
		previewImg(img) {
			let imgs = [] //预览的数组
			imgs[0] = img;
			// 预览图片
			uni.previewImage({
				urls: imgs,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {},
					fail: function(err) {}
				}
			});
		},
		toPrePage(preNum, data) {
			// 把数据传到上一页
			// prevPage.$vm._.exposed.getId(buildObj.value)

			const pages = getCurrentPages(); // 获取当前页面栈
			const prevPage = pages[pages.length - (preNum + 1)];
			console.log('prevPage.$vm', prevPage)
			prevPage.$vm.backCarryData({
				data
			})
			// 关闭当前页面，返回上一页面
			uni.navigateBack({
				delta: preNum
			})
		},
		getLocation() {
			return new Promise((resolve, reject) => {
				// #ifdef MP
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: res => {
						console.log('getLocationSucc', res)
						resolve({
							latitude: res.latitude,
							longitude: res.longitude
						})
					},
					fail: err => {
						this.msg('为了更加准确的为你提供站点导航，请打开手机定位！')
						console.log('getLocationErr', err)
						resolve(false)
					}
				});
				// #endif
			})
		},
		getLoginFlag() {
			if (uni.getStorageSync('member_id'))
				return true
			else
				return false
		},
		// 计算滚动列表高度
		calculateHeight(domName) {
			return new Promise(async (resolve, reject) => {
				const {
					windowHeight
				} = await uni.getSystemInfo()
				const query = uni.createSelectorQuery()
				console.log('query', query)
				query.select(domName).boundingClientRect()
				query.exec(res => {
					console.log('res', res)
					console.log('windowHeight', windowHeight)
					resolve(windowHeight - res[0].top)
				})
			})
		},
		// 获取view高度宽度等
		getViewHW(domName) {
			return new Promise(async (resolve, reject) => {
				const query = await uni.createSelectorQuery()
				query.select(domName).boundingClientRect(data => {
					console.log('getViewHW', data)
					resolve(data)
				}).exec();
			})
		},
		//退出登录
		async memberQuit() {
			console.log('ewq')
			uni.showLoading({
				title: '退出登录中...',
				mask: true
			});
			await this.removeStroage()
			setTimeout(() => {
					uni.hideLoading();
					wx.reLaunch({
						url: '/pages/tabBar/user/user'
					});
				},
				1000)
		},
		removeStroage() {
			return new Promise(async (resolve, reject) => {
				uni.removeStorageSync("member_token")
				uni.removeStorageSync("member_id")
				uni.removeStorageSync("member_avatar")
				uni.removeStorageSync("member_nickName")
				uni.removeStorageSync("member_mobile")
				uni.removeStorageSync("member_role")
				uni.removeStorageSync("currAuthorizeStep")
				resolve(true)
			});

		},
		//登录验证
		async isLogin(methods, info) {
			const result = uni.getStorageSync('member_id')
			if (!result)
				uni.navigateTo({
					url: '/pages/login/login'
				})
			else {
				if (info && info !== '')
					// info是执行函数需要传的参数
					methods(info);
				else
					methods();
			}
		},
		isLoginToPage(toPageUrl) {
			const result = uni.getStorageSync('member_id')
			if (!result)
				uni.navigateTo({
					url: `/pages/login/login?toPageUrl=${encodeURIComponent(toPageUrl)}`
				})
			else {
				uni.navigateTo({
					url: toPageUrl
				})
			}
		},
		async refreshWallet() {
			if (this.getLoginFlag()) {
				//调用钱包接口
				setTimeout(()=>{
					this.memberWallet = {
						amount: 100,
						giftAmount: 0,
						freezeAmount: 0
					}
				},1000)
			} 
		}
	}
}