'use strict';

// import debug from './modules/mobile.debug';
// debug();

let config = {
    'iframeWindow': '//s1.yy.com/ued_web_static/lib/lego-storage/read-file.html',
    'assets': {
        'trailer': {
            version: '1.0.1',
            // type   : 'delay',
            url: 'http://s1.yy.com/ued_web_static/project/yy8/trailer/1.0.1/js/main.js',
        },
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

import LegoStorage from './export/legoStorage';

let legoStorage = new LegoStorage(config, true);

// 清除原有
legoStorage.clear('trailer', () => {
    console.log('clear finish ...');
    legoStorage.init(() => {
        console.log('初始化成功');
    });
});

// legoStorage.clear(() => {
// 	console.log('clear finish ...');
// 	legoStorage.init(() => {
// 		console.log('初始化成功');
// 		// console.log(Vue);
// 		// console.log(Swiper);
// 	});
// });

// legoStorage.init(() => {
// 	console.log('初始化成功', Vue);
// });
