/**
 * 检测当前环境是否为移动手机
 *
 * @return {boolean} true|false
 */
 var userAgent = require('./get-userAgent');
 var isiPhone = require('./is-iPhone');
 var isiPod = require('./is-iPod');
 var isAndroidPhone = require('./is-android-phone');
 var isBlackberry = require('./is-blackberry');
 var isWindowsPhone = require('./is-windows-phone');

function isMobile() {
    // return /Android|webOS|iPhone|Windows Phone|iPod|BlackBerry|SymbianOS/i.test(userAgent);
    return isiPhone() || isiPod() || isAndroidPhone() || isBlackberry() || isWindowsPhone();
}
module.exports = isMobile;
