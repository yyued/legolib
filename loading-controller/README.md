# lego-loadingController

## 说明

简单易用的页面加载loading，可控制加载进度。

- 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
- 本组件使用 [legoFlow](http://uedfe.yypm.com/md/book/LegoFlow/index.html) 进行开发、构建；
- 本组件无第三方插件依赖；
- 本组件兼容`ie8+`

## DEMO

- theme为`default`：[DEMO](http://uedfe.yypm.com/assets/lego-components/lego-loading/_index.html "legoLoading")
- theme为`clean`：[DEMO](http://uedfe.yypm.com/assets/lego-components/lego-loading/progress.html "legoLoading")

## 使用

```javascript
var LegoLoading = require('./dist/lego-loading.min.js');
var config = {
    theme    : 'default',
    text     : '当前进度：${progress}',
    progress : function (progress) {
        console.log('当前的百分比为: ' + progress);
    },
    complete : function () {
        console.log('已经完成')
    }
}
var loading = new LegoLoading(config);
loading.start();
loading.done();
```

**注意：** 如果是外链引入的，则使用全局的`LegoLoading`创建对象实例,例如

```html
<script src="./dist/lego-loading.min.js"></script>
<script>
var loading = new LegoLoading(config)
loading.start();
loading.done();
</script>
```

## API

### 方法

#### `start()`

开始执行loading；

```javascript
loading.start();
```

#### `done()`

done方法使当前的loading进度设置到100%；

```javascript
loading.done();
```

### 参数

`var loading = new LegoLoading(config)`;

配置项        | 类型       | 默认值          | 说明
---------- | -------- | ------------ | ----------------------------------------------------
`theme`    | String   | `default`    | **可选值：** `default`：默认样式，提供一个默认样式名`ext-legoLoadingDefault`；`clean`：不生成任何的dom结构，只提供一个progress的数值返回；或者其他自定义样式名
`text`     | String   | 空           | 显示的文字，当text中包含`${progress}`的时候，会自动替换为当前的进度百分比
`progress` | Function | 无           | 进度回调函数，每一次进度改变的时候都会执行。**参数：** `progress`：当前进度
`complete` | Function | 无           | 进度为100%时候的回调

## 更换样式

在新建对象的时候，提供一个`theme`的参数用于设置自定义样式，传入参数即可。
