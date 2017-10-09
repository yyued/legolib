/**
 * 检测当前环境是否为iPad
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-userAgent');

function isiPad() {
    return /ipad/i.test(userAgent);
}
module.exports = isiPad;
