
var LegoLoading = require('./export/loading-controller');

window.onload=function(){
    var time = new Date().getTime();
    window.loading = new LegoLoading({
        // theme:'clean',
        text:'当前进度：${progress}',
        progress:function (progress) {
            console.log(progress);
            document.querySelector('.line').style['width'] = document.body.clientWidth * (progress / 100 ) + 'px';
            document.querySelector('.line').innerHTML=progress;
            if(progress == 90){
                console.log('总时间'+(new Date().getTime() - time) / 1000);
            }
        },
        complete: function () {
            console.log('已经完成')
        },
        debug:true
    })

    loading.start();
    // loading.done();
}
