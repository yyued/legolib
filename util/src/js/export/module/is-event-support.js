/**
 * 检测某对象是否支持某事件
 *
 * @param {string} eventName 事件名称
 * @param {object} element 检测对象
 * @return {boolean} true|false
 * @example isEventSupport('click', document); // 检测document是否支持click事件
 */
function isEventSupport(eventName, element) {
    var TAGNAMES = {
        'select' : 'input',
        'change' : 'input',
        'submit' : 'form',
        'reset'  : 'form',
        'error'  : 'img',
        'load'   : 'img',
        'abort'  : 'img'
    };

    function is(obj, type) {
        return typeof obj === type;
    }

    element = element || document.createElement(TAGNAMES[eventName] || 'div');
    eventName = 'on' + eventName;

    var isSupported = eventName in element;

    if (!isSupported) {
        if (!element.setAttribute) {
            element = document.createElement('div');
        }
        if (element.setAttribute && element.removeAttribute) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            if (!is(element[eventName], 'undefined')) {
                element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
        }
    }

    element = null;
    return isSupported;
}
module.exports = isEventSupport;
