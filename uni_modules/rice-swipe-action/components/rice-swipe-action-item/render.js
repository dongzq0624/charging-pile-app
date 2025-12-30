const MIN_DISTANCE = 10;
const THRESHOLD = 0.15;

export default {
	/**
	 * 状态改变
	 */
	changeShow(newVal, oldVal, ownerInstance, instance, self) {
		let $el = this.getElInstance(ownerInstance)
		if (!$el || !newVal || !self.state) return
		if (this.isDisabled(instance)) return
		this.getDom(ownerInstance, self)
		if (newVal != 'none') {
			this.openAction(newVal, instance, self)
			return
		}
		this.closeAction(newVal, instance, self)
	},

	/**
	 * 重新计算尺寸
	 */
	resize(newVal, oldVal, ownerInstance, instance, self) {
		if (!newVal) return
		this.getDom(ownerInstance, self)
		ownerInstance.callMethod('unresize')
	},

	/**
	 * 将num限制在min(含)和max(含)之间
	 */
	clamp(num, min, max) {
		return Math.min(Math.max(num, min), max)
	},


	/**
	 * 重置状态
	 */
	resetTouchStatus(state, self) {
		state.rollDirection = ""
		state.skipMove = false
	},

	/**
	 * 触摸开始
	 */

	onTouchstart(e, ownerInstance, self) {
		const state = self.state
		let instance = e.instance
		if (this.isDisabled(instance)) return
		this.resetTouchStatus(self.state, self)
		this.getDom(ownerInstance, self)
		state.isDragging = true
		const touches = e.touches
		state.startX = touches[0].clientX
		state.startY = touches[0].clientY
		state.preX = state.x
		ownerInstance.callMethod("closeSwipe")

	},
	/**
	 * 滑动
	 */
	onTouchmove(e, ownerInstance, self) {
		let instance = e.instance
		const state = self.state
		if (state.skipMove) return
		if (this.isDisabled(instance)) return
		state.isDragging = true
		const touches = e.touches
		const deltaX = touches[0].clientX - (state.startX || 0)
		const deltaY = touches[0].clientY - (state.startY || 0)
		state.rollDirection = state.rollDirection || this.getDirection(Math.abs(deltaX), Math.abs(deltaY))
		if (state.rollDirection == 'vertical') {
			state.skipMove = true
		}
		if (state.rollDirection != 'horizontal') {
			return
		}
		const offsetX = deltaX + state.preX
		state.direction = offsetX > 0 ? 'left' : 'right'
		this.animateActions(offsetX, instance, self)
	},

	/**
	 * 滑动结束
	 */

	onTouchend(e, ownerInstance, self) {
		const state = self.state
		let instance = e.instance
		if (this.isDisabled(instance)) return
		state.isDragging = false
		const threshold = this.getThreshold(state)
		if (Math.abs(state.x) > threshold) {
			this.openAction(state.direction, instance, self)
		} else {
			this.closeAction(state.direction, instance, self)
		}
	},

	/**
	 * 移动
	 */
	animateActions(x, instance, self) {
		x = x || 0
		const state = self.state
		state.x = this.clamp(x, -state.rightWidth, state.leftWidth)
		const duration = instance.getDataset().duration
		instance.setStyle({
			'transition-property': 'transform',
			'transform': 'translateX(' + state.x + 'px)',
			'transition-duration': state.isDragging ? '0s' : duration + 'ms',
		})
		let iosStyle = instance.getDataset().iosstyle
		if (this.str2Bool(iosStyle) == true) {
			this.handleRightActions(state.x, instance, self)
			this.handleLeftActions(state.x, instance, self)
		}
	},

	/**
	 * 右移动
	 */
	handleRightActions(x, instance, self) {
		const state = self.state
		if (x > 0) {
			x = 0
		}
		const duration = instance.getDataset().duration
		if (!state.rightMenuDom) return
		for (let i = 0; i < state.rightMenuDom.length; i++) {
			let moveX = 0;
			if (i > 0) {
				moveX = state.rightMenusOffset[i - 1] + x * (state.rightMenusOffset[i - 1] / state.rightWidth)
			}
			if (moveX > 0) moveX = 0
			state.rightMenuDom[i].style.transitionProperty = 'transform'
			state.rightMenuDom[i].style.transform = 'translateX(' + moveX + 'px)'
			state.rightMenuDom[i].style.transitionDuration = state.isDragging ? '0s' : duration + 'ms'
		}
	},

	/**
	 * 左移动
	 */
	handleLeftActions(x, instance, self) {
		const state = self.state
		if (x < 0) {
			x = 0
		}
		if (!state.leftMenuDom) return
		const duration = instance.getDataset().duration
		for (let i = 0; i < state.leftMenuDom.length; i++) {
			let moveX = 0
			if (i != state.leftMenuDom.length - 1) {
				moveX = state.leftMenusOffset[i + 1] - x * (state.leftMenusOffset[i + 1] / state.leftWidth)
			}
			if (moveX < 0) moveX = 0
			state.leftMenuDom[i].style.transitionProperty = 'transform'
			state.leftMenuDom[i].style.transform = 'translateX(' + moveX + 'px)'
			state.leftMenuDom[i].style.transitionDuration = state.isDragging ? '0s' : duration + 'ms'
			state.leftMenuDom[i].style.zIndex = state.leftMenuDom.length - i
		}
	},

	/**
	 * 打开单元格
	 */
	openAction(direction = 'right', instance, self) {
		const state = self.state
		state.direction = direction
		const offsetX = direction == 'left' ? state.leftWidth : -state.rightWidth
		this.animateActions(offsetX, instance, self)
		if (!state.opened) {
			state.opened = true
			self.$ownerInstance.callMethod('open', direction)
		}
	},

	/**
	 * 关闭单元格
	 */
	closeAction(direction = 'right', instance, self) {
		const state = self.state
		state.direction = direction
		this.animateActions(0, instance, self)
		if (state.opened) {
			state.opened = false
			self.$ownerInstance.callMethod('close', direction)
		}

	},


	/**
	 * 获取移动的方向
	 */
	getDirection(x, y) {
		if (x > y && x > MIN_DISTANCE) {
			return 'horizontal';
		}
		if (y > x && y > MIN_DISTANCE) {
			return 'vertical';
		}
		return '';
	},

	/**
	 * 字符串转bool
	 */
	str2Bool(str) {
		return (typeof str == 'string' ? JSON.parse(str) : str) || false
	},

	/**
	 * 是否禁用
	 */
	isDisabled(instance) {
		let disabled = instance.getDataset().disabled
		return this.str2Bool(disabled)
	},

	/**
	 * 获取dom的信息
	 */
	getDom(ownerInstance, self) {
		this.getLeftDom(ownerInstance, self)
		this.getRightDom(ownerInstance, self)
	},

	/**
	 * 获取左侧单元格的信息
	 */
	getLeftDom(ownerInstance, self) {
		const state = self.state
		const $el = this.getElInstance(ownerInstance)
		if (!$el) return
		const leftDom = $el.querySelector('.rice-swipe-cell_left')
		if (!leftDom) {
			state.leftWidth = 0
			state.leftMenuDom = []
			state.leftMenusOffset = []
			return
		}
		state.leftWidth = leftDom.offsetWidth || 0
		//插槽传递过来的层级可能只有一层并且不是按钮组，需要判断一下
		let dom = leftDom.children || []
		if (dom.length == 1 && dom[0].dataset?.s != 'swipe-action') {
			dom = dom[0].children || []
		}
		state.leftMenuDom = dom
		let offset = state.leftWidth
		const leftMenusOffset = []
		for (var i = 0; i < state.leftMenuDom.length; i++) {
			leftMenusOffset.push(offset)
			offset -= state.leftMenuDom[i].getBoundingClientRect().width
		}
		state.leftMenusOffset = leftMenusOffset
	},

	/**
	 * 获取右侧单元格的信息
	 */
	getRightDom(ownerInstance, self) {
		const state = self.state
		const $el = this.getElInstance(ownerInstance)
		if (!$el) return
		const rightDom = $el.querySelector('.rice-swipe-cell_right')
		if (!rightDom) {
			state.rightWidth = 0
			state.rightMenusOffset = []
			state.rightMenusOffset = []
			return
		}
		state.rightWidth = rightDom.offsetWidth || 0
		//插槽传递过来的层级可能只有一层并且不是按钮组，需要判断一下
		let dom = rightDom.children || []
		if (dom.length == 1 && dom[0].dataset?.s != 'swipe-action') {
			dom = dom[0].children || []
		}
		state.rightMenuDom = dom
		let offset = 0
		const rightMenusOffset = []
		for (var i = 0; i < state.rightMenuDom.length; i++) {
			offset += state.rightMenuDom[i].offsetWidth || 0
			rightMenusOffset.push(-offset)
		}
		state.rightMenusOffset = rightMenusOffset
	},

	/**
	 * 获取打开关闭单元格的阈值
	 */
	getThreshold(state) {
		var num = state.opened ? 1 - THRESHOLD : THRESHOLD
		return state.direction == 'left' ? state.leftWidth * num : state.rightWidth * num
	},

	/**
	 * 获取el实例
	 */
	getElInstance(ownerInstance) {
		return ownerInstance.$el || ownerInstance.$vm && ownerInstance.$vm.$el
	},

}