/**
 * @file        : legoStorage
 * @author      : lijialiang
 * @team        : UED中心
 * @export      : umd
 * @export name : LegoStorage
 * @export file : index
 * @update      : 2017-12-08 10:24:24
 */
module.exports = class LegoStorage {

    constructor(config, debug) {
        window.legoStorage = this;

        // 观察assets是否加载完成（网络读取）
        let _assets = [];
        Object.defineProperty(window.legoStorage, 'assets', {
            set: (data) => {
                if (typeof data !== 'object') {
                    _assets.push(data);
                } else {
                    if (_assets.length > 0) {
                        _assets = _assets.concat(data);
                    } else {
                        _assets = data;
                    }
                }
                if (_assets.length === this.assetsNum) {
                    if (this.debug) console.log('资源 网络读取完毕，加载到DOM');
                    this.forEach(0, this.assets);
                }
            },
            get: () => {
                return _assets;
            },
        })

        // 观察延迟assets是否加载完成（网络读取）
        let _delay_assets = [];
        Object.defineProperty(window.legoStorage, 'delayAssets', {
            set: (data) => {
                if (typeof data !== 'object') {
                    _delay_assets.push(data);
                } else {
                    if (_delay_assets.length > 0) {
                        _delay_assets = _delay_assets.concat(data);
                    } else {
                        _delay_assets = data;
                    }
                }
                if (_delay_assets.length === this.delayAssetsNum) {
                    if (this.debug) console.log('延迟资源 网络读取完毕，加载到DOM');
                    this.haveDelay = false;
                    this.forEach(0, this.delayAssets);
                }
            },
            get: () => {
                return _delay_assets;
            },
        })

        // safari设置兼容性问题
        this.canSave = true;
        try {
            window.localStorage.setItem('legoStorage_test', 'test');
        } catch (e) {
            this.canSave = false;
        }

        this.config = config || '';
        this.debug = debug || false;
        this.assetsNum = 0;
        this.haveDelay = false;
        this.delayAssetsNum = 0;
        this.storage = window.localStorage.getItem('legoStorage') ? JSON.parse(window.localStorage.getItem('legoStorage')) : {};

        this.origin = this.getOrigin(this.config.iframeWindow);

    }

    init(cb) {
        // 通过iframe跨域拉取资源
        let iframe = document.createElement('iframe');
        iframe.id = 'read-file-iframe';
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = this.config.iframeWindow;

        document.getElementsByTagName('body')[0].appendChild(iframe);

        iframe.onload = () => {
            let iframes = document.getElementsByTagName('iframe');
            Array.prototype.forEach.call(iframes, (el, i) => {
                if (el === iframe) {
                    this.frame = window.frames[i];
                    this.frame_onload();
                }
            });
        };

        window.addEventListener('message', this.receiveMessage, false);

        if (cb) {
            this.onload = cb;
        }
    }
    getOrigin(url) {
        let reg = /^((https|http)?:\/\/)/;
        let hasProtocol = reg.test(url);
        let fullUrl = hasProtocol ? url : window.location.protocol + url;
        let newUrl = new URL(fullUrl);

        return {
            protocol: newUrl.protocol,
            host: newUrl.host
        };
    }

    frame_onload() {

        let localAssets = [];
        let configAssets = this.config.assets;
        for (let item in configAssets) {

            let k = item;
            let v = configAssets[k];

            if (v.type !== 'delay') {
                if (v.url && v.url.indexOf('//' + this.origin.host) < 0) {
                    if (this.debug) console.log(`${ k } >> 非Assets资源，外链加载`);
                    this.appendLink(v.url);
                } else {
                    if (!this.storage[k]) {
                        if (this.debug) console.log(`${ k } >> 检测版本不存在`);
                        ++this.assetsNum;
                        this.storage[k] = v;
                        this.storage[k]['content'] = '';
                        this.loadFile(k);
                    } else if (this.storage[k] && v.version !== this.storage[k]['version']) {
                        if (this.debug) console.log(`${ k } >> 检测版本不相同`);
                        ++this.assetsNum;
                        this.storage[k] = v;
                        this.storage[k]['content'] = '';
                        this.loadFile(k);
                    } else if (this.storage[k] && v.version === this.storage[k]['version']) {
                        if (this.debug) console.log(`${ k } >> 检测版本相同`);
                        ++this.assetsNum;
                        localAssets.push(k);
                    }
                }
            } else {
                this.haveDelay = true;
            }
        }

        if (localAssets.length > 0) {
            this.assets = localAssets;
        }

    }

    forEach(index, assets) {
        if (index < assets.length) {
            this.appendHtml(assets[index]);
            this.forEach(++index, assets);
        } else {
            setTimeout(() => {
                if (this.haveDelay) {
                    this.loadDelay();
                    return;
                }
                this.save();
            }, 0)
        }
    }

    loadDelay() {

        if (this.debug) console.log(`------------------------- 开始加载延迟资源 -------------------------`);

        let localDelayAssets = [];

        for (let item in this.config.assets) {
            let k = item;
            let v = this.config.assets[k];

            if (v.type === 'delay') {

                if (v.url && v.url.indexOf('//' + this.origin.host) < 0) {
                    if (this.debug) console.log(`${ k } >> 非Assets资源，外链加载`);
                    this.appendLink(v.url);
                } else {
                    if (!this.storage[k]) {
                        if (this.debug) console.log(`${ k } >> 检测版本不存在`);
                        this.storage[k] = v;
                        this.storage[k]['content'] = '';
                        ++this.delayAssetsNum;
                        this.loadFile(k, 'delay');
                    } else if (this.storage[k] && v.version !== this.storage[k]['version']) {
                        if (this.debug) console.log(`${ k } >> 检测版本不相同`);
                        this.storage[k] = v;
                        this.storage[k]['content'] = '';
                        ++this.delayAssetsNum;
                        this.loadFile(k, 'delay');
                    } else if (this.storage[k] && v.version === this.storage[k]['version']) {
                        if (this.debug) console.log(`${ k } >> 检测版本相同`);
                        ++this.delayAssetsNum;
                        localDelayAssets.push(k);
                    }
                }
            }
        }

        if (localDelayAssets.length > 0) {
            this.delayAssets = localDelayAssets;
        }

        if (this.delayAssetsNum === 0) {
            this.save();
        }

    }

    loadFile(name, type) {
        if (this.debug) console.log(`${ name } >> 请求资源`);
        this.frame.postMessage({
            name,
            url: this.storage[name]['url'],
            type,
        }, this.origin.protocol + '//' + this.origin.host);
    }

    receiveMessage(event) {
        let requireData = event.data.require;
        let originData = event.data.origin;
        let name = originData.name;
        let type = originData.type;
        let _this = window.legoStorage;

        if (requireData.indexOf('error') === 0) {
            _this.storage[name]['content'] = '';
        } else {
            _this.storage[name]['content'] = requireData;
        }

        if (type === 'delay') {
            _this.delayAssets = name;
            return;
        }

        _this.assets = name;
    }

    onload() {}

    appendHtml(name) {
        let fileName = this.storage[name]['url'].split('/').pop(),
            suffix = fileName.split('.').pop();

        if (suffix === 'css') {
            let styles = document.createElement('style')
            styles.id = `${ name }.style`;
            styles.type = 'text/css';
            styles.appendChild(document.createTextNode(this.storage[name]['content']));
            document.getElementsByTagName('head')[0].appendChild(styles);
        } else if (suffix === 'js') {
            var scripts = document.createElement('script');
            scripts.id = `${ name }.script`;
            scripts.appendChild(document.createTextNode(this.storage[name]['content']));
            document.getElementsByTagName('head')[0].appendChild(scripts);
        }
    }

    appendLink(url) {
        let fileName = url.split('/').pop(),
            suffix = fileName.split('.').pop();

        if (suffix === 'css') {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            document.getElementsByTagName('head')[0].appendChild(link);
        } else if (suffix === 'js') {
            var scripts = document.createElement('script');
            scripts.src = url;
            document.getElementsByTagName('head')[0].appendChild(scripts);
        }
    }

    save(cb) {
        if (this.canSave) {
            window.localStorage.setItem('legoStorage', JSON.stringify(this.storage));
        }
        if (cb) {
            cb();
        } else {
            this.onload();
        }
    }

    clear(name, cb) {
        if (typeof name === 'function') {
            cb = name;
            name = '';
        }
        if (name && name !== '' && this.storage && this.storage[name]) {
            delete this.storage[name];
            this.save(cb);
        } else {
            this.storage = {};
            this.save(cb);
        }
    }

}

// window.LegoStorage = LegoStorage;
