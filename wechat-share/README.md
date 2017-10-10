# wechat-share

## 说明

微信分享JS SDK的封装；当前使用微信JS-SDK版本：`//res.wx.qq.com/open/js/jweixin-1.2.1.js`。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；

## 使用

### 模块引入方式

````javascript
import wxShare from 'legolib/wechat-share/index.js';
new wxShare({
    type: 'bi',
    title: '放我出去装X',
    desc : '金币，绑钻，宝石箱，你想要的统统都在这里!',
    img  : 'http://bi.duowan.com/source/pcindex/img/part1/bg1.png',
});
````

### 外链引入方式

全局实例：`LegoWechatShare`

````html
<script src="legolib/wechat-share/index.js"></script>

var share = new LegoWechatShare(config);
````

## API

### 参数

|参数序号|类型|是否必填|默认值|说明|
|--------|----|--------|------|----|
|type|string|否|无|类型，可选值有`bi`、`yy`，分别调用Bi神器和yy.com域名的签名接口，仅YY内部使用|
|signatureUrl|string|否|无|自定义签名接口|
|title|string|是|无|分享标题|
|desc|string|是|无|分享描述|
|img|string|是|无|分享缩略图|
|link|string|否|当前页面链接|自定义分享链接|
|successCallback|function|否|无|分享成功回调|
|cancelCallback|function|否|无|分享取消回调|
|debug|Boolean|否|false|是否启用debug|

### 签名接口signatureUrl返回格式
````javascipt
{
    "code": 0, // code=0代表成功
    "message": "",
    "data": {
        "appId": "xxx",
        "nonceStr": "xxx",
        "signature": "xxx",
        "timestamp": "xxx"
    }
}
````

## 参考资料

* 微信JS-SDK说明文档[https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

