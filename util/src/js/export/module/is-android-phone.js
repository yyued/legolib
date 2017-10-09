/**
 * 检测当前环境是否为Android手机
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-userAgent');

function isAndroidPhone() {
    return /android/i.test(userAgent) && /mobile/i.test(userAgent);
}
module.exports = isAndroidPhone;
