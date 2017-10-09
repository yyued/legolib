
import antiHijack from './export/anti-hijack.js';

new antiHijack({
    whiteList: ['yy.com'],
    blackList: ['51.la','61.160.200.252',],
    reportUrl: 'http://s1.yy.com/ued_web_static/common/img/blank.png'
});