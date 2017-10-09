/**
 * 检测当前环境是否为windows平板
 *
 * @return {boolean} true|false
 */
 var userAgent = require('./get-userAgent');
 var isWindows = require('./is-windows');
 var isWindowsPhone = require('./is-windows-phone');

function isWindowsTablet() {
    return isWindows() && isWindowsPhone() && /touch/i.test(userAgent);
}
module.exports = isWindowsTablet;
