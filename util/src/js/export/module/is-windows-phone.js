/**
 * 检测当前环境是否为windows手机
 *
 * @return {boolean} true|false
 */

 var userAgent = require('./get-userAgent');
 var isWindows = require('./is-windows');

function isWindowsPhone() {
    return isWindows() && /phone/i.test(userAgent);
}
module.exports = isWindowsPhone;
