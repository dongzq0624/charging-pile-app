<template>
	<view class="rice-swipe-action" :style="[customStyle]">
		<!-- 微信小程序使用wxs实现，暂不支持其他小程序 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="rice-swipe-cell" :data-disabled="disabled" :data-duration="duration" :data-iosStyle="iosStyle" :show="show"
			:change:show="wxs.changeShow" :resize="resizeDom" :change:resize="wxs.resize" @touchstart="wxs.onTouchstart"
			@touchmove="wxs.onTouchmove" @touchend="wxs.onTouchend" @touchcancel="wxs.onTouchend">
		<!-- #endif -->
			<!-- app和h5使用 renderjs实现 ，不支持nvue-->
			<!-- #ifdef APP || H5-->
			<view class="rice-swipe-cell" :id="getDomId()" :data-disabled="disabled" :data-duration="duration" :data-iosStyle="iosStyle" :show="show"
				:change:show="renderswipe.changeShow" :resize="resizeDom" :change:resize="renderswipe.resizeRect"
				@touchstart="renderswipe.onTouchstart" @touchmove="renderswipe.onTouchmove" @touchend="renderswipe.onTouchend"
				@touchcancel="renderswipe.onTouchend">
			<!-- #endif -->
				<view v-if="hasLeftAction" class="rice-swipe-cell_left">
					<slot name="left">
						<view v-for="(item,index) in leftMenu" :key="index" data-s="swipe-action" :style="[item.style]"
							class="rice-menu-item_left" @click="menuClick(index,'left')">
							<text>{{item.text}}</text>
						</view>
					</slot>
				</view>
				<view class="rice-swipe-cell_content" @click="contentClick">
					<slot name="default"></slot>
				</view>
				<view v-if="hasRightAction" class="rice-swipe-cell_right">
					<slot name="right">
						<view v-for="(item,index) in rightMenu" :key="index" data-s="swipe-action" :style="[item.style]"
							class="rice-menu-item_right" @click="menuClick(index,'right')">
							<text>{{item.text}}</text>
						</view>
					</slot>
				</view>
			</view>
		</view>
</template>
<!-- #ifdef MP-WEIXIN -->
<script module="wxs" lang="wxs" src="./wx.wxs"></script>
<!-- #endif -->

<script module="renderswipe" lang="renderjs">
	import render from "./render";
	export default {
		data() {
			return {
				state: {
					rightWidth: 0,
					leftWidth: 0,
					x: 0,
				},
			}
		},
		methods: {
			/**
			 * 阻止默认事件
			 */
			preventEvent(e) {
				if (e.cancelable) {
					e.preventDefault && e.preventDefault()
				}
			},

			/**
			 * 改变状态
			 */
			changeShow(newVal, oldVal, ownerInstance, instance) {
				render.changeShow(newVal, oldVal, ownerInstance, instance, this)
			},

			/**
			 * resize
			 */
			resizeRect(newVal, oldVal, ownerInstance, instance) {
				render.resize(newVal, oldVal, ownerInstance, instance, this)
			},

			/**
			 * 触摸开始
			 */
			onTouchstart(e, ownerInstance) {
				render.onTouchstart(e, ownerInstance, this)
			},

			/**
			 * 滑动
			 */
			onTouchmove(e, ownerInstance) {
				render.onTouchmove(e, ownerInstance, this)
				const id = e.currentTarget.id
				const el = document.getElementById(id)
				el.addEventListener('touchmove', this.preventEvent, {
					passive: false,
					capture: false
				})

			},

			/**
			 * 滑动结束
			 */
			onTouchend(e, ownerInstance) {
				render.onTouchend(e, ownerInstance, this)
				const id = e.currentTarget.id
				const el = document.getElementById(id)
				el.removeEventListener('touchmove', this.preventEvent, {
					passive: false,
					capture: false
				})
			},


		},
	}
</script>

<script>
	import mpMixins from "./mpMixins"
	/**
	 * swipr-action-item 滑动单元格
	 * @description  滑动单元格
	 * @property {String} v-model/modelValue {left|right|none} 默认none
	 * @value left 打开左侧单元格
	 * @value right 打开右侧单元格
	 * @value none 关闭单元格
	 * @property {String|Number} name 唯一标识符
	 * @property {Array} leftMenu 左侧菜单项及样式
	 * @property {Array} rightMenu 右侧菜单项及样式
	 * @property {Boolean} iosStyle 是否ios风格的滑动
	 * @property {Boolean} disabled 是否禁止滑动
	 * @property {String|Number} duration 动画过渡时间，单位ms
	 * @property {Boolean} autoClose 是否自动关闭单元格，如果左/右传了插槽，此参数无效，可以通过modeValue手动关闭单元格
	 * @property {Object|String} customStyle 自定义style样式
	 */
	export default {
		//在微信小程序中，app-vue和app-uvue共用这个mixins
		mixins: [mpMixins],
	}
</script>

<style scoped lang="scss">
	@mixin transition {
		transition-property: transform;
		transition-duration: 0ms;
		transition-timing-function: ease;
	}

	.rice-swipe-action {
		width: 100%;
		overflow: hidden;
	}

	.rice-swipe-cell {
		@include transition();
		position: relative;
		width: 100%;
		display: flex;
		flex-shrink: 0;

		&_left {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			height: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: row;
			align-items: center;
			transform: translateX(-100%);
		}

		&_right {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
			overflow: hidden;
			height: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			transform: translateX(100%);
		}

		&_content {
			width: 100%;
		}
	}

	@mixin menu-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		transition-property: transform;
		transition-timing-function: ease;
		overflow: hidden;
		font-size: 30rpx;
		color: #fff;
	}

	.rice-menu-item_left {
		@include transition();
		@include menu-item();
	}

	.rice-menu-item_right {
		@include transition();
		@include menu-item();
	}
</style>