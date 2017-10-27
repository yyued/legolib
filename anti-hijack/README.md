# anti-hijack

## 说明

web HTTP防劫持组件。

* 【静态防御】重写document.write，屏蔽document.write方式的劫持；
* 【静态防御】重写opner，屏蔽opner方式的劫持；
* 【静态防御】锁死call和apply，防止盗用和重写；
* 【静态防御】重定向iframe劫持；
* 【动态防御】监控扫描动态插入的DOM：`img`、`script`、`iframe`、`object`；并进行XSS过滤；
* 黑白名单机制；
* 自定义劫持上报接口；
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
