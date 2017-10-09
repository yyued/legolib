/**
 * @file        : 图片资源预加载
 * @author      : Vicky
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoImageLoader
 * @export file : index
 * @update      : 2016-09-05 10:13:24
 */

module.exports = class LegoImageLoader {
    /**
     * 构造函数
     *
     * @param {Array} imgResource 加载的图片数组
     * @param {object or function} options
     * options:
     * try: number 图片失败尝试加载的次数，默认是3
     * progress： 加载完每一张图片的回调函数
     * complete： 加载完所有图片的回调函数
     */
    constructor(imgResource, options) {
        this.errorImgs = [];
        this.opts = {
            try: 3,
            progress: function() {},
            complete: function() {}
        };

        if (typeof options == 'function') {
            let tempFun = options;
            options = {
                'complete': tempFun
            };
        }

        for (let i in options) {
            this.opts[i] = options[i];
        }
        this.init(imgResource);
    }

    // 读取需要加载的图片并对其加载
    init(imgResource) {
        let self   = this;
        let opts   = self.opts;
        let imgArr = [].concat(imgResource);

        let length = imgArr.length;
        let loaded = 0;
        let sTime  = new Date().getTime();

        // 判断图片加载的进度
        let load = function(src) {
            opts.progress(++loaded, length, src);

            if (loaded == length) {
                let times = new Date().getTime() - sTime;
                opts.complete(times, self.errorImgs);
            }
        }

        if (length) {
            let loadItem = function(item, loadCb) {
                let loadImgFunc = self.loadImage.bind(self);
                loadImgFunc(item, function() {
                    let args = Array.prototype.slice.call(arguments, 0);
                    loadCb.apply(null, args);
                })
            }

            for (let i = 0; i < imgArr.length; i++) {
                loadItem(imgArr[i], load);
            }
        } else {
            opts.complete(0);
        }
    }

    // 处理加载失败的图片重新加载
    reLoadImg(src, itemTry) {
        let self = this;
        if (itemTry > 0) {
            let img = new Image();
            img.onerror = function() {
                self.reLoadImg(src, --itemTry);
            }
            img.onload = function() {
                img.onerror = null;
                img.onload = null;
            }
            img.src = src;
        }
    }

    // 加载图片
    loadImage(src, fn) {
        let self = this;
        let img = new Image();
        let sTime = new Date().getTime();
        let itemTry = self.opts.try-1;
        img.onload = img.onerror = function(e) {
            if (e.type == 'error') {
                self.errorImgs.push(src);
                self.reLoadImg(src, itemTry);
            }
            fn(src, img, new Date().getTime() - sTime);
            img.onload = null;
        }
        img.src = src;
    }
}
