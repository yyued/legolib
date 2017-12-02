var LegoImgLoader = require('./export/image-loader.js');
// import LegoImgLoader from './export/image-loader.js';

var arr = [
    'http://img.dwstatic.com/www/1605/326487013743/1462867118922.jpg',
    'http://img2.dwstatic.com/www/1607/332156260726/1468201777561.png',
    'http://img4.dwstatic.com/www/1607/331553311031/1467598667542.png',
    'http://img4.dwstatic.com/www/1512/313433690773/1512180053920.jpg',
    'http://img2.dwstatic.com/www/1512/313433717915/1512197015168.jpg',
    'http://img2.dwstatic.com/www/1712/376153051669/1512197872817.jpg'
];

new LegoImgLoader(arr, {
    try: 1,
    progress: function(count, total, src) {
        console.log('progress:single loaded:', arguments);
        var progress = count/total*100 + '%';
        document.getElementById('progress-bar').innerHTML = progress;
    document.getElementById('progress-bar').style.width = progress;
       $('body').append('<p>' + src + '<br/>加载中。。。'+ progress +'%</p>');
    },
    complete: function(time, errorImgs) {
        console.log('complete:all source loaded:',arguments);
        $('body').append('<p>加载完成,总共耗时:'+time+'ms</p><p>加载失败的图片：'+errorImgs+'</p>');
    }
})
