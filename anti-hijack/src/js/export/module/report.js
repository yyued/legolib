/**
 * @file   : 数据上报
 * @author : David
 * @update : 2016-08-04 20:38:22
 */


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
    pushQueue(type, url, code) {
        // console.log(this.queueArray)
        if (!this.queueArray) {
            this.sendHijack(type, url, code);
        }
        else {
            this.queueArray.push({
                type : type,
                url  : url,
                code : code
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
    sendHijack(type, url, code) {
        let hijackType   = type ? type.toLowerCase() : '';
        let hijackUrl    = url ? url : '';
        let hijackCode   = code ? code : '';
        let hijackInfo = `HTTP_hijack&report={"type": "${hijackType}", "url": "${hijackUrl}", "code": "${hijackCode}"}`;
        let reportUrl = this.reportUrl;
        // console.warn(hijackInfo);
        if (reportUrl) {
            let reportImg = new Image();
            reportImg.src = reportUrl + '?' + hijackInfo;
        }
        else {
            window.errorReport && window.errorReport(hijackInfo);
        }
    },

    // 初始化
    init(config) {
        this.reportUrl = config.reportUrl;
        window.addEventListener('load', () => {
            // console.log(this.queueArray);
            this.queueArray.forEach((value, index) => {
                this.sendHijack(value.type, value.url, value.code);
            });
            this.queueArray = null;
        });
    }

};

