# AntiHijack

## 说明

AntiHijack是一个可以拦截http劫持的web component。其核心防御原理如下：

* 重写 `document.write`、`window.open`、`setAttribute`，拦截可疑代码；
* 锁死 `call` 和 `apply`，防止盗用和重写；；
* 拦截 `iframe`重定向劫持；
* `MutationObserver`监听DOM树变化，扫描 `img`、`script`、`iframe`、`object`、`a`，修正漏洞，拦截可疑代码；
* 域名白名单匹配；
* xss过滤；

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发、构建；
* 本组件无第三方插件依赖；

## 使用

**注意：为了最大化的防劫持，请将脚本放在头部（尽量靠最前面）。该组件主要使用白名单机制，请根据需求的实际情况完善白名单**

### 模块引入方式

````javascript
import antiHijack from 'legolib/anti-hijack/index.js';

new antiHijack({
    reportUrl: 'http://xxx.com/xxx.png', // 劫持上报接口，通常是一个图片链接
    blackList: ['61.160.200.252'], // 自定义黑名单
    whiteList: ['yy.com'] // 自定义白名单
});
````

### 外链引入方式

全局实例：`LegoAntiHijack`

```html
<script src="legolib/anti-hijack/index.js"></script>

new LegoAntiHijack(config);
```

## API

|参数|类型|说明|
| ------| ------ | ------ |
|blackList|Array|自定义黑名单|
|whiteList|Array|自定义白名单|
|reportUrl|string|自定义上报接口|


### 附：默认的黑白名单

````javascript
// 默认白名单
[
    'yy.com',
    'duowan.com',
    'baidu.com',
    'qq.com',
    'weibo.com',
    'sina.com.cn',
    'sinaimg.cn',
    'sinajs.cn',
    'google-analytics.com'
]

// 默认黑名单
[
    '120.80.57.123',
    '61.160.200.252'
]
````

## 兼容性

可在所有浏览器引用，包括IE6；但IE8（含）以下不会执行，IE9-IE10仅支持部分拦截；

