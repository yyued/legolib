/**
 * 检测当前设备是否为触屏设备
 *
 * @return {boolean} true|false
 */
function isTouchDevice() {
    return 'ontouchstart' in window ||'DocumentTouch' in window && document instanceof DocumentTouch;
}
module.exports = isTouchDevice;
