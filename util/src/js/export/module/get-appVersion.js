/**
 * 获取app版本
 *
 * @return {number} app版本号
 */

var appVersion = window.navigator.appVersion.toLowerCase() || '';

module.exports = appVersion;
