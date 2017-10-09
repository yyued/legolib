/**
 * 检测当前浏览器是否为Chrome
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-appVersion');
var vendor = require('./get-vendor');

function isChrome() {
    return /chrome|chromium|gecko/i.test(userAgent) && /google inc/.test(vendor);
}
module.exports = isChrome;
