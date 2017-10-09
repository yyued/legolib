/**
 * @file        : 常用工具集
 * @author      : Vicky(fanyuanjing@yy.com)
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoUtil
 * @export file : index
 * @update      : 2016-10-11 16:17:21
 */

var getType         = require('./module/get-type');
var getIEVersion    = require('./module/get-ie-version');
var getAbsoluteUrl  = require('./module/get-absolute-url');
var getUrlParam     = require('./module/get-url-param');
var isChrome        = require('./module/is-chrome');
var isIE            = require('./module/is-ie');
var isEdge          = require('./module/is-edge');
var isSafari        = require('./module/is-safari');
var isiPhone        = require('./module/is-iPhone');
var isiPad          = require('./module/is-iPad');
var isiPod          = require('./module/is-iPod');
var isiPhone        = require('./module/is-iPhone');
var isiOS           = require('./module/is-iOS');
var isAndroid       = require('./module/is-android');
var isAndroidPhone  = require('./module/is-android-phone');
var isAndroidTablet = require('./module/is-android-tablet');
var isWindows       = require('./module/is-windows');
var isWindowsPhone  = require('./module/is-windows-phone');
var isWindowsTablet = require('./module/is-windows-tablet');
var isBlackberry    = require('./module/is-blackberry');
var isMobile        = require('./module/is-mobile');
var isTablet        = require('./module/is-tablet');
var isTouchDevice   = require('./module/is-touch-device');
var isDesktop       = require('./module/is-desktop');
var isLinux         = require('./module/is-linux');
var isMac           = require('./module/is-mac');
var isWechatBrowser = require('./module/is-wechat-browser');
var isEventSupport  = require('./module/is-event-support');
var debounce        = require('./module/debounce');
var throttle        = require('./module/throttle');

module.exports = {
    getType         : getType,
    getIEVersion    : getIEVersion,
    getAbsoluteUrl  : getAbsoluteUrl,
    getUrlParam     : getUrlParam,
    isChrome        : isChrome,
    isIE            : isIE,
    isEdge          : isEdge,
    isSafari        : isSafari,
    isiPhone        : isiPhone,
    isiPad          : isiPad,
    isiPod          : isiPod,
    isiOS           : isiOS,
    isAndroid       : isAndroid,
    isAndroidPhone  : isAndroidPhone,
    isAndroidTablet : isAndroidTablet,
    isWindows       : isWindows,
    isWindowsPhone  : isWindowsPhone,
    isWindowsTablet : isWindowsTablet,
    isBlackberry    : isBlackberry,
    isMobile        : isMobile,
    isTablet        : isTablet,
    isTouchDevice   : isTouchDevice,
    isDesktop       : isDesktop,
    isLinux         : isLinux,
    isMac           : isMac,
    isWechatBrowser : isWechatBrowser,
    isEventSupport  : isEventSupport,
    debounce        : debounce,
    throttle        : throttle
}
