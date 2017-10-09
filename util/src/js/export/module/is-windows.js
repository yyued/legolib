/**
 * 检测当前环境是否为windows
 *
 * @return {boolean} true|false
 */
var appVersion = require('./get-appVersion');

function isWindows() {
    return /win/i.test(appVersion);
}
module.exports = isWindows;
