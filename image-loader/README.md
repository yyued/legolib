# image-loader

## 说明
LegoImgLoader 用于预加载图片、显示图片、加载进度和加载完成后的回调，同时可以显示加载失败的图片和当加载失败时尝试重新加载的次数。
* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；

## 使用

### 模块引入方式

```javascript
import ImgLoader from 'legolib/image-loader/index.js';
var arr = ['xxx.jpg', 'xxxx.jpg'];
new ImgLoader(arr, {
    try      : 2,
    progress : function(count, total, src) {
    },
    complete : function(time,errImgs) {
    }
});
```

### 外链引入方式

全局实例：`LegoImageLoader`

```html
<script src="legolib/image-loader/index.js"></script>

new LegoImageLoader(arr, {
    try      : 2,
    progress : function(count, total, src) {
    },
    complete : function(time,errImgs) {
    }
});
```


### 简易回调模式

者第二个参数为函数，表示所有图片加载完成后的回调

```javascript
new LegoImgLoader(arr, function(time) {
    console.log('oncomplete:all source loaded:',arguments);
    console.log('<p>加载完成,总共耗时:'+time+'ms</p>');
});
```

## API
|参数名|类型|注释|
|------|-----|-------|
|arr|Array|预加载的图片数组|
|try|Number|图片失败尝试加载的次数，默认是3|
|progress|Function|加载完每一张图片的回调函数，参数`count`：当前加载到第几张；`total`：所有图片的总数；`src`： 当前加载的图片|
|complete|Function|加载完所有图片的回调函数，参数`time`：加载所有图片耗时；参数`errImgs`：加载失败的图片|
