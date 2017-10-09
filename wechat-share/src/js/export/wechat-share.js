/**
 * @file        : 微信分享组件
 * @author      : Wilson
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoWechatShare
 * @export file : index
 * @update      : 2017-10-09 17:19:07
 */

import util from './module/util.js';

module.exports = class LegoWechatShare {
    constructor(argument) {
        let link         = window.location.href;
        let returnUrl    = encodeURIComponent(link.split('#')[0]);
        let signatureUrl = {
            yy : `//wap.yy.com/mobileweb/share/weixinSign2?url=${returnUrl}`, // yy.com
            bi : `//wp.zbisq.com/index.php?r=Jssdk/getSignPackage&url=${returnUrl}`, // Bi神器
        };
        let defaults = {
            title           : '微信分享标题',
            desc            : '微信分享描述',
            link            : link,
            img             : '//s1.yy.com/ued_web_static/common/img/blank.png',
            signatureUrl    : signatureUrl.yy,
            successCallback : () => {},
            cancelCallback  : () => {},
            debug           : false
        };
        this.config = util.extend(true, defaults, argument);

        switch(this.config.type) {
            case 'bi':
                this.config.signatureUrl = signatureUrl.bi;
                break;
            case 'yy':
                this.config.signatureUrl = signatureUrl.yy;
                break;
        }
        this.init();
    }

    init() {
        const wechatJs = '//res.wx.qq.com/open/js/jweixin-1.2.1.js';
        util.importScript(wechatJs, ()=>{
            this.register();
        });
    }

    register() {
        window.wechatsharecallback = (res) => {
            let msg = (this.config.type === 'bi')?res.wxapi:res.data;
            wx.config({
                debug     : this.config.debug,
                appId     : msg.appId,
                timestamp : msg.timestamp,
                nonceStr  : msg.nonceStr,
                signature : msg.signature,
                jsApiList : ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'chooseWXPay', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice']
            });

            wx.ready(() => {
                let shareTitle = this.config.title;
                let shareDesc  = this.config.desc;
                let shareLink  = this.config.link;
                let shareImg   = this.config.img;

                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title   : shareTitle, // 分享标题
                    link    : shareLink, // 分享链接
                    imgUrl  : shareImg, // 分享图标
                    success : () => {
                        this.config.successCallback();
                    },
                    cancel  : () => {
                        this.config.cancelCallback();
                    }
                });

                //分享给朋友
                wx.onMenuShareAppMessage({
                    title   : shareTitle, // 分享标题
                    desc    : shareDesc, // 分享描述
                    link    : shareLink, // 分享链接
                    imgUrl  : shareImg, // 分享图标
                    type    : '', // 分享类型,music、video或link，不填默认为link
                    dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
                    success : () => {
                        this.config.successCallback();
                    },
                    cancel  : () => {
                        this.config.cancelCallback();
                    }
                });

                wx.onMenuShareQQ({
                    title   : shareTitle, // 分享标题
                    desc    : shareDesc, // 分享描述
                    link    : shareLink, // 分享链接
                    imgUrl  : shareImg, // 分享图标
                    success : () => {
                        this.config.successCallback();
                    },
                    cancel  : () => {
                        this.config.cancelCallback();
                    }
                });

                wx.onMenuShareWeibo({
                    title   : shareTitle, // 分享标题
                    desc    : shareDesc, // 分享描述
                    link    : shareLink, // 分享链接
                    imgUrl  : shareImg, // 分享图标
                    success : () => {
                        this.config.successCallback();
                    },
                    cancel  : () => {
                        this.config.cancelCallback();
                    }
                })
            });
        };
        let signatureUrl = this.config.signatureUrl;
        let signatureLink = (signatureUrl.indexOf('?') < 0) ? `${signatureUrl}?callback=wechatsharecallback` : `${signatureUrl}&callback=wechatsharecallback`;
        util.importScript(signatureLink);
    }
}

