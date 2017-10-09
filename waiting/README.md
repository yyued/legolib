# lego-waiting

## 说明

用来提示一些后台活动（像Ajax请求）和阻止在这个活动期间的任何用户操作。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](http://uedfe.yypm.com/md/book/LegoFlow/index.html) 进行开发、构建；
* 本组件无第三方插件依赖；

## DEMO

![DEMO](http://uedfe.yypm.com/assets/lego-components/lego-waiting/img/lego-waiting-demo.png)

## 使用

1、引入组件
````javascript
import LegoWaiting from './dist/lego-waiting.min.js';
````

2、实例化
````javascript
var waiting = new LegoWaiting({
    title      : '加载中',
    extraclass : 'extraclass'
});
waiting.open();

waiting.close(); // 手动关闭
waiting.text('继续加载'); // 修改文案
waiting.open(); // 再次打开

````

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
