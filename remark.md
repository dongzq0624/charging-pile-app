### 技术栈

**核心框架：**
- uni-app - 跨平台应用开发框架
- Vue 3 - 前端框架，支持Vue 2兼容模式

**UI组件库：**
- uni_modules - uni-app官方组件库，包含丰富的预制组件
  - uni-ui系列组件（uni-card、uni-list、uni-nav-bar等）
  - uni-forms表单组件
  - uni-popup弹窗组件
  - uni-calendar日历组件
  - uni-datetime-picker时间选择器
  - 其他实用组件...

**样式预处理：**
- SCSS - 用于组件样式编写
- CSS - 基础样式文件

**工具库：**
- JavaScript ES6+ - 主要开发语言
- 自定义工具函数（utils目录）

### 项目结构

```
charging-pile-app/
├── components/                 # 自定义组件目录
│   ├── jcode-*               # 项目专用组件（导航栏、按钮、弹窗等）
│   └── zy-search/            # 搜索组件
├── pages/                     # 页面文件目录
│   ├── tabBar/               # 底部导航页面
│   │   ├── home/            # 首页
│   │   ├── recharge/        # 充值页
│   │   ├── order/           # 订单页
│   │   └── user/            # 用户页
│   ├── login/               # 登录页面
│   ├── setting/             # 设置页面
│   ├── wallet/              # 钱包相关页面
│   ├── scan/                # 扫码页面
│   └── search/              # 搜索页面
├── sub_charging/             # 充电相关子页面
│   ├── charge/              # 充电控制页面
│   ├── order/               # 订单详情
│   └── station/             # 充电站相关
├── static/                   # 静态资源目录
│   ├── css/                 # 样式文件
│   ├── images/              # 图片资源
│   └── zy-search/           # 搜索组件图标
├── utils/                    # 工具函数目录
│   ├── common.js           # 公共函数
│   ├── system.js           # 系统相关工具
│   ├── tools.js            # 通用工具
│   └── validator.js        # 验证函数
├── uni_modules/              # uni-app官方组件库
├── App.vue                  # 主应用组件
├── main.js                  # 应用入口文件
├── manifest.json            # 应用配置文件
├── pages.json              # 页面路由配置
└── uni.scss                # 全局样式文件
```