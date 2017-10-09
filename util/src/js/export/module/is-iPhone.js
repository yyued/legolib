/**
 * 检测当前环境是否为iPhone
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-userAgent');

function isiPhone() {
    return /iphone/i.test(userAgent);
}
module.exports = isiPhone;
