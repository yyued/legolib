/**
 * 获取数据类型
 *
 * @param {*} o 检测对象
 * @return {string} 数据类型
 */
function getType(o) {
    var type = Object.prototype.toString.call(o);
    return type.match(/\[object (.*?)\]/)[1].toLowerCase();
}
module.exports = getType;
