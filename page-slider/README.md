# page-slider

## 说明

简单的页面滚动控制器，监听页面垂直和水平方向的滚动。

* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；

## DEMO

![qrcode](https://user-images.githubusercontent.com/1295348/33515389-7e9da846-d79d-11e7-8925-379be5532f4a.jpg)


## 使用

页面结构：

````html
<div class="page">
    <div class="section is-in">
        <h2>111</h2>
    </div>
    <div class="section is-out">
        <h2>222</h2>
    </div>
    <div class="section is-out">
        <h2>333</h2>
    </div>
</div>
````

### 模块引入方式

````javascript
import Slider from 'legolib/page-slider/index.js';

var pageslider = new Slider({
    container: ".page",
    direction: "y",
    onSlide: function(current, previous, direction) {
        var previousSection = this.children[previous]; // 滑动前的section
        var currentSection  = this.children[current]; // 滑动后（当前）的section
        var scrollTimer     = null;
        previousSection.classList.add("is-out");
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            previousSection.classList.remove("is-in")
        }, 700);
        currentSection.classList.add("is-in");
        currentSection.classList.remove("is-out");
    }
});
````


### 外链引入方式

全局实例：`LegoPageSlider`

```html
<script src="legolib/page-slider/index.js"></script>

var modal = new LegoPageSlider(config);
```


## API

### 配置项

|参数名|类型|是否必填|默认值|说明|
| ------| ------ | ------ | ------ | ------ |
|`container`|`string`|是|`.page`|页面外部容器的选择器|
|`direction`|`string`|否|`y`|滑动方向，有两个可选值：`y`表示垂直方向滑动、`x`表示水平方向滑动|
|`onSlide`|`function`|否|无|滑动回调监听，有三个返回值：`current`表示当前section索引值、`previous`表示上一个section索引值、`direction`表示滑动方向（`up、down、left、right`）|

