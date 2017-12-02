# waiting

## 说明

用来提示一些后台活动（像Ajax请求）和阻止在这个活动期间的任何用户操作。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；


## DEMO

![qrcode](https://user-images.githubusercontent.com/1295348/33515469-f88cf278-d79e-11e7-802f-17deabc3a9b0.jpg)


## 使用

### 模块引入方式

````javascript
import LegoWaiting from 'legolib/waiting/index.js';
var waiting = new LegoWaiting({
    title      : '加载中',
    extraclass : 'extraclass'
});
waiting.open();

waiting.close(); // 手动关闭
waiting.text('继续加载'); // 修改文案
waiting.open(); // 再次打开
````


### 外链引入方式

全局实例：`LegoWaiting`

```html
<script src="legolib/waiting/index.js"></script>

var waiting = new LegoWaiting(config);
```

## API

### 方法
|方法|参数|说明|
|----|----|----|
|open()|无|打开waiting|
|close()|无|关闭waiting|
|text()|文案内容|修改文案|

### 参数

|参数序号|类型|是否必填|默认值|说明|
|--------|----|--------|------|----|
|title|string|否|"加载中"|提示文案|
|extraclass|string|否|无|扩展类|
