/**
 * 检测指定参数是否是一个空对象
 *
 * @return {boolean} true|false
 */

function isEmptyObject( obj ) {
    var name;
    for ( name in obj )
        return false;
    return true;
}

module.exports = isEmptyObject;
