/**
 * @file   : 数据上报
 * @author : David
 * @update : 2016-08-04 20:38:22
 */

let util = require('./util.js');

module.exports = {

    // 存放报告队列数组
    queueArray: [],

    /**
     * 推送报告到数组队列
     * 页面加载完毕之前推动到上报队列，页面加载完毕之后的可疑劫持行为直接上上报
     *
     * @param {string} type 劫持类型
     * @param {string} url URL
     * @param {string} code 风险代码
     */
    pushQueue(type, url, code, remark) {
        // console.log(this.queueArray)
        if (!this.queueArray) {
            this.sendHijack(type, url, code, remark);
        }
        else {
            this.queueArray.push({
                type   : type,
                url    : url,
                code   : code,
                remark : remark
            });
        }
    },

    /**
     * hijack统计上报
     *
     * @param {string} type 劫持类型
     * @param {string} url URL
     * @param {string} code 风险代码
     */
    sendHijack(type='', hijackUrl='', hijackCode='', remark='') {
        let hijackType = type.toLowerCase();
        let url        = encodeURIComponent(document.location.href);
        let time       = Math.round(new Date().getTime()/1000);
        let uid        = util.getUrlParam('uid');
        let ua         = encodeURIComponent(navigator.userAgent);
        let dw         = window.screen.width + 'x' + window.screen.height; //屏幕分辨率
        let version    = '0.1.1';
        let reportInfo = `time=${time}&uid=${uid}&ua=${ua}&dw=${dw}&url=${url}&version=${version}&hijackType=${encodeURIComponent(hijackType)}&hijackUrl=${encodeURIComponent(hijackUrl)}&hijackCode=${encodeURIComponent(hijackCode)}&remark=${encodeURIComponent(remark)}`;
        let reportUrl  = this.reportUrl||'//ylog.hiido.com/c.gif?act=webhttphijack';

        reportUrl += reportUrl.indexOf('?') < 0 ? `?${reportInfo}` : `&${reportInfo}`;
        new Image().src = reportUrl;
    },

    // 初始化
    init(config) {
        this.reportUrl = config.reportUrl;
        window.addEventListener('load', () => {
            // console.log(this.queueArray);
            this.queueArray.forEach((value, index) => {
                this.sendHijack(value.type, value.url, value.code, value.remark);
            });
            this.queueArray = null;
        });
    }

};

