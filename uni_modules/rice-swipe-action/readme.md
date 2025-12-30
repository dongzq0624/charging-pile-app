# rice-swipe-action 滑动单元格 -同时兼容uniapp和uniappx

可以通过左右滑动来展示不同操作按钮的ios风格滑动单元格组件。兼容uniapp/uniappx。同时支持app，微信小程序和h5移动端。

在app端和小程序的vue页面中为了提高交互体验，避免逻辑层和渲染层之间交互的通信折损，本组件在app端使用了renderjs技术，在微信小程序端使用了wxs技术，可以达到流畅的体验。

在uniappx项目中使用见下方**uniappx代码示例**

## 代码示例

**基本使用**，`rice-swipe-action-item` 可以单独使用，也可以结合 `rice-swipe-action` 一起使用。支持ios风格的滑动动画效果和普通的动画效果

- 内部按钮可以通过 `leftMenu` 和 `rightMenu` 参数配置，此参数为一个数组，元素为对象，可以配置按钮的文字和style样式，非必要请不要配置按钮的宽高，宽高会根据内容自动适配。
- 在uniappx中 `leftMenu` 和 `rightMenu` 的类型为 `SwipeMenu[]`，可以从组件中导入。
- 左右按钮也可以通过`slot`插槽进行配置。使用插槽时，内部按钮的点击事件menuClick将生效，按钮的点击事件可以自己编写。(微信小程序左右区域使用**slot插槽**时，受限于小程序插槽和wxs的限制，滑动风格不是ios的风格，其他端没这个问题)

```vue
<template>
	<rice-swipe-action :customStyle="{marginTop:'12rpx'}">
		<rice-swipe-action-item :leftMenu="leftMenu" :rightMenu="rightMenu"
			:customStyle="{borderBottom: '1px solid #f5f6f7'}" name="swipe" @menuClick="menuClick" @contentClick="contentClick">
			<template #default>
				<view class="box">左右都可以滑动的单元格</view>
			</template>
		</rice-swipe-action-item>
		<!-- 插槽 -->
		<rice-swipe-action-item>
			<template #default>
				<view class="box">左右都可以滑动的单元格</view>
			</template>
			<template #right>
				<button type="primary" size="mini" @click="btnClick">确定</button>
				<button type="warn" size="mini">取消</button>
			</template>
		</rice-swipe-action-item>
	</rice-swipe-action>
</template>
<script setup>
	import { ref } from "vue"
	const leftMenu = ref([{
		text: "删除",
		style: {
			backgroundColor: "#ee0a24",
			color: "#fff",
			fontSize: '30rpx'
		},
	}])
	const rightMenu = ref([{
		text: "删除",
		style: {
			backgroundColor: "#ee0a24",
		},
	}, {
		text: '编辑',
		style: {
			backgroundColor: "#07c160",
		},
	}])

	//操作按钮的点击
	function menuClick(e) {
		console.log('按钮的index', e.index, 'name', e.name, 'direction', e.direction)
	}
	function btnClick() {
		console.log('btnClick')
	}
	function contentClick() {
		console.log('contentClick')
	}
</script>

<style scoped>
	.box {
		padding: 32rpx 20rpx;
		box-sizing: border-box;
	}
</style>
```

**使用双向绑定**

```vue
<template>
	<button type="primary" @click="show=show=='none'?'right':'none'">{{show=='none'?'打开':'关闭'}}右侧单元格</button>
	<rice-swipe-action-item v-model="show" :rightMenu="rightMenu">
		<template #default>
			<view class="box">v-model双向绑定-{{show}}</view>
		</template>
	</rice-swipe-action-item>
</template>
<script setup>
	import { ref } from "vue"
	const show = ref('none')
	const leftMenu = ref([{
		text: "删除",
		style: {
			backgroundColor: "#ee0a24",
			color: "#fff",
			fontSize: '30rpx'
		},
	}])
</script>
```

**异步关闭**

- 把`rice-swipe-action-item` 的 `autoClose` 参数设置为false即可，在需要关闭单元格的时候，可以改变`v-model`/`modelValue`的值或者调用组件的close方法即可关闭单元格，**注意不是 `rice-swipe-action` 的`autoClose`** 

```vue
<template>
	<rice-swipe-action>
		<rice-swipe-action-item v-model="show" :autoClose="false" :rightMenu="rightMenu"
			:customStyle="{borderBottom: '1px solid #f5f6f7'}" name="swipe" ref="swipe" @menuClick="menuClick">
			<template #default>
				<view class="box">异步关闭单元格-{{show}}</view>
			</template>
		</rice-swipe-action-item>
	</rice-swipe-action>
</template>
<script setup>
	import { ref } from "vue"
	const rightMenu = ref([{
		text: "删除",
		style: {
			backgroundColor: "#ee0a24",
		},
	}, {
		text: '编辑',
		style: {
			backgroundColor: "#07c160",
		},
	}])

	//操作按钮的点击
    const show = ref('none')
	const swipe = ref(null)
	function menuClick(e) {
		uni.showLoading({
			title: '加载中…'
		})
		setTimeout(() => {
			uni.hideLoading()
			show.value = 'none'
			// swipe.value?.close()
		}, 2000)
	}
</script>
```

**uniappx 项目中使用**

```vue
<template>
	<rice-swipe-action :customStyle="customStyle1" ref="swipe">
		<rice-swipe-action-item  :leftMenu="leftMenu" :rightMenu="rightMenu"
			ref="swipeItem" name="first"  @menuClick="menuClick" @contentClick="contentClick">
			<template #default>
				<view class="box">
					<text>this is default 左右两侧滑动</text>
				</view>
			</template>
		</rice-swipe-action-item>
	</rice-swipe-action>
</template>

<script setup>

	import { SwipeMenu } from "@/uni_modules/rice-swipe-action"

	const leftMenu = ref<SwipeMenu[]>([{
		text: '删除',
		style: {
			backgroundColor: 'red',
			color: '#fff',
			fontSize: '36rpx'
		},
	}, {
		text: '编辑',
		style: {
			backgroundColor: '#52a8ff',
			color: "#000"
		},
	}])

	function menuClick(e:UTSJSONObject) {
		console.log('按钮的index', e['index'], 'name', e['name'], 'direction', e['direction'])
	}
	function btnClick() {
		console.log('btnClick')
	}
	function contentClick() {
		console.log('contentClick')
	}
	
	//调用组件的方法
	const swipe = ref<RiceSwipeActionComponentPublicInstance | null>(null)
	const swipeItem = ref<RiceSwipeActionItemComponentPublicInstance | null>(null)

	function open(){
		swipeItem.value?.open?.('left')
	}
	
	function closeAll() {
		swipe.value?.closeAll?.()
	}
	
</script>
```

## API

## Props

### **rice-swipe-action**

| 参数        | 说明                   | 类型             | 默认值 |
| ----------- | ---------------------- | ---------------- | ------ |
| autoClose   | 是否自动关闭其他按钮组 | boolean          | true   |
| customStyle | 自定义样式             | object \| string | -      |

### **rice-swipe-action-item**

| 参数               | 说明                                                         | 类型           | 默认值 |
| ------------------ | ------------------------------------------------------------ | -------------- | ------ |
| v-model/modelValue | 是否打开单元格，right：打开右侧；left：打开左侧；none：不打开 | string         | none   |
| name               | 唯一标识符，按钮点击的时候可以通过回调拿到该参数             | string\|number | -      |
| leftMenu           | 左侧菜单项及样式                                             | array          | []     |
| rightMenu          | 右侧菜单项及样式                                             | array          | []     |
| disabled           | 是否禁止滑动                                                 | boolean        | false  |
| duration           | 动画过渡时间，单位ms                                         | string\|number | 300    |
| autoClose          | 是否自动关闭单元格，如果左/右插槽传了内容，此参数无效，可以手动关闭单元格 | boolean        | false  |
| customStyle        | 自定义样式                                                   | object\|string | -      |
| iosStyle           ｜滑动动画是否为ios风格                                    ｜boolean                 ｜true



## Events

### **rice-swipe-action-item**

| 事件名            | 说明                                | 回调参数                                                     |
| ----------------- | ----------------------------------- | ------------------------------------------------------------ |
| menuClick         | 按钮点击                            | e = {index,name,direction} ，index（按钮的下标）、name (props传入的name值)、direction(位置信息，左菜单还是右菜单) |
| contentClick         | 内容区域的点击                            | e = {name} name (props传入的name值) |
| open              | 单元格打开                          | e={name,direction}，name (props传入的name值)、direction(位置信息，左菜单还是右菜单) |
| close             | 单元格关闭                          | e={name}，name (props传入的name值)、                         |
| update:modelValue | 打开或关闭时触发，等同于v-model的值 ,uniappx不支持| left:左侧 ，right：右侧，none：关闭                          |



## Slots

### **rice-swipe-action-item**

| 名称    | 说明                                   |
| ------- | -------------------------------------- |
| default | 显示的内容                             |
| left    | 左侧滑动内容 ，会覆盖 leftMenu的 内容  |
| right   | 右侧滑动内容 ，会覆盖 rightMenu的 内容 |

### 组件方法

通过ref调用

### **rice-swipe-action**

| 方法名称 | 说明                 |
| -------- | -------------------- |
| closeAll | 关闭所有打开的单元格,uniappx的ios和h5端暂不支持|

### **rice-swipe-action-item**

| 方法名称 | 参数          | 说明                                                         |
| -------- | ------------- | ------------------------------------------------------------ |
| open     | left \| right | 打开单元格，不传或者传除`left`之外其他的值，一律当成`right`处理 |
| close    | -             | 关闭单元格                                                   |
| resize   | -             | 动态添加数据后，如不能正常滑动，可以主动调用此方法，一般不需要调用这个方法 |



### 类型定义

组件导出一下类型定义：

```js
import {
	SwipeMenu,
	SwipeDirection,
} from "@/uni_modules/rice-swipe-action"

```





