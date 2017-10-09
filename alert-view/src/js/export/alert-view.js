/**
 * @file        : 弹出对话框
 * @author      : Vicky
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoAlertView
 * @export file : index
 * @update      : 2016-10-13 17:06:50
 */

import util from './module/util.js';
import modalStyle     from './style/index.scss';

document.body.addEventListener('touchstart', function() {});

module.exports = class LegoAlertView {
    /**
     * alertView组件
     * 模拟移动端ios原生的alert和confirm框
     * @param {String} title 标题
     * @param {String} text 文本
     * @param {String} extraClass 给lego-alertView的根节点.lego-alertView附加1或多个自定义class
     * @param {function} confirm 点击确认的回调函数
     * @param {function} cancel 点击取消的回调函数
     *
     */
    constructor(argument) {
        this.defaults = {
            title        : '',
            text         : '',
            confirm      : function() {},
            cancel       : function() {},
            extraClass   : '',
            _modalTpl    : '',
            overlayTpl   : '',
            okButton     : '确定',
            cancelButton : '取消',
            container    : document.body ? document.body : 'body'
        }
        this.init();
    }

    init() {
        // 属性方法还未注入, 还未实例化
        const style = document.createElement('style');
        style.innerHTML = modalStyle;
        document.head.appendChild(style);

        this._modalTpl = document.createElement('div');

        this.overlayTpl = document.createElement('div');
        this.overlayTpl.innerHTML = '<div class="lego-alertView__overlay"></div>';
        this.defaults.container.appendChild(this.overlayTpl.children[0]);

    }

    ready() {
        // 属性方法已注入, 实例化, 还未渲染 DOM
    }

    render(configs) {
        // 属性方法已注入, 实例化, DOM已渲染
        let _this = this;
        let modalHTML  = '';
        let btnsTpl    = '';
        let titleTpl   = configs.title ? `<div class="lego-alertView__title">${configs.title}</div>` : '';
        let textTpl    = configs.text ? `<div class="lego-alertView__text">${configs.text}</div>` : '';
        let hasButtons = !configs.buttons || configs.buttons.length === 0 ? 'ext-nobuttons' : '';

        if (configs.buttons && configs.buttons.length > 0) {
            for (var i = 0; i < configs.buttons.length; i++) {
                btnsTpl += '<span class="lego-alertView__btn">' + configs.buttons[i].text + '</span>';
            }
        }

        modalHTML = `<div class="lego-alertView ${configs.extraClass || ''} ${hasButtons}">
                            <div class="lego-alertView__content">
                                ${titleTpl}
                                ${textTpl}
                            </div>
                            <div class="lego-alertView__action">${btnsTpl}</div>
                         </div>`;
        this._modalTpl.innerHTML = modalHTML;

        let modal = this._modalTpl.children[0];
        this.defaults.container.appendChild(modal);

        // 对每个lego-alertView__btn添加回调函数
        [].forEach.call(modal.querySelectorAll('.lego-alertView__btn'), function(el, index) {
            el.addEventListener('click', function(e) {
                if (configs.buttons[index].close !== false) {
                    _this.closeModal(modal);
                }
                if (configs.buttons[index].onClick) {
                    configs.buttons[index].onClick(modal, e)
                };
            }, false);
        })

        this.openModal(modal)
        return modal[0];

    }

    beforeDestroy() {
        // 销毁实例前
    }

    destroyed() {
        // 销毁实例后
    }

    // 打开对话框
    openModal(modal) {

        let modalStyle = modal.style;
        modalStyle.display = 'block';

        setTimeout(function() {
            modal.classList.remove('modal-out');
            modal.classList.add('modal-in');
        }, 5)

        let overlay = document.querySelector('.lego-alertView__overlay');
        overlay.classList.add('ext-visible');

        return true;
    }

    // 关闭对话框
    closeModal(modal) {
        let _this = this;
        let animationEnd = util.animationEnd();

        modal.classList.add('modal-out');
        modal.classList.remove('modal-in');

        let overlay = document.querySelector('.lego-alertView__overlay');
        overlay.classList.remove('ext-visible');

        // 移除modal节点
        function removeModal() {
            modal.parentNode.removeChild(modal);
        }

        modal.addEventListener(animationEnd, removeModal, false);

        return true;
    }

    // alert框
    alert(configs) {
        configs.okButton = configs.okButton || this.defaults.okButton;
        configs.cancelButton = configs.cancelButton || this.defaults.cancelButton;

        configs.buttons = [{
            text: configs.okButton,
            onClick: configs.confirm
        }];

        this.render(configs);
    }

    // confirm框
    confirm(configs) {
        configs.okButton = configs.okButton || this.defaults.okButton;
        configs.cancelButton = configs.cancelButton || this.defaults.cancelButton;

        configs.buttons = [{
            text: configs.cancelButton,
            onClick: configs.cancel
        }, {
            text: configs.okButton,
            onClick: configs.confirm
        }]

        this.render(configs);

    }


}
