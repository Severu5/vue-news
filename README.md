# vue-news

## 项目介绍

```
一个使用Vue.js开发的移动端新闻咨询web应用
```

## 开发过程

### 1 UI 库引入

首先引入移动端 UI 库 `Vant` 组件，在 `main.js` 中配置如下代码。

```
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
```

以上的引入方式为全局引入，按需加载可以参考官方文档的配置。

### 2 移动端 `rem` 适配

#### 2.1 方法一

参考 `Vant` 官网的推荐方法，使用以下两个插件。

- [`postcss-pxtorem`](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`

  使用该插件可以在编写时依然使用`px` 单位，插件会自动转换为 `rem`。

- [`lib-flexible`](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值

  根据不同设备可以给网页根标签设置不同的字体大小作为该文档所有标签的基准值。

#### 2.2 方法二

可以采取在编辑器如 `vscode` 内安装转换插件，在编写时实时转换 `rem`，并且在 `index.html` 头部写入一段计算根标签字体大小的 `js` 代码。

### 3 引入字体图标库

一般项目采用阿里的 `iconfont` 创建图标项目，可以选择自己上传图标生成项目或是在图标库内搜索来添加到项目。
使用方法一般有三种， `unicode`、`Font Class`和 `Symbol`, 本次项目中采用第二种方法，兼容性和性能都比较好。

在 `Vant` 组件内配合自己的 `iconfont` 图标使用，需要在创建项目时配置好类名前缀与 `fontfamily`， 需要保持它们的一致，然后配合 `Vant` 组件提供的图标类名前缀属性来使用。

### 4 搭建路由

可以在项目初始时规划好项目的页面模块，划分每一块路由，然后搭建基本的文件。
在一开始，搭建了 `login` `home` `profile` 等页面，并配置好相关的路由，同时采用了路由懒加载的方法，代码如下所示。

```
const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  ...
]
```

只要在 `component` 处选择值为一个引入组件的函数即可。

> 当路径为文件夹时会自动寻找文件夹下的 `index` 文件。

同时，引入了 `Vant` 的 `Tabbar` 组件来切换路由。

```
<van-tabbar route>
  <van-tabbar-item replace to="/home" icon="home-o">
    标签
  </van-tabbar-item>
  <van-tabbar-item replace to="/search" icon="search">
    标签
  </van-tabbar-item>
</van-tabbar>
```

如示例所示，在根标签上启用 `route` ，在子标签上配置好 `to` 属性即可实现 `Tabbar` 切换路由，并可以自定义切换的方式是 `push` 还是 `replace`。

### 5 封装请求模块

在如今的 web 项目中， `axios` 是最流行的 `ajax` 封装请求库。但在一个项目中不可以过度直接依赖一个第三方库，应该选择自行封装一层，然后调用自己封装好的函数来使用，这样可以保证切换第三方库时比较方便。

`axios` 的封装一般是新建一个 `request.js` 文件，引入 `axios` 然后创建一个实例，对这个实例设置请求的 `baseURL` 以及 `timeout`。随后对这个实例设置请求、响应拦截器，然后导出进行相应业务接口的封装。

### 6 登陆页面基本布局

页面编写方式为，根据设计稿快速引入组件搭建基本布局，审查元素找到类名或根元素设置类名进行样式覆盖或新增来实现设计稿的页面布局。

### 7 登陆页面逻辑编写

主要引入了 `Vant` 组件的表单、输入框等组件。

- 对表单组件监听 `submit` 事件进行表单提交。
  > 目前的特性显示表单组件范围内所有按钮点击都会触发提交事件，是浏览器内部所有按钮的默认类型导致。`Vant` 组件文档给出了解释。[点击跳转](https://vant-contrib.gitee.io/vant/#/zh-CN/form#chang-jian-wen-ti)
- 对输入框绑定 `rules` 属性进行校验，校验方式有对象内定义规则、正则表达式、自定义函数校验等。詳情可以参考文档。
- `Vant` 组件在 2.5.2 2.60 版本提供了去除校验错误提示的属性，此处可以选择去除默认提示，监听表单组件的 `failed` 事件来得到校验错误的回调，然后自定义错误提示方式。
- 发送验证码时我们期望只校验手机号的正确性，忽略验证码并发送请求。但因为上面提到的浏览器按钮特性，我们需要避开浏览器提交事件，官方给出的解决方法是修改其余按钮的 `native-type` 属性。此处也可以在按钮的点击事件上添加 `prevent` 修饰符阻止默认事件。
- 其余还有使用布尔类型的变量控制显示按钮还是倒计时；在计时器结束后回调让按钮显示；点击一次按钮后禁用按钮防止多次点击；

### 项目依赖下载

```
npm install
```

### 开发环境本地编译运行

```
npm run serve
```

### 生产环境编译打包

```
npm run build
```
