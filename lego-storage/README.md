# LegoStorage

## 说明

通过iframe跨域获取资源服务器(如：assets.dwstatic.com)上的资源文件源码，获取到的文件url如果跟资源服务器**同域**则利用localStorage方式，将获取到的文件名，版本号，源码缓存保存。如果获取到的文件url如果跟资源服务器**不同域**，外链加载，不会缓存。

再次进入该页面时，配置文件信息与本地缓存文件信息进行匹配，若本地缓存相同版本号的相同文件，将直接加入页面 ，若文件名或版本号出现不一致的情况时，下载新的资源源码，加入页面，并缓存。

## 使用
### 引入方式
1. 模块引入：
```js
import LegoStorage from './export/legoStorage';
```

2. 外链引入
```js
<script src="legolib/lego-storage/index.js"></script>
```

### 调用
```js
let config = {
    'iframeWindow': '//s1.yy.com/ued_web_static/lib/lego-storage/read-file.html',
    'assets': {
        'nav': {
            version: '1.0.1',
            url: 'http://s1.yy.com/ued_web_static/project/yy8/nav/1.0.1/js/main.js',
        },
        'zepto': {
            version: '1.0.0',
            url: 'http://assets.dwstatic.com/base/zepto/zepto.min.js',
        },
        'test-1': {
            version: '0.0.1',
            type: 'delay',
            url: 'http://172.25.154.120:3000/js/test-1.js',
        },
        'vue': {
            version: '1.10.21',
            // type   : 'delay',
            url: 'http://assets.dwstatic.com/base/vue/1.0.21/vue.min.js',
        },
    }
}

let legoStorage = new LegoStorage(config, true);

legoStorage.init(() => {
	// 注入成功回调
});
```

## API

### 1. 新建对象

#### 参数说明

```js
let legoStorage = new LegoStorage(config, isDebug);
```

| 参数 | 类型 | 默认值 | 备注 |
|------|-----|-------|------|
| iframeWindow | String | 无 | iframe的src，iframe跨域获取资源服务器上的资源文件源码传递给当前页面，iframe页面参考`assets/read-file.html` |
| assets | Object | {} | 需要加载的CSS/JS文件集对象 |
| isDebug | Boolean | false | 是否打印Debug信息 |


### 2. 初始化

#### 参数说明

```js
legoStorage.init(cb);
```

| 参数 | 类型 | 默认值 | 备注 |
|------|-----|-------|------|
| cb | Function | null | 回调 |


### 3. 清除

#### 参数说明

```js
legoStorage.clear(name, cb);
```

| 参数 | 类型 | 默认值 | 备注 |
|------|-----|-------|------|
| name | String | '' | 清除LegoStorage存入信息（默认为空时，全部清除）|
| cb | Function | null | 回调 |

#### Example

```js
let config = {
	'iframeWindow': '//s1.yy.com/ued_web_static/lib/lego-storage/read-file.html',
	'index.css': {
		version: '1.1',
		url    : 'http://localhost:3000/css/index.css',
	},
}

let legoStorage = new LegoStorage(config, true);

// 1.清除单个缓存信息
legoStorage.clear('test-1.js', () => {
	console.log('clear finish');
});

// 2.清除全部缓存信息
legoStorage.clear(() => {
	console.log('clear finish');
});
```
