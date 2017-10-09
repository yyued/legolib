/**
 * 函数节流
 * 场景：每间隔某个时间去执行某函数，避免函数的过多执行，依然会不断执行，只是控制了执行的频率；如滚动、窗口缩放
 *
 * @param {Function} callback 回调函数
 * @param {number} 执行时间间隔，单位毫秒
 */
function throttle(callback, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function () {
        previous = new Date;
        timeout  = null;
        result   = callback.apply(context, args);
    };
    return function () {
        var now = new Date;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout  = null;
            previous = now;
            result   = callback.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
module.exports = throttle;
