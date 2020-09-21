# vue-news

- [vue-news](#vue-news)
  - [项目介绍](#项目介绍)
  - [开发过程](#开发过程)
    - [1.UI 库引入](#1ui-库引入)
    - [2.移动端 `rem` 适配](#2移动端-rem-适配)
      - [2.1 方法一](#21-方法一)
      - [2.2 方法二](#22-方法二)
    - [3.引入字体图标库](#3引入字体图标库)
    - [4.搭建路由](#4搭建路由)
    - [5.封装请求模块](#5封装请求模块)
    - [6.登陆页面基本布局](#6登陆页面基本布局)
    - [7.登陆页面逻辑编写](#7登陆页面逻辑编写)
    - [8.登录逻辑完善](#8登录逻辑完善)
    - [9.首页开发](#9首页开发)
      - [9.1 第三方网站图片获取错误](#91-第三方网站图片获取错误)
      - [9.2 `flex` 布局中如何给固定定位元素占位](#92-flex-布局中如何给固定定位元素占位)
    - [项目依赖下载](#项目依赖下载)
    - [开发环境本地编译运行](#开发环境本地编译运行)
    - [生产环境编译打包](#生产环境编译打包)

## 项目介绍

```text
一个使用Vue.js开发的移动端新闻咨询web应用
```

## 开发过程

### 1.UI 库引入

首先引入移动端 UI 库 `Vant` 组件，在 `main.js` 中配置如下代码。

```js
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

以上的引入方式为全局引入，按需加载可以参考官方文档的配置。

### 2.移动端 `rem` 适配

#### 2.1 方法一

参考 `Vant` 官网的推荐方法，使用以下两个插件。

- [`postcss-pxtorem`](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`

  使用该插件可以在编写时依然使用`px` 单位，插件会自动转换为 `rem`。

- [`lib-flexible`](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值

  根据不同设备可以给网页根标签设置不同的字体大小作为该文档所有标签的基准值。

#### 2.2 方法二

可以采取在编辑器如 `vscode` 内安装转换插件，在编写时实时转换 `rem`，并且在 `index.html` 头部写入一段计算根标签字体大小的 `js` 代码。

### 3.引入字体图标库

一般项目采用阿里的 `iconfont` 创建图标项目，可以选择自己上传图标生成项目或是在图标库内搜索来添加到项目。
使用方法一般有三种， `unicode`、`Font Class`和 `Symbol`, 本次项目中采用第二种方法，兼容性和性能都比较好。

在 `Vant` 组件内配合自己的 `iconfont` 图标使用，需要在创建项目时配置好类名前缀与 `fontfamily`， 需要保持它们的一致，然后配合 `Vant` 组件提供的图标类名前缀属性来使用。

### 4.搭建路由

可以在项目初始时规划好项目的页面模块，划分每一块路由，然后搭建基本的文件。
在一开始，搭建了 `login` `home` `profile` 等页面，并配置好相关的路由，同时采用了路由懒加载的方法，代码如下所示。

```js
const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  ...
]
```

只要在 `component` 处选择值为一个引入组件的函数即可。

> 当路径为文件夹时会自动寻找文件夹下的 `index` 文件。

同时，引入了 `Vant` 的 `Tabbar` 组件来切换路由。

```html
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

### 5.封装请求模块

在如今的 web 项目中， `axios` 是最流行的 `ajax` 封装请求库。但在一个项目中不可以过度直接依赖一个第三方库，应该选择自行封装一层，然后调用自己封装好的函数来使用，这样可以保证切换第三方库时比较方便。

`axios` 的封装一般是新建一个 `request.js` 文件，引入 `axios` 然后创建一个实例，对这个实例设置请求的 `baseURL` 以及 `timeout`。随后对这个实例设置请求、响应拦截器，然后导出进行相应业务接口的封装。

### 6.登陆页面基本布局

页面编写方式为，根据设计稿快速引入组件搭建基本布局，审查元素找到类名或根元素设置类名进行样式覆盖或新增来实现设计稿的页面布局。

### 7.登陆页面逻辑编写

主要引入了 `Vant` 组件的表单、输入框等组件。

- 对表单组件监听 `submit` 事件进行表单提交。
  > 目前的特性显示表单组件范围内所有按钮点击都会触发提交事件，是浏览器内部所有按钮的默认类型导致。`Vant` 组件文档给出了解释。[点击跳转](https://vant-contrib.gitee.io/vant/#/zh-CN/form#chang-jian-wen-ti)
- 对输入框绑定 `rules` 属性进行校验，校验方式有对象内定义规则、正则表达式、自定义函数校验等。詳情可以参考文档。
- `Vant` 组件在 `2.5.2` `2.6.0` 版本提供了去除校验错误提示的属性，此处可以选择去除默认提示，监听表单组件的 `failed` 事件来得到校验错误的回调，然后自定义错误提示方式。
- 发送验证码时我们期望只校验手机号的正确性，忽略验证码并发送请求。但因为上面提到的浏览器按钮特性，我们需要避开浏览器提交事件，官方给出的解决方法是修改其余按钮的 `native-type` 属性。此处也可以在按钮的点击事件上添加 `prevent` 修饰符阻止默认事件。
- 其余还有使用布尔类型的变量控制显示按钮还是倒计时；在计时器结束后回调让按钮显示；点击一次按钮后禁用按钮防止多次点击；

> 在使用 `Vuex` 存储用户登陆状态时，因为状态只存储在内存中。如果刷新页面，数据就会丢失，可以考虑在 `mutations` 方法中存储到浏览器的 `localstorage` 当中，初始化 `state` 时可以直接读取本地存储的值。
> 但是因为用户信息一般为对象类型，本地存储无法直接存入对象类型，需要用 `JSON` 类转为字符串再存储，代码会显得冗余且繁琐。
> 可以考虑封装三个函数用于在本地存储数据、读取数据、删除数据，每个函数都会自动判断数据类型进行存储，在外部调用时就不用考虑细节了。

### 8.登录逻辑完善

在用户访问其他页面时如果产生了需要登录权限的操作，需要跳转至登录页登录，而此时登录完应该跳转回前一个页面而不是写死一个地址。
一开始可以选择调用 `$router.back()` 方法来回到前一个页面。
在用户登陆后，应该调用获取当前用户的接口来渲染当前用户的个人信息等。此处调用的接口开始需要添加 `token` 在请求头内。因为此类的操作非常多，所以可以在 `axios` 实例的请求拦截器中设置统一添加 `token`，读取 `localStorage` 中的 `token` 值，有则添加，无则不做操作。

```js
request.interceptors.request.use(
  config => {
    const user = getItem(USER_KEY)
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

### 9.首页开发

首页有一个 `tab` 标签页的效果，切换不同的标签时会切换对应的列表数据，以往的做法是点击事件绑定网络请求事件，一次点击就是一次请求。但这样会造成性能的浪费，这是不必要的。

可以考虑，在一个列表数据拿到后，存储在内存中，再次点击该列表时，直接展示即可，不需要再次请求，当用户下拉刷新时再重新获取。

> 一般在业务中，推荐把这样的列表抽成一个单独的组件来调用，不关心数据如何获取，只负责将传入的数据渲染即可。但在此处因为保存数据的需求，可以考虑在组件中进行获取数据。
> 此处 `Vant` 组件的 `tabs` 提供一个功能，即点击查看该标签页后，该标签页才会渲染出实例。

#### 9.1 第三方网站图片获取错误

有时候在获取第三方网站的图片时，服务器会做设置来阻止你的获取。一般的服务器识别是通过 `http` 请求头的 `referer` 字段识别请求来源。

有时候可以通过不设置 `referer` 字段的方法来破解这种情况。

- 在请求标签上(例如 `img` 标签)添加 `referrerPolicy` 属性，值设置为 `no-referrer` 即可。

  ```html
  <img src="http://..." referrerpolicy="no-referrer" />
  ```

- 或者在 `HTML` 页面头设置一个全局的 `meta` 标签：

  ```html
  <meta name="referrer" content="no-referrer" />
  ```

#### 9.2 `flex` 布局中如何给固定定位元素占位

在做到首页频道分类的 `tab` 时，会出现频道列表过多，宽度超过一屏，查看完整列表需要滑动的情况。如果此时在 `tab` 放置一个固定定位的标签，会出现 `tab` 的最后一个列表被遮挡的情况。

- 此时可以选择缩减列表父容器的宽度或是设置一个左右 `padding`，让显示的区域只有屏幕宽度 - 固定定位图标的宽度。
- 也可以在列表中放置一个空的标签用作占位元素，大小和固定定位的图标一样。因为原列表的布局为 `flex` 布局，原列表项的 `flex` 属性设置为 `1` ，会自动平分所有宽度，此时新增加的标签宽度会被挤为 0。解决方法是给这个占位标签的 `flex-shrink` 属性设置为 `0`， 即不接受收缩，宽度设置为多少就是多少。

### 项目依赖下载

```txt
npm install
```

### 开发环境本地编译运行

```txt
npm run serve
```

### 生产环境编译打包

```txt
npm run build
```
