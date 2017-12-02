# alert-view

## 说明
模拟ios原生confirm和alert
* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](https://legoflow.com/) 进行开发构建；
* 本组件无第三方插件依赖；

## DEMO

![qrcode](https://user-images.githubusercontent.com/1295348/33514811-1f657a96-d795-11e7-8bbc-649afe698dbe.jpg)


## 使用

### 模块引入方式

```javascript
import AlertView from 'legolib/alert-view/index.js';

var modal = new AlertView();

// alert modal
modal.alert({
    title: '',
    text: '',
    confirm: function() {
    }
});

// confirm modal
modal.confirm({
    title: '',
    text: '',
    confirm: function() {
    },
    cancel: function() {
    }
});
```

### 外链引入方式

全局实例：`LegoAlertView`

```html
<script src="legolib/alert-view/index.js"></script>

var modal = new LegoAlertView();
```



## API
### 参数
| 参数           | 类型         | 默认值  | 必填  | 说明  |
| ------------- |------------- | -----  |-----|-----|
| title    | String   |  |否    |标题 |
| text     | String       |      |是    |文本|
| extraClass      | String      |    |否    |给lego-modal的根节点.lego-modal附加1或多个自定义class|
| okButton     | String       |    确定  |是    |确定按钮的文案|
| cancelButton     | String       |  取消    |是    |取消按钮的文案|
| confirm       | Function     |      |否    | 击确认的回调函数|
| cancel       | Function     |      |否    | 击取消的回调函数|
