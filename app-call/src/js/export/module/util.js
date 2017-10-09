/*
 * @author: wilson（wuweishuan@yy.com）
 * @update: 2016.09.19 16:00
*/

var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';

let util = {
	/**
     * 检测当前环境是否为iPhone
     *
     * @return {boolean} true|false
     */
    isiPhone () {
        return /iphone/i.test(userAgent);
    },

    /**
     * 检测当前环境是否为iPad
     *
     * @return {boolean} true|false
     */
    isiPad () {
        return /ipad/i.test(userAgent);
    },

    /**
     * 检测当前环境是否为iPod
     *
     * @return {boolean} true|false
     */

    isiPod () {
        return /ipod/i.test(userAgent);
    },

	/**
     * 检测当前环境是否为iOS
     *
     * @return {boolean} true|false
     */

    isiOS () {
        return this.isiPhone() || this.isiPad() || this.isiPod();
    },
    /**
     * 检测当前环境是否为Android
     *
     * @return {boolean} true|false
     */

    isAndroid () {
        return /android/i.test(userAgent);
    },

    isSafari() {
    	var ua = navigator.userAgent;
    	// IOS系统 && !chrome && 开头必须为Mozilla && 结尾为Safari/xxx.xx
        if ( (/ OS \d/.test(ua)) && (!~ua.indexOf('CriOS')) && (!ua.indexOf('Mozilla')) && (/Safari\/[\d\.]+$/.test(ua)) ) {
            return true;
        }
        return false;
	},

    /**
     * 检测当前环境ios版本
     *
     * @return {number}
     */
    iosVersion () {
    	var version = userAgent.match(/os (\d+)_(\d+)_?(\d+)?/);
    	console.log(version)
    	return this.isiOS()?(version?parseInt(version[1], 10):0):0;
    },

    /**
     * 检测是否在微信浏览器中
     *
     * @return {boolean} true|false
     */
    isWechat (){
        return (/micromessenger/i).test(userAgent);
    },

    /**
     * 检测是否在qq中
     *
     * @return {boolean} true|false
     */
    isQq (){
        return (/qq\//i).test(userAgent);
    },
}

export default util;

