/**
 * @file   : 工具函数
 * @author : David
 * @update : 2016-08-04 20:38:22
 */

module.exports = {

    /**
     * 获取url中指定参数的值
     * @param  {string} name 需要获取的参数名
     * @param  {string} url 需要被处理的url，默认为当前url
     * @return {string} 对应的参数值
     */
    getUrlParam(name, url) {
        let re = new RegExp('[\\?&#]' + name + '=([^&#]+)', 'gi');
        let ma = (url || location.href).match(re);
        let strArr;

        if (ma && ma.length > 0) {
            strArr = (ma[ma.length-1]).split("=");
            if (strArr && strArr.length > 1) {
                return strArr[1];
            }
            return ''
        }
        return '';
    },

    /**
     * 合并两个数组，重复项只留一个
     * @param  {array} arr1 数组1
     * @param  {array} arr2 数组2
     * @return {array} 合并后的数组
     */
    mergeArray(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i] === arr2[j]) {
                    arr1.splice(i, 1); // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
                }
            }
        }
        for (var i = 0; i < arr2.length; i++) {
            arr1.push(arr2[i]);
        }
        return arr1;
    },

    /**
     * 判断是否为数组
     * @param  {array} arg 数组1
     * @return {Boolean} true || false
     */
    isArray(arg) {
        if (!Array.isArray) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        } else {
            return Array.isArray(arg);
        }
    }
};
