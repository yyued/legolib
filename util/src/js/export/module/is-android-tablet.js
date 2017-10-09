/**
 * 检测当前环境是否为Android平板
 *
 * @return {boolean} true|false
 */

 var userAgent = require('./get-userAgent');

function isAndroidTablet() {
    return /android/i.test(userAgent) && !/mobile/i.test(userAgent);
}
module.exports = isAndroidTablet;
