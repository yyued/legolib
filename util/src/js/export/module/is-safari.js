/**
 * 检测当前浏览器是否为safari
 *
 * @return {boolean} true|false
 */
function isSafari() {
    return /safari/i.test(userAgent) && /apple computer/i.test(vendor);
}
module.exports = isSafari;
