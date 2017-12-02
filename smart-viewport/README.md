# SmartViewPort

## 说明
适用于固定viewport宽度的移动端适配方案，根据环境动态设置viewport宽度，主要对Android4.4以下做兼容处理。
固定viewport宽度的方案目前为止用着都很顺，最明显的好处有两个：

1. 简单直观，直接按照设计稿1:1对应，设计稿是30px，CSS就写30px，不用额外运算；
2. 避免各种小数点，1px边框等问题的复杂化；


## DEMO

![qrcode](https://user-images.githubusercontent.com/1295348/33514576-455a9e1a-d791-11e7-8008-e1349c4e26c3.jpg)


## 使用

在`head`标签的最上面通过内联方式添加SmartViewPort脚本即可，建议压缩处理。注意，HTML上不需要也不要写meta viewport，不然有可能会导致部分Android刚打开页面时产生抖动。

```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <script>
    var SmartViewPort=function(e){var t=e||750,n=/Android (\d+\.\d+)/.test(navigator.userAgent),a=document.querySelector('[name="viewport"]');if(a&&document.head.removeChild(a),n){var r=parseFloat(RegExp.$1);if(r>2.3&&4.4>r){var i=parseInt(window.screen.width)/t,o="width="+t+", minimum-scale="+i+", maximum-scale = "+i+", target-densitydpi=device-dpi";this.setContent(o)}else{var o="width="+t+", user-scalable=no";this.setContent(o)}}else{var o="width="+t+", user-scalable=no";this.setContent(o)}};SmartViewPort.prototype.setContent=function(e){var t=document.createElement("meta");t.name="viewport",t.content=e,document.getElementsByTagName("head")[0].appendChild(t)},new SmartViewPort;
    </script>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="format-detection" content="telephone=no,address=no,email=no">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title> SmartViewPort </title>
    <link rel="stylesheet" href="./css/main.css">
</head>

<body>

    <app></app>


</body>

</html>

```

默认viewport宽度是**750**，如需自定义，可在`new SmartViewPort`时传入宽度：

```javascript
new SmartViewPort(1334);
```


## API
### 构造方法
| 方法           | 参数         | 参数类型 | 默认值 | 说明  |
| ------------- |------------- | -----| -----| -----|
| SmartViewPort| width| Number  | 750 | viewport宽度 |


