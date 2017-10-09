/**
 * 检测当前环境是否为Android
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-userAgent');

function isAndroid() {
    return /android/i.test(userAgent);
}

module.exports = isAndroid;
