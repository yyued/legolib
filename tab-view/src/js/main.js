import FastClick from './lego-lib/fastclick/1.0.6/fastclick';
import LegoTabView from './export/tab-view.js';

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}


let navConfig = [
    {
        title: '推荐',
        link: '',
        attr: 'data-id="11" data-role="first"'
    },
    {
        title: '音乐',
        attr: ''
    },
    {
        title: '搞笑',
        link: '',
        attr: 'data-id="11" data-index="first"'
    },
    {
        title: '脱口秀'
    },
    {
        title: '一起看',
        link: '',
        attr: 'data-id="11" data-index="test"'
    },
    {
        title: '百度',
        link: 'https://www.baidu.com/'
    },
    {
        title: '巴拉巴拉小魔仙',
        link: '',
        attr: ''
    },
    {
        title: '户外',
        link: '',
        attr: ''
    },
    {
        title: '摄影',
        link: '',
        attr: ''
    },
    {
        title: '户外2',
        link: '',
        attr: ''
    },
    {
        title: '摄影2',
        link: '',
        attr: ''
    },
    {
        title: '旅行',
        link: '',
        attr: ''
    }
]

var tabView = new LegoTabView({
    container: '#header',
    navConfig: navConfig,
	activeIndex: 2,
    easing: 'easeInOut',
	switchCallBack: function(fromIndex, toIndex) {
		console.log(fromIndex, toIndex);
	}
});
