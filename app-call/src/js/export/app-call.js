/**
 * @file        : APP唤起
 * @author      : Wilson
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoAppCall
 * @export file : index
 * @update      : 2017-05-23 21:39:16
 */

import util from './module/util.js';
import delegate from './module/delegate.js';

module.exports = class LegoAppCall {
    constructor(argument) {
        this.trigger            = argument.trigger || '';
        this.schemaUrl          = argument.schemaUrl || '';
        this.universalLink      = argument.universalLink || '';
        this.androidDownloadUrl = argument.androidDownloadUrl || '';
        this.iOSDownloadUrl     = argument.iOSDownloadUrl || '';
        this.tipsSelector       = argument.tipsSelector ? document.querySelector(argument.tipsSelector) : null; // tips元素
        this.sbTips             = argument.sbTips || false;
        this.sbTipsText         = argument.sbTipsText || '下拉页面打开应用，内容更精彩！';
        this.init();
    }

    init() {
        this.createStyle();

        if (this.trigger) {
            document.querySelector(this.trigger).style.cursor = 'pointer';
            document.addEventListener('click', delegate(this.trigger, ()=> {
                this.callUp();
            }), false);
        }
        else {
            this.callUp();
        }
    }

    // iframe打开方式
    iframeJump(schemaUrl, downloadUrl) {
        const isSafari = util.isSafari();
        let iframe = document.createElement('iframe');
        let body = document.body;
        iframe.style.cssText = 'display:none;width=0;height=0';
        let timer = null;

        body.appendChild(iframe);
        iframe.src = schemaUrl;

        /**
         * 1、 1.5s后如果通过schemaUrl打开不成功，就跳到下载链接；
         * 2、 目前，原生Safari不支持iframe方式打开schemaUrl；
         */
        timer = setTimeout(()=> {
            window.location.href = isSafari?schemaUrl:downloadUrl;
        }, 1500);

        // 跳转协议之后清空定时器
        ['visibilitychange', 'webkitvisibilitychange'].forEach(eventName => document.addEventListener(eventName, cancelJump));

        function cancelJump(){
            let isHidden = document.hidden || document.webkitHidden;
            if (isHidden) {
                clearTimeout(timer);
            }
        }

        document.addEventListener('pagehide', ()=> {
            clearTimeout(timer);
        })
    }

    createStyle() {
        let head = document.getElementsByTagName("head")[0] || document.documentElement;
        let style = document.createElement("style");
        let styleText = require('./style.scss');
        style.innerHTML = styleText;
        head.insertBefore(style, null);
    }

    // 在外部浏览器打开tips
    createOpenBrowserTips() {
        let openBrowserTips = null;
        if (this.tipsSelector) {
            openBrowserTips = this.tipsSelector;
            this.tipsSelector.style.display = 'block';
        } else {
            openBrowserTips = document.createElement('div');
            openBrowserTips.setAttribute('class', 'appCallTips');
            tipsTpl = `<div class="appCallTips-img"></div>`;
            openBrowserTips.innerHTML = tipsTpl;
            document.body.appendChild(openBrowserTips);
        }

        // 点击关闭提示
        openBrowserTips.addEventListener('touchend', () => {
            openBrowserTips.style.display = 'none';
        }, false);
    }

    // smart banner tips
    createSmartBannerTips() {
        let bannerTips = document.createElement('div');
        bannerTips.setAttribute('class', 'smartBannerTips');
        tipsTpl = `<div class="smartBannerTips-content">${this.sbTipsText}<i class="swipe-down"></i></div>`;
        bannerTips.innerHTML = tipsTpl;
        document.body.appendChild(bannerTips);

        // 点击关闭提示
        bannerTips.addEventListener('touchmove', () => {
            bannerTips.style.display = 'none';
        }, false);
    }

    // 判断逻辑
    callUp() {
        const isAndroid = util.isAndroid();
        const isiOS = util.isiOS();
        const isSafari = util.isSafari();
        const iosVersion = util.iosVersion();
        const isSupportUlink = Boolean(this.trigger && this.universalLink && iosVersion >= 9);

        if(util.isWechat() || util.isQq()) {
            if(isSupportUlink) {
                window.location.href = this.universalLink;
            }
            else {
                // 提示外部下载
                this.createOpenBrowserTips();
            }
        } else {
            // iOS9+在Safari中提示下拉显示smart banner tips
            if (this.sbTips && iosVersion >= 9 && isSafari) {
                this.createSmartBannerTips();
                return;
            }

            if(isAndroid) {
                this.iframeJump(this.schemaUrl, this.androidDownloadUrl);
            }
            else {
                if(isSupportUlink) {
                    window.location.href = this.universalLink;
                }
                else {
                    this.iframeJump(this.schemaUrl, this.iOSDownloadUrl);
                }
            }
        }

    }
}
