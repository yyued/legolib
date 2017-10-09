/**
 * 检测当前环境是否为iPod
 *
 * @return {boolean} true|false
 */

var userAgent = require('./get-userAgent');

function isiPod() {
    return /ipod/i.test(userAgent);
}
module.exports = isiPod;
