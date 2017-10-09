# lego-modal

## 说明
模拟ios原生confirm和alert
* 支持**外链**或者**ADM/CMD/commonJS**等多种形式；
* 本组件使用 [legoFlow](http://uedfe.yypm.com/md/book/LegoFlow/index.html) 进行开发、构建；
* 本组件无第三方插件依赖；

## DEMO
* [confirm & alert](http://uedfe.yypm.com/assets/lego-components/lego-modal/index.html)

## 使用
1.引入
```javascript
import LegoModal from './dist/lego-modal.min.js';
```

2.调用
```javascript
var modal = new LegoModal();

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
