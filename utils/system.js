// 获取设备信息
export const getSystem = () => {
	return new Promise(async (resolve, reject) => {
		// 获取系统信息
		const systemInfo =uni.getSystemInfoSync();

		// 检查是否为App环境
		if (systemInfo.platform === 'android' || systemInfo.platform === 'ios') {
			// 这里是仅在App环境下运行的代码
			// 例如：特定功能、API调用、页面跳转等
			console.log('这段代码只在App环境下运行。');
		} else {
			// 这里是在非App环境下运行的代码
			console.log('这段代码在非App环境下运行，例如H5或小程序。');
		}



		// #ifdef MP-WEIXIN
		const {
			appId,
			envVersion,
			version
		} = uni.getAccountInfoSync().miniProgram
		// #endif

		//#ifdef APP-PLUS

		// #endif

		const safeInfo = await uni.getSystemInfoSync()
		resolve({
			appId,
			envVersion,
			bottomHeight: safeInfo.safeAreaInsets.bottom,
			topHeight: safeInfo.safeAreaInsets.top,
			uniPlatform: safeInfo.uniPlatform,
			osName: safeInfo.osName
		})
	})
}


// 计算滚动列表高度
export const calculateHeight = (domName, dataName) => {
	return new Promise(async (resolve, reject) => {
		const {
			windowHeight
		} = await uni.getSystemInfo()

		const query = uni.createSelectorQuery()
		query.select(domName).boundingClientRect()
		query.exec(res => {
			// resolve((windowHeight - 60 - res[0].top) + 'px')
			resolve(windowHeight - res[0].top)
		})
	})
}

// 首页计算滚动列表高度
export const mainCalculateHeight = (domName, dataName) => {
	return new Promise(async (resolve, reject) => {
		const {
			windowHeight
		} = await uni.getSystemInfo()

		const query = uni.createSelectorQuery()
		query.select(domName).boundingClientRect()
		query.exec(res => {
			resolve(windowHeight - 50 - res[0].top)
		})
	})
}

// 计算顶部栏高度
export const navBarCalculateHeight = (domName, dataName) => {
	return new Promise(async (resolve, reject) => {
		const {
			windowHeight
		} = await uni.getSystemInfo()

		const query = uni.createSelectorQuery()
		query.select(domName).boundingClientRect()

		query.exec(res => {
			resolve(res[0].top)
		})
	})
}

// 格式化时间
export const resetDateTime = (time, format) => {
	const getDate = new Date(time)

	let o = {
		'MM': getDate.getMonth() + 1,
		'dd': getDate.getDate(),
		'yyyy': getDate.getFullYear(),
		'HH': getDate.getHours(),
		'mm': getDate.getMinutes(),
		'ss': getDate.getSeconds()
	}

	return format.replace(/MM|dd|yyyy|HH|mm|ss/g, match => {
		return o[match].toString().padStart(2, '0')
	})
}

// 数组/对象
export const newSet = (arr, prop, isEmpty) => {
	return arr.filter((item, index, self) => {
		if (isEmpty) {
			return self.findIndex(el => el[prop] === item[prop]) === index
		} else {
			return (self.findIndex(el => el[prop] === item[prop]) === index || item[prop] === '')
		}
	})
}

// 链接跳转字段格式化
export const linkFormat = (url, data) => {
	let format = []

	for (let key in data) {
		format.push(`${key}=${data[key]}`)
	}

	return url + '?' + format.join('&')
}

/* 传参的数据进行排序处理 */
export const formatSignData = params => {
	params = JSON.parse(JSON.stringify(params));

	let objData = []

	for (var key in params) {
		if (typeof(params[key]) === "undefined") {
			params[key] = '';
		} else {
			// if(/%[a-fA-F0-9]{2}/.test(params[key])){
			// 	params[key] = decodeURIcomponent(params[key])
			// } else {
			// 	params[key] = '';
			// }
			objData.push(`${key}=${params[key]}`)
		}
	}
	// console.log('format data >>> ', params)
	return objData.join('&') + '&key=0127abceefinrtwyy';
}


export const subscribe = (templateIds) => {
	wx.requestSubscribeMessage({
		tmplIds: templateIds,
		success(res) {
			console.log("订阅消息唤起成功 =====>", res)
		},
		fail(err) {
			console.log("订阅消息唤起失败 =====>", err)
		}
	})
}

