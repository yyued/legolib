/**
 * 检测当前环境是否为iOS
 *
 * @return {boolean} true|false
 */
var isiPhone = require('./is-iPhone');
var isiPad = require('./is-iPad');
var isiPod = require('./is-iPod');

function isiOS() {
    return this.isiPhone() || this.isiPad() || this.isiPod();
}
module.exports = isiOS;
