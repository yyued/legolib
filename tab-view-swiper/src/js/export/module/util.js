let util = {
    /**
     * 对象合并
     *
     * @param {object} target 原对象
     * @param {object} options 新对象
     * @return {object} 合并后的对象
     */
    extend(target, options) {
        let copy = null; // 属性值
        for (var name in options) { // name为对象属性
            copy = options[name];

            //防止循环调用
            if (target === copy) continue;

            //防止附加未定义值
            if (typeof copy === 'undefined') continue;

            //赋值
            target[name] = copy;
        }
        return target;
    },
    /**
     * 获取url中指定参数的值
     * @param {string} name 需要获取的参数名
     * @param {string} url 需要被处理的url，默认为当前url
     * @return {string} 对应的参数值
     */
    getUrlParam(name, url) {
        var paramReg = new RegExp("[\\?&#]" + name + "=([^&#]+)", "gi");
        var paramMatch = (url || location.href).match(paramReg);
        var paramResult = [];

        if (paramMatch && paramMatch.length > 0) {
            paramResult = (paramMatch[paramMatch.length - 1]).split("=");
            if (paramResult && paramResult.length > 1) {
                return paramResult[1];
            }
            return ''
        }
        return '';
    }
};
module.exports = util;
