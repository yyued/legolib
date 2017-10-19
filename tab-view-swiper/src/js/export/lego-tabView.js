/**
 * @file        : 移动端tabView
 * @author      : Vicky
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoTabView
 * @export file : index
 * @update      : 2017-10-19 17:07:09
 */

import tabViewStyle from './style/index.scss';
import util from './module/util.js';
import './module/animate.js';
import './module/swiper.min.js';

let legoSwiper = null;

module.exports = class LegoTabView {

    /**
     * 构造函数
     *
     * @param {String} container 包含tabView组件的元素#id、data-*=xx、.class
     * @param {Array} navConfig 每个nav item的设置，每个item是一个object，可包含title（item的名称）、link（链接）、attr（属性）
     * @param {String} navEasing 导航滑动动画的效果 linear、easeInOut、easeOut、easeIn
     */
    constructor(argument) {
        this.defaults = {
            container      : null,
            navConfig      : {},
            activeIndex    : 0,
            navEasing      : 'easeInOut',
            switchCallBack : function(fromIndex, toIndex) {}
        };
        this.init(argument);

    }

    init(options) {
        this.defaults = util.extend(this.defaults, options);

        this.defaults.activeIndex = util.getUrlParam('activeIndex') || this.defaults.activeIndex;

        this.currentActiveIndex = 0;

        // 属性方法还未注入, 还未实例化
        const style = document.createElement('style');
        style.innerHTML = tabViewStyle;
        document.head.appendChild(style);

        this.tabView = document.querySelector(this.defaults.container);

        this.render();

        this.navContainer = document.querySelector('[data-role="nav-container"]');
        this.navWrap = document.querySelector('.lego-tabView__navWrap');
        // this.navList = document.querySelector('.lego-tabView__navContainer');
        this.allNavItem = document.querySelectorAll('[data-role="nav-item"]');
        this.navLine = document.querySelector('.lego-navLine');

        this.initNav();
        this.initSwiper();

    }

    render() {
        let self = this;
        // 属性方法已注入, 实例化, DOM已渲染
        let navArr = this.defaults.navConfig;
        let tpl = require('./tpl/nav.tpl')(navArr);
        this.tabView.innerHTML = tpl;

    }

    // 初始化nav的宽度和每个nav item设置index属性
    initNav() {
        let currentItem = this.navContainer.querySelector('.is-current');
        let navListLength = 0;
        if (currentItem) {
            let itemStyle = this.calcNavStyle(currentItem);
            this.navLine.style.width = itemStyle.width - 20 + 'px';
            this.navLine.style.left = itemStyle.center + 'px';

        }
        for (let i = 0; i < this.allNavItem.length; i++) {
            this.allNavItem[i].index = i;
            navListLength += this.allNavItem[i].clientWidth;
        }
        this.navContainer.style.width = navListLength + 'px';

        this.navClientW = this.navWrap.clientWidth;
        this.navScrollW = this.navWrap.scrollWidth;
        console.log(this.navScrollW);
        this.navViewCenter = this.navClientW / 2;
        this.maxScroll = this.navScrollW - this.navClientW / 2;
    }

    initSwiper() {
        let self = this;
        legoSwiper = new Swiper('#lego-tabView__swiper', {
            initialSlide: self.defaults.activeIndex,
            paginationClickable: true,


            onTransitionEnd: function(swiper) {
                console.log('onTransitionEnd', swiper.activeIndex, self.currentActiveIndex);
                // if (swiper.activeIndex != self.currentActiveIndex) {
                    self.scrollNav(swiper.activeIndex);
                    if (self.defaults.switchCallBack instanceof Function) {
                        console.log('callback');
                        self.defaults.switchCallBack(swiper.previousIndex, swiper.activeIndex);
                    }
                // }

            }
        });

        self.bindEvent();
    }

    //绑定事件
    bindEvent() {
        let itemLength = this.allNavItem.length;
        for (let i = 0; i < itemLength; i++) {
            let navItem = this.allNavItem[i];
            navItem.addEventListener('click', this.handleClick, false);
        }
        let index = this.defaults.activeIndex;
        if (index < itemLength) {
            this.switchTo(index);
        } else {
            console.error('activeIndex必须是小于导航item总数的数字');
        }
    }
    switchTo(index) {
        this.allNavItem[index].click(this.handleClick.bind(this));
    }
    calcNavStyle(ele) {
        return {
            width: ele.clientWidth,
            center: ele.offsetLeft + ele.clientWidth / 2
        }
    }

    //导航向左滚动
    scrollLeft(distanceX) {
        let startX = this.navWrap.scrollLeft;

        Math.animation(startX, distanceX, 200, this.defaults.navEasing, (value) => {
            this.navWrap.scrollLeft = value;
        });
    }

    // 导航下划线向左滚动
    scrollNavLine(startX, distanceX) {
        Math.animation(startX, distanceX, 200, this.defaults.navEasing, (value) => {
            this.navLine.style.left = value + 'px';
        });
    }
    // 设置导航下的下划线的长度
    setNavLineWidth(startWidth, distanceWidth) {
        this.navLine.style.width = parseInt(distanceWidth - 20) + 'px';
    }

    // 操作每个nav item的click事件
    handleClick = (e) => {

        let target = e.target;
        let item;

        if (target.tagName.toLowerCase() == 'a') {
            return;
        }
        if (target.tagName.toLowerCase() == 'li') {
            item = target;
        } else {
            item = target.parentNode;
        }
        legoSwiper.unlockSwipes();


        let index = item.index;

        this.scrollNav(index);
        legoSwiper.slideTo(index, 500, true);

    }

    scrollNav(index) {
        let item = this.allNavItem[index];
        let itemStyle = this.calcNavStyle(item);
        let itemW = itemStyle.width;
        let itemCenter = itemStyle.center;

        let oldItem = this.navContainer.querySelector('.is-current');
        let oldItemStyle = this.calcNavStyle(oldItem);
        let oldItemW = oldItemStyle.width;
        let oldItemCenter = oldItemStyle.center;
        if (item.classList.contains('is-current')) {
            return;
        }

        oldItem.classList.remove('is-current');
        item.classList.add('is-current');

        if (itemCenter <= this.navViewCenter) {
            this.scrollLeft(0);

        } else if (this.navScrollW - itemCenter >= this.navViewCenter) {
            this.scrollLeft(itemCenter - this.navViewCenter);

        } else if (this.navScrollW - itemCenter < this.navViewCenter) {
            this.scrollLeft(this.maxScroll);
        }

        this.scrollNavLine(oldItemCenter, itemCenter);
        this.setNavLineWidth(oldItemW, itemW);

    }

    beforeDestroy() {
        // 销毁实例前
    }

    destroyed() {
        // 销毁实例后
    }


}
