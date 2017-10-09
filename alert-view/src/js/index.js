import LegoModal from './export/alert-view';

var modal = new LegoModal();

document.getElementById('confirm').addEventListener('click', function(){
    modal.confirm({
        title: 'confirm',
        text: '你求我啊！！',
        okButton: '好',
        cancelButton: '不',
        confirm: function() {
            modal.alert({
                title: 'alert',
                text: '求求你不要求我来求你。',
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
        title: '你的脸怎么这么大?',
        text: '谁也别想一巴掌拍死我，不信你试试',
        // okButton: 'good',
        extraClass: 'ext-red',
        confirm: function() {
            console.log('alert')
        }
    });
}, false)
