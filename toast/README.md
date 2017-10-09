# lego-toast

## 说明

toast是一种轻量的提示，在页面中间显示，并且会在2秒(默认值，可修改)之后自动消失。可以用来显示一些不会打断用户操作的提示。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](http://uedfe.yypm.com/md/book/LegoFlow/index.html) 进行开发、构建；
* 本组件无第三方插件依赖；

## DEMO

![DEMO](http://uedfe.yypm.com/assets/lego-components/lego-toast/img/lego-toast-demo.png)

## 使用

**→ step 1:  **引入组件

````javascript
import LegoToast from './dist/lego-toast.min.js';
````

**→ step 2:  **初始化
````javascript
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
