# tab-view-swiper

## 说明
移动端tabView导航栏，支持swiper滑动效果。
* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；


## 使用

### 模块引入方式

```javascript
import LegoTabView from 'legolib/tab-view/index.js';

let navConfig = [
    {
        title: '推荐',
        attr: 'data-id="11" data-role="first"'
    },
    {
        title: '一起看',
        attr: 'data-id="11" data-index="test"'
    },
    {
        title: '音乐'
    },
    {
        title: 'YY',
        link: 'https://www.yy.com/'
    },
];

var tabView = new LegoTabView({
    container: '#header',
    navConfig: navConfig,
	activeIndex: 2,
    navEasing: 'easeInOut',
	switchCallBack: function(fromIndex, toIndex) {
		console.log(fromIndex, toIndex);
	}

});
```


### 外链引入方式

全局实例：`LegoTabView`

```html
<script src="legolib/tab-view/index.js"></script>

var tab = new LegoTabView(config);
```


## API
### 方法
| 方法           | 参数         | 参数类型  | 说明  |
| ------------- |------------- | -----| -----|
| switchCallBack| fromIndex, toIndex| Number  | 返回上一个item的索引和当前的索引值，从0开始|
| switchTo       | index | Number  | 跳到某个item，index为item的索引，从0开始|

### 参数
| 参数名 | 类型 | 是否必填 | 默认值 | 说明 | 备注 |
|------|----|--------|------|----|----|
| container | String | 是 | 无 | 包含tabView组件的外部容器|#id、data-*=xx、.class|
| activeIndex | Number | 否 | 0 | 默认选中的item | item的索引，从0开始 |
| navConfig | Array  | 是 | 无 | 每个nav item的设置 | 每个item是一个object，可包含title（item的名称）、link（链接）、attr（属性）|
| navEasing | String | 否 | easeInOut | 动画效果 | linear、easeInOut、easeOut、easeIn |

### 注意:
1. 支持页面链接上带activeIndex参数，滑到指定的item上。
2. 页面链接上带的activeIndex**优先级大于**初始化对象的时候配置的activeIndex。
