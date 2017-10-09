var legoWaiting = require('./export/waiting.js');
var waiting = new legoWaiting({
		title: '加载中...',
		extraClass: 'extraClass'
	});
waiting.open()

setTimeout(function() {
	waiting.close();
}, 2000)

$('.btn').on('click', function() {
	waiting.text('change');
	waiting.open();
	setTimeout(function() {
		waiting.close();
	}, 2000)
})