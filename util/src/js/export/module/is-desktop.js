/**
 * 检测当前环境是否为桌面环境
 *
 * @return {boolean} true|false
 */

var isMobile = require('./is-mobile');
var isTablet = require('./is-tablet');

function isDesktop() {
    return !isMobile() && !isTablet();
}
module.exports = isDesktop;
