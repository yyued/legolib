/**
 * 检测当前浏览器是否为IE
 * edge 也属于IE
 *
 * @param {number} version 版本号
 * @return {boolean} true|false
 */

 var userAgent = require('./get-userAgent');
 var vendor = require('./get-vendor');

function isIE(version) {
    if(!version) {
        return /msie/i.test(userAgent) || "ActiveXObject" in window;
    }
    if(version >= 11) {
        return "ActiveXObject" in window;
    }
    return new RegExp('msie ' + version).test(userAgent);
}
module.exports = isIE;
