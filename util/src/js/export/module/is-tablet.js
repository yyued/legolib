/**
 * 检测当前环境是否为平板
 *
 * @return {boolean} true|false
 */

var isiPad = require('./is-iPad');
var isAndroidTablet = require('./is-android-tablet');
var isWindowsTablet = require('./is-windows-tablet');

function isTablet() {
    return isiPad() || isAndroidTablet() || isWindowsTablet();
}
module.exports = isTablet;
