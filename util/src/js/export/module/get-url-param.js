/**
 * 获取url中指定参数的值
 * @param {string} name 需要获取的参数名
 * @param {string} url 需要被处理的url，默认为当前url
 * @return {string} 对应的参数值
 */
function getUrlParam(name, url) {
    var paramReg    = new RegExp("[\\?&#]" + name + "=([^&#]+)","gi");
    var paramMatch  = decodeURIComponent(url || location.href).match(paramReg);
    var paramResult = [];

    if (paramMatch && paramMatch.length > 0) {
        paramResult = (paramMatch[paramMatch.length-1]).split("=");
        if (paramResult && paramResult.length > 1) {
            return paramResult[1];
        }
        return ''
    }
    return '';
}
module.exports = getUrlParam;
