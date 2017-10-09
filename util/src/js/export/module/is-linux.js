/**
 * 检测当前环境是否为linux
 *
 * @return {boolean} true|false
 */
var appVersion = require('./get-appVersion');

function isLinux() {
    return /linux/i.test(appVersion);
}
module.exports = isLinux;
