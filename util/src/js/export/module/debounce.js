/**
 * 函数去抖
 * 场景：每完成等待某个时间后去执行某函数，只希望执行一次；如输入实时查询、防止重复提交
 *
 * @param {Function} callback 回调函数
 * @param {number} wait 等待 wait 毫秒之后才执行
 * @param {boolean} immediate 是否立即执行
 * @return {Function} 返回
 */
function debounce(callback, wait, immediate) {
    var timeout = null;
    return function () {
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                callback.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            callback.apply(context, args);
        }
    };
}
module.exports = debounce;
