# util

## 说明

常用工具集，包括环境检测、信息获取等部分。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；


## 使用

````javascript
import util from 'legolib/util/index.js';
util.isIE(8);
// => 如果当前浏览器为IE8则返回true, 否则返回false
````

## API

### getType(arg)

获取数据类型

|参数名|类型|默认值|说明|
|----|----|----|----|
|arg|object|无|被检测对象|

````javascript
var a = {};
util.getType(a);
// => 返回 'object'

var b = function(){};
util.getType(b);
// => 返回 'function'
````

###  getIEVersion()

获取IE版本

````javascript
util.getIEVersion();
// => 返回IE版本号
````

### getAbsoluteUrl(url)

根据相对路径字符串获取绝对路径

|参数名|类型|默认值|说明|
|----|----|----|----|
|url|string|无|相对路径字符串|

````javascript
var url = './cat/page_293.html';
util.getAbsoluteUrl(url);
// => 返回 'http:/yy.com/cat/page_293.html' (假设当前程序存放在'http:/yy.com/'下)
````

### getUrlParam(name, url)

获取url中指定参数的值

|参数名|类型|默认值|说明|
|----|----|----|----|
|name|string|无|参数名|
|url|string|默认为当前url|url链接，默认获取当前url|

````javascript
util.getUrlParam('page_id');
// => 返回 '123' (假设当前url为'http:/yy.com?page_id=123')
````

### isMobile()
````javascript
util.isMobile();
// => 如果当前设备为移动手机则返回true, 否则返回false
````

### isIE()
````javascript
util.isIE();
// => 如果当前浏览器为IE则返回true, 否则返回false

util.isIE(8);
// => 如果当前浏览器为IE8则返回true, 否则返回false
````

### isEdge()
````javascript
util.isEdge();
// => 如果当前浏览器为Edge则返回true, 否则返回false
````

### isWechatBrowser()
````javascript
util.isWechatBrowser();
// => 如果当前浏览器为微信内置浏览器则返回true, 否则返回false
````

### isiOS()
````javascript
util.isiOS();
// => 如果当前环境为iOS则返回true, 否则返回false
````

### isiPhone()
````javascript
util.isiPhone();
// => 如果当前环境为iPhone则返回true, 否则返回false
````

### isiPad()
````javascript
util.isiPad();
// => 如果当前环境为iPad则返回true, 否则返回false
````

### isiPod()
````javascript
util.isiPod();
// => 如果当前环境为iPod则返回true, 否则返回false
````

### isAndroid()
````javascript
util.isAndroid();
// => 如果当前环境为Android则返回true, 否则返回false
````

### isAndroidPhone()
````javascript
util.isAndroidPhone();
// => 如果当前环境为Android手机则返回true, 否则返回false
````

### isAndroidTablet()
````javascript
util.isAndroidTablet();
// => 如果当前环境为Android平板则返回true, 否则返回false
````

### isWindows()
````javascript
util.isWindows();
// => 如果当前环境为Windows则返回true, 否则返回false
````

### isWindowsPhone()
````javascript
util.isWindowsPhone();
// => 如果当前环境为Windows手机则返回true, 否则返回false
````

### isWindowsTablet()
````javascript
util.isWindowsTablet();
// => 如果当前环境为Windows平板则返回true
````

### isTablet()
````javascript
util.isTablet();
// => 如果当前设备为平板则返回true, 否则返回false
````

### isTouchDevice()
````javascript
util.isTouchDevice();
// => 如果当前设备为触屏设备则返回true, 否则返回false
````

### isDesktop()
````javascript
util.isDesktop();
// => 如果当前环境为桌面环境则返回true, 否则返回false
````

### isMac()
````javascript
util.isMac();
// => 如果当前环境为Mac则返回true, 否则返回false
````

### isChrome()
````javascript
util.isChrome();
// => 如果当前浏览器为Chrome则返回true, 否则返回false
````

### isSafari()
````javascript
util.isSafari();
// => 如果当前浏览器为Safari则返回true, 否则返回false
````

### isLinux()
````javascript
util.isLinux();
// => 如果当前环境为Linux则返回true, 否则返回false
````

### isEventSupport(eventName, element)

检测某对象是否支持某事件

|参数名|类型|默认值|说明|
|----|----|----|----|
|eventName|string|无|事件名称|
|element|object|无|检测对象|

````javascript
util.isEventSupport('click', document);
// => 如果document支持click事件则返回true, 否则返回false
````

### debounce(callback, wait, immediate)

函数去抖，让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再去执行；如果在这个等待时间内再次触发此函数，等待时间会重新计算。

|参数名|类型|默认值|说明|
|----|----|----|----|
|callback|Function|无|回调函数|
|wait|number|无|等待 wait 毫秒之后才执行|
|immediate|boolean|无|是否立即执行|

````javascript
function doSomething(){
    ...
};
util.debounce(doSomething, 200);
````

###  throttle(callback, wait)

函数节流，在连续触发中以特定频率（时间间隔）执行目标函数，避免函数执行次数过多。

|参数名|类型|默认值|说明|
|----|----|----|----|
|callback|Function|无|回调函数|
|wait|number|无|执行时间间隔，单位毫秒|

````javascript
function doSomething(){
    ...
};
$(window).on('scroll', util.throttle(doSomething, 200));
````
