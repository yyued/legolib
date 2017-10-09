/**
 * @file        : 防HTTP劫持组件
 * @author      : David
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoAntiHijack
 * @export file : index
 * @update      : 2017-09-28 11:36:36
 */

const util     = require('./module/util.js');
const report   = require('./module/report.js');


let security = null;

module.exports = class LegoAntiHijack {

    /**
     * 构造函数
     *
     * @param {Object} argument 参数对象
     */
    constructor (argument) {
        this.init(argument);
    }

    init (config={}) {
        this.defaults = {
            whiteList: [
                'yy.com',
                'yypm.com',
                'duowan.com',
                'dwstatic.com',
                'yystatic.com',
                'huanju.cn',
                'huanju.net',
                'hiido.com',
                'hiido.cn',
                'huya.com',
                'mezhibo.com',
                'zhiniu8.com',
                '100.com',
                '5253.com',
                '4366.com',
                '1931.com',
                'sealdsp.com',
                'yuanyuantv.com',
                'ruixueys.com',
                'yyclouds.com',
                'kuaikuai.cn',
                'up24.com',
                'bigo.tv',
                'bigolive.cn',
                'baidu.com',
                'qq.com',
                'weibo.com',
                'sina.com.cn',
                'sinaimg.cn',
                'sinajs.cn',
                'google-analytics.com'
            ],
            blackList: [
                '120.80.57.123',
                '61.160.200.252'
            ]
        };

        this.ready();
        this.lockCall();
        this.lockApply();
        this.setSecurityList(config);
        this.rawDocumentWrite();
        this.rawOpener();
        this.rawSetAttribute();
        this.checkIframeHijack();
        this.mutation();
        report.init(config);
    }

    ready () {
        // 属性方法已注入, 实例化, 还未渲染 DOM
        // console.log('abc');
        this.whiteList = [];
        this.blackList = [];
        security = this;
    }

    render () {
        // 属性方法已注入, 实例化, DOM已渲染

    }

    beforeDestroy () {
        // 销毁实例前
    }

    destroyed () {
        // 销毁实例后

    }

    // 设置黑白名单
    setSecurityList(config) {
        this.whiteList = config.whiteList && util.isArray(config.whiteList) ? util.mergeArray(this.defaults.whiteList, config.whiteList) : this.defaults.whiteList;
        this.blackList = config.blackList && util.isArray(config.blackList) ? util.mergeArray(this.defaults.blackList, config.blackList) : this.defaults.blackList;
    }

    // 重写document.write
    rawDocumentWrite() {
        let oldWrite = document.write;
        let oldWriteln = document.writeln;
        let scanString = (string, writeType) => {
            const hijackType = this.getTestType(string);
            switch(hijackType) {
                case 'xss':
                    report.pushQueue('document write→xss', '', string);
                    break;
                case 'blackList':
                    report.pushQueue('document write→黑名单', '', string);
                    break;
                default:
                    report.pushQueue('document write→未拦截', '', string);
                    writeType.apply(document, arguments);
            }
        };

        document.write = (string) => {
            scanString(string, oldWrite);
        };

        document.writeln = (string) => {
            scanString(string, oldWriteln);
        };
    }

    // 重写window.open
    rawOpener() {
        let oldOpen = window.open;
        window.open = (url) => {
            const hijackType = this.getTestType(url);
            if (hijackType !== 'whiteList') {
                report.pushQueue('window.open', url, '');
                return;
            }
            oldOpen.apply(window, arguments);
        };
    }

    // 重写setAttribute
    rawSetAttribute() {
        let _this = this;
        let oldAttribute = Element.prototype.setAttribute;
        Element.prototype.setAttribute = function(name, value) {

            // script类型
            if (this.tagName === 'SCRIPT' && /^src$/i.test(name)) {
                const hijackType = _this.getTestType(value);

                // 只允许白名单通过
                if (hijackType !== 'whiteList') {
                    report.pushQueue(this.tagName, value, '');
                    return;
                }
            }

            oldAttribute.apply(this, arguments);
        }
    }

    /** xss检测
     *
     *  @param : {string} string 被检测的字符串
     *  @return: 是否检测到xxs true || false
     */
    xssTest(string){
        const keyword = [
            'xss',
            'eHNz',
            '&#120;&#115;&#115;',
            '&#x78;&#x73;&#x73;',
            '\\u0078\\u0073\\u0073',
            '\\x78\\x73\\x73',
            '\\170\\163\\163',
            'data:text/html',
            'alert\\\(\\s*\\d+\\\)',
            'alert\\\(test\\\)',
            'hacked',
            'location.href',
            'self.location',
            'top.location',
            'String.fromCharCode',
            'document.cookie',
            '(\\\[\\\].*){3,}'
        ];

        const pattern = new RegExp(this.getReg(keyword),'i');
        if(pattern.test(string)){
            return true;
        }

        return false;
    }

    /** 正则表达式生成
     *
     *  @param : {Array}  keyArray 数组形式，如['yy.com','duowan.com']
     *  @return: {string} 格式化的正则表达式，如'(yy.com|duowan.com)'
     */
    getReg(keyArray){
        return '(' + keyArray.join('|') + ')';
    }

    /** 跨站脚本合法检测
     *
     *  @param : {string} src 跨站脚本的字符串
     *  @return: {string} 攻击类型
     */
    getTestType(src){
        let srcHost = src.match(/(http:\/\/|https:\/\/)?([^\/]*)/)[2]; //src对应的host

        // this.setSecurityList();

        // 检测黑名单
        if(this.testList(this.blackList, srcHost)){
            return 'blackList';
        }

        // 检测白名单
        if(this.testList(this.whiteList, srcHost)){
            return 'whiteList';
        }

        // 检测URL关键字
        if(this.xssTest(src)){
            return 'xss';
        }
        return false;
    }


    /** 匹配名单列表
     *
     *  @param : {Array} list 用于匹配的名单
     *  @param : {string} string 被匹配的对象
     *  @return: 是否匹配成功 true || false
     **/
    testList(list, string){
        let reg = this.getReg(list);
        if(reg){
            let regObj = new RegExp(reg, 'i');
            if(regObj.test(string)){
                return true;
            }
        }

        return false;
    }

    // 移除有风险的节点
    removeRiskNode(node) {
        node.parentNode.removeChild(node);
    }

    // 检查DOM插入hijack
    checkDOMHijack(mutation) {
        let reportData = null;
        let nodes = mutation.addedNodes;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];

            switch(node.tagName) {
                // 扫描script与iframe
                case 'SCRIPT':
                case 'IFRAME':

                    // 过滤iframe srcdoc
                    if(node.tagName === 'IFRAME' && node.srcdoc) {
                        report.pushQueue(node.tagName, node.src, node.srcdoc);
                        this.removeRiskNode(node);
                        // console.warn('拦截可疑模块srcdoc:', node.srcdoc);
                    }

                    else if (node.src) {
                        const hijackType = this.getTestType(node.src);

                        // 只允许白名单通过
                        if (hijackType !== 'whiteList') {
                            report.pushQueue(node.tagName, node.src, '');
                            this.removeRiskNode(node);
                            // console.warn('src非白名单', node);
                        }
                    }

                    // 扫描script xss
                    // else if (node.tagName === 'SCRIPT' && node.innerHTML && this.xssTest(node.innerHTML)) {
                    //     report.pushQueue(node.tagName, '插入可疑XSS', node.innerHTML);
                    //     this.removeRiskNode(node);
                    //     console.warn('script innerHTML xss');
                    // }
                break;

                // 扫描img（有未知外域图片，暂不匹配白名单）
                case 'IMG':
                    if (node.src) {
                        let testType = this.getTestType(node.src);
                        if (testType === 'blackList') {
                            report.pushQueue(node.tagName, node.src, '');
                            this.removeRiskNode(node);
                            // console.warn('黑名单图片', node);
                        }
                    }

                    // onload与onerror xss扫描
                    if ( ( node.onload && this.xssTest(node.onload) ) || ( node.onerror && this.xssTest(node.onerror) ) ) {
                        report.pushQueue('IMG xss', node.src, node.onload||node.onerror);
                        this.removeRiskNode(node);
                        // console.warn('IMG xss');
                    }
                break;

                // 链接添加rel="noopenter"
                case 'A':
                    node.setAttribute('rel', 'noopener');
                break;

            }

        }
    }

    // 重定向iframe hijack（页面被iframe包裹）
    checkIframeHijack() {
        let flag = 'iframe_hijack_redirected';
        if (util.getUrlParam(flag)) {
            report.pushQueue('iframe重定向', location.href, '');
        }
        else {
            if (self != top) {
                let parts = location.href.split('#');
                if (location.search) {
                    parts[0] += '&' + flag + '=1';
                }
                else {
                    parts[0] += '?' + flag + '=1';
                }
                try {
                    top.location = parts.join('#');
                } catch (e) {}
            }
        }
    }

    // 监控DOM的更新
    watchDOMChange(mutationRecord, observer) {
        let mainObj = security;
        mutationRecord.forEach((mutation) => {
            mainObj.checkDOMHijack(mutation);
        });
    }

    // MutationObserver
    mutation() {
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        if (!MutationObserver) {
            return;
        }
        let observer = new MutationObserver(this.watchDOMChange);
        const options = {
            childList: true,
            subtree: true
        }
        observer.observe(document, options);
    }

    // 锁住call和apply，防止盗用和重写
    lockCall() {
        Object.defineProperty(Function.prototype, 'call', {
            value        : Function.prototype.call,
            writable     : false,
            configurable : false,
            enumerable   : true
        });
    }

    lockApply() {
        Object.defineProperty(Function.prototype, 'apply', {
            value        : Function.prototype.apply,
            writable     : false,
            configurable : false,
            enumerable   : true
        });
    }

}

