/**
 * 检测当前环境是否为mac
 *
 * @return {boolean} true|false
 */

var appVersion = require('./get-appVersion');

function isMac() {
    return /mac/i.test(appVersion);
}
module.exports = isMac;
