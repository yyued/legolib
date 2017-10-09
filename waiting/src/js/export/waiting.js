/**
 * @file        : lego-waiting
 * @author      : wilson
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoWaiting
 * @export file : index
 * @update      : 2016-10-13 10:13:24
 */

import createTpl from './tpl/index.tpl';

module.exports = class LegoWaiting {
    constructor(argument) {
        if(typeof argument == 'undefined') {
            this.title      = '加载中';
            this.extraClass = '';
        } else {
            this.title      = argument.title || '加载中';
            this.extraClass = argument.extraClass || '';
        }

        this.init();
    }

    init() {
        this.waitingDiv = null; // 元素节点
        this.hasWaitingDiv = false; // 是否已经创建了waiting
        this.waitingDivTit = ''; // 文案节点

    }

    // 创建模板
    createModule() {
        this.waitingDiv = document.createElement('div');
        this.waitingDiv.classList.add('legoWaiting-overlay', this.extraClass);

        // 样式
        let style = require('./style.scss');

        // 插入页面
        let title = this.title;
        this.waitingDiv.innerHTML = `<style>${ style }</style>${ createTpl({title}) }`;
        document.body.appendChild(this.waitingDiv);

        this.waitingDiv.classList.add('is-waitingShow');

        this.hasWaitingDiv = true;

        this.waitingDivTit = document.querySelector(".legoWaiting-tit");
    }

    // 打开waiting
    open() {
        // 判断是否有waiting
        if(this.hasWaitingDiv) {
            // 重新设置参数
            this.waitingDivTit.innerHTML = this.title;
            this.waitingDiv.style.display = 'block';

            this.waitingDiv.classList.add('is-waitingShow');
            this.waitingDiv.classList.remove('is-waitingHide');
        } else {
            this.createModule();
        }
    }

    // 关闭waiting
    close() {
        this.waitingDiv.classList.add('is-waitingHide');
        this.waitingDiv.classList.remove('is-waitingShow');

        // 动画结束删除dom
        setTimeout(() => {
            this.waitingDiv.style.display = 'none';
        }, 120);
    }

    // 修改文案
    text(msg) {
        this.title = msg;
    }
}
