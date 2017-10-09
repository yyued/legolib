/**
 * @file        : toast
 * @author      : Wilson
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoToast
 * @export file : index
 * @update      : 2016-10-13 11:15:18
 */

module.exports = class LegoToast {
    constructor(argument) {
        if(typeof argument == 'undefined') {
            this.msg        = '操作成功';
            this.time       = 2000;
            this.extraClass = '';
        } else {
            this.msg        = argument.msg || '';
            this.time       = argument.time || 2000;
            this.extraClass = argument.extraClass || '';
        }

        this.init();
    }

    init() {
        this.legoToastInner = null; // 元素节点
        this.toastTimer = null;  // 定时器
        this.delTimer = null;   // 隐藏toast定时器
        this.toastDiv = null; // 元素节点
        this.hasToastDiv = false; // 是否已经创建了toast
        this.isToastShow = false; // toast是否显示
    }

    // 创建模板
    createModule(cb) {
        this.toastDiv = document.createElement('div');
        this.toastDiv.classList.add('legoToast');
        if(this.extraClass) this.toastDiv.classList.add(this.extraClass);
        let toastTpl = `<div class="legoToast-inner">${ this.msg }</div>`;

        // 样式
        let style = require('./style.scss');

        // 插入页面
        this.toastDiv.innerHTML = `<style>${ style }</style>${ toastTpl }`;
        document.body.appendChild(this.toastDiv);

        this.hasToastDiv = true;

        this.legoToastInner = document.querySelector(".legoToast-inner");

        // 执行回调
        if (typeof cb === 'function') {
            this.legoToastInner.classList.add('legoToast-inner', 'is-toastShow');
            cb.call(this);
        }
    }

    // 打开toast
    open() {
        // 判断toast是否在显示
        if(this.isToastShow) {
            this.close();
            if(this.delTimer) clearTimeout(this.delTimer);
        }

        // 判断toast是否已经存在
        if(this.hasToastDiv) {
            // 重新设置参数
            this.legoToastInner.innerHTML = this.msg;

            this.toastDiv.style.display = 'block';
            this.legoToastInner.classList.add('is-toastShow');
            this.legoToastInner.classList.remove('is-toastHide');

            this.toastTimer = setTimeout(() => {
                this.close();
            }, this.time);
        } else {
            this.createModule(function() {
                this.toastTimer = setTimeout(() => {
                    this.close();
                }, this.time);
            });
        }
        this.isToastShow = true;
    }

    // 关闭toast
    close() {
        if(this.toastTimer) clearTimeout(this.toastTimer);

        this.legoToastInner.classList.remove('is-toastShow');
        this.legoToastInner.classList.add('is-toastHide');

        // 动画结束删除dom
        this.delTimer = setTimeout(() => {
            this.toastDiv.style.display = 'none';
            // 重置
            this.isToastShow = false;
        }, 450);
    }

    // 修改文案
    changeText(msg) {
        this.msg = msg;
    }

    // 修改时间
    changeTime(time) {
        this.time = time;
    }
}
