import appCall from './export/app-call.js';

let sid         = getUrlParam('sid');
let ssid        = getUrlParam('ssid');
let action      = getUrlParam('action');
let _uriScheme   = getUrlParam('_uriScheme');
let downloadUrl = '//yijian.yy.com/mobile.html';
let schemaUrl   = 'onepiece://';

// 兼容旧的跳转
if (sid && ssid) {
    schemaUrl = schemaUrl + 'Channel/Live/' + sid + '/' + ssid;
}
else {
    schemaUrl = action?decodeURIComponent(action):schemaUrl;
}


if(_uriScheme){
    new appCall({
        schemaUrl          : schemaUrl,
        androidDownloadUrl : downloadUrl,
        iOSDownloadUrl     : downloadUrl,
    })
}

function getUrlParam(name, url) {
    var paramReg    = new RegExp("[\\?&#]" + name + "=([^&#]+)","gi");
    var paramMatch  = (url || location.href).match(paramReg);
    var paramResult = [];

    if (paramMatch && paramMatch.length > 0) {
        paramResult = (paramMatch[paramMatch.length-1]).split("=");
        if (paramResult && paramResult.length > 1) {
            return paramResult[1];
        }
        return ''
    }
    return '';
}
