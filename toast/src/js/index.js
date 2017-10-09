var legoToast = require('./export/toast.js');

var toast = new legoToast({
	msg: "操作成功",
	time: 1200,
	extraClass: ""
});
toast.open();

// setTimeout(function() {
// 	toast.changeText('change');
// 	toast.changeTime(8000);
// 	toast.open();
// }, 3000)

$('.btn').on('click', function() {
	toast.changeText(`change${Math.random()}`);
	toast.open();
})
