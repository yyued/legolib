import LegoModal from './export/alert-view';

var modal = new LegoModal();

document.getElementById('confirm').addEventListener('click', function(){
    modal.confirm({
        title: '提示',
        text: '确认要彻底删除该记录？',
        okButton: '必须的',
        cancelButton: '再想想',
        confirm: function() {
            modal.alert({
                title: '提示',
                text: '记录已删除！',
                confirm: function() {
                    console.log('alert')
                }
            });
        },
        cancel: function() {
            console.log('cancel');
        }
    });
}, false)

document.getElementById('alert').addEventListener('click', function(){
    modal.alert({
        title: '提示',
        text: '网络异常，请重试！',
        // okButton: 'good',
        extraClass: 'ext-red',
        confirm: function() {
            console.log('alert')
        }
    });
}, false)
