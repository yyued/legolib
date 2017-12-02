/*!
 * SmartViewPort
 * @desc: 适用于固定viewport宽度的移动端适配方案，根据环境动态设置viewport宽度，主要对安卓4.4以下做兼容处理
*/

var SmartViewPort = function(width){
    var realWidth = width || 750;
    var isAndroid = /Android (\d+\.\d+)/.test(navigator.userAgent);
    var viewportScript = document.querySelector('[name="viewport"]');
    if (viewportScript) {
        document.head.removeChild(viewportScript);
    }
    if (isAndroid) {
        var version = parseFloat(RegExp.$1);
        if (version > 2.3 && version < 4.4) {
            var phoneScale = parseInt(window.screen.width) / realWidth;
            var content = "width=" + realWidth + ", minimum-scale=" + phoneScale + ", maximum-scale = " + phoneScale + ", target-densitydpi=device-dpi";
            this.setContent(content);
        }
        else {
            var content = "width=" + realWidth + ", user-scalable=no";
            this.setContent(content);
        }
    }
    else {
        var content = "width=" + realWidth + ", user-scalable=no";
        this.setContent(content);
    };
}
SmartViewPort.prototype.setContent = function(content){
    var tag = document.createElement("meta");
    tag.name = "viewport";
    tag.content = content;
    document.getElementsByTagName("head")[0].appendChild(tag);
};
new SmartViewPort();