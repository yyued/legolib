/**
 * 检测是否在微信浏览器中
 *
 * @return {boolean} true|false
 */

 var userAgent = require('./get-userAgent');
 
function isWechatBrowser(){
    return (/micromessenger/i).test(userAgent);
}
module.exports = isWechatBrowser;
