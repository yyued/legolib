/**
 * @file        : 滚屏控制器
 * @author      : David
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoPageSlider
 * @export file : index
 * @update      : 2017-03-15 14:39:01
 */

module.exports = class LegoPageSlider {

    /**
     * 构造函数
     *
     * @param {Object} argument 参数对象
     */
    constructor (argument) {
        this.init(argument);
    }

    init (config) {
        // 默认配置
        this.defaults = {
            container : ".page",
            direction : "y",
            active    : 0,
            onSlide   : function() {

            }
        };
        const configs = this.extend(this.defaults, config);
        // console.log(configs)
        this.options   = configs;
        this.container = document.querySelector(configs.container);

        // 兼容大小写传参
        this.options.direction = this.options.direction.toLowerCase();

        if (this.children = this.container.children, this.total = this.children.length, !(this.total.length < 2)) {
            this.disabledScroll();
            this.bindEvent();
            this.previous = this.current = configs.active;
        }
    }

    ready () {
        // 属性方法已注入, 实例化, 还未渲染 DOM
    }

    render () {

    }

    beforeDestroy () {
        // 销毁实例前
    }

    destroyed () {
        // 销毁实例后
    }

    // 事件处理
    handleEvent (event) {
        switch (event.type) {
            case "touchstart":
                this.onStart(event);
                break;
            case "touchmove":
                this.onMove(event);
                break;
            case "touchend":
                this.onEnd(event);
        }
    }

    // 事件绑定
    bindEvent () {
        let body = document.body;
        body.addEventListener("touchstart", this, false);
        body.addEventListener("touchmove", this, false);
        body.addEventListener("touchend", this, false);
    }

    // touchstart
    onStart (event) {
        this.startX = event.touches[0].pageX;
        this.startY = event.touches[0].pageY;
        this.isScrolling = undefined;
    }

    // touchmove
    onMove (event) {
        let distanceX = event.touches[0].pageX - this.startX;
        let distanceY = event.touches[0].pageY - this.startY;
        "undefined" == typeof this.isScrolling && (Math.abs(distanceX) > 20 || Math.abs(distanceY) > 20) && (this.isScrolling = "x" === this.options.direction ? Math.abs(distanceY) > 20 : Math.abs(distanceX) > 20), this.isScrolling && event.preventDefault()
    }

    // touchend
    onEnd (event) {
        if ("undefined" != typeof this.isScrolling && !this.isScrolling) {
            let index = "x" === this.options.direction ? event.changedTouches[0].pageX > this.startX ? -1 : 1 : event.changedTouches[0].pageY > this.startY ? -1 : 1;
            this.slide(this.current + index)
        }
    }

    // 滑动回调
    slide (index) {
        if (!(index > this.total - 1 || index < 0)) {
            this.previous = this.current;
            this.current  = index;

            let direction = 'undefined';
            let onSlide   = this.options.onSlide;

            switch(this.options.direction){
                case 'y':
                   direction = this.setDirection('up', 'down');
                break;

                default:
                    direction = this.setDirection('left', 'right');
                break;
            }

            "function" == typeof onSlide && onSlide.call(this, this.current, this.previous, direction);

        }
    }

    // 事件解绑
    pause () {
        let body = document.body;
        body.removeEventListener("touchstart", this, false);
        body.removeEventListener("touchmove", this, false);
        body.removeEventListener("touchend", this, false);
    }

    // 事件绑定
    play () {
        this.bindEvent();
    }

    disabledScroll () {
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        });
    }

    setDirection (direction1, direction2) {
        if (this.previous > this.current) {
            return direction1;
        }
        return direction2;
    }

    /**
     * 对象合并
     *
     * @param {object} target 原对象
     * @param {object} options 新对象
     * @return {object} 合并后的对象
     */
    extend (target, options) {
        let copy = null; // 属性值
        for (var name in options) { // name为对象属性
            copy = options[name];

            //防止循环调用
            if (target === copy) continue;

            //防止附加未定义值
            if (typeof copy === 'undefined') continue;

            //赋值
            target[name] = copy;
        }
        return target;
    }

}


