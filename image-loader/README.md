# lego-imgLoader

## 说明
LegoImgLoader 用于预加载图片、显示图片、加载进度和加载完成后的回调，同时可以显示加载失败的图片和当加载失败时尝试重新加载的次数。
* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](http://uedfe.yypm.com/md/book/LegoFlow/index.html) 进行开发、构建；
* 本组件无第三方插件依赖；

## DEMO
**[Demo地址](http://uedfe.yypm.com/assets/lego-components/lego-img-loader/lego-img-loader.html)**

## 使用
1、 引入
```html
<script src="http://assets.dwstatic.com/common/lib/imgloader/0.1.2/lego-imgLoader.js"></script>
```
或者
```javascript
import LegoImgLoader from './dist/lego-imgLoader.min.js';
```

2、 使用
```javascript
var arr = ['xxx.jpg', 'xxxx.jpg'];
new LegoImgLoader(arr, {
    try      : 2,
    progress : function(count, total, src) {
    },
    complete : function(time,errImgs) {
    }
});
```

## 示例
```javascript
import LegoImgLoader from './dist/lego-imgLoader.min.js';
var arr = [
        'http://img.dwstatic.com/www/1605/326487013743/1462867118922.jpg',
        'http://img2.dwstatic.com/www/1607/332156260726/1468201777561.png',
        'http://img4.dwstatic.com/www/1607/331553311031/1467598667542.png',
        'http://ued.yypm.com/project/ued-lab/index/img/pic-interaction.jpg',
        'http://ued.yypm.com/project/ued-lab/index/img/pic-sdk.jpg',
        'http://ued.yypm.com/project/ued-lab/index/img/pic-lego.jpg'
    ];
 new LegoImgLoader(arr, {
    try      : 2,
    progress : function(count, total, src) {
        console.log('progress:single loaded:', arguments);
        console.log('<p>' + src + '<br/>加载中。。。'+ count/total*100 +'%</p>');
    },
    complete : function(time,errImgs) {
        console.log('oncomplete:all source loaded:',arguments);
        console.log('<p>加载完成,总共耗时:'+time+'ms</p>');
        console.log('<p>加载失败的图片:'+errImgs+'</p>');
    }
});
```
或者第二个参数为函数，表示所有图片加载完成后的回调
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
