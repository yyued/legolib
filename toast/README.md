# toast

## 说明

toast是一种轻量的提示，在页面中间显示，并且会在2秒(默认值，可修改)之后自动消失。可以用来显示一些不会打断用户操作的提示。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；

## DEMO
![qrcode- 1](https://user-images.githubusercontent.com/1295348/33515436-7e63d2c8-d79e-11e7-82d7-2b58612b6308.jpg)


## 使用

### 模块引入方式

````javascript
import LegoToast from 'legolib/toast/index.js';
var toast = new LegoToast({
	msg        : "操作成功",
	time       : 2000,
	extraclass : "extraclass"
});
toast.open();

toast.close(); // 手动关闭
toast.changeText('change'); // 修改文案
toast.changeTime(4000); // 修改消失时间
toast.open(); // 再次打开
````


### 外链引入方式

全局实例：`LegoToast`

```html
<script src="legolib/toast/index.js"></script>

var toast = new LegoToast(config);
```

## API

### 方法
|方法|参数|说明|
|----|----|----|
|open()|无|打开toast|
|close()|无|关闭toast|
|changeText()|文案内容|修改文案|
|changeTime()|时间|修改时间|

### 参数

|参数序号|类型|是否必填|默认值|说明|
|--------|----|--------|------|----|
|msg|string|否|""|提示文案|
|time|number|否|2000|显示时长|
|extraclass|string|否|无|扩展类|
