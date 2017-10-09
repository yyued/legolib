let util = {
    // animationend的兼容
    animationEnd() {
        let body  = document.body || document.documentElement;
        let style = body.style;
        let animEndEventNames = {
            WebkitAnimation : 'webkitAnimationEnd',
            animation       : 'animationend'
        };

        for (var name in animEndEventNames) {
            if (typeof style[name] === 'string') {
                return animEndEventNames[name];
            }
        }
    }
}

module.exports = util;
