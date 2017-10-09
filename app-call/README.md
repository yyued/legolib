# lego-appCall

## 说明

web页面调起APP，支持手动调起与自动调起两种模式。

由于各系统、版本、浏览器环境不同，使得web页调起APP变得错综复杂，其要点在于：

1. 微信/QQ禁用了schema url；
2. iOS9+支持universal link，需要APP支持；
3. 因iOS策略问题，点击APP右上角的小三角link后，universal link失效，需要点击smart banner中的【打开】按钮才会重新激活；
4. Safari不支持iframe方式打开schema url和universal link；
5. 各浏览器对 `visibilitychange` API支持程度不一；
6. 需要支持手动调起和自动调起两种场景；

对于**要点3**，解决方案有两个：

1. iOS9+在原生Safari中显示smart banner tips，提示下拉页面打开应用（对应参数`sbTips`）；
2. 【推荐】在应用内做一个透明的view把右上角跳转Safari的动作拦截，点击时自定义一个打开Safari网页的动作，跳到制定页面。详见[iOS通用链接跳转浏览器事件的拦截](http://km.yy.com/blogs/2904)；

----

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](http://uedfe.yypm.com/md/book/LegoFlow/index.html) 进行开发、构建；
* 本组件无第三方插件依赖；

## 逻辑图

![逻辑图](http://uedfe.yypm.com/assets/lego-components/lego-appCall/appCall.jpg)

## 推荐使用方案

点击【打开APP】按钮 → url带上所需参数跳转到universal link页面 → 在universal link页面引入lego-appCall.js，自动调起APP

此种方案的好处在于当前浏览器环境无法满足调起APP的条件时，使用其他浏览器打开能自动调起APP。


1、引入组件
````javascript
import LegoAppCall from './dist/lego-appCall.min.js';
````

2、实例化

当参数`trigger`留空或者不写时，将执行自动调起APP.

````javascript
new LegoAppCall({
    schemaUrl          : 'ourtimes://',
    androidDownloadUrl : 'http://www.mezhibo.com',
    iOSDownloadUrl     : 'http://www.mezhibo.com'
})
````

## 其他使用方案

当APP不支持universal link，或者不使用universal link页面时。

1、引入组件
````javascript
import LegoAppCall from './dist/lego-appCall.min.js';
````

2、实例化
````javascript
new LegoAppCall({
    trigger            : '[data-role="appCall"]',
    schemaUrl          : 'ourtimes://',
    universalLink      : 'https://res2.yy.com/me_lauch/index.html?command=live&uid=100886801',
    androidDownloadUrl : 'http://www.mezhibo.com',
    iOSDownloadUrl     : 'http://www.mezhibo.com'
})
````


## API

### 方法
无

### 参数

|参数名|类型|是否必填|默认值|说明|
|------|----|--------|------|----|
|trigger|string|否|无|触发调起APP的选择器，如不定义则自动调起APP|
|schemaUrl|string|是|无|schema协议|
|universalLink|string|否|无|universal link，仅当trigger定义时有效|
|androidDownloadUrl|string|是|无|android下载地址，打开APP失败时调用|
|iOSDownloadUrl|string|是|无|iOS下载地址，打开APP失败时调用|
|tipsSelector|string|否|无|自定义提示用浏览器打开的遮罩层的选择器，如不定义则自动生成|
|sbTips|Boolean|否|false|是否启用smart banner tips|
|sbTipsText|string|否|下拉页面打开应用，内容更精彩！|smart banner tips文案内容，建议少于15个字|


## 参考资料

* URL Schemes 使用详解[http://sspai.com/31500](http://sspai.com/31500)
* 打通 iOS 9 的通用链接 [http://www.cocoachina.com/ios/20150902/13321.html](http://www.cocoachina.com/ios/20150902/13321.html)
* 听萌妹纸说，如何在微信中直接唤醒第三方App [http://www.devstore.cn/essay/essayInfo/5996.html](http://www.devstore.cn/essay/essayInfo/5996.html)
* 浏览器中唤起native app || 跳转到应用商城下载 [http://www.tuicool.com/articles/uiyiQfJ](http://www.tuicool.com/articles/uiyiQfJ)
