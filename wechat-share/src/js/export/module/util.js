/*
 * @author: wilson（wuweishuan@yy.com）
 * @update: 2017-08-03 11:51:03
*/

let util = {
    extend: (deep, target, options) => {
        for (name in options) {
            copy = options[name];
            if (deep && copy instanceof Array) {
                target[name] = this.extend(deep, [], copy);
            } else if (deep && copy instanceof Object) {
                target[name] = this.extend(deep, {},
                copy);
            } else {
                target[name] = options[name];
            }
        }
        return target;
    },

    importScript: (url, callback) => {
        let head = document.getElementsByTagName("head")[0] || document.documentElement;
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.charset = "utf-8";
        script.src = url;
        script.onload = script.onreadystatechange = () => {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                if (callback) {
                    callback();
                }
                script.onload = script.onreadystatechange = null;
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        };
        script.onerror = () => {
            alert('脚本加载失败，请重试！');
        }
        head.insertBefore(script, null);
    }
}

export default util;
