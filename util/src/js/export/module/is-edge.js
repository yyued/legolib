/**
 * 检测当前浏览器是否为Edge
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-userAgent');

function isEdge() {
    return /edge/i.test(userAgent);
}
module.exports = isEdge;
