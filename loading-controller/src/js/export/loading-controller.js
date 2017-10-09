/**
 * @file        : lego-loading
 * @author      : jianjun
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoLoadingController
 * @export file : index
 * @update      : 2016年10月14日15:56:07
 */


/**
 *
 * @param {Object} argument 参数集合
 * @param {string} argument.text 输出文字
 * @param {Function} argument.progress 返回当前进度
 * @param {Function} argument.complete 百分比为100%的执行的回调
 */
function LegoLoadingController(argument) {
    this.init();
    argument = argument ? argument : {};

    if (!(this instanceof LegoLoadingController)) {
        return new LegoLoadingController(argument)
    };

    this.text = argument.text ? argument.text : '';

    if (this.text.indexOf('\$\{progress\}') != -1) {
        //需要百分比
        this.firtText = this.text.replace(/(\$\{progress\})/g, '0%')
    } else {
        //纯文字
        this.firtText = this.text;
    }

    if (argument.theme == 'default' || !argument.theme) {
        this.theme = 'ext-legoLoadingDefault';
    } else if (argument.theme != 'clean') {
        this.theme = argument.theme;
    } else {
        this.theme = 'clean';
    }
    this.debug          = argument.debug ? argument.debug : false; //是否打开debug
    this._start         = false; //是否开始了
    this._startProgress = 0; //开始progress
    this._progress      = 0; //当前的progress
    this._endProgress   = 100;
    this._animate       = false; //运动状态
    this._moveEnd       = false; //结束

    this.onProgress     = argument.progress ? argument.progress : function() {};
    this.onComplete     = argument.complete ? argument.complete : function() {};
    this._stepsCB       = function() {};
}

 /**
 * 设置进度
 *
 * @param {number} progress 需要到达的进度
 */
LegoLoadingController.prototype._set = function(progress) {
    if (this._moveEnd) {
        this._endProgress = 100;
        this._timingFunction = 'fast';
    } else {
        this._endProgress = progress;
    }
    this._work();
}

/**
 * 创建节点
 */
LegoLoadingController.prototype._renderDom = function() {
    this.ready();

    //加载style
    var loadingStyle = require('./style/loading.scss').toString();
    var loadingStyleDom = document.createElement('style');
    loadingStyleDom.setAttribute('rel', 'stylesheet');
    loadingStyleDom.type = 'text/css';

    if (loadingStyleDom.styleSheet) {
        loadingStyleDom.styleSheet.cssText = loadingStyle;
    } else {
        loadingStyleDom.innerHTML = loadingStyle;
    }

    document.querySelector('head').appendChild(loadingStyleDom);

    //加载dom
    var domConfig = {
        text: this.firtText ? this.firtText : '',
        img: this.loadingImage
    }
    this.appendText = require('./tpl/body.tpl')(domConfig);
    var loadingBody = document.createElement('div');
    loadingBody.className = 'legoLoading ' + this.theme;
    loadingBody.innerHTML = this.appendText;
    document.querySelector('body').appendChild(loadingBody);

    this['loadingDom'] = document.querySelector('.legoLoading');
    var domText = this.loadingDom.querySelector('.legoLoading__text')
    if (domText) {
        this.loadingDomText = domText;
    }
    this.render();
}


/**
 * 开始运行进度
 *
 * @param  {number} progress       需要到达的进度
 * @param  {string} timingFunction 时间曲线
 * @param  {Function} stepsCB      回调
 * @return {Object}
 */
LegoLoadingController.prototype.start = function(progress, timingFunction, stepsCB) {

    //不处于干净模式就生成dom
    if (this.theme != 'clean') {
        if (!document.querySelector('.legoLoading')) {
            this._renderDom();
        };
        this.loadingDom.style['display'] = 'block';
        this._removeClass(this.loadingDom, 'is-legoLoadingComplete');
    }

    this._start = true;
    if (this._progress == 100) {
        this._startProgress = 0;
        this._progress = 0;
    }
    var setProgress = progress ? progress : 90;
    this._set(setProgress);
    if (stepsCB) {
        this._stepsCB = stepsCB;
    }

    if (this._moveEnd) {
        this._timingFunction = 'fast';
    } else {
        this._timingFunction = timingFunction ? timingFunction : 'default';
    }

    return this;
}

/**
 * to方法，用于直接到某个值
 *
 * @param  {number} progress       需要到达的进度
 * @param  {string} timingFunction 时间曲线
 * @param  {Function} stepsCB      回调
 * @return {Object}
 */
LegoLoadingController.prototype.to = function(progress, timingFunction, stepsCB) {
    if (this._moveEnd) {
        this._timingFunction = 'fast';
        return;
    }
    if (this._progress > progress) {
        this.debug && console.log("输入的值比当前值要小");

        return;
    }
    this._set(progress);
    if (stepsCB) {
        this._stepsCB = stepsCB;
    }
    this._timingFunction = timingFunction ? timingFunction : 'default';

    return this;
}

/**
 * 处理进度变化
 */
LegoLoadingController.prototype._work = function() {
    // this._animate = true;
    var _that = this;

    var work = function() {
        var ratio = (_that._endProgress - _that._progress) / _that._endProgress;
        var workingTime = 0;
        //速率
        switch (_that._timingFunction) {
            case 'fast':
                workingTime = ratio * ratio * ratio * 100;
                break;
            case 'slow':
                workingTime = ratio * 500 * 1.2;
                break;
            default:
                workingTime = ratio * 300;
        }

        workingTime = workingTime <= 10 ? 10 : workingTime;
        setTimeout(function() {
            if (_that._progress < _that._endProgress) {

                var count = _that._calcProgress();

                _that._progress = count + _that._startProgress;
                _that._startProgress = _that._progress;
                if (_that._progress > _that._endProgress) {
                    _that._progress = _that._endProgress;
                }
                _that.onProgress(_that._progress);
                // 改变输出的text
                if (_that.text != '' && _that.theme != 'clean') {
                    _that.loadingDomText.innerHTML = _that.text.replace(/(\$\{progress\})/g, _that._progress + '%');
                }
                //完成之后执行的回调
                if (_that._progress == 100) {
                    _that.onComplete();
                    if (_that.theme != 'clean') {
                        _that._addClass(_that.loadingDom, 'is-legoLoadingComplete');
                        setTimeout(function() {
                            _that.loadingDom.style['display'] = 'none';
                            // _that._animate = false;
                        }, 400)
                    }

                    return;
                } else {
                    work();
                }
            } else {
                // _that._animate = false;
                _that._stepsCB();
                return;
            }
        }, workingTime)
    }
    work();
}

/**
 * 计算进度
 */
LegoLoadingController.prototype._calcProgress = function() {
    switch (true) {
        case this._progress >= 0 && this._progress <= 20:
            // Math.ceil();
            return Math.ceil(Math.random() * (5 - 3 + 1) + 3);
            // return 1;
            break;
        case this._progress > 20 && this._progress <= 65:
            return Math.ceil(Math.random() * 3);
            break;
        case this._progress > 65 && this._progress <= 90:
            return Math.ceil(Math.random() * 2);
            break;
        case this._progress > 90 && this._progress <= 100:
            return 1;
        default:
    }
}

/**
 * 结束
 */
LegoLoadingController.prototype.done = function() {
    if (!this._start) {
        this.debug && console.log('还未开始!');
        return; //防止直接调用 done 未调用start ();
    }
    this._moveEnd = true;
    this._set(100);
    this._timingFunction = 'fast';
    this._stepsCB        = function() {}
    return this;
}

/*
 * addClass
 *
 * @param {Object} obj  增加class的dom
 * @param {string} sClass class名字
 */
LegoLoadingController.prototype._addClass = function(obj, sClass) {
    if (!this._hasClass(obj, sClass)) {
        obj.className += ' ' + sClass;
    }
}

/*
 * removeClass
 *
 * @param {Object} obj  增加class的dom
 * @param {string} sClass class名字
 */
LegoLoadingController.prototype._removeClass = function(obj, sClass) {
    if (this._hasClass(obj, sClass)) {
        var reg = new RegExp('(\\s|^)' + sClass + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

/*
 * hasClass
 *
 * @param {Object} obj  增加class的dom
 * @param {string} sClass class名字
 */
LegoLoadingController.prototype._hasClass = function(obj, sClass) {
    return obj.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'));
}

LegoLoadingController.prototype.init = function() {

}

LegoLoadingController.prototype.ready = function() {

}

LegoLoadingController.prototype.render = function() {

}

LegoLoadingController.prototype.beforeDestory = function() {

}

LegoLoadingController.prototype.destroyed = function() {

}
module.exports = LegoLoadingController
// exports.legoLoading = legoLoading;
