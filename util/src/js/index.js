/**
 * @file   : 业务逻辑demo
 * @author : Vicky(fanyuanjing@yy.com)
 * @update : 2016-10-12 16:21:15
 */

// 引入视频组件
// import util from './export/util.js';
var util = require('./export/util.js');

var a = [0];
//
// console.log(util)
//
console.log('getType:' + util.getType(a));
console.log('getIEVersion:' + util.getIEVersion());
console.log('getAbsoluteUrl:' + util.getAbsoluteUrl('/wcs/'));
console.log('get http://ued.yy.com/?user=test user param:' + util.getUrlParam('user', 'http://ued.yy.com/?user=test'));
console.log('isChrome:' + util.isChrome());
console.log('isIE:' + util.isIE());
console.log('isEdge:' + util.isEdge());
console.log('isiPhone:' + util.isiPhone());
console.log('isiPad:' + util.isiPad());
console.log('isiPod:' + util.isiPod());
console.log('isiOS:' + util.isiOS());
console.log('isAndroid:' + util.isAndroid());
console.log('isAndroidPhone:' + util.isAndroidPhone());
console.log('isAndroidTablet:' + util.isAndroidTablet());
console.log('isWindows:' + util.isWindows());
console.log('isWindowsPhone:' + util.isWindowsPhone());
console.log('isWindowsTablet:' + util.isWindowsTablet());
console.log('isBlackberry:' + util.isBlackberry());
console.log('isMobile:' + util.isMobile());
console.log('isTablet:' + util.isTablet());
console.log('isTouchDevice:' + util.isTouchDevice());
console.log('isDesktop:' + util.isDesktop());
console.log('isLinux:' + util.isLinux());
console.log('isMac:' + util.isMac());
console.log('isWechatBrowser:' + util.isWechatBrowser());
console.log('isEventSupport:' + util.isEventSupport('click'));
console.log('isEventSupport:' + util.isEventSupport('click'));
